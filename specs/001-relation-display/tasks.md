# Tasks: Sistema Relazioni nella DataTable

**Input**: Design da `specs/001-relation-display/`

## Phase 1: Backend — DataTable & Repository

- [x] T001 **CrudBaseDataTable.php** — Aggiunto metodo astratto `relationDisplayMap(): array`, getter `getRelationDisplayMap()`, arricchimento metadata colonne con info relazione in `initializeColumnsDetails()`
- [x] T002 **CrudBaseRepository.php** — `paginate()` accetta `array $relations` ed esegue eager loading selettivo (solo PK + display_field del modello relazionato)
- [x] T003 **CrudBaseController.php** — `index()` recupera la mappa relazioni dal DataTable e la passa a `paginate()`
- [x] T004 **DataTable.stub** — Aggiunto metodo `relationDisplayMap()` con esempio commentato

## Phase 2: Frontend

- [x] T005 **CrudDataTable.vue** — Interfaccia `TableColumn` estesa con `relation` opzionale; aggiunta funzione `resolveRelationValue()` per risolvere `row[relation][display_field]` con fallback al valore raw

## Esempio d'uso

```php
// In ThreadDataTable:
protected function relationDisplayMap(): array
{
    return [
        'post_id' => ['relation' => 'post', 'display_field' => 'title'],
    ];
}
```

Nella tabella index, la colonna `post_id` mostrerà il `title` del Post correlato invece dell'ID numerico.