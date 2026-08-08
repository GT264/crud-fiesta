# Research: Vue CRUD Index Components

**Feature**: 001-crud-index-components | **Date**: 2026-08-08

## 1. TanStack Table with Server-Side State (Inertia)

**Decision**: Use `@tanstack/vue-table` for column definition and rendering, but DISABLE
all client-side sorting/filtering/pagination features. The table is a pure presentational
layer — it receives `data` from Inertia props and emits events on user interaction.

**Rationale**: Principle VII mandates server-side state. TanStack Table's built-in
`manualSorting`, `manualFiltering`, `manualPagination` options are designed for exactly
this pattern. The table receives:
- `data`: raw row array from `column_data.data`
- `pageCount`: from `column_data.last_page`
- `sorting`: `[{id: sortField, desc: sortOrder === 'desc'}]`
- `manualSorting: true`, `manualPagination: true`

Emitted events map to Inertia `router.get()` calls with updated query params.

**Alternatives considered**:
- Custom table without TanStack: rejected — TanStack provides accessibility (ARIA
  roles), keyboard nav, and column resizing for free.
- Client-side state with local data: rejected — violates Principle VII.

## 2. Toast Integration (vue-sonner)

**Decision**: Use `vue-sonner`'s `toast()` function imperatively, called from `CfIndex`
on mount and on each Inertia page update (via `usePage().props.flash`). The package
does NOT render `<Toaster />` — that's the consumer's job.

**Rationale**: `vue-sonner` is the standard toast library for shadcn-vue projects.
Imperative `toast.success()` / `toast.error()` calls require no additional DOM elements
in package components. The consumer places `<Toaster />` once in `layout-fiesta`.

**Pattern**:
```ts
watch(() => usePage().props.flash, (flash) => {
  if (flash?.success) toast.success(flash.success)
  if (flash?.error) toast.error(flash.error)
}, { immediate: true })
```

**Alternatives considered**:
- `@vueuse/core` `useToast`: rejected — not available in `@vueuse/core` as a toast solution.
- Custom toast component: rejected — duplication of well-solved problem.

## 3. Dynamic Form Rendering from Backend FormType

**Decision**: `CfForm` receives `form_details: Record<string, FieldConfig>` and renders
each field based on its `form_type` property. The FormType enum from PHP maps to Vue
component types:

| PHP FormType | Vue Renderer |
|-------------|-------------|
| `TEXT`, `EMAIL`, `NUMBER`, `URL` | `<Input>` (shadcn-vue) |
| `TEXTAREA` | `<Textarea>` (shadcn-vue) |
| `SELECT` | `<Select>` (shadcn-vue) |
| `MULTI_SELECT` | Multi-select with checkboxes |
| `DATE`, `DATETIME` | `<input type="date">` or `<input type="datetime-local">` |
| `IMAGE`, `FILE` | `<CfFileInput>` (existing crud-fiesta component) |
| `RICHTEXT` | `<CfRichTextInput>` (existing crud-fiesta component, TipTap) |
| `PASSWORD` | `<Input type="password">` |

**Rationale**: The backend already defines field types in `CrudBaseDataTable` subclasses
(create/edit form details). `CfForm` reads this configuration and renders without the
consumer writing form markup.

**Alternatives considered**:
- Consumer builds form manually via slots: rejected — defeats "batteries included" value.
- Form via JSON schema (ajv): rejected — overengineered for CRUD forms.

## 4. Export Polling Pattern

**Decision**: Use `useIntervalFn` from `@vueuse/core` to poll `exportStatus/{id}` every
2 seconds after `exportStart` returns an `export_id`. On `status: completed`, trigger
download via a hidden `<a>` tag pointing to `exportDownload/{id}`.

**Rationale**: The backend already implements `exportStart` (POST), `exportStatus` (GET),
`exportDownload` (GET). Frontend only needs to wire polling + auto-download. Using
`@vueuse/core`'s `useIntervalFn` avoids manual `setInterval` cleanup.

**Polling lifecycle**:
1. POST `exportStart` → receives `{export_id: "uuid"}`
2. Start polling GET `exportStatus/uuid` every 2s
3. Status `processing`: update progress bar (processed/total)
4. Status `completed`: stop polling, trigger download
5. Status `failed`: stop polling, toast error
6. Timeout after 5 minutes: stop polling, toast timeout

## 5. shadcn-vue Registry Schema (v3)

**Decision**: Each component gets a registry JSON item in `registry/r/` following the schema
at `https://shadcn-vue.com/schema/registry-item.json`. Dependencies resolved via:
- Local `cf-*` items: raw GitHub URLs (e.g., `https://raw.githubusercontent.com/GT264/crud-fiesta/refs/heads/master/registry/r/cf-utils.json`)
- shadcn-vue primitives: name string (e.g., `Button`, `Table`)
- npm packages: `dependencies` array

**Ordering constraint**: `registry.json` lists items in dependency order (leaf first).

**Planned registry items**:
1. `cf-utils.json` — composable, no deps
2. `cf-actions.json` — `Button` (shadcn), `cf-utils`
3. `cf-data-table.json` — `Table`, `Button`, `Select`, `Input`, `Badge`, `AlertDialog`, `DropdownMenu` (shadcn), `cf-actions`, `cf-utils`
4. `cf-form.json` — `Button`, `Input`, `Select`, `Textarea`, `Checkbox` (shadcn), `cf-utils`, `cf-file-input`, `cf-rich-text-input`, `cf-masked-input`
5. `cf-index.json` — `Card`, `Button` (shadcn), `cf-data-table`, `cf-actions`, `cf-form`

## 6. Component State Synchronization Pattern

**Decision**: `CfIndex` reads initial state from URL query string on mount, passes it as
props to `CfDataTable`, and handles all `CfDataTable` emits by calling `router.get()` with
updated query params.

**Query string → state mapping**:

| URL Param | State | Emit Event |
|-----------|-------|-----------|
| `?page=n` | Current page | `pageChange(n)` |
| `?per_page=n` | Rows per page | `perPageChange(n)` |
| `?sort_field=f&sort_order=1` | Sort column + direction | `sort(field)` |
| `?filters[col]=val` | Active filters | `filter(col, val)` |
| `?search=term` | Global search | `search(term)` |

**Key implementation detail**: `preserveState: true` is essential — without it, Inertia
would reset page props to undefined during the request, causing a flash of empty state.

**Rationale**: Direct `router.get()` with query params is the Inertia-recommended pattern
for server-side datatables. It keeps the URL always in sync with visible data.

**Alternatives considered**:
- `router.reload({ data: {...} })`: rejected — doesn't allow changing URL query params.
- `axios` calls bypassing Inertia: rejected — breaks the Inertia page props contract.