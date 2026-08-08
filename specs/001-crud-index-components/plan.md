# Implementation Plan: Vue CRUD Index Components

**Branch**: `001-crud-index-components` | **Date**: 2026-08-08 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-crud-index-components/spec.md`

## Summary

Implement a reusable set of Vue 3 + Inertia.js components for the CRUD "index" page (data
table with filtering, sorting, pagination, export, and toast feedback). The components are
built with TanStack Table (`@tanstack/vue-table`), styled via shadcn-vue + Tailwind CSS,
and follow a strict server-side state management pattern (all state in URL query string,
synced via `router.get()`). Four components + one composable, with corresponding registry
items for the shadcn-vue distribution channel.

## Technical Context

**Language/Version**: TypeScript 5.x, Vue 3.4+ (`<script setup lang="ts">`), PHP 8.3+
(backend already exists — no changes)

**Primary Dependencies**: `@tanstack/vue-table`, `@inertiajs/vue3`, `shadcn-vue` (Table,
Button, Select, Input, Badge, AlertDialog, DropdownMenu, Card), `vue-sonner`, `lucide-vue-next`,
`ziggy-js`, `@vueuse/core`

**Storage**: N/A — all data persistence is server-side (Laravel + MySQL/PostgreSQL),
frontend receives paginated data via Inertia page props

**Testing**: `vue-tsc --noEmit` for type checking; manual smoke test via consumer project

**Target Platform**: Browser (Inertia.js SPA embedded in Laravel application)

**Project Type**: Laravel package library (PHP Composer + npm-distributable Vue components)

**Performance Goals**: Table re-render (filter/sort/page change) < 500ms perceived;
export of 10,000 records completed in < 60 seconds

**Constraints**:
- State MUST live only in URL query string (Principle VII)
- No hardcoded styles — Tailwind + shadcn-vue tokens only (Principle VII)
- `<Toaster />` placement owned by consumer, not package (Principle VII)
- `dist/` directory committed to git, no `emptyOutDir` in Vite (Principle IV)
- All components must have registry items (Principle VI)

**Scale/Scope**: 4 Vue SFC components + 1 composable + 4 registry JSON items; ~800 lines
of TypeScript/Vue code total

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Vue Composition API Only | ✅ | All components use `<script setup lang="ts">` |
| II. PSR-12 PHP Standards | N/A | No PHP changes in this feature |
| III. Laravel Best Practices | N/A | Backend (`CrudBaseController`, etc.) already compliant |
| IV. Compiled Assets in Version Control | ✅ | Will build with Vite (`npm run build`), verify no `emptyOutDir: true` in vite.config.ts |
| V. Package Architecture | ✅ | Components in `src/resources/js/Components/Crud/`, registered via `CrudPlugin` |
| VI. Registry | ✅ | 4 new registry items in `registry/r/` with correct `registryDependencies` |
| VII. Presentation-Agnostic Components | ✅ | All state server-side via `router.get()`; toast trigger/position separated; no hardcoded styling; slots for structural customization |

**Gate Result**: All applicable principles pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-crud-index-components/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (TypeScript interfaces)
│   ├── CfIndex-props.ts       # Inertia page props contract
│   ├── CfDataTable.ts         # DataTable props, emits, slots
│   ├── CfActions.ts           # Actions props, slots
│   ├── CfForm.ts              # Form props contract
│   └── useCrudFiesta.ts       # Composable return type
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/resources/js/
├── Components/
│   └── Crud/
│       ├── CfActions.vue           # Row action buttons (view/edit/delete)
│       ├── CfDataTable.vue         # TanStack Table wrapper
│       ├── CfForm.vue              # Dynamic form renderer (Create/Edit)
│       ├── CfIndex.vue             # Inertia page wrapper (orchestrator)
│       └── utils/
│           └── useCrudFiesta.ts    # Shared composable
├── index.ts                        # Library entry point (exports + CrudPlugin)

registry/
├── r/
│   ├── cf-utils.json
│   ├── cf-actions.json
│   ├── cf-data-table.json
│   ├── cf-form.json
│   └── cf-index.json
└── registry.json                   # Updated with new item URLs
```

**Structure Decision**: Single frontend package within the monorepo-style Laravel package.
Components follow the existing convention (`src/resources/js/Components/Crud/`). Registry
items follow the shadcn-vue v3 schema, listed in dependency order.

## Complexity Tracking

> No constitution violations to justify.