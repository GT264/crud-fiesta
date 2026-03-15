<?php

namespace GT264\CrudFiesta;

use Illuminate\Support\ServiceProvider;

class CrudFiestaServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     */
    public function boot(): void
    {
        $this->loadTranslationsFrom(__DIR__ . '/lang', 'crud-fiesta');

        if ($this->app->runningInConsole()) {
            // Publish config
            $this->publishes([
                __DIR__ . '/../config/crud-fiesta.php' => config_path('crud-fiesta.php'),
            ], 'crud-fiesta-config');

            // Publish language files
            $this->publishes([
                __DIR__ . '/lang' => $this->app->langPath('vendor/crud-fiesta'),
            ], 'crud-fiesta-lang');
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
