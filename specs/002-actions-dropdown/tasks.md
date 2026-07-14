# Tasks: Actions Dropdown per CRUD DataTable

**Input**: Design documents from `/specs/002-actions-dropdown/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Solo verifica manuale (non richiesti test automatizzati nella spec).

**Organization**: Feature a singola user story, task unico.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)

## Path Conventions

- Package source: `src/` at repository root
- Vue components: `src/resources/js/Components/Crud/`

---

## Phase 1: Setup

Nessuna attività di setup richiesta. Il progetto è già inizializzato con tutte le dipendenze.

---

## Phase 2: Foundational

Nessuna attività foundational richiesta. Il componente `CrudActions.vue` esiste già con props/emit definiti.

---

## Phase 3: User Story 1 & 2 - Dropdown Actions con icone e label in rettangolo (Priority: P1) 🎯 MVP

**Goal**: Sostituire i pulsanti CRUD inline con un dropdown PrimeVue `Menu` popup. Ogni voce mostra icona a sinistra e label in rettangolo.

**Independent Test**: Aprire una pagina Index CRUD, verificare che la colonna Actions mostri un dropdown con le voci corrette, e che edit/delete funzionino come prima.

### Implementation

- [ ] T001 [US1][US2] Refactor `CrudActions.vue`: sostituire `<Button>` inline con trigger "Actions" + `<Menu>` popup PrimeVue. Template: pulsante trigger con `@click` che chiama `menuRef.value.toggle(event)`, `<Menu :ref="menuRef" :model="menuItems" :popup="true" />`. Menu items con `template` personalizzato per icona (`<i :class="item.icon">`) + label in `<span>` con classe CSS rettangolare. Script: aggiungere `import Menu from 'primevue/menu'`, `ref` per menu, `computed` per `menuItems` che mappa `props.buttons` in formato PrimeVue Menu model. Mantenere `deleteDialogVisible` e logica emit invariata. in `src/resources/js/Components/Crud/CrudActions.vue`

**Checkpoint**: Feature completa — dropdown funzionante, retrocompatibile con `Index.vue`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 3 (User Stories 1 & 2)**: Nessuna dipendenza — può iniziare immediatamente.

### Within the Task

- Template refactor + script refactor nello stesso file (T001 unico)

### Parallel Opportunities

Nessuna — task singolo.

---

## Implementation Strategy

### MVP First (Unica User Story)

1. Completare T001: Refactor `CrudActions.vue`
2. **STOP and VALIDATE**: Verificare manualmente dropdown, azioni edit/delete, dialog conferma
3. Deploy/demo

---

## Notes

- [US1][US2] combinati in T001 perché entrambi i requisiti (dropdown + icone/label) sono implementati nello stesso file.
- Nessuna modifica a `CrudDataTable.vue`, `Index.vue`, o backend.
- Props `buttons`, `row` ed emit `view`, `edit`, `delete` rimangono invariati.
- PrimeVue `Menu` in popup mode richiede `:popup="true"` e un riferimento DOM per l'ancoraggio (`toggle(event)`).
- Lo stile "rettangolo" per la label si ottiene con classe CSS (`border`, `padding`, `border-radius`, `background`).