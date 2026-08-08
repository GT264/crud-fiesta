# Feature Specification: Aggiornamento README.md

**Feature Branch**: `002-update-readme`

**Created**: 2026-08-08

**Status**: Draft

**Input**: User description: "Riscrivere il README.md del pacchetto crud-fiesta per riflettere lo stato attuale del codice, documentando correttamente: UI library (shadcn-vue), nomi componenti (Cf*), sistema di plugin, props Inertia, sistema export, filtri, toast, registry, tipi TypeScript e workflow di sviluppo."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Nuovo utilizzatore installa il pacchetto (Priority: P1)

Uno sviluppatore Laravel scopre crud-fiesta e vuole installarlo nel proprio progetto. Legge il README e trova istruzioni di installazione complete e accurate: requisiti corretti (shadcn-vue, Tailwind CSS, Ziggy, lucide-vue-next, maska), comandi di installazione funzionanti, e la configurazione del plugin Vue con i nomi reali dei componenti (`CfIndex`, `CfDataTable`, `CfForm`, `CfActions`).

**Why this priority**: Senza istruzioni di installazione corrette, il pacchetto non è utilizzabile. È il primo punto di contatto per ogni nuovo utente.

**Independent Test**: Seguire le istruzioni README dall'inizio alla fine su un progetto Laravel vergine e verificare che tutti i comandi funzionino senza errori e i componenti siano disponibili.

**Acceptance Scenarios**:

1. **Given** un progetto Laravel fresco, **When** lo sviluppatore esegue `composer require gt264/crud-fiesta` e `php artisan crud-fiesta:install`, **Then** il pacchetto si installa e il comando artisan suggerisce le dipendenze npm corrette (shadcn-vue, Ziggy, lucide-vue-next, maska).
2. **Given** le dipendenze installate, **When** lo sviluppatore configura il plugin Vue come descritto nel README, **Then** i componenti `CfIndex`, `CfDataTable`, `CfForm`, `CfActions` sono registrati globalmente.
3. **Given** la configurazione completata, **When** lo sviluppatore genera un CRUD con `php artisan crud-fiesta:generate User` e visita `/users`, **Then** la pagina mostra la DataTable con i dati, funzionante.

---

### User Story 2 - Sviluppatore consulta i tipi e le props (Priority: P1)

Uno sviluppatore che sta integrando crud-fiesta in un progetto esistente ha bisogno di conoscere le props accettate da ogni componente e i tipi TypeScript esportati. Il README documenta chiaramente: le interfacce TypeScript principali (`LengthAwarePaginator`, `ColumnDetail`, `FilterConfig`, `CrudButton`, `CrudIndexPageProps`, `CfDataTableProps`, `CfFormProps`, `CfActionsProps`), il composable `useCrudFiesta` e i suoi metodi, e le props Inertia con naming snake_case reale.

**Why this priority**: La documentazione delle interfacce pubbliche è essenziale per l'uso corretto del pacchetto. Senza, lo sviluppatore deve leggere il codice sorgente.

**Independent Test**: Un revisore confronta le interfacce documentate nel README con i file in `src/resources/js/types/` e `src/resources/js/Components/Crud/utils/useCrudFiesta.ts`. Devono corrispondere esattamente.

**Acceptance Scenarios**:

1. **Given** il file `src/resources/js/types/crud-fiesta.ts`, **When** si legge la sezione "TypeScript Types" del README, **Then** ogni interfaccia esportata (`LengthAwarePaginator`, `ColumnDetail`, `CrudButton`, ecc.) è documentata con i suoi campi.
2. **Given** il file `src/resources/js/Components/Crud/utils/useCrudFiesta.ts`, **When** si legge la documentazione del composable, **Then** sono elencati `buildRoute`, `formatColumnValue`, `getSortIcon`, `getNextSortOrder` con firme e descrizioni.
3. **Given** i file `cf-data-table.ts`, `cf-form.ts`, `cf-actions.ts`, **When** si legge la sezione props del README, **Then** le props per ogni componente sono documentate con nome esatto e tipo.

---

### User Story 3 - Sviluppatore comprende le feature avanzate (Priority: P2)

Uno sviluppatore vuole sfruttare tutte le funzionalità del pacchetto: export asincrono (XLSX/CSV), filtri per colonna (select, multiselect, date, date_range), toast di feedback (`vue-sonner`), ricerca testuale globale, skeleton loader durante le transizioni Inertia, e dialog di conferma per la delete. Il README descrive ciascuna di queste feature con il comportamento atteso e la configurazione necessaria.

**Why this priority**: Le feature avanzate differenziano crud-fiesta da un semplice scaffold CRUD. Sono il valore aggiunto del pacchetto ma non bloccano l'installazione base.

**Independent Test**: Per ogni feature documentata, verificare che il comportamento descritto corrisponda a quanto implementato nei sorgenti (`CfIndex.vue`, `CfDataTable.vue`, `CfActions.vue`).

**Acceptance Scenarios**:

1. **Given** la sezione "Export" del README, **When** la si confronta con l'implementazione in `CfIndex.vue`, **Then** sono descritti: dropdown XLSX/CSV, chiamata `exportStart`, polling `exportStatus` ogni 2s, download automatico a completamento.
2. **Given** la sezione "Filtri" del README, **When** la si confronta con `CrudBaseDataTable.php` e le props `column_filters`, **Then** sono documentati i 4 tipi di filtro supportati e il meccanismo di badge rimovibili.
3. **Given** la sezione "Toast" del README, **When** la si confronta con `CfIndex.vue`, **Then** è spiegato che `vue-sonner` legge `flash.success`/`flash.error` ma il `<Toaster />` va posizionato dal progetto consumer.
4. **Given** la sezione "Skeleton Loader", **When** la si confronta con `CfDataTable.vue`, **Then** è documentato il comportamento durante le transizioni Inertia.

---

### User Story 4 - Utilizzatore avanzato personalizza i componenti (Priority: P2)

Uno sviluppatore vuole personalizzare aspetto e comportamento dei componenti senza fork. Il README documenta gli slot esposti da `CfDataTable` (`#header-[field]`, `#cell-[field]`, `#filter-[field]`, `#actions`, `#toolbar-prepend`, `#toolbar-append`, `#empty`, `#create-button`) e lo slot `#button` di `CfActions`.

**Why this priority**: La personalizzazione tramite slot è un requisito architetturale (Constitution Principle VII) e differenzia il pacchetto. P2 perché presuppone che l'utente abbia già installato e utilizzato il pacchetto.

**Independent Test**: Per ogni slot documentato, verificare che esista nel template del componente corrispondente.

**Acceptance Scenarios**:

1. **Given** il componente `CfDataTable.vue`, **When** si legge la sezione "Slot" del README, **Then** ogni slot esposto è elencato con nome, posizione e scopo.
2. **Given** la sezione "Registry" del README, **When** la si confronta con `registry.json` e `registry/r/`, **Then** è spiegato come i componenti sono distribuiti tramite registry shadcn-vue.

---

### User Story 5 - Contributor comprende il workflow di sviluppo (Priority: P3)

Uno sviluppatore vuole contribuire al pacchetto. Il README documenta: stack tecnologico completo, sistema di build (Vite con `preserveModules`, dipendenze external), constitution, workflow speckit (specify → plan → tasks), e struttura delle directory.

**Why this priority**: Importante per attrarre contributori ma non essenziale per l'uso del pacchetto.

**Independent Test**: Un nuovo contributore segue le istruzioni di sviluppo, esegue `npm run build` e verifica che i file in `dist/` siano generati correttamente.

**Acceptance Scenarios**:

1. **Given** la sezione "Sviluppo", **When** un contributor clona il repo e segue le istruzioni, **Then** può eseguire `npm install && npm run build` e ottenere asset compilati.
2. **Given** la sezione "Technology Stack", **When** la si confronta con `composer.json`, `package.json` e constitution, **Then** tutte le tecnologie e versioni corrispondono.

---

### User Story 6 - Manutentore verifica l'accuratezza nel tempo (Priority: P3)

Un manutentore del pacchetto vuole che il README rimanga una fonte affidabile. Il README include riferimenti ai file sorgente chiave in modo che future modifiche al codice rendano evidente la necessità di aggiornare la documentazione.

**Why this priority**: Manutenibilità a lungo termine. Non critico per il valore immediato.

**Independent Test**: Dopo una modifica a un componente, verificare che la discrepanza tra README e codice sia identificabile senza esecuzione manuale di tutti i comandi.

**Acceptance Scenarios**:

1. **Given** il README, **When** si confronta ogni comando e snippet con i file sorgente reali, **Then** nomi di file, classi, metodi e namespace corrispondono esattamente.

---

### Edge Cases

- Cosa succede se un lettore non ha Ziggy configurato? Il README deve menzionare Ziggy come dipendenza necessaria e link alla documentazione.
- Cosa succede se il consumer non ha shadcn-vue configurato? Il README deve indicare che shadcn-vue è un prerequisito con link alla configurazione.
- Cosa succede per progetti senza TypeScript? I tipi esportati sono utilizzabili anche in progetti JS; il README deve chiarirlo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Il README DEVE documentare come dipendenze: shadcn-vue (non PrimeVue), Tailwind CSS, Ziggy, lucide-vue-next, maska, `@vueuse/core`, `@tanstack/vue-table`, `vue-sonner`.
- **FR-002**: Il README DEVE usare i nomi reali dei componenti: `CfIndex`, `CfDataTable`, `CfForm`, `CfActions` (non `CrudIndex`, `CrudDataTable`, ecc.).
- **FR-003**: Il README DEVE documentare il plugin Vue corretto: import da `crud-fiesta` (non da `plugins/primevue` o `plugins/crudFiesta`), con `CrudPlugin` e `ShadcnPlugin`.
- **FR-004**: Il README DEVE documentare le props con il naming Inertia reale (snake_case): `columns_details`, `column_filters`, `route_prefix`, `key_name`, `crud_buttons`, `pagination_per_page`, ecc.
- **FR-005**: Il README DEVE documentare il composable `useCrudFiesta` con i suoi 4 metodi: `buildRoute`, `formatColumnValue`, `getSortIcon`, `getNextSortOrder`.
- **FR-006**: Il README DEVE documentare i tipi TypeScript esportati: `LengthAwarePaginator`, `ColumnDetail`, `FilterConfig`, `CrudAction`, `CrudButton`, `CrudIndexPageProps`, `PaginationMeta`, `CfDataTableProps`, `CfActionsProps`, `FieldConfig`, `CfFormProps`.
- **FR-007**: Il README DEVE documentare il sistema export: dropdown XLSX/CSV, endpoint `exportStart`/`exportStatus`/`exportDownload`, polling 2s, download automatico.
- **FR-008**: Il README DEVE documentare i filtri per colonna: tipi supportati (`select`, `multiselect`, `date`, `date_range`), configurazione via `columnFilters()` nel DataTable.
- **FR-009**: Il README DEVE documentare il sistema toast: `vue-sonner`, lettura `flash.success`/`flash.error`, separazione trigger/posizionamento (Constitution Principle VII).
- **FR-010**: Il README DEVE documentare la search bar globale con parametro `?search=`.
- **FR-011**: Il README DEVE documentare lo skeleton loader durante le transizioni Inertia.
- **FR-012**: Il README DEVE documentare il dialog di conferma delete (shadcn-vue `AlertDialog`).
- **FR-013**: Il README DEVE documentare gli slot esposti: `#header-[field]`, `#cell-[field]`, `#filter-[field]`, `#actions`, `#toolbar-prepend`, `#toolbar-append`, `#empty`, `#create-button` su `CfDataTable`; `#button` su `CfActions`.
- **FR-014**: Il README DEVE documentare il sistema registry (`registry.json`, `registry/r/`) per la distribuzione tramite shadcn-vue CLI.
- **FR-015**: Il README DEVE documentare lo stack tecnologico completo: PHP >= 8.3, Laravel ^13.0, Vue ^3.4, shadcn-vue ^3.0, Tailwind CSS ^4.0, TypeScript ^5.0, Vite ^6.0, Inertia ^3.0, Spatie Permission ^7.0.
- **FR-016**: Il README DEVE documentare il workflow di sviluppo: speckit (specify/plan/tasks), build Vite con `preserveModules`, dipendenze external, test.
- **FR-017**: Il README DEVE includere la sezione licenza (MIT) presente nel file attuale.
- **FR-018**: Il README DEVE menzionare Ziggy come dipendenza necessaria e che `route()` è disponibile globalmente nei componenti.
- **FR-019**: Ogni snippet di codice nel README DEVE essere sintatticamente corretto e corrispondere a file esistenti nel repository.
- **FR-020**: Il README DEVE rimuovere ogni riferimento a PrimeVue (nomi, link, configurazioni).

### Key Entities *(include if feature involves data)*

N/A — questa specifica riguarda documentazione, non dati.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un nuovo utente può completare l'installazione del pacchetto seguendo il README senza incontrare errori dovuti a nomi o comandi obsoleti.
- **SC-002**: 100% dei nomi componenti, props, plugin e metodi documentati nel README corrispondono esattamente ai nomi nei file sorgente (verificabile con grep).
- **SC-003**: Zero riferimenti a PrimeVue rimangono nel README.
- **SC-004**: Tutte le 6 feature avanzate (export, filtri, toast, search, skeleton loader, dialog delete) sono documentate con almeno un paragrafo descrittivo ciascuna.
- **SC-005**: Tutti e 10 i tipi TypeScript esportati dal package sono documentati nel README.
- **SC-006**: Un revisore può verificare l'accuratezza di ogni snippet di codice nel README confrontandolo con i file sorgente in meno di 30 minuti.

## Assumptions

- La struttura attuale del codice (plugin, componenti, tipi, registry) è considerata stabile e non subirà cambiamenti durante la stesura del README.
- Il README sarà scritto in italiano, coerentemente con la versione attuale.
- Il formato Markdown e la struttura a sezioni del README attuale saranno preservati come base, con aggiornamenti mirati ai contenuti obsoleti.
- I link esterni (Spatie, Inertia, Laravel) rimangono validi e non necessitano aggiornamento.