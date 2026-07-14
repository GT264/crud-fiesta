# Implementation Plan: Actions Dropdown per CRUD DataTable

**Branch**: `002-actions-dropdown` | **Date**: 2026-07-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-actions-dropdown/spec.md`

## Summary

Sostituire i pulsanti CRUD inline nella colonna "Actions" della DataTable con un dropdown (PrimeVue `Menu` in modalità popup). Ogni voce del menu mostra l'icona PrimeIcon a sinistra e la label racchiusa in un rettangolo visivo. Le interfacce pubbliche (props, emit) di `CrudActions.vue` rimangono invariate per garantire piena retrocompatibilità con `Index.vue`.

## Technical Context

**Language/Version**: PHP >= 8.3 (backend), TypeScript ^5.0 + Vue ^3.4 (frontend)

**Primary Dependencies**: Laravel ^13.0, inertiajs/inertia-laravel ^3.0, PrimeVue ^4.0 (Aura theme), primeicons ^7.0, Vite ^6.0

**Storage**: N/A (nessuna modifica dati)

**Testing**: Manuale (verifica visiva dropdown + flussi edit/delete)

**Target Platform**: Browser (desktop e mobile), Inertia.js SPA

**Project Type**: Laravel package library

**Performance Goals**: Nessun impatto — dropdown è puro UI, nessuna chiamata aggiuntiva

**Constraints**: Nessuna modifica a `Index.vue`, `CrudDataTable.vue`, o backend. Props/emit di `CrudActions.vue` invariati.

**Scale/Scope**: 1 file modificato (`src/resources/js/Components/Crud/CrudActions.vue`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Vue Composition API Only**: `CrudActions.vue` già usa `<script setup lang="ts">`. Nessuna Options API introdotta.
- [x] **II. PSR-12 PHP Standards**: Nessun file PHP modificato. N/A per questa feature.
- [x] **III. Laravel Best Practices**: Nessuna modifica backend. N/A.
- [x] **IV. Compiled Assets in Version Control**: Vite config invariata. `emptyOutDir` non presente. `dist/` già tracciato.
- [x] **V. Package Architecture**: Modifica contenuta in `src/resources/js/Components/Crud/CrudActions.vue`. Namespace, stub, traduzioni invariati.

## Project Structure

### Documentation (this feature)

```text
specs/002-actions-dropdown/
├── spec.md              # Feature specification
├── plan.md              # This file (implementation plan)
└── tasks.md             # Task breakdown
```

### Source Code (repository root)

```text
src/resources/js/Components/Crud/
├── CrudActions.vue      # ← MODIFICATO: dropdown invece di bottoni inline
├── CrudDataTable.vue    # invariato
├── CrudForm.vue         # invariato
```

**Structure Decision**: Modifica singolo file. Nessuna nuova directory o file necessaria.

## Complexity Tracking

Nessuna violazione della costituzione. Tabella vuota.