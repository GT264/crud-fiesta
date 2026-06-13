<?php

namespace GT264\CrudFiesta;

use Illuminate\Support\ServiceProvider;

use GT264\CrudFiesta\Console\Commands\GenerateCrud;
use GT264\CrudFiesta\Console\Commands\Install;

class CrudFiestaServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     */
    public function boot(): void
    {
        $this->loadTranslationsFrom(__DIR__ . '/lang', 'crud-fiesta');

        if ($this->app->runningInConsole()) {
            $this->commands([
                GenerateCrud::class,
                Install::class,
            ]);
        }
    }

    /**
     * Register any package services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/crud-fiesta.php',
            'crud-fiesta'
        );
    }
}

