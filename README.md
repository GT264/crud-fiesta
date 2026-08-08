# CRUD Fiesta 🎉

Un pacchetto Laravel per la gestione rapida di operazioni CRUD parametriche con supporto Inertia.js, Vue 3, shadcn-vue e Spatie Permissions.

**Il frontend è centralizzato nel pacchetto** — nessun file da copiare nel progetto, tutto funziona tramite plugin Vue.

Pacchetto in fase di sviluppo, non ancora pronto per la produzione.

---

## Requisiti

### Backend
- PHP >= 8.3
- Laravel >= 13.0
- [spatie/laravel-permission](https://github.com/spatie/laravel-permission) ^7.0
- [inertiajs/inertia-laravel](https://github.com/inertiajs/inertia-laravel) ^3.0

### Frontend
- Node.js con npm
- Vue ^3.4
- [shadcn-vue](https://www.shadcn-vue.com/) ^3.0
- Tailwind CSS ^4.0
- [Ziggy](https://github.com/tighten/ziggy) ^2.0 (per `route()` globale nei componenti Vue)
- [lucide-vue-next](https://github.com/lucide-icons/lucide) ^0.460
- [maska](https://github.com/beholdr/maska) ^2.0
- [@vueuse/core](https://vueuse.org/) ^12.0

Il progetto consumer deve avere shadcn-vue configurato con i propri design token e il componente `<Toaster />` di `vue-sonner` posizionato nel layout dell'applicazione (tipicamente fornito da `layout-fiesta`).

---

## Installazione

### 1. Installa il pacchetto

```bash
composer require gt264/crud-fiesta
```

Il ServiceProvider viene registrato automaticamente.

### 2. Installa le dipendenze npm

```bash
php artisan crud-fiesta:install
npm install
npm run build
```

### 3. Configura il plugin Vue

Nel tuo `resources/js/app.js` (o `main.js`):

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importa i plugin dal pacchetto
import { CrudPlugin, ShadcnPlugin } from 'crud-fiesta'

const app = createApp(App)

app.use(CrudPlugin)     // Registra i componenti CRUD (CfIndex, CfDataTable, CfForm, CfActions)
app.use(ShadcnPlugin)   // Placeholder per compatibilità cross-package
app.use(router)
app.mount('#app')
```

Fatto! I componenti CRUD sono ora disponibili globalmente come `<CfIndex />`, `<CfDataTable />`, `<CfForm />`, `<CfActions />`.

### 4. Configura l'enum delle risorse

Crea un file `app/Enums/AppResource.php`:

```php
namespace App\Enums;

use GT264\CrudFiesta\Enums\Resource;

enum AppResource: string implements Resource
{
    case USERS = 'users';
    case POSTS = 'posts';

    public static function getResourceFromModel(string $model_class): self
    {
        return match($model_class) {
            \App\Models\User::class => self::USERS,
            \App\Models\Post::class => self::POSTS,
            default => throw new \InvalidArgumentException("Unknown model: $model_class"),
        };
    }
}
```

Poi aggiungi in `config/app.php` o in un file di configurazione:

```php
'crud-fiesta' => [
    'resource_enum' => \App\Enums\AppResource::class,
]
```

---

## Utilizzo Rapido

### Opzione 1: Genera Automaticamente (Consigliato)

Usa il comando per generare Controller, Repository, DataTable e Policy in una volta:

```bash
php artisan crud-fiesta:generate User
```

Questo crea:
- `app/Http/Controllers/UserController`
- `app/Repositories/UserRepository`
- `app/DataTables/UserDataTable`
- `app/Policies/UserPolicy`

Poi registra le rotte:

```php
// routes/web.php
Route::resource('users', App\Http\Controllers\UserController::class);
```

**Finito!** Accedi a `/users` e avrai una CRUD completa con frontend shadcn-vue.

### Opzione 2: Setup Manuale

Se preferisci creare i file manualmente:

#### 1. Crea il tuo `Resource` Enum

Implementa l'interfaccia `GT264\CrudFiesta\Enums\Resource`:

```php
namespace App\Enums;

use GT264\CrudFiesta\Enums\Resource;

enum AppResource: string implements Resource
{
    case USERS = 'users';

    public static function getResourceFromModel(string $model_class): self
    {
        return match($model_class) {
            \App\Models\User::class => self::USERS,
            default => throw new \InvalidArgumentException("Unknown model: $model_class"),
        };
    }
}
```

#### 2. Crea il Repository

```php
namespace App\Repositories;

use GT264\CrudFiesta\Repositories\CrudBaseRepository;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserRepository extends CrudBaseRepository
{
    protected function makeModel(): Model
    {
        return new User();
    }
}
```

#### 3. Crea il DataTable

```php
namespace App\DataTables;

use GT264\CrudFiesta\DataTables\CrudBaseDataTable;
use GT264\CrudFiesta\Helpers\FormType;

class UserDataTable extends CrudBaseDataTable
{
    protected string $model_class = \App\Models\User::class;

    public const array default_columns = ['name', 'email'];

    protected function commonFormDetails(): array
    {
        return [
            'name'  => ['form_type' => FormType::TEXT],
            'email' => ['form_type' => FormType::EMAIL],
        ];
    }

    protected function creationFormDetails(): array
    {
        return $this->commonFormDetails();
    }

    protected function editFormDetails(): array
    {
        return $this->commonFormDetails();
    }
}
```

#### 4. Crea la Policy

```php
namespace App\Policies;

use GT264\CrudFiesta\Policies\CrudBasePolicy;
use App\Models\User;

class UserPolicy extends CrudBasePolicy
{
    public function __construct()
    {
        $this->resource = $this->resolveResource(User::class);
    }
}
```

#### 5. Crea il Controller

```php
namespace App\Http\Controllers;

use GT264\CrudFiesta\Controllers\CrudBaseController;
use App\Repositories\UserRepository;
use App\DataTables\UserDataTable;
use App\Models\User;

class UserController extends CrudBaseController
{
    protected string $model_class      = User::class;
    protected string $data_table_class = UserDataTable::class;
    protected string $repository_class = UserRepository::class;
}
```

#### 6. Registra le rotte

```php
// routes/web.php
Route::resource('users', \App\Http\Controllers\UserController::class);
```

---

## Frontend — Componenti Vue

I componenti CRUD sono integrati nel pacchetto e disponibili tramite il plugin Vue. **Nessuna copia di file necessaria.**

### Componenti Disponibili

| Componente | Tag | Descrizione |
|------------|-----|-------------|
| **CfIndex** | `<CfIndex />` | Pagina Inertia wrapper che orchestra lo stato server-side (filtri, ordinamento, paginazione, export, toast) |
| **CfDataTable** | `<CfDataTable />` | Tabella dati basata su `@tanstack/vue-table` con filtri, ordinamento, paginazione, skeleton loader |
| **CfForm** | `<CfForm />` | Form dinamico per create/edit, renderizza campi in base ai `FormType` dichiarati dal backend |
| **CfActions** | `<CfActions />` | Barra azioni per riga (view, edit, delete) con dialog di conferma per la delete |

### Props Inertia (passate dal backend)

Il controller `CrudBaseController` passa automaticamente queste props alla pagina Inertia:

| Prop | Tipo | Descrizione |
|------|------|-------------|
| `column_data` | `LengthAwarePaginator` | Dati paginati della risorsa |
| `columns_details` | `ColumnDetail[]` | Metadati delle colonne (field, header, filter_config, relation) |
| `column_filters` | `Record<string, FilterConfig>` | Configurazione filtri per colonna |
| `route_prefix` | `string` | Prefisso delle rotte (es. `users`) |
| `key_name` | `string` | Nome della chiave primaria (es. `id`) |
| `model_lang` | `string` | Chiave di traduzione del modello |
| `crud_buttons` | `CrudButton[]` | Pulsanti azione per riga |
| `optional_buttons` | `CrudButton[]` | Pulsanti opzionali aggiuntivi |
| `actions_label` | `string` | Etichetta colonna azioni |
| `lang` | `string` | Lingua corrente (es. `it`, `en`) |
| `pagination_per_page` | `number` | Righe per pagina predefinite |
| `pagination_per_page_options` | `number[]` | Opzioni selettore righe per pagina |
| `flash` | `{ success?: string, error?: string }` | Messaggi flash per toast |

---

## TypeScript Types

Il pacchetto esporta le seguenti interfacce TypeScript (importabili da `crud-fiesta`):

```typescript
import type {
  LengthAwarePaginator,
  ColumnDetail,
  FilterConfig,
  FilterType,
  CrudAction,
  CrudButton,
  CrudIndexPageProps,
  PaginationMeta,
  CfDataTableProps,
  FieldConfig,
  CfFormProps,
  CfActionsProps,
} from 'crud-fiesta'
```

### Interfacce Principali

**`LengthAwarePaginator<T>`** — Dati paginati dal backend:
- `data: T[]` — Array di record
- `current_page: number`, `last_page: number`, `per_page: number`, `total: number`
- `from: number | null`, `to: number | null`

**`ColumnDetail`** — Metadato di una colonna:
- `field: string` — Nome campo nel database
- `header: string` — Etichetta tradotta
- `filter_config?: FilterConfig` — Configurazione filtro opzionale
- `relation?: { relation: string; display_field: string }` — Relazione eager-loaded

**`FilterConfig`** — Configurazione di un filtro:
- `field: string`
- `type: FilterType` — `'select' | 'multiselect' | 'date' | 'date_range'`
- `options?: Array<{ label: string; value: string | number }>`

**`CrudButton`** — Pulsante azione per riga:
- `action: CrudAction` — `'show' | 'edit' | 'destroy'`
- `icon: string` — Nome icona Lucide
- `label: string`
- `route_name: string`
- `event?: string` — Nome evento custom

**`CrudIndexPageProps`** — Props complete della pagina index (include tutti i campi sopra).

**`CfDataTableProps`** — Props del componente DataTable (include `PaginationMeta`, filtri, ordinamento).

**`CfFormProps`** — Props del componente Form: `formDetails`, `item?`, `routePrefix`, `action`.

**`CfActionsProps`** — Props del componente Actions: `buttons`, `row`, `routePrefix`, `keyName`.

**`FieldConfig`** — Configurazione campo form: `field`, `label`, `form_type`, `placeholder?`, `options?`.

---

## Composable `useCrudFiesta`

Il pacchetto esporta il composable `useCrudFiesta` con helper per routing e formattazione:

```typescript
import { useCrudFiesta } from 'crud-fiesta'

const { buildRoute, formatColumnValue, getSortIcon, getNextSortOrder } = useCrudFiesta()
```

### Metodi

| Metodo | Firma | Descrizione |
|--------|-------|-------------|
| `buildRoute` | `(routeName: string, params?: Record<string, string \| number>) => string` | Costruisce una URL usando Ziggy `route()` |
| `formatColumnValue` | `(row: Record<string, unknown>, field: string, relation?: { relation: string; display_field: string }) => string` | Estrae il valore di una cella, gestendo relazioni eager-loaded |
| `getSortIcon` | `(field: string, sortField: string \| null, sortOrder: 'asc' \| 'desc' \| null) => string \| null` | Restituisce il nome dell'icona di ordinamento (`ArrowUp`/`ArrowDown`) o `null` |
| `getNextSortOrder` | `(field: string, currentField: string \| null, currentOrder: 'asc' \| 'desc' \| null) => 'asc' \| 'desc' \| null` | Calcola il prossimo stato di ordinamento (asc → desc → null) |

---

## Feature Avanzate

### Export

`CfIndex` gestisce l'export asincrono dei dati. Nella toolbar della tabella è presente un pulsante "Export" con dropdown per scegliere il formato:

- **XLSX** — Export in formato Excel
- **CSV** — Export in formato CSV

L'export rispetta i filtri e l'ordinamento correnti. Il flusso è:

1. **Richiesta**: POST a `{route_prefix}.exportStart` con formato, filtri e ordinamento
2. **Polling**: GET a `{route_prefix}.exportStatus/{exportId}` ogni 2 secondi
3. **Download**: quando lo stato è `completed`, download automatico da `{route_prefix}.exportDownload/{exportId}`
4. **Timeout**: dopo 5 minuti il polling si interrompe con toast di errore

Il backend usa `ExportDataJob` (job in coda) per generare il file.

### Filtri per Colonna

I filtri sono configurati nel backend tramite il metodo `columnFilters()` del `CrudBaseDataTable`. Tipi supportati:

| Tipo | Descrizione | UI |
|------|-------------|-----|
| `select` | Dropdown a selezione singola | `<Select>` shadcn-vue |
| `multiselect` | Dropdown a selezione multipla | `<Select>` multiplo |
| `date` | Input data singola | `<input type="date">` |
| `date_range` | Intervallo date (start/end) | Due input date |

I filtri attivi appaiono come **badge rimovibili** sopra la tabella, con un pulsante "Cancella tutti i filtri" per resettare. Lo stato dei filtri è riflesso nella query string come `?filters[status]=active&filters[role][]=admin`.

### Toast di Feedback

Dopo azioni CRUD (create, update, delete), `CfIndex` legge i messaggi flash da `usePage().props.flash`:

- `flash.success` → toast verde (`vue-sonner`)
- `flash.error` → toast rosso

**Importante**: `CfIndex` si limita a triggerare i toast. Il posizionamento del componente `<Toaster />` è responsabilità del progetto consumer (tipicamente in `layout-fiesta`). Vedi [Constitution Principle VII](.specify/memory/constitution.md).

### Ricerca Globale

La toolbar della tabella include un campo di ricerca testuale che popola il parametro `?search=` nella query string. La ricerca è gestita lato server e si combina con filtri e ordinamento.

### Skeleton Loader

Durante le transizioni Inertia (cambio pagina, filtro, ordinamento), `CfDataTable` mostra righe placeholder animate (skeleton) finché i nuovi dati non sono disponibili.

### Dialog di Conferma Delete

Il pulsante delete in `CfActions` mostra un `AlertDialog` (shadcn-vue) di conferma prima di procedere con la richiesta Inertia. Questo previene eliminazioni accidentali.

---

## Slot di Personalizzazione

I componenti espongono slot per permettere la personalizzazione senza fork.

### `CfDataTable` Slots

| Slot | Descrizione |
|------|-------------|
| `#header-[field]` | Personalizza l'header di una colonna specifica |
| `#cell-[field]` | Personalizza il rendering di una cella (es. avatar, badge status) |
| `#filter-[field]` | Sostituisce l'input di filtro predefinito per una colonna |
| `#actions` | Personalizza l'intera colonna azioni |
| `#toolbar-prepend` | Contenuto prima della search bar nella toolbar |
| `#toolbar-append` | Contenuto dopo il pulsante Create nella toolbar |
| `#empty` | Stato vuoto personalizzato (quando non ci sono record) |
| `#create-button` | Sostituisce il pulsante "Create" predefinito |

### `CfActions` Slots

| Slot | Descrizione |
|------|-------------|
| `#button` | Personalizza il rendering del singolo pulsante azione |

---

## Registry

I componenti Vue del pacchetto sono distribuiti tramite il sistema registry di shadcn-vue. Questo permette ai consumer di installare i componenti via CLI:

```bash
npx shadcn-vue add <registry-url>
```

- **`registry.json`** — Elenca tutti i componenti disponibili in ordine di dipendenza
- **`registry/r/*.json`** — File di dettaglio per ogni componente con dipendenze, file, e metadata

La registry assicura che tutte le dipendenze (shadcn-vue base components, altri componenti crud-fiesta) siano risolte automaticamente.

---

## Configurazione

### File di configurazione

Opzionalmente, pubblica la configurazione:

```bash
php artisan vendor:publish --tag=crud-fiesta-config
```

| Chiave | Default | Descrizione |
|---|---|---|
| `resource_enum` | `null` | Classe enum che implementa `Resource` e mappa i model alle permission Spatie |
| `per_page` | `25` | Righe per pagina nella paginazione |
| `route_prefix_strategy` | `plural_snake` | Strategia per il prefisso delle rotte |
| `super_admin_role` | `super_admin` | Nome del ruolo Spatie con accesso totale |

### File di lingua

Opzionalmente, pubblica i file di lingua:

```bash
php artisan vendor:publish --tag=crud-fiesta-lang
```

---

## Flusso di Lavoro Tipico

1. **Genera la CRUD** con il comando automatico
2. **Registra le rotte** nel file routes
3. **Accedi all'URL** e il frontend è pronto (DataTable, form in modale, pulsanti CRUD)
4. **Personalizza il DataTable** modificando la classe `DataTable` se necessario
5. **Aggiungi logica business** nel `Repository` e nel `Controller`

---

## Permessi

Il pacchetto utilizza [Spatie Permissions](https://github.com/spatie/laravel-permission) per gestire i permessi sulle operazioni CRUD.

Crea i permessi per ciascuna risorsa:

```php
use Spatie\Permission\Models\Permission;

Permission::create(['name' => 'users.view']);
Permission::create(['name' => 'users.create']);
Permission::create(['name' => 'users.edit']);
Permission::create(['name' => 'users.delete']);
```

Poi assegnali ai ruoli:

```php
$role = Role::create(['name' => 'editor']);
$role->givePermissionTo(['users.view', 'users.create', 'users.edit']);
```

---

## Sviluppo

### Stack Tecnologico

| Layer | Tecnologia | Versione |
|-------|-----------|---------|
| Backend | PHP | >= 8.3 |
| Framework | Laravel | ^13.0 |
| Auth/RBAC | spatie/laravel-permission | ^7.0 |
| Middleware | inertiajs/inertia-laravel | ^3.0 |
| Frontend | Vue | ^3.4 |
| UI Library | shadcn-vue | ^3.0 |
| Icons | lucide-vue-next | ^0.460 |
| CSS | Tailwind CSS | ^4.0 |
| Type Check | TypeScript | ^5.0 |
| Bundler | Vite | ^6.0 |
| Table | @tanstack/vue-table | ^9.1 |
| Toast | vue-sonner | ^2.0 |

### Build

```bash
npm install
npm run build
```

Il build Vite:
- Entry point: `src/resources/js/index.ts`
- Output: `dist/index.js` (ES module)
- `preserveModules: true` per mantenere la struttura directory
- Dipendenze external: `vue`, `@inertiajs/vue3` (per evitare istanze duplicate nel consumer)
- La directory `dist/` è committata nel repository (Constitution Principle IV)

### Workflow Speckit

Lo sviluppo segue il workflow speckit in 3 fasi:

1. **`/speckit-specify`** → `specs/[###-feature]/spec.md` (user stories, requisiti)
2. **`/speckit-plan`** → `specs/[###-feature]/plan.md` (piano implementazione)
3. **`/speckit-tasks`** → `specs/[###-feature]/tasks.md` (task breakdown)

Vedi [`.specify/memory/constitution.md`](.specify/memory/constitution.md) per i principi architetturali completi.

---

## Licenza

MIT — Michele Ferretti