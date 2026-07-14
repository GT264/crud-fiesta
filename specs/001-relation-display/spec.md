# Feature Specification: Sistema Relazioni nella DataTable

**Feature Branch**: `001-relation-display`

**Created**: 2026-07-14

**Status**: Implemented

**Input**: User description: "Aggiungere, nella visualizzazione della tabella, un sistema per mostrare le relazioni. Nelle rispettive CrudDataTable, inserire una funzione astratta in cui l'utente indicherà di quale colonna, quale relazione usare e, di quel modello relazionato, che valore mostrare. La repository dovrà prendere del modello relazionato SOLO il valore di chiave (es. id) e il valore da mostrare (es. title)."

## User Scenarios & Testing

### User Story 1 - Visualizzare il valore relazionato invece del foreign key (Priority: P1) 🎯 MVP

Uno sviluppatore che usa CRUD Fiesta vuole che nella tabella index, per una colonna che rappresenta una foreign key (es. `post_id`), venga mostrato un campo significativo del modello relazionato (es. il `title` del Post) invece dell'ID numerico grezzo.

**Why this priority**: È il core della feature. Senza questo, la tabella mostra ID numerici illeggibili per l'utente finale.

**Independent Test**: Definire `relationDisplayMap()` in un DataTable con `['post_id' => ['relation' => 'post', 'display_field' => 'title']]`. Verificare che nella pagina index la colonna `post_id` mostri il titolo del post invece dell'ID.

**Acceptance Scenarios**:

1. **Given** un modello `Thread` con foreign key `post_id` e relazione `post()`, **When** lo sviluppatore definisce `relationDisplayMap()` mappando `post_id` → relazione `post` con display_field `title`, **Then** la tabella index mostra il `title` del Post correlato invece dell'ID numerico.
2. **Given** una colonna senza relazione definita in `relationDisplayMap()`, **When** la tabella viene renderizzata, **Then** la colonna mostra il valore raw del modello come prima (nessun cambiamento di comportamento).
3. **Given** una relazione definita ma il record relazionato non esiste (foreign key nulla o orfana), **When** la tabella viene renderizzata, **Then** la colonna mostra il valore raw della foreign key come fallback.

---

### User Story 2 - Eager loading selettivo per performance (Priority: P2)

Il Repository deve caricare solo i campi necessari del modello relazionato (chiave primaria + display_field) per evitare di caricare interi modelli in memoria.

**Why this priority**: Ottimizzazione importante ma la feature funziona anche senza (anche se meno efficiente).

**Independent Test**: Con Laravel Debugbar o query log attivo, verificare che la query di eager loading selezioni solo `id` e il `display_field` specificato (es. `title`), non `SELECT *`.

**Acceptance Scenarios**:

1. **Given** una relazione `post` con display_field `title`, **When** il Repository esegue la paginazione, **Then** la query di eager loading è `SELECT id, title FROM posts WHERE ...` e non `SELECT * FROM posts`.

---

### Edge Cases

- Cosa succede se il `display_field` specificato non esiste come colonna nel modello relazionato? La query Eloquent fallirà con un SQL error — è responsabilità dello sviluppatore indicare un campo valido.
- Cosa succede se la relazione definita in `relationDisplayMap()` non esiste come metodo di relazione Eloquent sul modello? Eloquent solleverà un'eccezione `RelationNotFoundException`.
- Cosa succede se più colonne referenziano la stessa relazione con display_field diversi? Ogni colonna viene gestita indipendentemente; l'eager loading carica la relazione una sola volta con i campi necessari (unione dei display_field di tutte le entry che usano la stessa relazione).

## Requirements

### Functional Requirements

- **FR-001**: Il sistema DEVE esporre un metodo astratto `relationDisplayMap(): array` su `CrudBaseDataTable` che ogni DataTable concreto deve implementare.
- **FR-002**: Il formato della mappa DEVE essere: `['nome_colonna' => ['relation' => 'nomeRelazioneEloquent', 'display_field' => 'campoDaMostrare']]`.
- **FR-003**: Il metodo `paginate()` di `CrudBaseRepository` DEVE accettare la mappa delle relazioni ed eseguire eager loading selettivo caricando solo la chiave primaria e il `display_field` del modello relazionato.
- **FR-004**: Il Controller `index()` DEVE passare la mappa relazioni dal DataTable al Repository.
- **FR-005**: I metadati delle colonne (`details_columns`) DEVONO includere le informazioni sulla relazione quando presente, per essere consumati dal frontend.
- **FR-006**: Il componente Vue `CrudDataTable` DEVE risolvere il valore da mostrare accedendo a `row[relationName][displayField]` quando la colonna ha metadati di relazione.
- **FR-007**: Se la relazione non è caricata o il valore non è disponibile, il frontend DEVE mostrare il valore raw della colonna come fallback.
- **FR-008**: Lo stub `DataTable.stub` DEVE includere il metodo `relationDisplayMap()` con un esempio commentato.

### Key Entities

- **RelationDisplayMap**: Array associativo che mappa nomi di colonne (foreign key) a configurazioni di relazione. Contiene: `column_name` (string), `relation` (nome metodo Eloquent), `display_field` (campo da mostrare del modello relazionato).
- **ColumnDetail** (frontend): Estensione dell'interfaccia esistente con campo opzionale `relation` contenente `{ relation: string, display_field: string }`.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Uno sviluppatore può configurare la visualizzazione di una relazione in una riga di codice PHP nel proprio DataTable.
- **SC-002**: La query SQL generata per il caricamento della relazione seleziona esattamente 2 colonne (PK + display_field), non tutte.
- **SC-003**: Colonne senza relazione configurata continuano a funzionare esattamente come prima (nessuna regressione).
- **SC-004**: Il frontend gestisce graceful degradation mostrando il valore raw se la relazione non è disponibile.

## Assumptions

- Le relazioni Eloquent sono già definite sui modelli secondo le convenzioni Laravel standard.
- Il `display_field` specificato esiste come colonna nella tabella del modello relazionato.
- Il formato di risposta JSON di Inertia include automaticamente le relazioni caricate con `->with()` nella serializzazione del modello.
- Non è necessario supportare relazioni annidate (es. `post.user.name`) nella v1.