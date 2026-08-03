# Implementation Plan: Export Data (Excel + CSV) — Queue-based

**Branch**: `004-export` | **Date**: 2026-03-08

## Summary

Add Excel (XLSX) and CSV export to the `CrudDataTable` component. Two export buttons (Excel, CSV) appear as a dropdown in the table header. The export respects the same column visibility, ordering, filters, search, and sort as the current table view, using `getColumnsToExport()` from the DataTable class.

Exports use a **queue + polling** pattern: a Laravel Job generates the file in the background, progress is tracked via cache, and the frontend polls for completion. When the job finishes, a toast with a **Download button** appears — the user clicks it to receive the file, which is then deleted from disk. This allows the user to navigate freely while the export runs, and works for datasets of any size.

## Technical Context

**Language/Version**: PHP >= 8.3 (backend), TypeScript ^5.0 + Vue ^3.4 (frontend)

**Primary Dependencies**: Laravel ^13.0, inertiajs/inertia-laravel ^3.0, openspout/openspout ^4.0, Vite ^6.0

**Storage**: Temporary files in Laravel's `storage/app/exports/` directory. Deleted immediately after the user downloads the file via the download endpoint.

**Testing**: Manual (verify downloaded file content matches table display with various filter/sort/search combinations)

**Target Platform**: Browser (desktop), Laravel package consumed by Inertia.js applications

**Project Type**: Laravel package library

**Performance Goals**: Job runs in background, no HTTP timeout risk. openspout streaming writer ensures constant memory usage. Chunked query processing (1000 records per chunk) handles datasets of any size.

**Constraints**: No manual route registration required. `getColumnsToExport()` remains abstract. Requires Laravel queue worker to be running.

**Scale/Scope**: 2 new files (ExportDataJob, ExportController), 5 existing files modified.

## Export Flow (End to End)

```
1. User clicks "Export Excel" in the dropdown
2. Frontend POSTs to /{prefix}/export/start with format + current table state (search, filters, sort)
3. Backend validates, generates a unique export ID (UUID), stores job metadata in cache
4. Dispatches ExportDataJob with all query parameters; returns { export_id } to frontend
5. Frontend shows toast: "Export started — preparing your file..."
6. ExportDataJob runs in background queue:
   a. Builds query (same as index: search, filters, sort, relations)
   b. Gets total record count from query, stores in cache
   c. Chunks query results (1000/iteration), writes rows to XLSX/CSV via openspout streaming writer
   d. After each chunk, updates cache: { status: 'processing', processed: N, total: M }
   e. On completion: { status: 'completed', file_path: '...' }
   f. On failure: { status: 'failed', error: '...' }
7. Frontend polls GET /{prefix}/export/status/{id} every 2s:
   - status='processing': update toast text → "Exporting 4,500 of 10,000 records..."
   - status='completed': replace toast with permanent toast showing [Download] button
   - status='failed': show error toast
8. User clicks [Download] button → browser navigates to /{prefix}/export/download/{id}
9. Download endpoint streams the file with Content-Disposition: attachment, then deletes it from disk
10. Frontend removes the toast after download triggers
```

## Constitution Check

- [x] **I. Vue Composition API Only**: All `.vue` changes use `<script setup lang="ts">`.
- [x] **II. PSR-12 PHP Standards**: All new PHP follows existing conventions.
- [x] **III. Laravel Best Practices**: Job dispatched via Laravel queue, cache for state, streaming response for download. File deleted after download.
- [x] **IV. Compiled Assets in Version Control**: No Vite config changes.
- [x] **V. Package Architecture**: New classes in `GT264\CrudFiesta\` namespace. Routes auto-discovered. Translations in en+it.

## Project Structure

### New Files

```text
src/Jobs/ExportDataJob.php                   # Queued job: builds file, updates cache progress
src/Controllers/ExportController.php          # Handles start/status/download endpoints
```

### Modified Files

```text
composer.json                                 # openspout/openspout in require
config/crud-fiesta.php                        # export config section
src/CrudFiestaServiceProvider.php             # Register ExportController route group
src/Stubs/DataTable.stub                      # Document getColumnsToExport()
src/lang/en/crud.php                          # Export translations + polling messages
src/lang/it/crud.php                          # Italian translations
src/resources/js/Components/Crud/CrudDataTable.vue  # Export dropdown + emit
src/resources/js/Pages/Index.vue               # Wire export emit, polling logic, toast with download button
```

### Classes

| Class | Namespace | Purpose |
|-------|-----------|---------|
| `ExportDataJob` | `GT264\CrudFiesta\Jobs` | Queued job. Receives model class, columns, relation map, query params. Chunks data (1000/iteration), writes XLSX/CSV via openspout streaming writer to temp file, updates cache progress after each chunk. |
| `ExportController` | `GT264\CrudFiesta\Controllers` | Three endpoints: `start()` POST, `status($id)` GET, `download($id)` GET. Uses cache for job state. `download()` streams the file then deletes it. |

### Cache Keys

| Key Pattern | TTL | Purpose |
|-------------|-----|---------|
| `crud-fiesta:export:{uuid}` | 24h | Job state: `{ status, format, file_path, processed, total, error }` |

### Configuration (`config/crud-fiesta.php` additions)

```php
'export' => [
    'disk' => 'local',                    // Storage disk for temp files
    'path' => 'exports',                  // Relative path on disk
    'chunk_size' => 1000,                 // Records per chunk iteration
    'poll_interval_ms' => 2000,           // Frontend polling interval (informational, used by Index.vue)
],
```

### Translations (new keys)

| Key | English value |
|-----|--------------|
| `crud.export.label` | Export |
| `crud.export.excel` | Export Excel |
| `crud.export.csv` | Export CSV |
| `crud.export.started` | Export started — preparing your file... |
| `crud.export.processing` | Exporting :processed of :total records... |
| `crud.export.ready` | Export ready! |
| `crud.export.download` | Download |
| `crud.export.failed` | Export failed: :error |

### Route Registration (in ServiceProvider)

```php
// In CrudFiestaServiceProvider::boot(), load routes from a routes file or register directly:
Route::prefix('{prefix}/export')->group(function () {
    Route::post('/start', [ExportController::class, 'start']);
    Route::get('/status/{id}', [ExportController::class, 'status']);
    Route::get('/download/{id}', [ExportController::class, 'download']);
});
```

Since the package uses a route_prefix concept, the user's routes file already has `Route::resource($prefix, CrudController::class)`. We need to register the export routes relative to that same prefix. The export controller is instantiated by the consuming application via Laravel's container, receiving the same model, DataTable, and repository instances that the CrudController uses.

### Frontend Changes Detail

**CrudDataTable.vue additions:**
- New prop: `routePrefix: string` (passed from Index.vue, used to build export URLs)
- New emits: `export: [format: 'xlsx' | 'csv']`
- New UI: Dropdown button in the header toolbar (left of search or right-aligned), containing "Export Excel" and "Export CSV" items. Uses existing `DropdownMenu` component.

**Index.vue additions:**
- Handle `@export` event from CrudDataTable
- On export click:
  1. POST to `/{routePrefix}/export/start` with `{ format, search, sort_field, sort_order, filters }`
  2. Receive `{ export_id }` from response
  3. Show toast with text from `crud.export.started`
  4. Begin polling `/{routePrefix}/export/status/{export_id}` every 2s
  5. On `status: 'processing'`: update toast text with `crud.export.processing` (replace `:processed` and `:total`)
  6. On `status: 'completed'`: replace toast with one containing a [Download] button (using `crud.export.ready` + `crud.export.download`)
  7. On download click: `window.open(downloadUrl)` or `<a>` element click
  8. Stop polling, remove toast
  9. On `status: 'failed'`: show error toast with `crud.export.failed`
- Polling uses `setInterval`; interval ID stored in component state, cleaned up on unmount or completion
- The export ID is stored in the Vue component's `ref` — if the user navigates away and back (Inertia navigation), the polling resets. This is acceptable: if they navigate away, the export continues in the background. When they return to the index page, a new export can be started.

### ExportDataJob Implementation Notes

```php
class ExportDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private string $exportId,
        private string $modelClass,
        private array $columns,
        private array $relationMap,
        private ?string $sortField,
        private string $sortDirection,
        private ?string $search,
        private ?array $filters,
        private string $format, // 'xlsx' or 'csv'
    ) {}

    public function handle(): void
    {
        // 1. Build query (mirror CrudBaseRepository::paginate() query logic)
        $query = $this->modelClass::query();
        // ... apply search, filters, sort, eager load relations

        // 2. Get total count
        $total = $query->count();
        Cache::put("crud-fiesta:export:{$this->exportId}", [
            'status' => 'processing',
            'processed' => 0,
            'total' => $total,
            'format' => $this->format,
        ], now()->addHours(24));

        // 3. Create temp file via Storage
        $filename = "export-{$this->exportId}.{$this->format}";
        $filePath = Storage::disk(config('crud-fiesta.export.disk'))
            ->path(config('crud-fiesta.export.path') . '/' . $filename);

        // 4. Write via openspout
        $writer = WriterEntityFactory::createXLSXWriter(); // or CSVWriter
        $writer->openToFile($filePath);

        // Header row using column display labels
        $headerRow = WriterEntityFactory::createRowFromArray(
            array_map(fn($col) => __("models.{$this->modelName}.fields.{$col}"), $this->columns)
        );
        $writer->addRow($headerRow);

        // Chunk and write
        $processed = 0;
        $query->chunk(config('crud-fiesta.export.chunk_size', 1000), function ($rows) use ($writer, &$processed, $total) {
            foreach ($rows as $row) {
                $rowData = [];
                foreach ($this->columns as $col) {
                    if (isset($this->relationMap[$col])) {
                        $rel = $this->relationMap[$col];
                        $rowData[] = $row->{$rel['relation']}?->{$rel['display_field']} ?? '';
                    } else {
                        $rowData[] = $row->{$col} ?? '';
                    }
                }
                $writer->addRow(WriterEntityFactory::createRowFromArray($rowData));
            }
            $processed += count($rows);
            Cache::put("crud-fiesta:export:{$this->exportId}", [
                'status' => 'processing',
                'processed' => $processed,
                'total' => $total,
                'format' => $this->format,
            ], now()->addHours(24));
        });

        $writer->close();

        // 5. Mark complete
        Cache::put("crud-fiesta:export:{$this->exportId}", [
            'status' => 'completed',
            'file_path' => $filePath,
            'processed' => $processed,
            'total' => $total,
            'format' => $this->format,
        ], now()->addHours(24));
    }

    public function failed(\Throwable $e): void
    {
        Cache::put("crud-fiesta:export:{$this->exportId}", [
            'status' => 'failed',
            'error' => $e->getMessage(),
        ], now()->addHours(24));
    }
}
```

### ExportController Endpoints Detail

**POST `/{prefix}/export/start`**

Request body: `{ format: 'xlsx'|'csv', search: string|null, sort_field: string|null, sort_order: string|null, filters: object|null }`

Response: `{ export_id: 'uuid-string' }`

Logic:
1. Validate format
2. Generate UUID
3. Store initial cache entry: `{ status: 'queued', format }`
4. Dispatch `ExportDataJob` with all parameters
5. Return `{ export_id }`

**GET `/{prefix}/export/status/{id}`**

Response: `{ status: 'queued'|'processing'|'completed'|'failed', processed: int, total: int, error?: string }`

Logic:
1. Read cache entry for the export ID
2. Return status. For `completed`, do NOT include `file_path` — that's only accessible via the download endpoint.

**GET `/{prefix}/export/download/{id}`**

Response: Streamed download with `Content-Disposition: attachment`

Logic:
1. Read cache entry
2. Verify status is `completed` and file exists
3. Stream file via `response()->download($filePath)`
4. After response sent (or using a `terminate` middleware pattern), delete the file and remove cache entry
5. For simplicity, delete synchronously after streaming: use `Storage::disk(...)->delete($path)` in a `Response::create()->send()` callback, or just delete before sending but note that `response()->download()` uses `SplFileInfo` which needs the file to exist during streaming. A practical approach: delete the file AND cache entry at the end of the download method after the response is returned (Laravel's `response()->download()` reads the file path, but the actual bytes are read lazily — so we can't delete immediately). **Solution**: delete the file in a `terminating` callback: `app()->terminating(fn() => unlink($filePath) && Cache::forget($key))`. Or simply: after calling `response()->download()`, register a shutdown function. But the simplest approach that works: use `response()->streamDownload()` instead, which reads the file content into the response immediately and allows us to delete the file right after.

Simplified download approach:
```php
public function download(string $id): StreamedResponse
{
    $data = Cache::get("crud-fiesta:export:{$id}");
    
    if (!$data || $data['status'] !== 'completed') {
        abort(404);
    }
    
    $filePath = $data['file_path'];
    
    if (!file_exists($filePath)) {
        Cache::forget("crud-fiesta:export:{$id}");
        abort(404);
    }
    
    $filename = basename($filePath);
    $mimeType = $data['format'] === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
    return response()->streamDownload(function () use ($filePath) {
        readfile($filePath);
        // Delete file after streaming
        @unlink($filePath);
    }, $filename, ['Content-Type' => $mimeType]);
}
```

This uses `streamDownload` + `readfile` — the file is deleted immediately after `readfile` completes flushing to the output buffer. The cache entry can be removed right after as well.

## Implementation Order

1. **composer.json**: Add `"openspout/openspout": "^4.0"` to `require`.
2. **config/crud-fiesta.php**: Add `export` configuration section.
3. **src/lang/en/crud.php + src/lang/it/crud.php**: Add all 8 new translation keys.
4. **src/Jobs/ExportDataJob.php**: Create the queued job with chunked export logic.
5. **src/Controllers/ExportController.php**: Create controller with start/status/download endpoints.
6. **src/CrudFiestaServiceProvider.php**: Register ExportController route group.
7. **src/Stubs/DataTable.stub**: Add `getColumnsToExport()` documentation.
8. **src/resources/js/Components/Crud/CrudDataTable.vue**: Add export dropdown with Excel + CSV buttons, `routePrefix` prop, emit `export` event.
9. **src/resources/js/Pages/Index.vue**: Handle export emit — POST to start endpoint, poll status, show progress toast, show download button toast on completion.