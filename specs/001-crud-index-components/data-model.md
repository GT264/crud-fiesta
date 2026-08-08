# Data Model: Vue CRUD Index Components

**Feature**: 001-crud-index-components | **Date**: 2026-08-08

## Overview

All data flows from Laravel backend → Inertia page props → Vue components. No client-side
data ownership. This document describes the shape of data at each boundary.

## 1. Inertia Page Props (Backend → Frontend)

Provided by `CrudBaseController::index()` to the Inertia render call.

```typescript
interface CrudIndexPageProps {
  column_data: LengthAwarePaginator<Record<string, unknown>>
  columns_details: ColumnDetail[]
  column_filters: Record<string, FilterConfig>
  route_prefix: string
  key_name: string
  model_lang: string
  crud_buttons: CrudButton[]
  optional_buttons: CrudButton[]
  actions_label: string
  lang: string
  pagination_per_page: number
  pagination_per_page_options: number[]
  // Flash messages (from Laravel session)
  flash?: {
    success?: string
    error?: string
  }
}
```

## 2. Core Entities

### ColumnDetail

```typescript
interface ColumnDetail {
  field: string                    // DB column name
  header: string                   // Translated label
  filter_config?: FilterConfig     // Present only if columnFilters() declares this field
  relation?: RelationConfig        // Present if relationDisplayMap() declares this field
}

interface RelationConfig {
  relation: string                 // Eloquent relationship name (e.g., "post")
  display_field: string            // Field to display from related model (e.g., "title")
}
```

### FilterConfig

```typescript
type FilterType = 'select' | 'multiselect' | 'date' | 'date_range'

interface FilterConfig {
  field: string
  type: FilterType
  options?: Array<{ label: string; value: string | number }>  // Only for select/multiselect
}
```

### CrudButton

```typescript
type CrudAction = 'show' | 'edit' | 'destroy'

interface CrudButton {
  action: CrudAction
  icon: string           // Lucide icon name (e.g., 'Eye', 'Pencil', 'Trash2')
  label: string          // Translated button label
  route_name: string     // Full route name (e.g., 'admin.posts.edit')
  event?: string         // Custom event name (e.g., 'edit' triggers drawer)
}
```

### LengthAwarePaginator

```typescript
// Subset of Laravel's LengthAwarePaginator JSON representation
interface LengthAwarePaginator<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
}
```

### PaginationMeta (derived, used by CfDataTable)

```typescript
interface PaginationMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  from: number | null
  to: number | null
}
```

## 3. Component State (URL Query String)

State is read from `URLSearchParams` on mount and written via `router.get()` on every
interaction. These are NOT Vue refs — they derive from `usePage().url` or `window.location`.

```typescript
interface IndexQueryState {
  page?: number                     // ?page=3
  per_page?: number                 // ?per_page=25
  sort_field?: string               // ?sort_field=title
  sort_order?: 1 | -1               // ?sort_order=1 (asc) or -1 (desc)
  search?: string                   // ?search=foo
  filters?: Record<string, FilterValue>  // ?filters[status]=active&filters[role][]=admin
}

type FilterValue = string | number | string[] | { start: string; end: string }
```

## 4. Export State (Local, non-persisted)

```typescript
type ExportStatus = 'idle' | 'queued' | 'processing' | 'completed' | 'failed' | 'timeout'

interface ExportState {
  exportId: string | null
  status: ExportStatus
  format: 'xlsx' | 'csv' | null
  processed: number
  total: number
  error?: string
}
```

## 5. CfForm Props

```typescript
interface FieldConfig {
  field: string
  label: string
  form_type: FormType      // PHP enum value as string
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>  // For SELECT/MULTI_SELECT
}

interface CfFormProps {
  formDetails: Record<string, FieldConfig>
  item?: Record<string, unknown>     // Present for edit, absent for create
  routePrefix: string                // e.g., 'admin.posts'
  action: 'create' | 'edit'
  loading?: boolean
}
```

## 6. Component Hierarchy & Data Flow

```
CrudBaseController::index()
       │
       ▼ Inertia page props
    CfIndex.vue
       │
       ├─ reads URL query string → initial state
       ├─ handles emits ← CfDataTable
       │    │
       │    ▼ router.get(updated-params)
       │    └─ Inertia re-render ─┘
       │
       ├── CfDataTable.vue
       │    ├─ props: data, columnsDetails, pagination, sortField, sortOrder, filters, ...
       │    ├─ emits: sort, filter, pageChange, search, perPageChange, export
       │    ├─ slot #cell-[field] → consumer custom renderer
       │    ├─ slot #filter-[field] → consumer custom filter input
       │    ├─ slot #create-button → consumer custom create button
       │    └── CfActions.vue (per row)
       │         ├─ props: buttons, row, routePrefix, keyName
       │         ├─ slot #button → consumer custom action button
       │         ├─ emits: edit(row-id) → opens drawer
       │         └─ delete: shows AlertDialog → POST destroy → reload index
       │
       ├── Drawer/Modal (v-if editing || creating)
       │    └── CfForm.vue
       │         ├─ props: formDetails, item?, routePrefix, action, loading
       │         └─ emits: submit(data) → POST store/update → reload index
       │
       └── Export polling (useIntervalFn)
```

## 7. State Transitions

### Table Interaction States

```
Idle → (user clicks column header) → Sort state
Sort state → (Inertia request) → Loading (skeleton) → (response) → Idle with new data

Idle → (user changes filter) → Loading (skeleton) → (response) → Idle with filtered data
```

### Export States

```
Idle → (user clicks Export) → Queued → Processing → Completed → Download triggered
                                        ↓
                                      Failed → Toast error
                                      (timeout 5min) → Timeout → Toast error
```

### Toast States

```
Page mount → flash.success → Toast success (3s auto-dismiss)
Page mount → flash.error → Toast error (3s auto-dismiss)
Page mount → no flash → No toast