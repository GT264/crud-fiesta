<?php

namespace GT264\CrudFiesta\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use OpenSpout\Writer\XLSX\Writer as XLSXWriter;
use OpenSpout\Writer\CSV\Writer as CSVWriter;
use OpenSpout\Writer\WriterInterface;
use OpenSpout\Common\Entity\Row;

class ExportDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private string $exportId,
        private string $modelClass,
        private string $modelName,
        private array $columns,
        private array $relationMap,
        private ?string $sortField,
        private string $sortDirection,
        private ?string $search,
        private ?array $filters,
        private string $format,
        private string $timestamp,
    ) {}

    public function handle(): void
    {
        $cacheKey = "crud-fiesta:export:{$this->exportId}";
        $modelClass = $this->modelClass;

        // 1. Build query (mirrors CrudBaseRepository::paginate() logic)
        $query = $modelClass::query();

        if ($this->sortField !== null) {
            $query->orderBy($this->sortField, $this->sortDirection);
        }

        if ($this->search !== null && $this->search !== '') {
            $searchableColumns = $this->columns;
            $query->where(function ($q) use ($searchableColumns) {
                if (!empty($searchableColumns)) {
                    foreach ($searchableColumns as $col) {
                        if (isset($this->relationMap[$col])) {
                            $relationName = $this->relationMap[$col]['relation'];
                            $displayField = $this->relationMap[$col]['display_field'];
                            $q->orWhereHas($relationName, function ($r) use ($displayField) {
                                $r->where($displayField, 'LIKE', '%' . $this->search . '%');
                            });
                        } else {
                            $q->orWhere($col, 'LIKE', '%' . $this->search . '%');
                        }
                    }
                }
            });
        }

        if ($this->filters !== null && !empty($this->filters)) {
            foreach ($this->filters as $field => $filterConfig) {
                $type = $filterConfig['type'] ?? 'select';
                $value = $filterConfig['value'] ?? null;

                if ($value === null || $value === '' || (is_array($value) && empty($value))) {
                    continue;
                }

                if (isset($this->relationMap[$field])) {
                    $relationName = $this->relationMap[$field]['relation'];
                    $displayField = $this->relationMap[$field]['display_field'];

                    $query->whereHas($relationName, function ($r) use ($type, $displayField, $value) {
                        $keyName = $r->getModel()->getKeyName();
                        match ($type) {
                            'multiselect' => $r->whereIn($keyName, (array) $value),
                            'date_range' => $r->whereBetween($displayField, [$value['start'], $value['end']]),
                            default => $r->where($keyName, $value),
                        };
                    });
                } else {
                    match ($type) {
                        'multiselect' => $query->whereIn($field, (array) $value),
                        'date_range' => $query->whereBetween($field, [$value['start'], $value['end']]),
                        default => $query->where($field, $value),
                    };
                }
            }
        }

        // Eager-load relations
        foreach ($this->relationMap as $foreignKey => $relationConfig) {
            $relationName = $relationConfig['relation'];
            $displayField = $relationConfig['display_field'];

            $query->with([
                $relationName => function ($q) use ($displayField) {
                    $relatedModel = $q->getModel();
                    $q->select([$relatedModel->getKeyName(), $displayField]);
                }
            ]);
        }

        // 2. Get total count
        $total = $query->count();

        Cache::put($cacheKey, [
            'status' => 'processing',
            'processed' => 0,
            'total' => $total,
            'format' => $this->format,
        ], now()->addHours(24));

        // 3. Create temp file
        $disk = config('crud-fiesta.export.disk', 'local');
        $exportPath = config('crud-fiesta.export.path', 'exports');
        $filename = "{$this->modelName}-{$this->timestamp}.{$this->format}";
        $storagePath = $exportPath . '/' . $filename;
        $filePath = Storage::disk($disk)->path($storagePath);

        // Ensure directory exists
        $dir = dirname($filePath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        // 4. Write via openspout
        $writer = $this->createWriter($filePath);

        // Header row
        $writer->addRow(Row::fromValues($this->columns));

        // Chunk and write
        $processed = 0;
        $chunkSize = config('crud-fiesta.export.chunk_size', 1000);

        $query->chunk($chunkSize, function ($rows) use ($writer, &$processed, $total, $cacheKey) {
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
                $writer->addRow(Row::fromValues($rowData));
            }

            $processed += count($rows);

            Cache::put($cacheKey, [
                'status' => 'processing',
                'processed' => $processed,
                'total' => $total,
                'format' => $this->format,
            ], now()->addHours(24));
        });

        $writer->close();

        // 5. Mark complete
        Cache::put($cacheKey, [
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

    private function createWriter(string $filePath): WriterInterface
    {
        if ($this->format === 'csv') {
            $writer = new CSVWriter();
            $writer->openToFile($filePath);
            return $writer;
        }

        $writer = new XLSXWriter();
        $writer->openToFile($filePath);
        return $writer;
    }
}