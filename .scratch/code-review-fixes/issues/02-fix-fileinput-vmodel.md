# 02 — Fix FileInput v-model — broken `update:modelValue` emit

**What to build:** Selecting a file in the `FileInput` component updates the bound form value. A `watch` on `selectedFile` emits `update:modelValue` with the chosen `File` object; clicking the Remove button resets and emits `null`. The parent `CrudForm` receives the file correctly for both `file` and `image` field types.

**Blocked by:** None — can start immediately.

- [ ] `watch(selectedFile, ...)` emits `update:modelValue` with `File | null`
- [ ] Remove button emits `null` after calling `reset()`
- [ ] Selected file name is displayed on the trigger button
- [ ] Accept prop `image/*` vs `*/*` correctly filters file dialog and updates label