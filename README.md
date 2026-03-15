# CRUD Fiesta 🎉

Un pacchetto Laravel per la gestione rapida di operazioni CRUD con supporto Inertia.js, Spatie Permissions e DataTable configurabili.

---

## Requisiti

- PHP >= 8.0
- Laravel >= 12.0
- [spatie/laravel-permission](https://github.com/spatie/laravel-permission) ^7.0
- [inertiajs/inertia-laravel](https://github.com/inertiajs/inertia-laravel)

---

## Installazione

```bash
composer require gt264/crud-fiesta
```

Il ServiceProvider viene registrato automaticamente tramite [Package Discovery](https://laravel.com/docs/packages#package-discovery).

### Pubblica la configurazione (opzionale)

```bash
php artisan vendor:publish --tag=crud-fiesta-config
```

### Pubblica i file di lingua (opzionale)

```bash
php artisan vendor:publish --tag=crud-fiesta-lang
```

---

## Utilizzo

### 1. Crea il tuo `Resource` Enum

Implementa l'interfaccia `GT264\CrudFiesta\Enums\Resource`:

```php
namespace App\Enums;

use GT264\CrudFiesta\Enums\Resource;

enum MyResource: string implements Resource
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

### 2. Crea il Repository

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

### 3. Crea il DataTable

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

### 4. Crea la Policy

```php
namespace App\Policies;

use GT264\CrudFiesta\Policies\CrudBasePolicy;
use App\Enums\MyResource;

class UserPolicy extends CrudBasePolicy
{
    protected \GT264\CrudFiesta\Enums\Resource $resource;

    public function __construct()
    {
        $this->resource = MyResource::USERS;
    }
}
```

### 5. Crea il Controller

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

### 6. Registra le rotte

```php
// routes/web.php
Route::resource('users', \App\Http\Controllers\UserController::class);
```

---

## Configurazione

Dopo aver pubblicato il file di configurazione (`config/crud-fiesta.php`):

| Chiave | Default | Descrizione |
|---|---|---|
| `per_page` | `25` | Righe per pagina nella paginazione |
| `route_prefix_strategy` | `plural_snake` | Strategia per il prefisso delle rotte |
| `super_admin_role` | `super_admin` | Nome del ruolo Spatie con accesso totale |

---

## Licenza

MIT — Michele Ferretti
