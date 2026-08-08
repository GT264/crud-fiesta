# Research: README.md Structure Decisions

**Feature**: Aggiornamento README.md
**Date**: 2026-08-08

## Decision 1: README Section Architecture

**Decision**: Organizzare il README in 12 sezioni, dalla installazione allo sviluppo.

**Rationale**: La struttura attuale ha 9 sezioni; ne aggiungiamo 3 per coprire feature mancanti (export, filtri, slot/registry) e consolidiamo la sezione "Sviluppo" per contributor. L'ordine segue il percorso utente: installa → usa base → usa avanzato → personalizza → contribuisci.

**Alternatives considered**:
- README minimalista (solo installazione + link a docs): scartato perché il README è l'unica documentazione pubblica del package.
- README generato automaticamente da codice: scartato perché non esiste tooling per farlo e richiederebbe investimento sproporzionato.

## Decision 2: Mapping Sezioni README → File Sorgente

**Decision**: Ogni sezione del README deve essere verificabile contro file sorgente specifici.

| Sezione README | File sorgente di riferimento |
|----------------|------------------------------|
| Requisiti | `composer.json` (require), `package.json` (peerDependencies, devDependencies, dependencies), constitution.md (Technology Stack) |
| Installazione | `src/CrudFiestaServiceProvider.php`, `src/Console/Commands/Install.php`, `src/resources/js/index.ts` |
| Utilizzo Rapido | `src/Console/Commands/GenerateCrud.php`, `src/Controllers/CrudBaseController.php`, `src/Stubs/` |
| Plugin Vue | `src/resources/js/index.ts` (righe 7-20) |
| Componenti Vue | `src/resources/js/Components/Crud/CfIndex.vue`, `CfDataTable.vue`, `CfForm.vue`, `CfActions.vue` |
| TypeScript Types | `src/resources/js/types/crud-fiesta.ts`, `cf-data-table.ts`, `cf-form.ts`, `cf-actions.ts` |
| Composable | `src/resources/js/Components/Crud/utils/useCrudFiesta.ts` |
| Filtri | `src/DataTables/CrudBaseDataTable.php`, `src/resources/js/types/crud-fiesta.ts` (FilterConfig, FilterType) |
| Export | `src/Jobs/ExportDataJob.php`, `src/resources/js/Components/Crud/CfIndex.vue` |
| Toast | `src/resources/js/Components/Crud/CfIndex.vue` (flash.success/error) |
| Slot | `src/resources/js/Components/Crud/CfDataTable.vue`, `CfActions.vue` |
| Registry | `registry.json`, `registry/r/*.json` |
| Configurazione | `config/crud-fiesta.php` |
| Setup Manuale | `src/Controllers/CrudBaseController.php`, `src/Repositories/CrudBaseRepository.php`, `src/DataTables/CrudBaseDataTable.php`, `src/Policies/CrudBasePolicy.php` |
| Permessi | `src/Enums/Permission.php`, `src/Enums/Resource.php`, `src/Enums/Role.php` |
| Sviluppo | `vite.config.ts`, `.specify/`, constitution.md |

**Rationale**: La tracciabilità README→sorgente permette a un revisore di verificare l'accuratezza in modo sistematico (SC-006).

## Decision 3: Codice Snippet — Verificati vs Ricostruiti

**Decision**: Tutti gli snippet di codice nel README devono essere estratti dai file sorgente reali, non ricostruiti a memoria.

**Esempi**:

- Plugin Vue import: copiato da `src/resources/js/index.ts` righe 7-20
- Interface `CrudIndexPageProps`: copiato da `src/resources/js/types/crud-fiesta.ts` righe 36-50
- `useCrudFiesta()`: copiato da `src/resources/js/Components/Crud/utils/useCrudFiesta.ts`
- Controller setup manuale: copiato dai file in `src/Stubs/` e `src/Controllers/CrudBaseController.php`

**Rationale**: FR-019 richiede che ogni snippet sia sintatticamente corretto. L'unico modo per garantirlo è copiare dai file sorgente esistenti.

## Decision 4: Rimozione Contenuti PrimeVue

**Decision**: Rimuovere completamente ogni riferimento a PrimeVue, inclusi: nome, link, configurazione plugin, componenti wrapper.

**Contenuti da rimuovere**:
- Riga 15: "PrimeVue ^4.0" dai requisiti
- Righe 51-52: `import PrimeVuePlugin from ...` e `app.use(PrimeVuePlugin)`
- Righe 260-298: esempio con `<CrudIndex>` che mostra pattern PrimeVue
- Ogni occorrenza della parola "PrimeVue" nel testo

**Contenuti da aggiungere in sostituzione**:
- Requisiti: shadcn-vue ^3.0, Tailwind CSS ^4.0, Ziggy, lucide-vue-next, maska
- Plugin: `CrudPlugin` + `ShadcnPlugin` da `crud-fiesta`
- Esempio: props Inertia reali con snake_case

**Rationale**: FR-020 e SC-003 richiedono zero riferimenti a PrimeVue.

## Decision 5: Sezioni Esistenti da Aggiornare vs Nuove Sezioni

**Decision**: 
- **Aggiornare** (contenuto esistente da correggere): Requisiti, Installazione, Plugin Vue, Utilizzo Rapido, Configurazione, Permessi, Setup Manuale, Licenza
- **Aggiungere** (nuove sezioni): TypeScript Types, Composable useCrudFiesta, Feature Avanzate (export, filtri, toast, search, skeleton loader, dialog delete), Slot di Personalizzazione, Registry, Sviluppo (per contributor)

**Rationale**: Le sezioni esistenti hanno struttura valida ma contenuti obsoleti. Le nuove sezioni coprono feature già implementate ma mai documentate.

## Decision 6: Lingua e Tono

**Decision**: Mantenere l'italiano come lingua del README, coerentemente con la versione attuale. Tono tecnico ma accessibile.

**Rationale**: Il package è sviluppato e mantenuto da un autore italiano. Il README attuale è in italiano. Cambiare lingua introdurrebbe incoerenza senza beneficio.