# Tasks: Aggiornamento README.md

**Input**: Design documents from `/specs/002-update-readme/`

**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: Not requested — this is a documentation-only feature.

**Organization**: Tasks are grouped by user story; each story maps to specific README sections. All tasks edit the single file `README.md`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different source reference files, no dependency)
- **[Story]**: Which user story this task belongs to (US1-US6)
- Exact file paths included in every task description

## Path Conventions

- Single file target: `README.md` at repository root
- Source reference files under `src/`, `composer.json`, `package.json`, `registry.json`, `registry/r/`, `config/`

---

## Phase 1: Setup (Preparazione)

**Purpose**: Verificare che tutti i file sorgente di riferimento esistano e siano leggibili.

- [x] T001 Verifica esistenza file sorgente: `src/resources/js/index.ts`, `src/resources/js/types/crud-fiesta.ts`, `src/resources/js/types/cf-data-table.ts`, `src/resources/js/types/cf-form.ts`, `src/resources/js/types/cf-actions.ts`, `src/resources/js/Components/Crud/utils/useCrudFiesta.ts`, `composer.json`, `package.json`, `registry.json`, `config/crud-fiesta.php`
- [x] T002 [P] Leggi `composer.json` e `package.json` per estrarre requisiti e dipendenze esatti da documentare nel README
- [x] T003 [P] Leggi `src/resources/js/index.ts` per estrarre firma esatta di `CrudPlugin`, `ShadcnPlugin`, `crudPages` e named exports
- [x] T004 [P] Leggi `src/resources/js/types/crud-fiesta.ts` per estrarre tutte le interfacce e tipi esportati con i loro campi
- [x] T005 [P] Leggi `src/resources/js/types/cf-data-table.ts`, `cf-form.ts`, `cf-actions.ts` per estrarre props dei componenti
- [x] T006 [P] Leggi `src/resources/js/Components/Crud/utils/useCrudFiesta.ts` per estrarre firme dei 4 metodi esportati
- [x] T007 [P] Leggi `registry.json` e `registry/r/*.json` per estrarre struttura registry
- [x] T008 [P] Leggi `config/crud-fiesta.php` per estrarre chiavi di configurazione e default

**Checkpoint**: Tutti i dati necessari per scrivere il README sono stati raccolti dai file sorgente.

---

## Phase 2: Foundational — Rimozione Contenuti Obsoleti

**Purpose**: Rimuovere TUTTI i riferimenti a PrimeVue e nomi componenti obsoleti prima di aggiungere nuovo contenuto. Questa fase è bloccante per tutte le user story.

**⚠️ CRITICAL**: Nessuna user story può iniziare finché il README non è pulito dai contenuti obsoleti.

- [x] T009 Rimuovi `PrimeVue ^4.0` dalla sezione Requisiti in `README.md` (riga 15)
- [x] T010 Rimuovi l'intera sezione "Configura il plugin Vue" (righe 41-62 in `README.md`) che importa da `plugins/primevue` e `plugins/crudFiesta`
- [x] T011 Rimuovi la sezione "Esempio di utilizzo diretto (avanzato)" (righe 258-298 in `README.md`) che usa nomi obsoleti `<CrudIndex>` e props camelCase
- [x] T012 Verifica con `grep -in "primevue\|CrudIndex\|CrudDataTable\|CrudForm\|CrudActions" README.md` che non rimangano riferimenti obsoleti in `README.md`

**Checkpoint**: README pulito — nessun riferimento a PrimeVue o nomi componenti obsoleti. Pronto per aggiungere contenuti corretti.

---

## Phase 3: User Story 1 — Installazione e primi passi (Priority: P1) 🎯 MVP

**Goal**: Lo sviluppatore può installare il pacchetto seguendo il README senza errori.

**Independent Test**: Seguire le istruzioni README su un progetto Laravel vergine e completare l'installazione fino alla visualizzazione della pagina index.

### Implementation for User Story 1

- [x] T013 [US1] Aggiorna sezione Requisiti in `README.md`: aggiungi shadcn-vue ^3.0, Tailwind CSS ^4.0, Ziggy, lucide-vue-next, maska, `@vueuse/core`, `@tanstack/vue-table`, `vue-sonner` (da research.md Decision 4 e composer.json/package.json)
- [x] T014 [US1] Riscrivi sezione "Configura il plugin Vue" in `README.md` con `CrudPlugin` e `ShadcnPlugin` importati da `crud-fiesta` (usa firme esatte da `src/resources/js/index.ts` righe 7-20)
- [x] T015 [US1] Aggiorna sezione Installazione in `README.md`: verifica che `composer require gt264/crud-fiesta` e `php artisan crud-fiesta:install` siano corretti, aggiungi nota su dipendenze npm (shadcn-vue, Ziggy) che il consumer deve configurare
- [x] T016 [US1] Aggiorna sezione "Utilizzo Rapido" in `README.md`: verifica `php artisan crud-fiesta:generate User`, aggiorna elenco file generati con percorsi corretti
- [x] T017 [US1] Aggiungi nota in `README.md` che Ziggy deve essere configurato nel progetto consumer e `route()` è disponibile globalmente (FR-018)

**Checkpoint**: Un nuovo utente può installare il pacchetto e visualizzare un CRUD funzionante seguendo solo il README.

---

## Phase 4: User Story 2 — TypeScript Types e Props (Priority: P1)

**Goal**: Lo sviluppatore trova documentati tutti i tipi TypeScript e le props dei componenti con naming esatto.

**Independent Test**: Confrontare ogni tipo/prop documentato con il file sorgente corrispondente — devono matchare esattamente.

### Implementation for User Story 2

- [x] T018 [US2] Aggiungi sezione "TypeScript Types" in `README.md`: documenta `LengthAwarePaginator`, `ColumnDetail`, `FilterConfig`, `FilterType`, `CrudAction`, `CrudButton`, `CrudIndexPageProps` (da `src/resources/js/types/crud-fiesta.ts`)
- [x] T019 [P] [US2] Aggiungi sottosezione "CfDataTable Props" in `README.md`: documenta `PaginationMeta` e `CfDataTableProps` (da `src/resources/js/types/cf-data-table.ts`)
- [x] T020 [P] [US2] Aggiungi sottosezione "CfForm Props" in `README.md`: documenta `FieldConfig` e `CfFormProps` (da `src/resources/js/types/cf-form.ts`)
- [x] T021 [P] [US2] Aggiungi sottosezione "CfActions Props" in `README.md`: documenta `CfActionsProps` (da `src/resources/js/types/cf-actions.ts`)
- [x] T022 [US2] Aggiungi sezione "Composable useCrudFiesta" in `README.md`: documenta `buildRoute`, `formatColumnValue`, `getSortIcon`, `getNextSortOrder` con firme e descrizioni (da `src/resources/js/Components/Crud/utils/useCrudFiesta.ts`)
- [x] T023 [US2] Aggiorna sezione "Frontend — Componenti Vue" in `README.md`: sostituisci nomi `CrudIndex`→`CfIndex`, `CrudDataTable`→`CfDataTable`, `CrudForm`→`CfForm`, `CrudActions`→`CfActions`; aggiorna props example con snake_case reale (`columns_details`, `route_prefix`, `crud_buttons`, `pagination_per_page`)

**Checkpoint**: Un revisore può verificare ogni tipo e prop nel README contro i file in `src/resources/js/types/` e trovare corrispondenza 1:1.

---

## Phase 5: User Story 3 — Feature Avanzate (Priority: P2)

**Goal**: Lo sviluppatore comprende e sa configurare export, filtri, toast, search, skeleton loader, e dialog conferma delete.

**Independent Test**: Per ogni feature documentata, verificare che il comportamento descritto corrisponda all'implementazione nei componenti Vue.

### Implementation for User Story 3

- [x] T024 [P] [US3] Aggiungi sezione "Export" in `README.md`: dropdown XLSX/CSV, endpoint `exportStart`/`exportStatus`/`exportDownload`, polling 2s, download automatico (da `src/Jobs/ExportDataJob.php` e `CfIndex.vue`)
- [x] T025 [P] [US3] Aggiungi sezione "Filtri per Colonna" in `README.md`: 4 tipi (`select`, `multiselect`, `date`, `date_range`), configurazione via `columnFilters()` in DataTable, badge rimovibili, pulsante "Cancella tutti" (da `CrudBaseDataTable.php` e `crud-fiesta.ts`)
- [x] T026 [P] [US3] Aggiungi sezione "Toast di Feedback" in `README.md`: `vue-sonner`, lettura `flash.success`/`flash.error`, separazione trigger/posizionamento (`<Toaster />` nel consumer, per Constitution VII)
- [x] T027 [P] [US3] Aggiungi sezione "Ricerca Globale" in `README.md`: campo search nella toolbar, parametro `?search=` nella query string
- [x] T028 [P] [US3] Aggiungi sezione "Skeleton Loader" in `README.md`: comportamento durante transizioni Inertia (cambio pagina/filtro/ordinamento)
- [x] T029 [P] [US3] Aggiungi sezione "Dialog di Conferma Delete" in `README.md`: shadcn-vue `AlertDialog` prima della submit Inertia

**Checkpoint**: Tutte e 6 le feature avanzate sono documentate con almeno un paragrafo ciascuna (SC-004).

---

## Phase 6: User Story 4 — Slot di Personalizzazione e Registry (Priority: P2)

**Goal**: Lo sviluppatore sa come personalizzare i componenti tramite slot e come sono distribuiti tramite registry.

**Independent Test**: Per ogni slot documentato, verificare che esista nel template del componente corrispondente.

### Implementation for User Story 4

- [x] T030 [US4] Aggiungi sezione "Slot di Personalizzazione" in `README.md`: elenca tutti gli slot di `CfDataTable` (`#header-[field]`, `#cell-[field]`, `#filter-[field]`, `#actions`, `#toolbar-prepend`, `#toolbar-append`, `#empty`, `#create-button`) con descrizione e posizione
- [x] T031 [US4] Aggiungi slot `#button` di `CfActions` nella stessa sezione in `README.md`
- [x] T032 [US4] Aggiungi sezione "Registry" in `README.md`: spiega `registry.json` e `registry/r/` per distribuzione shadcn-vue CLI, menziona `npx shadcn-vue add <url>`

**Checkpoint**: Uno sviluppatore può personalizzare rendering colonne/filtri/pulsanti senza leggere il codice sorgente.

---

## Phase 7: User Story 5 — Workflow di Sviluppo (Priority: P3)

**Goal**: Un contributor può clonare il repo, installare dipendenze, e buildare il package.

**Independent Test**: Clonare il repo, eseguire `npm install && npm run build`, verificare `dist/`.

### Implementation for User Story 5

- [x] T033 [US5] Aggiungi sezione "Sviluppo" in `README.md` con stack tecnologico completo (PHP >= 8.3, Laravel ^13.0, Vue ^3.4, shadcn-vue ^3.0, Tailwind CSS ^4.0, TypeScript ^5.0, Vite ^6.0, Inertia ^3.0, Spatie Permission ^7.0)
- [x] T034 [US5] Aggiungi sottosezione "Build" in `README.md`: `npm install && npm run build`, Vite con `preserveModules: true`, dipendenze external (`vue`, `@inertiajs/vue3`), output in `dist/`
- [x] T035 [US5] Aggiungi sottosezione "Workflow Speckit" in `README.md`: `specify → plan → tasks`, link a `.specify/` e constitution.md

**Checkpoint**: Un nuovo contributor può buildare il package e capire il workflow di sviluppo.

---

## Phase 8: User Story 6 — Verifica Accuratezza (Priority: P3)

**Goal**: Il README è verificabile contro i file sorgente; ogni snippet e nome corrisponde esattamente.

**Independent Test**: Eseguire i comandi grep del quickstart.md e verificare che tutti passino.

### Implementation for User Story 6

- [x] T036 [US6] Verifica che ogni snippet PHP nel README corrisponda ai file in `src/Stubs/`, `src/Controllers/CrudBaseController.php`, `src/Repositories/CrudBaseRepository.php`, `src/DataTables/CrudBaseDataTable.php`, `src/Policies/CrudBasePolicy.php`
- [x] T037 [US6] Verifica che la sezione Permessi in `README.md` corrisponda a `src/Enums/Permission.php`, `src/Enums/Resource.php`, `src/Enums/Role.php`
- [x] T038 [US6] Verifica che la sezione Configurazione in `README.md` corrisponda a `config/crud-fiesta.php` (chiavi: `resource_enum`, `per_page`, `route_prefix_strategy`, `super_admin_role`)
- [x] T039 [US6] Esegui comandi di validazione da `quickstart.md`: `grep -i primevue README.md` (deve restituire 0), `grep CfIndex README.md` (deve restituire ≥1), `grep CrudIndex README.md` (deve restituire 0)
- [x] T040 [US6] Verifica che la sezione Licenza sia presente e riporti "MIT — Michele Ferretti"

**Checkpoint**: SC-002, SC-003, SC-004, SC-005, SC-006 tutti verificati e passanti.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Ritocchi finali e coerenza complessiva del README.

- [x] T041 Rileggi l'intero `README.md` per coerenza di tono, formattazione Markdown, e ordine delle sezioni
- [x] T042 Verifica che tutti i link esterni (Spatie, Inertia, Laravel, shadcn-vue, Ziggy) siano funzionanti e puntino alle versioni corrette
- [x] T043 Verifica che il README non contenga placeholder, TODO, o note di lavoro rimaste
- [x] T044 Esegui validazione completa da `quickstart.md` e segna tutte le checkbox

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — inizia immediatamente
- **Phase 2 (Foundational)**: Dipende da Phase 1 — BLOCKS all user stories
- **Phase 3 (US1)**: Dipende da Phase 2 — P1, MVP
- **Phase 4 (US2)**: Dipende da Phase 2 — P1, può essere parallela a US1
- **Phase 5 (US3)**: Dipende da Phase 2 — P2
- **Phase 6 (US4)**: Dipende da Phase 2 — P2
- **Phase 7 (US5)**: Dipende da Phase 2 — P3
- **Phase 8 (US6)**: Dipende da tutte le fasi precedenti (verifica finale)
- **Phase 9 (Polish)**: Dipende da Phase 8

### User Story Dependencies

- **US1 (P1)**: Indipendente — può iniziare dopo Phase 2
- **US2 (P1)**: Indipendente — può iniziare dopo Phase 2 (in parallelo con US1)
- **US3 (P2)**: Indipendente — può iniziare dopo Phase 2
- **US4 (P2)**: Indipendente — può iniziare dopo Phase 2
- **US5 (P3)**: Indipendente — può iniziare dopo Phase 2
- **US6 (P3)**: Dipende da US1-US5 completate (verifica cross-sezione)

### Within Each User Story

- Tutti i task sono indipendenti tra loro (diverse sezioni del README)
- I task [P] possono essere eseguiti in parallelo

### Parallel Opportunities

- Phase 1: T002-T008 tutti [P], eseguibili in parallelo
- Phase 3 (US1): T013-T017 sequenziali (stessa area del README)
- Phase 4 (US2): T019, T020, T021 tutti [P]
- Phase 5 (US3): T024-T029 tutti [P] (6 sezioni diverse)
- US1 e US2 possono procedere in parallelo dopo Phase 2
- US3, US4, US5 possono procedere in parallelo dopo Phase 2

---

## Parallel Example: Phase 5 (US3 - Feature Avanzate)

```bash
# Tutti questi task sono indipendenti (sezioni diverse del README):
Task: "T024 [US3] Aggiungi sezione Export in README.md"
Task: "T025 [US3] Aggiungi sezione Filtri per Colonna in README.md"
Task: "T026 [US3] Aggiungi sezione Toast di Feedback in README.md"
Task: "T027 [US3] Aggiungi sezione Ricerca Globale in README.md"
Task: "T028 [US3] Aggiungi sezione Skeleton Loader in README.md"
Task: "T029 [US3] Aggiungi sezione Dialog di Conferma Delete in README.md"
```

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Phase 1: Setup (raccolta dati dai sorgenti)
2. Complete Phase 2: Foundational (rimozione PrimeVue e nomi obsoleti)
3. Complete Phase 3: US1 (installazione e primi passi)
4. Complete Phase 4: US2 (tipi e props)
5. **STOP and VALIDATE**: Il README è già funzionale per un nuovo utente (installazione + riferimento tipi)
6. Il README è già più accurato della versione attuale

### Incremental Delivery

1. Setup + Foundational → README pulito
2. +US1 → Installazione funzionante documentata (MVP!)
3. +US2 → Tipi e props documentati
4. +US3 → Feature avanzate documentate
5. +US4 → Personalizzazione documentata
6. +US5 → Sviluppo documentato
7. +US6 → Verifica accuratezza
8. +Polish → README completo e validato

### Single Developer Strategy

Esegui in ordine sequenziale: Phase 1 → Phase 2 → US1 → US2 → US3 → US4 → US5 → US6 → Polish.
Ogni fase aggiunge valore e il README è sempre in uno stato pubblicabile.

---

## Notes

- [P] tasks = sezioni diverse del README, nessun conflitto di editing
- [Story] label mappa il task alla user story per tracciabilità
- Tutti i task modificano `README.md` — in caso di esecuzione parallela, fare attenzione ai conflitti di merge
- Verificare con `grep` dopo ogni fase che i contenuti obsoleti non siano stati reintrodotti
- Commit dopo ogni fase completata
- Usare `quickstart.md` come checklist di validazione finale