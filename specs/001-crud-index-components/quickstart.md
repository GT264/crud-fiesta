# Quickstart: Vue CRUD Index Components

**Feature**: 001-crud-index-components | **Date**: 2026-08-08

## Prerequisites

- Laravel 13 application with crud-fiesta installed
- A generated CRUD resource (e.g., `php artisan crud-fiesta:generate Post`)
- `@tanstack/vue-table` installed: `npm install @tanstack/vue-table`
- `vue-sonner` available in consumer project (positioned in layout-fiesta)
- Tailwind CSS v4 + shadcn-vue configured in consumer project

## Validation Scenarios

### 1. Basic Table Rendering

**Setup**: Ensure the generated resource has 25+ records in the database.

**Navigate**: Open `http://your-app.test/admin/posts` (or configured route prefix).

**Expected**:
- Table renders with columns matching `DataTable::default_columns`
- Shows 10 rows per page
- URL: `?page=1&per_page=10`
- Paginator: "Page 1 of 3", Next/Previous controls
- Headers match translated labels from `lang/` files

### 2. Sorting

**Action**: Click any column header.

**Expected**:
- 1st click: ascending (`?sort_field=NAME&sort_order=1`), ↑ icon
- 2nd click: descending (`?sort_order=-1`), ↓ icon
- 3rd click: sort removed, no params, no icon
- Scroll position preserved

### 3. Filtering

**Setup**: Add `columnFilters()` to the DataTable subclass.

**Action**: Select a value from a filter dropdown.

**Expected**: Table reloads with filtered data, URL: `?filters[field]=value`, removable badge appears above table.

**Action**: Click "Cancella tutti i filtri".

**Expected**: All filters removed, URL returns to base state.

### 4. Global Search

**Action**: Type in the search input in the toolbar.

**Expected**: URL → `?search=TERM`, table reloads with matches.

### 5. Pagination

**Action**: Click Next page, then change "Per page" to 25.

**Expected**: Page 2 → `?page=2&per_page=10`. Per page 25 → `?page=1&per_page=25`.

### 6. Export

**Action**: Click Export → XLSX.

**Expected**: Progress indicator (queued → processing → completed), browser downloads `.xlsx`. Only current filtered/sorted rows exported.

### 7. Create (Drawer)

**Action**: Click toolbar "Create" button.

**Expected**: Drawer opens, form renders with fields from `creationFormDetails()`. Submit → drawer closes, table reloads, green toast.

### 8. Edit (Drawer)

**Action**: Click Edit (Pencil) icon on a row.

**Expected**: Drawer opens, API call fetches `edit/{id}` (JSON), form pre-filled. Save → drawer closes, table reloads, green toast.

### 9. Delete (Confirm Dialog)

**Action**: Click Delete (Trash) icon.

**Expected**: AlertDialog appears. Cancel → nothing. Confirm → DELETE request, table reloads without row, green toast.

### 10. Custom Slots

**Action**: Add `#cell-title="{ row }"` slot with custom markup.

**Expected**: Only "title" column uses custom renderer.

### 11. Skeleton Loading

**Action**: Apply filter on slow connection (throttle via DevTools).

**Expected**: Animated skeleton rows during Inertia request, replaced with data on response.