# Quickstart: Validazione README.md

**Feature**: Aggiornamento README.md
**Date**: 2026-08-08

## Prerequisiti

- Repository clonato con branch `002-update-readme`
- Accesso ai file sorgente in `src/`

## Validazione Automatica

Esegui questi comandi per verificare che il README non contenga riferimenti obsoleti:

```bash
# Verifica zero riferimenti a PrimeVue
grep -i "primevue" README.md && echo "FAIL: PrimeVue references found" || echo "PASS"

# Verifica nomi componenti corretti
grep -c "CfIndex\|CfDataTable\|CfForm\|CfActions" README.md | xargs -I{} test {} -gt 0 && echo "PASS: Cf* components present" || echo "FAIL"

# Verifica assenza nomi obsoleti
grep -c "CrudIndex\|CrudDataTable\|CrudForm\|CrudActions" README.md | xargs -I{} test {} -eq 0 && echo "PASS: No obsolete component names" || echo "FAIL"
```

## Validazione Sezioni

### 1. Requisiti
- [ ] shadcn-vue elencato nei requisiti (non PrimeVue)
- [ ] Ziggy elencato
- [ ] `@tanstack/vue-table` elencato
- [ ] `vue-sonner` elencato
- [ ] lucide-vue-next elencato
- [ ] maska elencato
- [ ] Tailwind CSS elencato

### 2. Installazione
- [ ] `php artisan crud-fiesta:install` documentato
- [ ] Plugin Vue importa da `crud-fiesta` (non da `plugins/primevue`)
- [ ] `CrudPlugin` e `ShadcnPlugin` documentati

### 3. Utilizzo Rapido
- [ ] `php artisan crud-fiesta:generate` documentato
- [ ] File generati elencati correttamente

### 4. Frontend — Componenti Vue
- [ ] Nomi `CfIndex`, `CfDataTable`, `CfForm`, `CfActions`
- [ ] Props con naming snake_case (es. `columns_details`, `route_prefix`)

### 5. TypeScript Types
- [ ] `LengthAwarePaginator` documentato
- [ ] `ColumnDetail` documentato
- [ ] `FilterConfig` documentato
- [ ] `CrudButton` documentato
- [ ] `CrudIndexPageProps` documentato
- [ ] `CfDataTableProps` documentato
- [ ] `CfFormProps` documentato
- [ ] `CfActionsProps` documentato

### 6. Composable useCrudFiesta
- [ ] `buildRoute` documentato
- [ ] `formatColumnValue` documentato
- [ ] `getSortIcon` documentato
- [ ] `getNextSortOrder` documentato

### 7. Feature Avanzate
- [ ] Export: dropdown XLSX/CSV documentato
- [ ] Filtri: select, multiselect, date, date_range documentati
- [ ] Toast: vue-sonner + flash.success/error documentato
- [ ] Search globale documentata
- [ ] Skeleton loader documentato
- [ ] Dialog conferma delete documentato

### 8. Slot di Personalizzazione
- [ ] `#header-[field]`, `#cell-[field]`, `#filter-[field]` documentati
- [ ] `#actions`, `#toolbar-prepend`, `#toolbar-append` documentati
- [ ] `#empty`, `#create-button` documentati

### 9. Registry
- [ ] `registry.json` e `registry/r/` menzionati

### 10. Sviluppo
- [ ] Stack tecnologico completo
- [ ] Workflow speckit documentato
- [ ] Build Vite documentato

## Criteri di Successo

- **SC-002**: `grep` su nomi componenti/props nel README matcha esattamente i file sorgente
- **SC-003**: `grep -i primevue README.md` restituisce zero risultati
- **SC-004**: 6 feature avanzate documentate (verifica conteggio sezioni)
- **SC-005**: 10 tipi TypeScript documentati (verifica conteggio nella sezione tipi)