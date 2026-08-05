# 04 — Refactor Index.vue: extract composables + rename mystery props

**What to build:** Three composables extracted from `Index.vue`'s 273 lines: `useFlashToasts()` handles flash→toast lifecycle, `useCrudForm()` handles form open/close/create/edit state, `useExport()` handles export start/poll/download with cleanup. Mystery props renamed: `model_lang` → `modelTranslationKey`, `column_data` → `paginatedData`, `columns_details` → `tableColumns`. `Index.vue` shrinks to wiring (~60 lines). All existing behaviour preserved.

**Blocked by:** `01-prefactor-shared-translation-and-styles`

- [ ] `useFlashToasts` composable extracted, flash messages still appear as toasts
- [ ] `useCrudForm` composable extracted, create/edit form flow unchanged
- [ ] `useExport` composable extracted, export start/poll/download still works
- [ ] Props renamed to meaningful names
- [ ] `Index.vue` is under 80 lines of template + wiring