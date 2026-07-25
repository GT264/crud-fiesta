# Implementation Plan

[Overview]
Migrate ALL PrimeVue components and dependencies to shadcn-vue equivalents, including backend type constants, the plugin system, and every Vue component in the package.

This migration replaces the PrimeVue UI library with shadcn-vue across the entire crud-fiesta Laravel/Vue/Inertia package. The package ships four Vue components (`CrudDataTable`, `CrudForm`, `CrudActions`, `Index.vue`) plus a plugin system that registers PrimeVue globally. The backend PHP layer also couples to PrimeVue: `FormType.php` maps PHP constants to PrimeVue component names, `Install.php` instructs consumers to install PrimeVue packages, and `vite.config.ts` marks PrimeVue as external for the library build. Every layer must be updated to decouple from PrimeVue and adopt shadcn-vue patterns. Additionally, several PrimeVue components (Rich Text Editor, FileUpload, InputMask, Rating) have no direct shadcn-vue equivalent — these are replaced with tiptap (for Editor), VueUse `useFileDialog` (for FileUpload), and Maska via `v-maska` directive (for InputMask). The Rating component is removed as shadcn-vue lacks an equivalent. shadcn-vue components are not imported as a library but installed as source files into the project, so the package will vendor the relevant shadcn-vue component source files under `src/resources/js/Components/ui/`.

[Types]
Refactor PHP `FormType` constants to generic names and update all TypeScript interfaces referencing form field types.

### PHP: `src/Helpers/FormType.php`
Replace every constant with a generic, UI-library-agnostic name:

| Old Constant | Old Value | New Constant | New Value |
|---|---|---|---|
| `TEXT` | `'InputText'` | `TEXT` | `'text'` |
| `TEXTAREA` | `'InputTextarea'` | `TEXTAREA` | `'textarea'` |
| `NUMBER` | `'InputNumber'` | `NUMBER` | `'number'` |
| `CALENDAR` | `'Calendar'` | `DATE` | `'date'` |
| `CHECKBOX` | `'Checkbox'` | `CHECKBOX` | `'checkbox'` |
| `DROPDOWN` | `'Dropdown'` | `SELECT` | `'select'` |
| `MULTI_SELECT` | `'MultiSelect'` | `MULTI_SELECT` | `'multi_select'` |
| `PASSWORD` | `'Password'` | `PASSWORD` | `'password'` |
| `RATING` | `'Rating'` | *(removed)* | *(removed)* |
| `MASK` | `'InputMask'` | `MASK` | `'mask'` |
| `EDITOR` | `'Editor'` | `RICH_TEXT` | `'rich_text'` |
| `IMAGE` | `'Image'` | `IMAGE` | `'image'` |
| `FILE` | `'File'` | `FILE` | `'file'` |
| `EMAIL` | `'email'` | `EMAIL` | `'email'` *(unchanged)* |

### TypeScript: `src/resources/js/Components/Crud/CrudForm.vue`
The `FieldConfig.type` property (currently matching PrimeVue component names like `'InputText'`, `'Calendar'`) now expects the new generic values (`'text'`, `'date'`, etc.). All `v-if` branches in the template are updated to match these new type strings.

[Files]
Create new shadcn-vue component source files, modify all existing Vue components, update PHP backend files, and update build/config files.

### New Files to Create

| File | Purpose |
|---|---|
| `src/resources/js/Components/ui/Button.vue` | shadcn-vue Button component source |
| `src/resources/js/Components/ui/Input.vue` | shadcn-vue Input component source |
| `src/resources/js/Components/ui/Textarea.vue` | shadcn-vue Textarea component source |
| `src/resources/js/Components/ui/Checkbox.vue` | shadcn-vue Checkbox component source |
| `src/resources/js/Components/ui/Select.vue` | shadcn-vue Select (with SelectContent, SelectItem, SelectTrigger, SelectValue) |
| `src/resources/js/Components/ui/Table.vue` | shadcn-vue Table (with TableBody, TableCell, TableHead, TableHeader, TableRow) |
| `src/resources/js/Components/ui/Dialog.vue` | shadcn-vue Dialog (with DialogContent, DialogHeader, DialogTitle, DialogFooter) |
| `src/resources/js/Components/ui/DropdownMenu.vue` | shadcn-vue DropdownMenu (with DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem) |
| `src/resources/js/Components/ui/Calendar.vue` | shadcn-vue Calendar / DatePicker component |
| `src/resources/js/Components/ui/Toast.vue` | shadcn-vue Toast/Sonner component |
| `src/resources/js/Components/ui/Badge.vue` | shadcn-vue Badge (utility for table badges) |
| `src/resources/js/Components/ui/button.ts` | shadcn-vue Button composition (cva) |
| `src/resources/js/lib/utils.ts` | Utility `cn()` helper used by all shadcn-vue components |
| `src/resources/js/plugins/shadcn.ts` | New plugin that registers global CSS and sets up Toast provider (replaces `primevue.ts`) |
| `src/resources/js/Components/Crud/inputs/RichTextInput.vue` | Wrapper component using tiptap editor |
| `src/resources/js/Components/Crud/inputs/FileInput.vue` | Wrapper component using VueUse `useFileDialog` |
| `src/resources/js/Components/Crud/inputs/MaskedInput.vue` | Wrapper component using Maska `v-maska` directive |

### Existing Files to Modify

| File | Changes |
|---|---|
| `src/resources/js/Components/Crud/CrudDataTable.vue` | Replace DataTable, Column, InputText with shadcn-vue Table + Input; rewrite template and script; replace PrimeIcons with lucide-vue-next icons or inline SVG |
| `src/resources/js/Components/Crud/CrudForm.vue` | Replace all 14+ PrimeVue component imports with shadcn-vue equivalents + new wrapper components (RichTextInput, FileInput, MaskedInput); update type matching logic to generic names; remove Rating block |
| `src/resources/js/Components/Crud/CrudActions.vue` | Replace Button, Dialog, Menu with shadcn-vue Button, Dialog, DropdownMenu; replace PrimeIcons with lucide-vue-next |
| `src/resources/js/Pages/Index.vue` | Replace Button, Toast, useToast with shadcn-vue Button + Toast/Sonner |
| `src/resources/js/plugins/primevue.ts` | Delete file (replaced by `shadcn.ts`) |
| `src/resources/js/index.ts` | Change export from `PrimeVuePlugin` to `ShadcnPlugin` (imported from `./plugins/shadcn`) |
| `src/resources/js/plugins/crudFiesta.ts` | No logical changes needed (registers Vue components, not PrimeVue-specific), but any imports from primevue removed |
| `src/Helpers/FormType.php` | Rename all constants to generic values per the [Types] section |
| `src/Console/Commands/Install.php` | Update install instructions: replace `primevue`, `@primevue/themes`, `primeicons` with `shadcn-vue`, `lucide-vue-next`, `tiptap-vue-3`, `@vueuse/core`, `maska`; update import instructions for `ShadcnPlugin` |
| `config/crud-fiesta.php` | No changes needed (no PrimeVue references) |
| `src/resources/js/env.d.ts` | Add type declarations for new libraries (e.g., `maska`, `tiptap`) if needed |
| `package.json` | Remove `primevue`, `@primeuix/themes`, `primeicons` (peer+dev); add `shadcn-vue` or radix-vue primitives, `lucide-vue-next`, `@tiptap/vue-3`, `@tiptap/starter-kit`, `@vueuse/core`, `maska`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate` |
| `vite.config.ts` | Change `external` array: remove `primevue`, `primeicons`, add `shadcn-vue` equivalents or radix-vue; add `@vueuse/core` |
| `specs/002-actions-dropdown/spec.md` | Update references from PrimeVue `Menu` to shadcn-vue `DropdownMenu` |

### Files to Delete

| File | Reason |
|---|---|
| `src/resources/js/plugins/primevue.ts` | Replaced by `src/resources/js/plugins/shadcn.ts` |

[Functions]
Add new composable/utility functions, modify existing event handlers to match shadcn-vue APIs, and remove PrimeVue-specific function calls.

### New Functions

| Function | File | Signature | Purpose |
|---|---|---|---|
| `cn` | `src/resources/js/lib/utils.ts` | `(...inputs: ClassValue[]) => string` | Tailwind class merging utility using clsx + tailwind-merge (required by all shadcn-vue components) |
| `useFileDialogWrapper` | `src/resources/js/Components/Crud/inputs/FileInput.vue` | Composable embedded in SFC | Wraps VueUse `useFileDialog` for file/image upload in forms |

### Modified Functions

| Function | File | Changes |
|---|---|---|
| `crudT` (local helper) | `CrudDataTable.vue`, `CrudActions.vue`, `Index.vue` | No signature change; function stays identical |
| `onPage` | `CrudDataTable.vue` | Parameter signature changes: PrimeVue DataTable emits `{page, rows}` with 0-based page; shadcn-vue Table pagination may use different event shape — adapt accordingly |
| `onSort` | `CrudDataTable.vue` | Parameter signature changes: PrimeVue's `{sortField, sortOrder}` (-1/1) may differ from shadcn-vue's approach — adapt |
| `onFilter` / `onSearchInput` | `CrudDataTable.vue` | Input binding stays similar (v-model on Input); debounce logic unchanged |
| `resolveRelationValue` | `CrudDataTable.vue` | Unchanged (pure data logic, no UI dependency) |
| `onSubmit` / `onClose` | `CrudForm.vue` | Change to emit new generic field types in `formData` |
| `toggleMenu` | `CrudActions.vue` | PrimeVue `menuRef.value?.toggle(event)` → shadcn-vue DropdownMenu uses `v-model:open` pattern instead |
| `handleAction` / `confirmDelete` | `CrudActions.vue` | Logic unchanged; only the triggering mechanism adapts |
| `goToCreate`, `onEdit`, `onFormSubmit`, `onFormClose`, `onView`, `onDelete` | `Index.vue` | Logic unchanged; only Toast usage changes from `useToast()` to shadcn-vue toast |
| `onPaginate`, `onSort`, `onSearch` | `Index.vue` | Event shape adapts to match new CrudDataTable emits |

### Removed Functions

| Function | File | Reason | Migration |
|---|---|---|---|
| `app.use(PrimeVue, { theme })` | `primevue.ts` (deleted) | PrimeVue plugin registration | Replaced by `app.use(ShadcnPlugin)` which imports global CSS instead of theme preset |
| `app.use(ConfirmationService)` | `primevue.ts` (deleted) | PrimeVue confirmation dialog service | Replaced by shadcn-vue Dialog used directly in components |
| `app.use(ToastService)` | `primevue.ts` (deleted) | PrimeVue toast service | Replaced by shadcn-vue Toast/Sonner initialized in plugin |
| `defineAsyncComponent(() => import('primevue/editor'))` | `CrudForm.vue` | PrimeVue Editor lazy import | Replaced by direct import of `RichTextInput.vue` wrapper component |

[Classes]
Modify the plugin registration architecture and component registration patterns.

### Modified Classes/Plugins

| Name | File | Modifications |
|---|---|---|
| `PrimeVuePlugin` (default export) | `src/resources/js/plugins/shadcn.ts` (new file, replaces `primevue.ts`) | Replaced entirely. New plugin: imports shadcn-vue global CSS (`src/resources/css/shadcn.css`), sets up Toast provider component globally, registers any shadcn-vue components that need app-level configuration. No longer uses `PrimeVue`, `ConfirmationService`, `ToastService` from primevue. |
| `CrudPlugin` (default export) | `src/resources/js/plugins/crudFiesta.ts` | No changes needed — it only registers `CrudIndex`, `CrudDataTable`, `CrudForm`, `CrudActions` as global Vue components. These components are being rewritten but their names stay the same. |

### New Classes/Components

| Name | File | Key Details |
|---|---|---|
| `RichTextInput` | `src/resources/js/Components/Crud/inputs/RichTextInput.vue` | Wraps tiptap editor. Props: `modelValue` (v-model), `placeholder`, `required`. Emits: `update:modelValue`. Uses `@tiptap/vue-3` `EditorContent` component with StarterKit extensions. |
| `FileInput` | `src/resources/js/Components/Crud/inputs/FileInput.vue` | Wraps VueUse `useFileDialog`. Props: `modelValue`, `accept` (file type filter), `required`. Emits: `update:modelValue`. For Image type, sets `accept="image/*"`. |
| `MaskedInput` | `src/resources/js/Components/Crud/inputs/MaskedInput.vue` | Wraps a standard Input with `v-maska` directive from maska library. Props: `modelValue`, `placeholder`, `required`, `mask` (maska pattern). Emits: `update:modelValue`. |

[Dependencies]
Remove all PrimeVue-related packages, add shadcn-vue ecosystem and replacement libraries.

### Removed Packages
- `primevue` (^4.0.0) — devDependency + peerDependency
- `@primeuix/themes` (^2.0.3) — devDependency
- `primeicons` (^7.0.0) — peerDependency

### Added Packages (devDependencies)
- `lucide-vue-next` — icon library replacing PrimeIcons
- `@tiptap/vue-3` — rich text editor replacing PrimeVue Editor
- `@tiptap/starter-kit` — default tiptap extensions
- `@vueuse/core` — for `useFileDialog` replacing PrimeVue FileUpload
- `maska` — input masking (v-maska directive) replacing PrimeVue InputMask
- `class-variance-authority` — CVA for shadcn-vue component variants
- `clsx` — className utility
- `tailwind-merge` — Tailwind class merging
- `tailwindcss-animate` — Tailwind animation plugin for shadcn-vue
- `reka-ui` (or `radix-vue`) — headless UI primitives that shadcn-vue is built on; actual shadcn-vue components are vendored as source files

### Peer Dependencies Changes
- Remove `primeicons`, `primevue` from peerDependencies
- Add `lucide-vue-next`, `@vueuse/core`, `maska` to peerDependencies

[Testing]
Manual verification plan — this project has no automated test suite for Vue components.

### Validation Strategy
1. **Build test**: Run `npm run build` (vite build). Confirm the library builds without errors and output does not reference primevue/primeicons.
2. **Type check**: Run `npx vue-tsc --noEmit` to ensure all TypeScript types resolve correctly.
3. **Visual smoke test**: Install the built package in a test Laravel app, generate a CRUD, and verify:
   - Index page renders Table with columns, sorting, search, pagination
   - Actions dropdown opens/closes, edit/delete emit correctly
   - Form dialog opens with all field types (text, textarea, number, date, checkbox, select, password, rich_text, file, image, mask, multi_select, email) rendering correctly
   - Toast notifications appear on flash messages
   - Delete confirmation dialog works
   - Rich text editor accepts and returns HTML content
   - File upload triggers OS file picker
   - Input mask enforces format
4. **Existing specs validation**: Re-verify spec 001 (relation display) and spec 002 (actions dropdown) acceptance criteria still pass with new components.

### No New Test Files
The package currently has no test infrastructure for Vue components. Adding one is out of scope for this migration.

[Implementation Order]
Sequential steps ordered to minimize conflicts, starting from infrastructure/utilities and working outward to components, then cleanup.

1. **Create utility file** — `src/resources/js/lib/utils.ts` with `cn()` function (needed by all shadcn components)
2. **Create shadcn-vue UI component source files** — all files under `src/resources/js/Components/ui/` (Button, Input, Textarea, Checkbox, Select, Table, Dialog, DropdownMenu, Calendar, Toast, Badge)
3. **Create wrapper input components** — `RichTextInput.vue`, `FileInput.vue`, `MaskedInput.vue` under `src/resources/js/Components/Crud/inputs/`
4. **Update `package.json`** — remove PrimeVue packages, add new dependencies
5. **Run `npm install`** to install new packages
6. **Refactor `FormType.php`** — rename all constants to generic names
7. **Create `src/resources/js/plugins/shadcn.ts`** — new plugin replacing primevue.ts
8. **Update `src/resources/js/index.ts`** — change export from PrimeVuePlugin to ShadcnPlugin
9. **Rewrite `CrudDataTable.vue`** — PrimeVue DataTable → shadcn-vue Table
10. **Rewrite `CrudActions.vue`** — PrimeVue Button/Dialog/Menu → shadcn-vue DropdownMenu/Dialog/Button
11. **Rewrite `CrudForm.vue`** — all 14+ PrimeVue inputs → shadcn-vue + wrappers
12. **Rewrite `Index.vue`** — PrimeVue Button/Toast → shadcn-vue Button/Toast
13. **Update `vite.config.ts`** — fix externals array to reflect new dependencies
14. **Update `Install.php`** — update install instructions for consumers
15. **Delete `src/resources/js/plugins/primevue.ts`**
16. **Build and verify** — `npm run build`, type check, visual smoke test
17. **Update specs** — update `specs/002-actions-dropdown/spec.md` to reference shadcn-vue DropdownMenu instead of PrimeVue Menu