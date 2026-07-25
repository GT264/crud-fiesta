# Implementation Plan

[Overview]
Add column-level filters to the CRUD datatable, supporting select, multiselect, date, and date_range filter types that trigger backend queries, using shadcn/Vue UI components and respecting relation display mappings.

The current datatable has only a global search input. This plan adds per-column filter inputs in a second header row below the sortable column headers. Each column can define an optional filter configuration in the DataTable PHP class via a new `columnFilters()` method. Filter types are: `select` (single value), `multiselect` (array of values), `date` (single date, YYYY-MM-DD or YYYY-MM-DD HH:MM:SS), and `date_range` (start/end date pair). For foreign key columns with relation mappings (`relationDisplayMap`), filter options are loaded from the related model at render time. Filters are sent as query parameters to the backend, processed in the repository's `paginate()` method using `WHERE` / `WHERE IN` / `WHERE BETWEEN` / `WHERE HAS` clauses as appropriate.

[Types]
New TypeScript interfaces for filter configuration and state, plus new PHP method signatures and filter types.

### TypeScript (Frontend)

```typescript
// Filter configuration from backend
interface ColumnFilterConfig {
  field: string
  type: 'select' | 'multiselect' | 'date' | 'date_range'
  options?: { label: string; value: string | number }[]  // for select/multiselect
}

// Extended ColumnDetail (adds optional filter_config)
interface ColumnDetail {
  field: string
  header: string
  relation?: { relation: string; display_field: string }
  filter_config?: ColumnFilterConfig
}

// Filter value payload sent to backend
interface FilterPayload {
  field: string
  type: 'select' | 'multiselect' | 'date' | 'date_range'
  value: string | number | (string | number)[] | { start: string; end: string }
}

// Props added to CrudDataTable
interface Props {
  // ... existing props
  columnFilters?: ColumnFilterConfig[]  // filter configs from backend
}

// Emits added to CrudDataTable
'filter': [event: { filters: Record<string, FilterPayload['value']> }]
```

### PHP (Backend)

```php
// New method on CrudBaseDataTable
protected function columnFilters(): array
// Returns: [
//   'column_name' => [
//     'type' => 'select',           // required: select|multiselect|date|date_range
//     'options' => [...],           // optional: static options for select/multiselect
//   ],
// ]

// New parameter on CrudBaseRepository::paginate()
?array $filters = null  // ['column_name' => ['type' => '...', 'value' => ...], ...]
```

### Filter value shapes by type

| Type | PHP value shape | SQL operator |
|---|---|---|
| `select` | `string\|int` | `WHERE column = ?` |
| `multiselect` | `(string\|int)[]` | `WHERE IN (?)` |
| `date` | `string` (Y-m-d or Y-m-d H:i:s) | `WHERE column = ?` |
| `date_range` | `['start' => 'Y-m-d', 'end' => 'Y-m-d']` | `WHERE BETWEEN ? AND ?` |

[Files]
Create 0 new files; modify 8 existing files to add filter support across the full stack.

### New Files
None. All changes are in existing files.

### Files to Modify

1. **`src/DataTables/CrudBaseDataTable.php`**
   - Add `columnFilters()` abstract method returning `array` with default returning `[]`
   - Add `getColumnFilters()` public method to expose filters with resolved options for relation columns
   - In `initializeColumnsDetails()`, merge filter config into each `details_columns` entry as `filter_config`
   - For relation columns with `select`/`multiselect` type but no explicit `options`, fetch `options` from related model via `$relatedModel::all()->pluck($displayField, $keyName)`

2. **`src/Controllers/CrudBaseController.php`**
   - In `index()`, read `filters` from `$request->query('filters')` (expects JSON-encoded array or flat query params)
   - Accept filters as `?array $filters` from query string using `filters[column_name][type]` and `filters[column_name][value]` convention
   - Pass `$filters` to `$this->crud_base_repository->paginate()` as new 7th argument
   - Pass `column_filters` (list of filter configs) to Inertia render as a new prop

3. **`src/Repositories/CrudBaseRepository.php`**
   - Add `?array $filters = null` parameter to `paginate()` method
   - After search block and before relation eager-load, apply each filter:
     - `select`: `$query->where($field, $value)`
     - `multiselect`: `$query->whereIn($field, $value)`
     - `date`: `$query->where($field, '=', $value)`
     - `date_range`: `$query->whereBetween($field, [$value['start'], $value['end']])`
     - Relation columns: use `whereHas` similar to search logic

4. **`src/resources/js/Components/Crud/CrudDataTable.vue`**
   - Add `columnFilters` prop (array of `ColumnFilterConfig`)
   - Add filter row (`<tr>`) below the sort header row with filter inputs per column
   - Add reactive `filterValues` state (`Record<string, any>`)
   - Emit `filter` event when any filter changes (debounced for text inputs, immediate for selects)
   - Use `<select>` native for `select`/`multiselect` types (shadcn Select component)
   - Use `<input type="date">` for `date` type (shadcn Calendar input)
   - Use two `<input type="date">` side-by-side for `date_range`
   - Debounce date inputs with 300ms timeout

5. **`src/resources/js/Pages/Index.vue`**
   - Pass `column_filters` prop from Inertia to `CrudDataTable` as `:column-filters`
   - Add `onFilter` handler that calls `router.get()` with `filters` param
   - Preserve filter state across pagination/sort/search reloads

6. **`src/Stubs/DataTable.stub`**
   - Add stub for `columnFilters()` method returning empty array with commented examples

7. **`src/lang/en/crud.php`**
   - Add `'datatable.filters'` section with placeholder strings:
     - `'select_placeholder' => 'Select...'`
     - `'date_from' => 'From'`
     - `'date_to' => 'To'`

8. **`src/lang/it/crud.php`**
   - Mirror English additions with Italian translations

[Functions]
New methods on CrudBaseDataTable, modified paginate() signature, and new frontend handler functions.

### New Functions

| Function | File | Purpose |
|---|---|---|
| `columnFilters(): array` | `CrudBaseDataTable.php` | Abstract method returning filter config per column. Override in child DataTable classes. |
| `getColumnFilters(): array` | `CrudBaseDataTable.php` | Public getter that resolves relation-based options for filters. Returns array of `ColumnFilterConfig` for frontend. |
| `onFilter(filters: Record<string, any>)` | `Index.vue` | Handler for filter events from CrudDataTable. Sends `filters` as query params via Inertia router. |

### Modified Functions

| Function | File | Changes |
|---|---|---|
| `initializeColumnsDetails()` | `CrudBaseDataTable.php` | Add `filter_config` key to each column's detail array from `columnFilters()` |
| `index(Request $request)` | `CrudBaseController.php` | Parse `filters` query param, pass to paginate(), pass `column_filters` to Inertia render |
| `paginate(...)` | `CrudBaseRepository.php` | Add `?array $filters = null` parameter; apply WHERE/WHERE IN/WHERE BETWEEN/whereHas clauses |

### Removed Functions
None.

[Classes]
Minor additions to CrudBaseDataTable; no new or removed classes.

### Modified Classes

**`GT264\CrudFiesta\DataTables\CrudBaseDataTable`**
- Add abstract `columnFilters()` method (returns `[]` by default so existing child classes don't break)
- Add `getColumnFilters(): array` public method
- Modify `initializeColumnsDetails()` to attach `filter_config` per column
- Resolve relation-based filter options by querying the related model when `type` is `select`/`multiselect` and no `options` are provided

**`GT264\CrudFiesta\Repositories\CrudBaseRepository`**
- `paginate()`: add `?array $filters = null` parameter, apply filter WHERE clauses before eager-loading

**`GT264\CrudFiesta\Controllers\CrudBaseController`**
- `index()`: parse `filters` from request, pass to repository, include `column_filters` in Inertia response

### No Removed Classes

[Dependencies]
No new packages required. The implementation uses existing shadcn components (Select, Button) and native HTML date inputs (which the Calendar component wraps). Uses `@vueuse/core` (already a dependency) for `useVModel`.

[Testing]
No automated test suite exists in this project. Manual verification strategy:

1. **Verify filter row renders**: Add a `columnFilters()` method to a child DataTable returning `['name' => ['type' => 'select', 'options' => [...]]]`, confirm filter row appears below headers.
2. **Verify select filter**: Choose a value in a select filter, confirm backend receives `filters[name][type]=select&filters[name][value]=...` and results are filtered.
3. **Verify date filter**: Enter a date, confirm results are filtered by exact date match.
4. **Verify date_range filter**: Enter start/end dates, confirm results are filtered with BETWEEN.
5. **Verify multiselect**: Select multiple values, confirm `WHERE IN` is applied.
6. **Verify relation filter**: For a foreign key column with `select` type and no explicit options, confirm the dropdown is populated from the related table and filtering via `whereHas` works.
7. **Verify filter + search + sort combination**: Apply a filter, then search, then sort — confirm all three work together without conflicts.
8. **Verify filter + pagination**: Change page while filter is active, confirm filter persists.

[Implementation Order]
Implement bottom-up: backend data structures → backend query logic → controller wiring → frontend UI → i18n → stubs.

1. **`CrudBaseDataTable.php`**: Add `columnFilters()` method (returns `[]`), `getColumnFilters()`, modify `initializeColumnsDetails()` to attach filter config. Resolve relation options.

2. **`CrudBaseRepository.php`**: Add `$filters` parameter to `paginate()`, implement filter WHERE logic (select, multiselect, date, date_range) with relation-aware whereHas.

3. **`CrudBaseController.php`**: Parse `filters` from request query, pass to `paginate()`, add `column_filters` prop to Inertia response.

4. **`CrudDataTable.vue`**: Add `columnFilters` prop, filter values state, filter row template, filter change emit logic.

5. **`Index.vue`**: Wire `column_filters` prop from backend to `CrudDataTable`, add `onFilter` handler sending filters to backend.

6. **`lang/en/crud.php` + `lang/it/crud.php`**: Add filter placeholder translation keys.

7. **`Stubs/DataTable.stub`**: Add `columnFilters()` stub with usage comments.