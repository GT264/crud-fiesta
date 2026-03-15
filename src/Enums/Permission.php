<?php

namespace GT264\CrudFiesta\Enums;

use Illuminate\Contracts\Auth\Authenticatable;

enum Permission: string
{
    case CREATE = 'create';
    case VIEWANY = 'viewAny';
    case VIEW = 'view';
    case UPDATE = 'update';
    case DELETE = 'delete';
    case RESTORE = 'restore';
    case FORCE_DELETE = 'forceDelete';

    /**
     * Wrapper for Spatie method hasPermissionTo.
     * Requires the host app's User model to use Spatie's HasRoles trait.
     *
     * @param Authenticatable $user
     * @param Resource $resource
     * @return bool
     */
    public function getPermissionTo(
        Authenticatable $user,
        Resource $resource
    ) : bool
    {
        return $user->hasDirectPermission("$resource->value-$this->value");
    }

}