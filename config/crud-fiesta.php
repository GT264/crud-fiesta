<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default pagination
    |--------------------------------------------------------------------------
    |
    | Default number of items per page for paginated results.
    | Can be overridden in each DataTable class via the $per_page property.
    |
    */
    'per_page' => 25,

    /*
    |--------------------------------------------------------------------------
    | Route prefix strategy
    |--------------------------------------------------------------------------
    |
    | Determines how route prefixes are derived from the model name.
    | Supported: "plural_snake" (default, e.g. "user_roles")
    |
    */
    'route_prefix_strategy' => 'plural_snake',

    /*
    |--------------------------------------------------------------------------
    | Super Admin role name
    |--------------------------------------------------------------------------
    |
    | The Spatie role name that bypasses all permission checks.
    |
    */
    'super_admin_role' => 'super_admin',

];
