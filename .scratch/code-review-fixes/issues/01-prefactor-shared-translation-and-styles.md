# 01 — Prefactor: Extract shared `useCrudTranslation` composable and shared input styles

**What to build:** A single `useCrudTranslation` composable replaces the 4 duplicated `crudT()` functions in `CrudActions`, `CrudDataTable`, `CrudForm`, and `Index.vue`. A single `inputClasses` constant replaces the 5 duplicated Tailwind class strings in `Input`, `Calendar`, `Select`, `MaskedInput`, and `Textarea`. Both signatures `(key: string)` and `(key: string, replacements?)` are supported. No functional change — pure extraction.

**Blocked by:** None — can start immediately.

- [ ] `useCrudTranslation` composable created, supports both signatures
- [ ] All 4 components refactored to use the composable, old inline functions removed
- [ ] `inputClasses` constant created in `lib/utils.ts`
- [ ] All 5 UI components use the constant, old inline class strings removed
- [ ] `CrudDataTable` and `Index.vue` still correctly use `replacements` parameter