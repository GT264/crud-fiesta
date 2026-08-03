# Implementation Plan

[Overview]
Add Excel (XLSX) and CSV export functionality to the CrudDataTable component, using openspout/openspout for file generation and an export endpoint on CrudBaseController that respects the same filters, sorting, search, and relation display as the table view.

This implementation enables package users to export their table data with zero additional configuration beyond defining `getColumnsToExport()` in their DataTable class (which is already abstract and required). The export reproduces the same query logic as the index endpoint — applying filters, search, sort order — then streams all matching records (not just the current page) as a downloadable XLSX or CSV file. On the frontend, two export buttons (Excel and CSV) appear as a dropdown in the CrudDataTable header area, alongside the existing search input. The export route is auto-registered via the CrudBaseController, requiring no manual route definition from the package user.

[Types]
No new TypeScript types or interfaces are needed — the existing `TableColumn`, `ColumnFilterConfig`, and `PaginatorData` interfaces suffice. The export dropdown items use the existing `MenuItem` interface from DropdownMenu.vue.

**PHP Type/Config Addition:**
- `config/crud-fiesta.php` gains an `export` key with a `columns` sub-key defaulting to `'all'` (string `'all'` or array of column field strings), allowing global overrides.

[Files]

**New files:**
- None. All changes are modifications to existing files.

**Existing files to be modified:**

1. `composer.json` — Add `openspout/openspout` as a suggested dependency (package users install it themselves if they want export).
2. `src/DataTables/CrudBaseDataTable.php` — Change `getColumnsToExport()` from abstract to a concrete default implementation returning `static::default_columns`; update the stub comment to document the method's purpose.
3. `src/Controllers/CrudBaseController.php` — Add `export(Request $request)` method that builds the same query as index (filters, search, sort), fetches all matching records, resolves relation display fields, and returns a StreamedDownload response in XLSX or CSV format via openspout.
4. `src/resources/js/Components/Crud/CrudDataTable.vue` — Add export dropdown (two buttons: one for Excel, one for CSV) in the top toolbar next to the search input. Emit a new `export` event (or handle download directly via fetch+blob).
5. `src/resources/js/Pages/Index.vue` — Handle the export emit from CrudDataTable, building the download URL with current filter/sort/search query params and triggering the browser download.
6. `src/Stubs/DataTable.stub` — Add `getColumnsToExport()` method stub with docblock explaining usage.
7. `src/Stubs/CrudController.stub` — No changes needed (export method is on the base controller).
8. `config/crud-fiesta.php` — Add optional `export` configuration section.
9. `src/lang/en/crud.php` — Add translation keys: `crud.export.excel`, `crud.export.csv`, `crud.export.label`.
10. `src/lang/it/crud.php` — Add Italian translations for the same keys.

[Functions]

**New functions:**

| Function | Signature | File | Purpose |
|----------|-----------|------|---------|
| `export()` | `public function export(Request $request): StreamedResponse\|BinaryFileResponse` | `src/Controllers/CrudBaseController.php` | Handles export requests. Reads `format` (csv/xlsx) from query, builds identical query to index(), fetches all matching records, resolves relations, streams the file. |
| `buildExportQuery()` | `protected function buildExportQuery(Request $request): \Illuminate\Database\Eloquent\Builder` | `src/Controllers/CrudBaseController.php` | Extracted helper that replicates the paginate query logic (search, filters, sort, relations) but returns a Builder without pagination, so all records can be fetched for export. |
| `handleExport()` | `function handleExport(format: 'csv' \| 'xlsx')` | `src/resources/js/Components/Crud/CrudDataTable.vue` | Builds the export URL with current state (search, filters, sort, columns) and triggers browser download via a hidden anchor click or `window.open`. |

**Modified functions:**

| Function | Current File | Changes |
|----------|-------------|---------|
| `getColumnsToExport()` | `src/DataTables/CrudBaseDataTable.php` | Change from `abstract` to concrete. Default returns `static::default_columns`. Users override to customize. Docblock updated. |
| `index()` | `src/Controllers/CrudBaseController.php` | Extract shared query-building logic into `buildExportQuery()` (or an internal helper) to avoid duplication with the new `export()` method. Minimal refactor — keep `index()` behavior unchanged. |

**Removed functions:**
- None.

[Classes]

**Modified classes:**

| Class | File | Modifications |
|-------|------|---------------|
| `CrudBaseController` | `src/Controllers/CrudBaseController.php` | Add `export()` method and internal `buildExportQuery()` helper. The `buildExportQuery` mirrors `CrudBaseRepository::paginate()` query logic (search, filters, sort, eager-loaded relations) but returns an unpaginated Builder. |
| `CrudBaseDataTable` | `src/DataTables/CrudBaseDataTable.php` | Change `abstract protected function getColumnsToExport(): array` to `protected function getColumnsToExport(): array` with default `return static::default_columns;`. |

[Dependencies]

- **openspout/openspout** (`^4.0`): Added to `composer.json` in `suggest` section (not `require`, allowing package consumers to install it only if they need exports). The export method checks for the class existence and throws a clear exception if missing, guiding the user to `composer require openspout/openspout`.

[Testing]

**Manual testing checklist:**
1. Create a DataTable subclass with `default_columns` and `getColumnsToExport()` overridden.
2. Seed test data with relations.
3. Apply filters, search, and sort in the table UI.
4. Click "Export Excel" — verify downloaded file contains all filtered/sorted records, relation display fields resolved, same column order as table.
5. Click "Export CSV" — same verification.
6. Verify the export route requires no manual registration.
7. Verify that without openspout installed, a clear error message is shown.

**No automated test files are created** — the package currently has no test suite. The plan assumes manual verification.

[Implementation Order]

1. Add `openspout/openspout` to `composer.json` `suggest` section.
2. Add export translation keys to `src/lang/en/crud.php` and `src/lang/it/crud.php`.
3. Add `export` configuration section to `config/crud-fiesta.php`.
4. Update `src/DataTables/CrudBaseDataTable.php`: make `getColumnsToExport()` concrete with default implementation.
5. Update `src/Stubs/DataTable.stub`: add `getColumnsToExport()` stub with docblock.
6. Add `buildExportQuery()` and `export()` methods to `src/Controllers/CrudBaseController.php`.
7. Update `src/resources/js/Components/Crud/CrudDataTable.vue`: add export dropdown UI in the header, emit export event.
8. Update `src/resources/js/Pages/Index.vue`: wire up the export emit to trigger browser download via a hidden link.