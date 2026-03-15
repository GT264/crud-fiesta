<?php

namespace GT264\CrudFiesta\Policies;

use GT264\CrudFiesta\Enums\Permission;
use GT264\CrudFiesta\Enums\Resource;
use GT264\CrudFiesta\Enums\Role;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;

abstract class CrudBasePolicy
{
    protected Resource $resource;

    public function before(Authenticatable $user, string $ability): bool|null
    {
        if ($user->hasRole(Role::SUPER_ADMIN->value)) {
            return true;
        }

        return null;
    }

    public function viewAny(Authenticatable $user): bool
    {
        return Permission::VIEWANY->getPermissionTo($user, $this->resource);
    }

    public function view(Authenticatable $user, Model $model): bool
    {
        return Permission::VIEW->getPermissionTo($user, $this->resource);
    }

    public function create(Authenticatable $user): bool
    {
        return Permission::CREATE->getPermissionTo($user, $this->resource);
    }

    public function update(Authenticatable $user, Model $model): bool
    {
        return Permission::UPDATE->getPermissionTo($user, $this->resource);
    }

    public function delete(Authenticatable $user, Model $model): bool
    {
        return Permission::DELETE->getPermissionTo($user, $this->resource);
    }

    public function restore(Authenticatable $user, Model $model): bool
    {   
        return Permission::RESTORE->getPermissionTo($user, $this->resource);
    }

    public function forceDelete(Authenticatable $user, Model $model): bool
    {
        return Permission::FORCE_DELETE->getPermissionTo($user, $this->resource);
    }
}
