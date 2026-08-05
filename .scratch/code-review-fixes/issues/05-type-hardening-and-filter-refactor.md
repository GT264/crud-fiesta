# 05 — Type hardening + filter builder refactor + DropdownMenu key fix

**What to build:** `Record<string, any>` replaced with proper TypeScript interfaces where the shape is predictable. The `buildFilterPayload` logic moves into a standalone function, removing Feature Envy from `CrudDataTable`. `DropdownMenu` uses `item.label` (plus an index suffix for dedup) as key instead of array index. `CrudButton.severity` is either wired up to a visual class on the dropdown item or removed from the interface.

**Blocked by:** `01-prefactor-shared-translation-and-styles`

- [ ] Filter values typed as `Record<string, string | string[] | undefined>`
- [ ] `buildFilterPayload` extracted to a standalone function, no longer a method on the component
- [ ] `DropdownMenu` key uses `item.label` with index-based dedup for duplicates
- [ ] `CrudButton.severity` either used for conditional styling or removed from the interface
- [ ] All other `Record<string, any>` usages replaced with specific types