<?php

namespace GT264\CrudFiesta;

use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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

        $this->shareCrudTranslations();

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

    /**
     * Flattens the package's crud.php translations and shares them
     * as Inertia shared data so Vue components can use them without
     * laravel-vue-i18n.
     */
    protected function shareCrudTranslations(): void
    {
        Inertia::share('crudLang', function () {
            $locale = app()->getLocale();
            $path = __DIR__ . "/lang/{$locale}/crud.php";

            if (!file_exists($path)) {
                $path = __DIR__ . '/lang/en/crud.php';
            }

            $translations = require $path;

            if (!is_array($translations)) {
                return [];
            }

            $dotted = Arr::dot($translations);
            $prefixed = [];

            foreach ($dotted as $key => $value) {
                $prefixed["crud.{$key}"] = $value;
            }

            return $prefixed;
        });
    }
}

