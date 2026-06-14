# CRUD Fiesta 🎉

Un pacchetto Laravel per la gestione rapida di operazioni CRUD parametriche con supporto Inertia.js, Vue 3, PrimeVue e Spatie Permissions.

**Il frontend è centralizzato nel pacchetto** — nessun file da copiare nel progetto, tutto funziona tramite plugin Vue.

Pacchetto in fase di sviluppo, non ancora pronto per la produzione.

---

## Requisiti

- PHP >= 8.3
- Laravel >= 13.0
- [spatie/laravel-permission](https://github.com/spatie/laravel-permission) ^7.0
- [inertiajs/inertia-laravel](https://github.com/inertiajs/inertia-laravel) ^3.0
- Node.js con npm
- PrimeVue ^4.0
- Vue 3

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

// Aggiungi questi due plugin dal pacchetto
import PrimeVuePlugin from 'crud-fiesta/resources/js/plugins/primevue'
import CrudPlugin from 'crud-fiesta/resources/js/plugins/crudFiesta'

const app = createApp(App)

app.use(PrimeVuePlugin)  // Setup PrimeVue
app.use(CrudPlugin)      // Registra i componenti CRUD
app.use(router)
app.mount('#app')
```

Fatto! I componenti CRUD sono ora disponibili globalmente.

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

**Finito!** Accedi a `/users` e avrai una CRUD completa con frontend da PrimeVue.

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

I componenti CRUD sono già integrati nel pacchetto e disponibili tramite il plugin Vue. **Nessuna copia di file necessaria.**

### Componenti Disponibili

- **`<CrudIndex />`** — Pagina principale con DataTable e gestione CRUD
- **`<CrudDataTable />`** — Componente DataTable riutilizzabile
- **`<CrudForm />`** — Form in modale per create/edit
- **`<CrudActions />`** — Barra azioni (view, edit, delete)

### Esempio di utilizzo diretto (avanzato)

Se vuoi personalizzare la pagina Index, puoi creare una pagina custom in `resources/js/Pages/`:

```vue
<template>
  <CrudIndex
    title="Users"
    :items="items"
    :columns="columns"
    :total-records="totalRecords"
    :crud-buttons="crudButtons"
    :form-fields="formFields"
    @store="handleStore"
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const items = ref([])
const totalRecords = ref(0)

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'email', header: 'Email' }
]

const formFields = {
  name: { form_type: 'text', required: true },
  email: { form_type: 'email', required: true }
}

const crudButtons = [
  { icon: 'pi pi-eye', label: 'View', action: 'view' },
  { icon: 'pi pi-pencil', label: 'Edit', action: 'edit' },
  { icon: 'pi pi-trash', label: 'Delete', action: 'delete' }
]
</script>
```

---

## Configurazione

### File di configurazione

Opzionalmente, publica la configurazione:

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

Opzionalmente, publica i file di lingua:

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

## Licenza

MIT — Michele Ferretti
