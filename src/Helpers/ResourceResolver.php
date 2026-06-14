<?php

namespace GT264\CrudFiesta\Helpers;

use GT264\CrudFiesta\Enums\Resource;
use InvalidArgumentException;

class ResourceResolver
{
    public static function fromModel(string $model_class): Resource
    {
        $resource_enum = config('crud-fiesta.resource_enum');

        if (! is_string($resource_enum) || $resource_enum === '') {
            throw new InvalidArgumentException(
                'crud-fiesta.resource_enum is not configured. Publish the config file and set it to your AppResource enum class.'
            );
        }

        if (! enum_exists($resource_enum)) {
            throw new InvalidArgumentException(
                "Configured crud-fiesta.resource_enum [{$resource_enum}] is not a valid enum."
            );
        }

        $implements = class_implements($resource_enum) ?: [];

        if (! in_array(Resource::class, $implements, true)) {
            throw new InvalidArgumentException(
                "Configured crud-fiesta.resource_enum [{$resource_enum}] must implement " . Resource::class . '.'
            );
        }

        return $resource_enum::getResourceFromModel($model_class);
    }
}
