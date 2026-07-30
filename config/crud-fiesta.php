<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Resource Enum
    |--------------------------------------------------------------------------
    |
    | The enum class implementing GT264\CrudFiesta\Enums\Resource that maps
    | Eloquent model classes to Spatie permission prefixes.
    |
    | Example: \App\Enums\AppResource::class
    |
    */
    'resource_enum' => \App\Enums\AppResource::class,

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    /* Default Pagination */
    'pagination_per_page' => 10,

    /* Pagination Options */
    'pagination_per_page_options' => [10, 25, 50, 100],
 

];
