# Implementation Plan

[Overview]
Creare un registry shadcn-vue v3 per il pacchetto crud-fiesta, distribuendo 8 item (1 utility, 6 componenti, 1 pagina) con risoluzione automatica delle dipendenze shadcn-vue base via CLI.

Questo piano implementa il sistema di distribuzione dei componenti Vue di crud-fiesta attraverso il meccanismo di registry di shadcn-vue v3. Invece di richiedere al consumer di installare manualmente i componenti UI e copiare i file, la CLI `npx shadcn-vue add <url>` risolve automaticamente:
1. Le dipendenze dal registry standard shadcn-vue (button, input, dialog, ecc.)
2. Le dipendenze npm (lucide-vue-next, @vueuse/core, @tiptap/vue-3, ecc.)
3. I cross-reference ad altri item del registry crud-fiesta (es. cf-form → cf-rich-text-input)

Il registry è servito come file JSON statico dal repo GitHub pubblico, senza infrastruttura server aggiuntiva.

[Types]
Nessun cambiamento ai tipi esistenti. Il formato `registry-item.json` segue lo schema ufficiale shadcn-vue v3.

Ogni registry item è un oggetto JSON con questi campi:

| Campo | Tipo | Obbligatorio | Descrizione |
|---|---|---|---|
| `$schema` | string (URL) | Sì | `https://shadcn-vue.com/schema/registry-item.json` |
| `name` | string | Sì | Nome univoco dell'item (es. `cf-data-table`) |
| `type` | enum | Sì | `registry:lib`, `registry:component`, `registry:page`, `registry:ui`, `registry:block`, `registry:hook`, `registry:file` |
| `title` | string | No | Titolo human-readable |
| `description` | string | No | Descrizione dell'item |
| `author` | string | No | Autore (es. `GT264 <ferretti.m91@gmail.com>`) |
| `dependencies` | string[] | No | Pacchetti npm richiesti (es. `["lucide-vue-next"]`) |
| `registryDependencies` | string[] | No | Nomi di item shadcn-vue (es. `["button"]`) o URL completi a item custom (es. `["https://raw.githubusercontent.com/.../cf-utils.json"]`) |
| `files` | array | Sì | Array di file da copiare, ognuno con `path` (percorso nel repo) e `type` (tipo file) |
| `categories` | string[] | No | Categorie per organizzazione |
| `docs` | string | No | Istruzioni mostrate dopo l'installazione |
| `meta` | object | No | Metadati aggiuntivi |

Tipi di `files[].type`: `registry:component`, `registry:lib`, `registry:page`, `registry:hook`, `registry:file`, `registry:ui`

Per `registry:page` e `registry:file`, il campo `target` nel file è obbligatorio per specificare dove copiare il file nel progetto consumer.

[Files]
Creare 9 nuovi file (1 registry.json root + 8 registry item), modificare 1 file esistente (constitution.md).

### Nuovi file da creare

| File | Tipo | Scopo |
|---|---|---|
| `registry.json` | Root | Array di URL a tutti i registry item. Entry point per `npx shadcn-vue add https://raw.githubusercontent.com/GT264/crud-fiesta/refs/heads/master/registry.json` |
| `registry/r/cf-utils.json` | `registry:lib` | Funzione `cn()` da `src/resources/js/lib/utils.ts` |
| `registry/r/cf-rich-text-input.json` | `registry:component` | Wrapper tiptap da `src/resources/js/Components/Crud/inputs/RichTextInput.vue` |
| `registry/r/cf-file-input.json` | `registry:component` | Wrapper file upload da `src/resources/js/Components/Crud/inputs/FileInput.vue` |
| `registry/r/cf-masked-input.json` | `registry:component` | Wrapper input maskato da `src/resources/js/Components/Crud/inputs/MaskedInput.vue` |
| `registry/r/cf-data-table.json` | `registry:component` | Tabella dati da `src/resources/js/Components/Crud/CrudDataTable.vue` |
| `registry/r/cf-actions.json` | `registry:component` | Dropdown azioni da `src/resources/js/Components/Crud/CrudActions.vue` |
| `registry/r/cf-form.json` | `registry:component` | Form dialog da `src/resources/js/Components/Crud/CrudForm.vue` |
| `registry/r/cf-index.json` | `registry:page` | Pagina index CRUD da `src/resources/js/Pages/Index.vue` |

### File esistenti da modificare

| File | Modifica |
|---|---|
| `.specify/memory/constitution.md` | Aggiungere Principio VI "Registry" che impone l'aggiornamento di `registry.json` e `registry/r/*.json` per ogni componente shadcn-vue aggiunto o modificato nel pacchetto. Aggiornare il Technology Stack (rimuovere PrimeVue, aggiungere shadcn-vue). |

### Struttura directory creata

```
registry/
├── r/
│   ├── cf-utils.json
│   ├── cf-rich-text-input.json
│   ├── cf-file-input.json
│   ├── cf-masked-input.json
│   ├── cf-data-table.json
│   ├── cf-actions.json
│   ├── cf-form.json
│   └── cf-index.json
```

[Functions]
Nessuna modifica a funzioni esistenti. Il registry è puramente dichiarativo (file JSON statici).

### Comportamento atteso della CLI shadcn-vue

Quando un consumer esegue:
```bash
npx shadcn-vue@latest add https://raw.githubusercontent.com/GT264/crud-fiesta/refs/heads/master/registry/r/cf-data-table.json
```

La CLI:
1. Scarica il `registry-item.json` dall'URL
2. Legge `registryDependencies`: `["button"]`
3. Verifica se `button` è già installato nel progetto; se no, lo installa dal registry standard shadcn-vue
4. Legge `dependencies`: `["lucide-vue-next", "@inertiajs/vue3"]`
5. Verifica se i pacchetti npm sono installati; se no, mostra un warning
6. Legge `files[0].path`: `src/resources/js/Components/Crud/CrudDataTable.vue`
7. Scarica il file dall'URL relativo al repo e lo copia nel progetto consumer in `@/components/ui/cf-data-table.vue` (o percorso configurato in `components.json`)

[Classes]
Nessuna modifica a classi PHP. I registry item sono oggetti JSON dichiarativi.

### Schema dei cross-reference interni

```
cf-index
├── cf-data-table (URL cross-ref)
├── cf-actions (URL cross-ref)
└── cf-form (URL cross-ref)
    ├── cf-rich-text-input (URL cross-ref)
    ├── cf-file-input (URL cross-ref)
    └── cf-masked-input (URL cross-ref)
        └── cf-utils (URL cross-ref)

Dipendenze da shadcn-vue standard (risolte per nome):
cf-data-table → button
cf-actions → button, dialog, dropdown-menu
cf-form → button, input, textarea, checkbox, select, calendar, dialog
cf-file-input → button
cf-index → button, toast
```

[Dependencies]
Nessuna nuova dipendenza di build o runtime per il pacchetto stesso. I file JSON sono statici.

### Dipendenze dichiarate nei registry item

Queste sono solo dichiarazioni — il consumer dovrà averle installate nel proprio progetto:

| Pacchetto npm | Richiesto da |
|---|---|
| `@tiptap/vue-3`, `@tiptap/starter-kit` | cf-rich-text-input |
| `@vueuse/core` | cf-file-input, cf-masked-input |
| `maska` | cf-masked-input |
| `lucide-vue-next` | cf-data-table, cf-actions, cf-form, cf-index |
| `@inertiajs/vue3` | cf-data-table, cf-actions, cf-index |
| `ziggy-js` | cf-index |
| `clsx`, `tailwind-merge` | cf-utils |

[Testing]
Verifica manuale della validità del registry.

### Strategia di validazione

1. **Validazione JSON**: Ogni file `registry/r/*.json` e `registry.json` deve essere JSON valido
2. **Validazione schema**: Verificare che ogni item sia conforme allo schema shadcn-vue (`$schema`)
3. **Test di risoluzione URL**: Verificare che ogni URL in `registry.json` sia raggiungibile (HTTP 200)
4. **Test CLI**: In un progetto Vue di test con shadcn-vue configurato, eseguire:
   ```bash
   npx shadcn-vue@latest add https://raw.githubusercontent.com/GT264/crud-fiesta/refs/heads/master/registry/r/cf-data-table.json
   ```
   Verificare che:
   - Le dipendenze (`button`) vengano installate automaticamente
   - Il file `CfDataTable.vue` venga copiato nella directory corretta
   - I cross-reference (es. cf-form → cf-rich-text-input) vengano risolti

[Implementation Order]
Sequenza di creazione file, dal più semplice al più complesso, con le dipendenze incrociate gestite nell'ordine corretto.

1. **Creare `registry/r/cf-utils.json`** — utility `cn()`, nessuna dipendenza registry, solo npm
2. **Creare `registry/r/cf-rich-text-input.json`** — wrapper tiptap, nessuna dipendenza registry, solo npm
3. **Creare `registry/r/cf-file-input.json`** — wrapper file upload, dipende da `button` (shadcn standard) + `@vueuse/core`
4. **Creare `registry/r/cf-masked-input.json`** — wrapper input maskato, dipende da `cf-utils` (URL cross-ref) + `maska`, `@vueuse/core`
5. **Creare `registry/r/cf-data-table.json`** — tabella dati, dipende da `button` (shadcn standard) + `lucide-vue-next`, `@inertiajs/vue3`
6. **Creare `registry/r/cf-actions.json`** — dropdown azioni, dipende da `button`, `dialog`, `dropdown-menu` (shadcn standard) + `lucide-vue-next`, `@inertiajs/vue3`
7. **Creare `registry/r/cf-form.json`** — form dialog, dipende da 7 componenti shadcn standard + 3 URL cross-ref + `lucide-vue-next`
8. **Creare `registry/r/cf-index.json`** — pagina index, dipende da `button`, `toast` + 3 URL cross-ref + `lucide-vue-next`, `@inertiajs/vue3`, `ziggy-js`
9. **Creare `registry.json`** — file root con URL a tutti gli 8 item
10. **Aggiornare `.specify/memory/constitution.md`** — aggiungere Principio VI "Registry"
11. **Validare JSON** — `cat registry/r/*.json registry.json | python3 -m json.tool` per ogni file
12. **Test URL raggiungibili** — dopo il push su GitHub, verificare che ogni URL raw risponda HTTP 200