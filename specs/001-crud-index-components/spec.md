# Feature Specification: Vue CRUD Index Components

**Feature Branch**: `001-crud-index-components`

**Created**: 2026-08-08

**Status**: Draft

**Input**: User description: "Set di componenti Vue riusabili per la visualizzazione e gestione dati di una risorsa CRUD generica nel pacchetto crud-fiesta, da usare in pagine Inertia. La pagina index deve includere: tabella dati (TanStack Table), filtri per colonna, ordinamento su header click, paginazione, export e toast di feedback sulle azioni CRUD."

## Clarifications

### Session 2026-08-08

- Q: Quale libreria toast usare? → A: vue-sonner
- Q: L'export deve essere un dropdown con scelta formato? → A: Sì, dropdown con opzioni XLSX / CSV
- Q: La delete deve avere un dialog di conferma? → A: Sì, dialog di conferma client-side prima della submit
- Q: Come si dichiarano i filtri per colonna? → A: Tramite `columnFilters()` nel `CrudBaseDataTable`, opzionali per colonna (tipi: select, multiselect, date, date_range)
- Q: Cliccando il pulsante Edit su una riga, cosa deve succedere? → A: Drawer/modale che chiama l'endpoint `edit/{id}` (JSON: `item` + `form_details`) e mostra il form inline sopra la tabella
- Q: Il pulsante Create (nuovo record) come deve comportarsi? → A: Stesso comportamento di Edit: drawer/modale che chiama l'endpoint `create` (JSON: `form_details`) e mostra il form inline
- Q: Il drawer Create/Edit usa un componente form separato? → A: Sì, `CfForm` è un componente separato e riusabile; `CfIndex` lo istanzia dentro il drawer
- Q: Che feedback visivo durante le transizioni Inertia (cambio pagina/filtro/ordinamento)? → A: Skeleton loader (placeholder righe vuote animate) mentre i nuovi dati arrivano
- Q: Il pulsante "Create" nella toolbar: è predefinito in CfDataTable o via slot? → A: CfDataTable lo renderizza sempre (Link Inertia a `route_prefix.create`), sovrascrivibile via slot `#create-button`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sviluppatore visualizza tabella dati con paginazione (Priority: P1)

Uno sviluppatore Laravel che ha installato crud-fiesta e generato un CRUD per una risorsa
(es. `Post`) apre la pagina index. Vede una tabella con le righe della risorsa, paginate,
con le colonne definite nel `CrudBaseDataTable::default_columns` del progetto consumer.
La paginazione mostra il numero di pagina corrente, totale pagine, e permette di cambiare
pagina e righe per pagina. Lo stato (pagina, per_page) è riflesso nella query string dell'URL.

**Why this priority**: È il nucleo della pagina index. Senza visualizzazione tabellare dei
dati, nessun'altra funzionalità ha valore.

**Independent Test**: Aprire la rotta `route_prefix.index` con dati nel database. Verificare
che la tabella mostri le righe paginate, che i metadati delle colonne corrispondano a
`columns_details`, e che il cambio pagina aggiorni la query string.

**Acceptance Scenarios**:

1. **Given** una risorsa con 25 record e `pagination_per_page = 10`, **When** l'utente
   visita la pagina index, **Then** la tabella mostra 10 righe, il paginatore indica
   pagina 1 di 3, e l'URL contiene `?page=1&per_page=10`.
2. **Given** la pagina 1 visualizzata, **When** l'utente clicca su "Pagina 2" nel
   paginatore, **Then** la tabella mostra le successive 10 righe, l'URL si aggiorna a
   `?page=2&per_page=10`, e la vista non perde lo scroll (`preserveScroll: true`).
3. **Given** 0 record per la risorsa, **When** l'utente visita la pagina index, **Then**
   la tabella mostra uno stato vuoto (slot `#empty` con messaggio predefinito o custom).

---

### User Story 2 - Sviluppatore ordina la tabella per colonna (Priority: P1)

L'utente clicca sull'header di una colonna ordinabile nella tabella. Il primo click ordina
in modo ascendente, il secondo in modo discendente, il terzo rimuove l'ordinamento. Un'icona
(freccia) indica direzione e colonna attiva. Lo stato di ordinamento è riflesso nella query
string come `?sort_field=title&sort_order=1`.

**Why this priority**: L'ordinamento è essenziale per navigare dati in una tabella; senza,
l'utente non può trovare record se non sfogliando tutte le pagine.

**Independent Test**: Cliccare su header "Title" → verificare ordinamento alfabetico
ascendente e `?sort_field=title&sort_order=1`. Cliccare di nuovo → discendente e
`?sort_order=-1`. Terzo click → ordinamento rimosso, parametri assenti dalla URL.

**Acceptance Scenarios**:

1. **Given** la tabella senza ordinamento attivo, **When** l'utente clicca sull'header
   di una colonna, **Then** la colonna viene ordinata ascendente, l'URL contiene
   `sort_field=<colonna>&sort_order=1`, e un'icona ↑ appare nell'header.
2. **Given** una colonna già ordinata ascendente, **When** l'utente clicca di nuovo
   lo stesso header, **Then** l'ordinamento diventa discendente, `sort_order=-1`, icona ↓.
3. **Given** una colonna ordinata discendente, **When** l'utente clicca di nuovo,
   **Then** l'ordinamento viene rimosso, i parametri `sort_field` e `sort_order`
   spariscono dalla URL, nessuna icona nell'header.

---

### User Story 3 - Sviluppatore filtra i dati per uno o più campi (Priority: P2)

L'utente applica filtri su colonne configurate tramite `columnFilters()` nel DataTable.
I tipi di filtro supportati: select (dropdown singolo), multiselect (dropdown multiplo),
date (singola data), date_range (intervallo date). I filtri attivi sono visualizzati come
badge rimovibili sopra la tabella. Lo stato dei filtri è riflesso nella query string come
`?filters[status]=active&filters[role][]=admin&filters[role][]=editor`.

**Why this priority**: I filtri sono la seconda feature più importante dopo la tabella base.
Permettono di restringere i dati visualizzati. È P2 anziché P1 perché la tabella con
ordinamento è già un MVP utilizzabile.

**Independent Test**: Applicare un filtro select su una colonna → verificare che la tabella
mostri solo le righe corrispondenti, che l'URL contenga il parametro filtro, e che un badge
rimovibile appaia.

**Acceptance Scenarios**:

1. **Given** una colonna con `filter_config.type = 'select'` e opzioni, **When** l'utente
   seleziona un valore dal dropdown, **Then** la tabella si aggiorna con solo le righe
   filtrate, l'URL contiene `?filters[campo]=valore`, e un badge mostra il filtro attivo.
2. **Given** un filtro attivo, **When** l'utente clicca la X sul badge del filtro,
   **Then** il filtro viene rimosso, la tabella torna ai dati non filtrati, il parametro
   viene rimosso dalla URL.
3. **Given** una colonna relazionale con `filter_config.type = 'select'` e senza `options`
   esplicite, **When** la pagina viene caricata, **Then** le option del filtro sono
   popolate automaticamente dai record del modello relazionato.
4. **Given** filtri multipli attivi (es. status + categoria), **When** l'utente clicca
   "Cancella tutti i filtri", **Then** tutti i filtri vengono rimossi e l'URL torna
   allo stato base (solo paginazione).

---

### User Story 4 - Sviluppatore esporta i dati filtrati/ordinati (Priority: P2)

L'utente clicca un pulsante "Export" nella toolbar della tabella, sceglie il formato
(XLSX o CSV) da un dropdown. Il sistema avvia un export asincrono (job in coda), mostra
lo stato di avanzamento (queued → processing → completed), e quando completato avvia
automaticamente il download del file. L'export rispetta i filtri e l'ordinamento correnti.

**Why this priority**: L'export è una funzionalità comune nei CRUD admin ma non bloccante
per l'uso base della tabella. P2 perché completa il flusso di gestione dati.

**Independent Test**: Con filtri attivi, cliccare Export → XLSX. Verificare che venga
chiamata la rotta `exportStart`, che lo stato venga pollato, e che al completamento
parta il download.

**Acceptance Scenarios**:

1. **Given** la tabella con dati, **When** l'utente clicca Export → XLSX, **Then** viene
   inviata una POST a `route_prefix.exportStart` con format, filtri e ordinamento correnti,
   e appare un indicatore di progresso.
2. **Given** un export in corso (status: queued/processing), **When** il polling rileva
   `status: completed`, **Then** il browser avvia il download del file da
   `route_prefix.exportDownload/{exportId}`.
3. **Given** un export fallito (status: failed), **When** il polling rileva l'errore,
   **Then** viene mostrato un toast di errore con il messaggio di fallimento.

---

### User Story 5 - Sviluppatore riceve feedback toast su azioni CRUD (Priority: P3)

Dopo un'azione CRUD (create, update, delete) eseguita in un'altra pagina e redirect
alla index, l'utente vede una notifica toast di successo o errore. I toast sono triggerati
dal componente `CfIndex` leggendo `usePage().props.flash` (success/error), ma il
posizionamento del `<Toaster />` è responsabilità del progetto consumer (layout-fiesta).

**Why this priority**: Il feedback toast migliora l'esperienza utente ma non è essenziale
per il funzionamento della tabella. P3 perché è l'ultimo tassello del flusso CRUD completo.

**Independent Test**: Eseguire una delete dalla index (con dialog di conferma). Dopo il
redirect, verificare che appaia un toast verde con messaggio di successo.

**Acceptance Scenarios**:

1. **Given** un redirect alla index con `flash.success = "Elemento creato con successo"`,
   **When** la pagina viene montata, **Then** appare un toast verde con il messaggio.
2. **Given** un redirect con `flash.error = "Errore durante l'eliminazione"`, **When**
   la pagina viene montata, **Then** appare un toast rosso con il messaggio di errore.
3. **Given** nessun messaggio flash (visita diretta della index), **When** la pagina viene
   montata, **Then** nessun toast viene mostrato.

---

### User Story 6 - Sviluppatore personalizza aspetto e comportamento dei componenti (Priority: P3)

Uno sviluppatore consumer vuole personalizzare il rendering di una colonna specifica (es.
mostrare un'avatar accanto al nome) o sostituire l'input di filtro predefinito con uno
custom, senza fare fork del componente. Usa gli slot esposti da `CfDataTable`.

**Why this priority**: La personalizzazione è un requisito architetturale (Principle VII)
ma è un enabler, non una feature visibile all'utente finale. P3.

**Independent Test**: Passare uno slot `#cell-name` a CfDataTable con un renderer custom.
Verificare che la colonna "name" usi il renderer custom e tutte le altre colonne usino
il renderer predefinito.

**Acceptance Scenarios**:

1. **Given** uno slot `#cell-avatar` definito nel consumer, **When** la tabella renderizza
   la colonna "avatar", **Then** viene usato il contenuto dello slot al posto del
   renderer predefinito.
2. **Given** uno slot `#filter-status` definito con un input custom, **When** il filtro
   della colonna "status" viene renderizzato, **Then** viene usato l'input custom.
3. **Given** nessuno slot custom definito, **When** la tabella renderizza, **Then** tutte
   le colonne e i filtri usano i renderer predefiniti basati su `filter_config.type`.

---

### Edge Cases

- Cosa succede quando la query string contiene parametri di filtro per una colonna che
  non ha `filter_config`? I parametri vengono ignorati dal backend (nessun errore).
- Cosa succede quando `column_filters` è un array vuoto (nessun filtro configurato)?
  La sezione filtri sopra la tabella non viene renderizzata, solo la search bar globale.
- Cosa succede con `per_page_options` vuoto o con un solo valore? Il selettore
  righe-per-pagina non viene renderizzato.
- Cosa succede se l'export viene richiesto mentre un altro export è già in corso?
  Ogni richiesta genera un `export_id` separato; il polling traccia l'ultimo export
  richiesto.
- Cosa succede se il polling dell'export supera un timeout? Dopo 5 minuti il polling
  si interrompe e mostra un toast di timeout.
- Cosa succede se `column_data.data` è un array vuoto ma `total > 0` (pagina oltre
  i limiti)? Il backend gestisce questo caso; il frontend mostra la tabella vuota
  con paginatore.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Il package DEVE fornire un composable `useCrudFiesta` (`CfUtils`) con helper
  per `buildRoute`, formattazione valori colonna, e risoluzione icone ordinamento.
- **FR-002**: Il package DEVE fornire un componente `CfActions` che renderizza i pulsanti
  CRUD per riga (view, edit, delete) basati sull'array `crud_buttons` da backend.
  Il pulsante Edit DEVE aprire un drawer/modale con il form di modifica, i cui dati
  (`item`, `form_details`) sono caricati via chiamata API all'endpoint `{route_prefix}.edit/{id}`.
- **FR-003**: Il pulsante "Create" nella toolbar DEVE aprire un drawer/modale con il
  form di creazione, i cui dati (`form_details`) sono caricati via chiamata API
  all'endpoint `{route_prefix}.create` (che restituisce JSON).
- **FR-004**: Il form usato nei drawer Create/Edit DEVE essere il componente `CfForm`
  (separato e riusabile), che riceve `form_details`, `item?` e `routePrefix` come props
  e renderizza dinamicamente i campi in base ai `FormType` dichiarati dal backend.
- **FR-005**: Il componente `CfActions` DEVE supportare uno slot `#button` per
  personalizzare il rendering del singolo pulsante.
- **FR-006**: Il package DEVE fornire un componente `CfDataTable` basato su `@tanstack/vue-table`
  che renderizza una tabella con header, body, e colonne configurabili.
- **FR-007**: `CfDataTable` DEVE accettare le props Inertia: `columnsDetails`, `data`,
  `sortField`, `sortOrder`, `filters`, `columnFilters`, `pagination`, `perPage`,
  `perPageOptions`, `routePrefix`, `keyName`, `crudButtons`, `actionsLabel`.
- **FR-008**: `CfDataTable` DEVE emettere eventi (`sort`, `filter`, `clearFilters`,
  `pageChange`, `perPageChange`, `export`, `search`) senza gestire lo stato internamente.
- **FR-009**: `CfDataTable` DEVE esporre slot per personalizzazione: `#header-[field]`,
  `#cell-[field]`, `#filter-[field]`, `#actions`, `#toolbar-prepend`, `#toolbar-append`,
  `#empty`, `#create-button`.
- **FR-010**: Il package DEVE fornire un componente `CfIndex` (pagina Inertia wrapper) che
  orchestra lo stato server-side traducendo gli eventi di `CfDataTable` in chiamate
  `router.get()` con `preserveState: true` e `preserveScroll: true`.
- **FR-011**: `CfIndex` DEVE sincronizzare filtering, sorting, pagination e search nella
  query string dell'URL tramite `router.get()` — NON tramite manipolazione locale di dati.
- **FR-012**: `CfIndex` DEVE gestire il flusso export: chiamata `exportStart` POST, polling
  `exportStatus` GET ogni 2 secondi, e download automatico via `exportDownload` GET quando
  lo stato è `completed`.
- **FR-013**: `CfIndex` DEVE triggerare toast via `vue-sonner` leggendo
  `usePage().props.flash.success` e `usePage().props.flash.error` al mount e ad ogni
  aggiornamento Inertia.
- **FR-014**: `CfIndex` NON DEVE renderizzare o posizionare il componente `<Toaster />`;
  questa responsabilità è del progetto consumer (layout-fiesta).
- **FR-015**: La delete di una riga DEVE mostrare un dialog di conferma (basato su
  shadcn-vue `AlertDialog`) prima di procedere con la richiesta Inertia.
- **FR-016**: I filtri per colonna DEVONO essere configurati dal backend tramite
  `CrudBaseDataTable::columnFilters()` e passati come prop `column_filters`.
- **FR-017**: I tipi di filtro supportati DEVONO includere: `select` (dropdown singolo),
  `multiselect` (dropdown multiplo), `date` (input date singola), `date_range`
  (intervallo con date start/end).
- **FR-018**: La ricerca testuale globale DEVE essere disponibile tramite campo `search`
  nella toolbar, che popola il parametro `?search=` nella query string.
- **FR-019**: I filtri attivi DEVONO essere visualizzati come badge rimovibili sopra la
  tabella, con un pulsante "Cancella tutti i filtri".
- **FR-020**: L'export DEVE essere accessibile tramite un dropdown (pulsante Export → XLSX
  / CSV) nella toolbar della tabella.
- **FR-021**: `CfDataTable` DEVE includere un pulsante "Create" predefinito nella toolbar
  (Link Inertia a `{route_prefix}.create`), sovrascrivibile dal consumer tramite slot
  `#create-button`.
- **FR-022**: Durante le transizioni Inertia (navigazione pagine, filtro, ordinamento,
  ricerca) `CfDataTable` DEVE mostrare uno skeleton loader (righe placeholder animate)
  finché i nuovi dati non sono disponibili.
- **FR-023**: Tutti i componenti DEVONO usare `<script setup lang="ts">` (Composition API
  con TypeScript), come da Constitution Principle I.
- **FR-024**: I componenti NON DEVONO contenere stili hardcoded (colori, spaziature,
  posizionamenti); DEVONO usare solo classi Tailwind CSS e token shadcn-vue, come da
  Constitution Principle VII.
- **FR-025**: Ogni nuovo componente DEVE avere un registry item in `registry/r/` con
  `registryDependencies` corrette, come da Constitution Principle VI.

### Key Entities

- **ColumnDetail**: Metadato di una colonna passato dal backend. Campi: `field` (nome
  campo DB), `header` (etichetta tradotta), `filter_config?` (configurazione filtro
  opzionale), `relation?` (configurazione relazione eager-loaded).
- **FilterConfig**: Configurazione di un filtro per colonna. Campi: `field`, `type`
  (select|multiselect|date|date_range), `options?` (array di `{label, value}` per
  select/multiselect).
- **CrudButton**: Pulsante azione per riga. Campi: `action` (show|edit|destroy),
  `icon` (nome icona Lucide), `label`, `route_name`, `event?` (nome evento custom).
- **PaginationMeta**: Metadati paginazione da `LengthAwarePaginator`. Campi: `current_page`,
  `last_page`, `per_page`, `total`, `from`, `to`.
- **ExportState**: Stato di un export asincrono. Campi: `export_id` (UUID), `status`
  (queued|processing|completed|failed), `format` (xlsx|csv), `processed`, `total`, `error?`.
- **FlashMessage**: Messaggio flash Inertia. Campi: `success?`, `error?` (stringhe
  opzionali in `usePage().props.flash`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un developer consumer può visualizzare una pagina index funzionante per una
  risorsa CRUD generata in meno di 30 secondi dal caricamento pagina (con max 100 record).
- **SC-002**: Ogni cambio di stato (filtro, ordinamento, pagina) produce una nuova richiesta
  Inertia e aggiorna la query string dell'URL entro 500ms percepiti dall'utente.
- **SC-003**: Tutti i 5 tipi di interazione (search, filter, sort, page, per_page) sono
  riflessi nella query string e producono una URL condivisibile che, riaperta, riproduce
  esattamente lo stesso stato della tabella.
- **SC-004**: Un developer consumer può personalizzare il rendering di una colonna o filtro
  senza modificare i file del package (solo tramite slot o props).
- **SC-005**: L'export di 10,000 record in formato XLSX viene completato (download avviato)
  entro 60 secondi dalla richiesta.
- **SC-006**: I componenti non contengono classi Tailwind hardcodate che forzino colori,
  spaziature o layout specifici del package (verificabile con audit statico: nessuna classe
  come `bg-blue-500`, `p-4`, `m-2` se non derivata da token shadcn-vue o slot consumer).

## Assumptions

- Il backend (`CrudBaseController`, `CrudBaseDataTable`, `CrudBaseRepository`) espone già
  tutte le props necessarie come documentato nel contratto `index()`.
- Il progetto consumer ha configurato Tailwind CSS v4 e shadcn-vue con i propri design
  token (colori, spacing, border-radius).
- Il progetto consumer (o layout-fiesta) posiziona il componente `<Toaster />` di
  vue-sonner nel layout dell'applicazione.
- Le route Laravel per il CRUD sono registrate con i nomi standard:
  `{route_prefix}.index`, `.create`, `.store`, `.show`, `.edit`, `.update`, `.destroy`,
  `.exportStart`, `.exportStatus`, `.exportDownload`.
- Ziggy è configurato nel progetto consumer e `route()` è disponibile globalmente
  nei componenti Vue.
- Le autorizzazioni (Policies) sono gestite lato backend; il frontend riceve solo i
  pulsanti per cui l'utente ha permesso (`crud_buttons` già filtrato dal controller).
- `@tanstack/vue-table` deve essere aggiunto come dipendenza npm del package.