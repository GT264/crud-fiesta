# 03 — Clean up dead code and no-ops

**What to build:** `onView` in `Index.vue` navigates to the show route instead of silently swallowing the event. Unused `ChevronLeft` and `ChevronRight` icon imports removed from `CrudDataTable`. The empty `plugins/shadcn.ts` plugin is removed entirely and its export in `index.ts` is cleaned up.

**Blocked by:** None — can start immediately.

- [ ] `onView` in `Index.vue` navigates to `/{prefix}/{id}` via Inertia router
- [ ] `ChevronLeft` and `ChevronRight` removed from `CrudDataTable.vue` import
- [ ] `plugins/shadcn.ts` deleted
- [ ] `index.ts` no longer exports `ShadcnPlugin`