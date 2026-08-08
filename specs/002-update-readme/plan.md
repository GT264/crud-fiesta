# Implementation Plan: Aggiornamento README.md

**Branch**: `002-update-readme` | **Date**: 2026-08-08 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-update-readme/spec.md`

## Summary

Riscrittura completa del `README.md` del package crud-fiesta per allinearlo allo stato reale del codice. Il README attuale fa riferimento a PrimeVue (sostituito da shadcn-vue), usa nomi componenti obsoleti (`CrudIndex` → `CfIndex`), documenta un plugin Vue inesistente, e omette tutte le feature implementate (export asincrono, filtri per colonna, toast vue-sonner, search globale, skeleton loader, dialog conferma delete, slot di personalizzazione, registry shadcn-vue, tipi TypeScript, composable useCrudFiesta).

L'approccio è interamente documentale: analisi dei file sorgente → sostituzione dei contenuti obsoleti → aggiunta delle sezioni mancanti. Nessuna modifica al codice.

## Technical Context

**Language/Version**: Markdown (documentazione), riferimenti a PHP >= 8.3, TypeScript ^5.0

**Primary Dependencies**: N/A — nessuna dipendenza aggiuntiva per scrivere documentazione

**Storage**: N/A

**Testing**: Validazione manuale: confronto nomi/snippet README con file sorgente (`grep`, `diff`)

**Target Platform**: Repository GitHub (`README.md` renderizzato)

**Project Type**: Documentazione

**Performance Goals**: N/A

**Constraints**: Ogni snippet di codice nel README deve essere sintatticamente corretto e corrispondere a file esistenti

**Scale/Scope**: ~20 sezioni da aggiornare/aggiungere in un singolo file `README.md`

## Constitution Check

| # | Principle | Status | Justification |
|---|-----------|--------|---------------|
| I | Vue Composition API Only | ✅ | Il README documenta `<script setup lang="ts">` come prescritto |
| II | PSR-12 PHP Standards | ✅ | N/A per questa feature (nessun codice PHP scritto); gli snippet PHP nel README sono tratti da file esistenti conformi |
| III | Laravel Best Practices | ✅ | Il README rimanda a pattern esistenti (`CrudBaseController`, `CrudBaseRepository`) |
| IV | Compiled Assets in Version Control | ✅ | Il README documenta correttamente `dist/` e build Vite |
| V | Package Architecture | ✅ | Il README documenta namespace, stub, enum, plugin corretti |
| VI | Registry | ✅ | FR-014: il README documenta `registry.json` e `registry/r/` |
| VII | Presentation-Agnostic Components | ✅ | FR-009: toast trigger/position separation documentata; FR-013: slot documentati |

## Project Structure

### Documentation (this feature)

```text
specs/002-update-readme/
├── plan.md              # This file
├── research.md          # Phase 0 output — decisioni sulle sezioni README
├── quickstart.md        # Phase 1 output — guida alla validazione
├── checklists/
│   └── requirements.md  # Spec quality checklist (already created)
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
README.md                # ← Unico file modificato da questa feature
```

**Structure Decision**: Feature puramente documentale. Un solo file (`README.md`) viene riscritto. Nessuna modifica a `src/`, `config/`, `registry/`, `specs/`, o altri file.

## Complexity Tracking

Nessuna violazione da giustificare — tutti i 7 principi della Constitution sono rispettati.