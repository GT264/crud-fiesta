# Feature Specification: Actions Dropdown per CRUD DataTable

**Feature Branch**: `002-actions-dropdown`

**Created**: 2026-07-14

**Status**: Draft

**Input**: User description: "nella colonna actions dei crud datatable, raggruppare i pulsanti di azione (view, edit, delete) all'interno di un dropdown con label 'Actions'. Ogni voce del menu deve mostrare l'icona a sinistra e la label racchiusa in un rettangolo."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dropdown Actions nella tabella CRUD (Priority: P1)

Un utente visualizza una tabella dati CRUD generata dal package. Nella colonna "Actions" di ogni riga, invece di vedere pulsanti separati (view, edit, delete), vede un singolo pulsante dropdown etichettato "Actions". Cliccando sul pulsante, si apre un menu a tendina che elenca le azioni disponibili. Ogni voce del menu mostra l'icona corrispondente a sinistra e l'etichetta testuale racchiusa visivamente in un rettangolo.

**Why this priority**: È il requisito centrale della feature. L'interfaccia della tabella CRUD deve passare da pulsanti inline a dropdown per tutte le righe.

**Independent Test**: Aprire una qualsiasi pagina Index CRUD generata dal package e verificare che nella colonna Actions compaia un dropdown con le voci corrette invece dei bottoni separati.

**Acceptance Scenarios**:

1. **Given** una tabella CRUD con righe di dati, **When** l'utente guarda la colonna "Actions", **Then** ogni riga mostra un singolo pulsante dropdown con label "Actions" invece di pulsanti separati.
2. **Given** il dropdown "Actions" chiuso, **When** l'utente clicca sul pulsante, **Then** si apre un menu a tendina che elenca tutte le azioni configurate (view, edit, delete) con icona a sinistra e label.
3. **Given** il menu aperto, **When** l'utente clicca su "Edit", **Then** si attiva il flusso di edit (apertura form modale) esattamente come prima della modifica.
4. **Given** il menu aperto, **When** l'utente clicca su "Delete", **Then** si apre la dialog di conferma eliminazione, esattamente come prima.
5. **Given** il menu aperto, **When** l'utente clicca fuori dal menu, **Then** il menu si chiude.

---

### User Story 2 - Icone e label in rettangolo (Priority: P1)

Ogni voce del menu dropdown deve avere un layout consistente: icona PrimeIcons allineata a sinistra e label testuale racchiusa in un rettangolo visivo (bordi o sfondo che incorniciano il testo).

**Why this priority**: È parte integrante del requisito visivo specificato dall'utente.

**Independent Test**: Ispezionare il DOM o fare screenshot del menu aperto e verificare che ogni voce abbia l'icona a sinistra e il testo dentro un elemento con bordo/sfondo rettangolare.

**Acceptance Scenarios**:

1. **Given** il menu dropdown aperto, **When** l'utente osserva una voce (es. "Visualizza"), **Then** l'icona `pi pi-eye` appare a sinistra e il testo "Visualizza" è racchiuso in un rettangolo con bordo o sfondo distinto.
2. **Given** il menu dropdown aperto, **When** l'utente osserva la voce "Elimina", **Then** l'icona `pi pi-trash` appare a sinistra e il testo "Elimina" è racchiuso in un rettangolo.

---

### Edge Cases

- Cosa succede se è configurato un solo pulsante (es. solo "delete")? Il dropdown deve comunque funzionare con una sola voce.
- Cosa succede se non ci sono pulsanti configurati? Il dropdown non deve essere renderizzato o deve apparire vuoto/disabilitato.
- Il comportamento della dialog di conferma delete deve rimanere invariato (emit `delete` solo dopo conferma).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La colonna "Actions" della `CrudDataTable` deve mostrare un dropdown (trigger + menu popup) invece di pulsanti inline.
- **FR-002**: Il trigger del dropdown deve avere label "Actions" (tradotta via `crudT('crud.button.actions')`).
- **FR-003**: Ogni voce del menu deve rendere l'icona PrimeIcon (da `btn.icon`) a sinistra e la label (`btn.label`) racchiusa in un rettangolo visivo.
- **FR-004**: Le azioni `view`, `edit`, `delete` devono emettere gli stessi eventi (`view`, `edit`, `delete`) di prima, garantendo retrocompatibilità con `Index.vue`.
- **FR-005**: L'azione `delete` deve continuare ad aprire la `Dialog` di conferma prima di emettere l'evento.
- **FR-006**: Il componente `CrudActions.vue` deve continuare a usare `<script setup lang="ts">` e Composition API.
- **FR-007**: Il componente deve usare PrimeVue `Menu` (o `TieredMenu`/`PopupMenu`) per il dropdown.

### Key Entities

Nessuna nuova entità dati. La modifica è puramente UI nel componente `CrudActions.vue`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Tutte le pagine Index CRUD esistenti funzionano senza modifiche al backend o a `Index.vue`.
- **SC-002**: Il menu dropdown si apre e chiude correttamente con interazione mouse/touch.
- **SC-003**: Le azioni edit e delete producono lo stesso comportamento funzionale di prima della modifica.
- **SC-004**: Il layout icone+label soddisfa il requisito visivo (icona sinistra, label in rettangolo).

## Assumptions

- PrimeVue `Menu` (popup mode) è disponibile nella versione ^4.0 già in uso nel progetto.
- Le icone PrimeIcons (`pi pi-*`) sono già caricate globalmente.
- Il componente `CrudActions.vue` riceve sempre un array `buttons` con almeno un elemento nel caso standard.
- La traduzione `crud.button.actions` esiste già nei file di lingua (`src/lang/en/crud.php`, `src/lang/it/crud.php`).