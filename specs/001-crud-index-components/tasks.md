# Tasks: Vue CRUD Index Components

**Input**: Design documents from `/specs/001-crud-index-components/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not requested in feature specification — test tasks excluded.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependencies, and TypeScript foundation

- [ ] T001 Install npm dependencies: `npm install @tanstack/vue-table vue-sonner` and verify in package.json
- [ ] T002 [P] Create directory structure: `src/resources/js/Components/Crud/` and `src/resources/js/Components/Crud/utils/`
- [ ] T003 [P] Create TypeScript interface file `src/resources/js/types/crud-fiesta.ts` with all shared types from `specs/001-crud-index-components/contracts/CfIndex-props.ts` (LengthAwarePaginator, ColumnDetail, FilterConfig, FilterType, CrudButton, CrudAction, CrudIndexPageProps)
- [ ] T004 [P] Create TypeScript interface file `src/resources/js/types/cf-data-table.ts` with CfDataTableProps, CfDataTableEmits, PaginationMeta from `specs/001-crud-index-components/contracts/CfDataTable.ts`
- [ ] T005 [P] Create TypeScript interface file `src/resources/js/types/cf-actions.ts` with CfActionsProps, CfActionsEmits from `specs/001-crud-index-components/contracts/CfActions.ts`
- [ ] T006 [P] Create TypeScript interface file `src/resources/js/types/cf-form.ts` with CfFormProps, CfFormEmits, FieldConfig from `specs/001-crud-index-components/contracts/CfForm.ts`
- [ ] T007 [P] Create TypeScript interface file `src/resources/js/types/use-crud-fiesta.ts` with UseCrudFiestaReturn from `specs/001-crud-index-components/contracts/useCrudFiesta.ts`

**Checkpoint**: Dependencies installed, directory structure created, all TypeScript types defined.

---

## Phase 2: Foundational (Composable)

**Purpose**: Shared composable used by ALL components. MUST complete before any component work.

**⚠️ CRITICAL**: No component work can begin until this phase is complete.

- [ ] T008 Implement `useCrudFiesta` composable in `src/resources/js/Components/Crud/utils/useCrudFiesta.ts`. Implement: `buildRoute()` (wraps Ziggy `route()`), `formatColumnValue()` (resolves relation display fields), `getSortIcon()` (returns 'ArrowUp'/'ArrowDown'/null), `getNextSortOrder()` (toggle cycle: null→asc→desc→null). Use `<script setup lang="ts">` compatible export (plain function, no SFC needed).

**Checkpoint**: Composable ready — all components can now use shared helpers.

---

## Phase 3: User Story 1 + 2 — Tabella dati con Paginazione e Ordinamento (Priority: P1) 🎯 MVP

**Goal**: Developer sees a paginated, sortable data table for any CRUD resource. Clicking column headers toggles sort (asc→desc→none). Changing page/per_page reloads via Inertia. URL always reflects state.

**Independent Test**: Open `route_prefix.index` → table renders with data, paginator works, click header → sort toggles, URL has `sort_field`/`sort_order`, page change updates `?page=`.

### Implementation

- [ ] T009 [P] [US1] Implement `CfActions.vue` in `src/resources/js/Components/Crud/CfActions.vue`. Props: buttons, row, routePrefix, keyName. Renders: Eye (Link to show), Pencil (emits 'edit'), Trash2 (emits 'delete'). Include slot `#button` for custom button rendering. Use shadcn-vue `Button` component. Use `useCrudFiesta` for `buildRoute()`.
- [ ] T010 [P] [US1] Implement `CfDataTable.vue` skeleton in `src/resources/js/Components/Crud/CfDataTable.vue` with TanStack Table setup: accept all props per contract (`columnsDetails`, `data`, `sortField`, `sortOrder`, `filters`, `columnFilters`, `pagination`, `perPage`, `perPageOptions`, `routePrefix`, `keyName`, `crudButtons`, `actionsLabel`). Configure TanStack with `manualSorting: true, manualPagination: true`. Define columns from `columnsDetails`: header renders clickable header (emits `sort`), cell renders using `useCrudFiesta.formatColumnValue()`. Render paginator with prev/next/page buttons + per-page Select.
- [ ] T011 [US1] Add skeleton loading to `CfDataTable.vue`: when `loading` prop is true, show animated skeleton rows (shadcn-vue `Skeleton` component) matching table column count. Hide skeleton when `data` arrives.
- [ ] T012 [US1] Add empty state to `CfDataTable.vue`: when `data` is empty and not loading, render `#empty` slot content or default "No records" message.
- [ ] T013 [US1] Integrate `CfActions` into `CfDataTable.vue`: add actions column at end, render `CfActions` per row with `crudButtons` prop. Expose `#actions` slot as alternative.
- [ ] T014 [US2] Add sort toggle logic in `CfDataTable.vue`: clicking a column header calls `getNextSortOrder()` from composable, emits `sort(field)` with toggle semantics. Show sort icon via `getSortIcon()` using `lucide-vue-next` `ArrowUp`/`ArrowDown` icons in header cells.
- [ ] T015 [P] [US1] Implement `CfIndex.vue` in `src/resources/js/Components/Crud/CfIndex.vue`. Accept all Inertia page props per `CrudIndexPageProps`. Read initial state from URL query string: `page`, `per_page`, `sort_field`, `sort_order`, `search`, `filters`. Pass derived state as props to `CfDataTable`.
- [ ] T016 [US1] Implement state synchronization in `CfIndex.vue`: handle all `CfDataTable` emits. On `sort(field)`: compute next sort order, call `router.get(url, {}, { preserveState: true, preserveScroll: true })` with updated `sort_field`+`sort_order` params. On `pageChange(page)`: same with `?page=N`. On `perPageChange(perPage)`: same with `?per_page=N&page=1`.
- [ ] T017 [P] [US1] Add "Create" button to `CfDataTable.vue` toolbar via `#create-button` slot default: a shadcn-vue `Button` Link (Inertia `<Link>`) to `route(routePrefix + '.create')`. Consumer can override via slot.
- [ ] T018 [P] [US1] Add search input to `CfDataTable.vue` toolbar: shadcn-vue `Input` with search icon. Debounce input (300ms via `@vueuse/core` `useDebounceFn`) then emit `search(term)`. Read initial value from `searchValue` prop.
- [ ] T019 [P] [US1] Expose slots in `CfDataTable.vue`: `#header-[field]`, `#cell-[field]`, `#filter-[field]`, `#toolbar-prepend`, `#toolbar-append`, `#create-button`.
- [ ] T020 [US1] Wire search in `CfIndex.vue`: handle `search(term)` emit → `router.get()` with `?search=TERM`.

**Checkpoint**: Fully functional paginated, sortable, searchable data table with action buttons. URL always reflects state. MVP achieved.

---

## Phase 4: User Story 3 — Filtri per Colonna (Priority: P2)

**Goal**: User can filter table by column-specific filters (select, multiselect, date, date_range). Active filters shown as removable badges. "Cancel all filters" button.

**Independent Test**: Select a filter value → table reloads with filtered data, URL has `?filters[col]=value`, badge appears. Click X on badge → filter removed. "Clear all" → all filters gone.

### Implementation

- [ ] T021 [P] [US3] Add filter UI to `CfDataTable.vue`: below the toolbar, render filter inputs per column that has `filter_config`. Select/multiselect → shadcn-vue `Select` component with `options` from `columnFilters`. Date → `<input type="date">`. Date range → two date inputs (start/end). Each element wrapped in shadcn-vue `Popover` triggered from column header filter icon. Emit `filter(field, value)` on change.
- [ ] T022 [US3] Add active filter badges to `CfDataTable.vue`: above table, show shadcn-vue `Badge` per active filter with label "Header: Value". Each badge has X button to remove (emits `filter(field, null)`). "Clear all" link resets all (emits `clearFilters()`).
- [ ] T023 [US3] Wire filters in `CfIndex.vue`: handle `filter(field, value)` → update `filters[field]` in query params → `router.get()`. Handle `clearFilters()` → remove `filters` param entirely. Read initial filters from URL for badge display.

**Checkpoint**: Column-level filtering functional with select/multiselect/date/date_range types. Badges and clear-all work.

---

## Phase 5: User Story 4 — Export Dati (Priority: P2)

**Goal**: User clicks Export dropdown (XLSX/CSV), system polls export status, auto-downloads when complete. Export respects current filters/sort.

**Independent Test**: Click Export → XLSX → POST to `exportStart`, polling runs, download triggers on complete, error toast on failure.

### Implementation

- [ ] T024 [P] [US4] Add Export dropdown to `CfDataTable.vue` toolbar: shadcn-vue `DropdownMenu` with "XLSX" and "CSV" options. Emit `export(format: 'xlsx' | 'csv')` on selection.
- [ ] T025 [US4] Implement export flow in `CfIndex.vue`: on `export(format)` emit, POST to `route(routePrefix + '.exportStart', { format, search, sort_field, sort_order, filters })`. Receive `{ export_id }` in response. Start polling `route(routePrefix + '.exportStatus', { id: export_id })` every 2s using `@vueuse/core` `useIntervalFn`.
- [ ] T026 [US4] Implement export polling in `CfIndex.vue`: status `queued`/`processing` → show progress (processed/total). Status `completed` → stop polling, trigger download via `window.open()` or hidden `<a>` to `route(routePrefix + '.exportDownload', { id: export_id })`. Status `failed` → stop polling, toast error. Timeout after 5 minutes → stop polling, toast timeout error.

**Checkpoint**: Export with dropdown, async polling, auto-download, error handling.

---

## Phase 6: User Story 5 — Toast Feedback (Priority: P3)

**Goal**: After CRUD actions (create/update/delete), user sees success/error toast. Toaster placement is consumer responsibility.

**Independent Test**: Redirect with `flash.success` → green toast. Redirect with `flash.error` → red toast. Direct visit → no toast.

### Implementation

- [ ] T027 [US5] Implement toast integration in `CfIndex.vue`: import `toast` from `vue-sonner`. Watch `usePage().props.flash` with `{ immediate: true }`. If `flash.success`, call `toast.success(flash.success)`. If `flash.error`, call `toast.error(flash.error)`. Do NOT render `<Toaster />` — document that consumer must place it in layout-fiesta.

**Checkpoint**: Toast notifications working for success/error flash messages.

---

## Phase 7: User Story 6 — Personalizzazione Slot + CfForm (Priority: P3)

**Goal**: Consumer can customize column cell renderers, filter inputs, and action buttons via slots. Create/Edit drawer opens with dynamic CfForm.

**Independent Test**: Pass `#cell-title` slot → custom renderer used. Click Edit → drawer opens, CfForm loads data from `edit/{id}` API. Submit form → table reloads + toast.

### Implementation

- [ ] T028 [P] [US6] Verify all slots in `CfDataTable.vue` are properly scoped: `#cell-[field]` passes `{ row, column, value }`, `#header-[field]` passes `{ column }`, `#filter-[field]` passes `{ filterConfig, currentValue }`.
- [ ] T029 [P] [US6] Implement `CfForm.vue` in `src/resources/js/Components/Crud/CfForm.vue`. Props: formDetails, item?, routePrefix, action, loading. Render each field based on `form_type`: TEXT/EMAIL/NUMBER/URL → shadcn-vue `Input`; TEXTAREA → shadcn-vue `Textarea`; SELECT → shadcn-vue `Select` with options; DATE/DATETIME → native `<input type="date">`; CHECKBOX → shadcn-vue `Checkbox`. Each field uses shadcn-vue `FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage` pattern. Pre-fill values from `item` prop for edit mode. Emit `submit(data)` with form data, `cancel()`.
- [ ] T030 [US6] Add Create/Edit drawer to `CfIndex.vue`: shadcn-vue `Sheet` (drawer) component. On "Create" button click: fetch `route(routePrefix + '.create')` → get `form_details` JSON → open drawer with `CfForm` (action='create'). On `CfActions` edit emit: fetch `route(routePrefix + '.edit', { id })` → get `{ item, form_details }` JSON → open drawer with `CfForm` (action='edit', item).
- [ ] T031 [US6] Wire CfForm submit in `CfIndex.vue`: on `submit(data)` emit, close drawer, send POST to `route(routePrefix + '.store', data)` or PUT to `route(routePrefix + '.update', { id }, data)` via Inertia form submit or `router.post()`/`router.put()`. On success: table reloads via Inertia re-render (flash success triggers toast). On validation error: display errors in CfForm.
- [ ] T032 [P] [US6] Add Delete confirm dialog to `CfIndex.vue`: handle `CfActions` delete emit → show shadcn-vue `AlertDialog` with "Are you sure?" message. On confirm: submit DELETE to `route(routePrefix + '.destroy', { id })` via Inertia form. On success: table reloads, toast.

**Checkpoint**: All customization slots working. Create/Edit/Delete flows with CfForm in drawer, with toast feedback.

---

## Phase 8: Polish & Registry

**Purpose**: Registry items, entry point, build verification

- [ ] T033 [P] Create registry item `registry/r/cf-utils.json` for `useCrudFiesta` composable. No registryDependencies. Declare npm dependencies: `vue`, `ziggy-js`, `lucide-vue-next`.
- [ ] T034 [P] Create registry item `registry/r/cf-actions.json` for `CfActions.vue`. Registry dependencies: `cf-utils`. Shadcn dependencies: `Button`. Npm: `vue`, `@inertiajs/vue3`.
- [ ] T035 [P] Create registry item `registry/r/cf-data-table.json` for `CfDataTable.vue`. Registry dependencies: `cf-actions`, `cf-utils`. Shadcn dependencies: `Table`, `Button`, `Select`, `Input`, `Badge`, `Dialog`, `DropdownMenu`, `Skeleton`. Npm: `vue`, `@inertiajs/vue3`, `@tanstack/vue-table`, `@vueuse/core`, `lucide-vue-next`.
- [ ] T036 [P] Create registry item `registry/r/cf-form.json` for `CfForm.vue`. Registry dependencies: `cf-utils`, `cf-file-input`, `cf-rich-text-input`, `cf-masked-input`. Shadcn dependencies: `Button`, `Input`, `Select`, `Textarea`, `Checkbox`, `Form`. Npm: `vue`.
- [ ] T037 [P] Create registry item `registry/r/cf-index.json` for `CfIndex.vue`. Registry dependencies: `cf-data-table`, `cf-actions`, `cf-form`. Shadcn dependencies: `Button`, `Card`, `Sheet`, `AlertDialog`. Npm: `vue`, `@inertiajs/vue3`, `@vueuse/core`, `vue-sonner`, `ziggy-js`, `lucide-vue-next`.
- [ ] T038 Update `registry.json`: verify all items listed in dependency order: cf-utils, cf-actions, cf-data-table, cf-form, cf-index.
- [ ] T039 [P] Update library entry point `src/resources/js/index.ts`: export all components (`CfIndex`, `CfDataTable`, `CfActions`, `CfForm`) and composable (`useCrudFiesta`). Export TypeScript types.
- [ ] T040 Run `npm run build` to produce compiled assets in `dist/`. Verify no `emptyOutDir: true` in vite.config.ts.
- [ ] T041 [P] Run `vue-tsc --noEmit` to verify TypeScript compilation. Fix any type errors.
- [ ] T042 Run quickstart.md validation scenarios manually in a consumer project.

**Checkpoint**: Package fully built, registry complete, build verified, TypeScript passes.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all components
- **US1+US2 MVP (Phase 3)**: Depends on Phase 2 — Core table with pagination, sorting, actions
- **US3 Filters (Phase 4)**: Depends on Phase 3 (adds to CfDataTable filters)
- **US4 Export (Phase 5)**: Depends on Phase 3 (adds to CfIndex export flow)
- **US5 Toasts (Phase 6)**: Depends on Phase 3 (adds to CfIndex toast watch)
- **US6 Slot + Form (Phase 7)**: Depends on Phase 3 (adds CfForm, drawer, slots)
- **Polish (Phase 8)**: Depends on all desired stories being complete

### User Story Dependencies

- **US1+US2 (P1)**: Starts after Phase 2 — No dependencies on other stories
- **US3 (P2)**: Starts after Phase 3 — Adds filter inputs to CfDataTable
- **US4 (P2)**: Starts after Phase 3 — Adds export dropdown + polling to CfIndex
- **US5 (P3)**: Starts after Phase 3 — Adds toast watch to CfIndex
- **US6 (P3)**: Starts after Phase 3 — Adds CfForm + drawer + slots

### Within Each Phase

- Types before components
- useCrudFiesta before any component
- CfActions is [P] with CfDataTable skeleton (different files)
- CfIndex depends on CfDataTable + CfActions being complete
- CfForm is independent of other components
- Registry items depend on all component files existing

### Parallel Opportunities

- **Phase 1**: T002-T007 all [P] (different files)
- **Phase 3**: T009, T010, T015, T017-T019 all [P] (different files). T011-T014, T016, T020 sequential within the phase
- **Phase 8**: T033-T037, T039, T041 all [P]

---

## Parallel Example: Phase 3

```bash
# Launch all [P] tasks together:
Task: "Implement CfActions.vue"
Task: "Implement CfDataTable.vue skeleton with TanStack Table"
Task: "Implement CfIndex.vue accepting Inertia page props"
Task: "Add Create button to CfDataTable toolbar"
Task: "Add search input to CfDataTable toolbar"
Task: "Expose slots in CfDataTable.vue"

# Then sequential:
Task: "Add skeleton loading"
Task: "Add empty state"
Task: "Integrate CfActions into CfDataTable"
Task: "Add sort toggle logic" (US2)
Task: "Implement state synchronization in CfIndex"
Task: "Wire search in CfIndex"
```

---

## Implementation Strategy

### MVP First (US1 + US2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (useCrudFiesta)
3. Complete Phase 3: US1 + US2 (core table + pagination + sorting + actions)
4. **STOP and VALIDATE**: Open index page, verify table renders, sort works, pagination works, URL sync works
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1+US2 → Test independently → MVP: paginated sortable data table
3. Add US3 → Test independently → Filters with badges
4. Add US4 → Test independently → Export with polling
5. Add US5 → Test independently → Toast notifications
6. Add US6 + CfForm → Test independently → Create/Edit drawers, slot customization
7. Polish → Registry + build + validation

### Parallel Team Strategy

With multiple developers:
1. Team completes Phase 1 + 2 together
2. Once Phase 2 is done:
   - Dev A: Phase 3 (core table — CfDataTable + CfActions)
   - Dev B: Phase 3 (orchestrator — CfIndex)
3. Once Phase 3 is done:
   - Dev A: Phase 4 (filters) + Phase 5 (export)
   - Dev B: Phase 7 (CfForm + drawers) + Phase 6 (toasts)
4. Phase 8 (registry + build) together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All components use `<script setup lang="ts">` (Constitution Principle I)
- No hardcoded Tailwind colors/spacing — use shadcn-vue tokens only (Constitution Principle VII)
- All state changes go through `router.get()` with `preserveState: true, preserveScroll: true` (Constitution Principle VII)
- Package does NOT render `<Toaster />` (Constitution Principle VII)