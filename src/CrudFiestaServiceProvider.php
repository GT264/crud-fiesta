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
        $this->shareFlashMessages();

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

    protected function shareFlashMessages(): void
    {
        Inertia::share('flash', function () {
            return [
                'success' => session('success'),
                'error'   => session('error'),
            ];
        });
    }

    /**
     * Loads the consuming app's model translations from
     * lang/{locale}/models/*.php and merges them with the
     * package's crud.php translations into a single crudLang
     * Inertia shared prop, so that crudT() can resolve all
     * translation keys (both "crud.*" and "models.*").
     */
    protected function shareCrudTranslations(): void
    {
        Inertia::share('crudLang', function () {
            $all = [];

            // 1. Load package crud.php translations
            $locale = app()->getLocale();
            $path = __DIR__ . "/lang/{$locale}/crud.php";

            if (!file_exists($path)) {
                $path = __DIR__ . '/lang/en/crud.php';
            }

            $crudTranslations = require $path;

            if (is_array($crudTranslations)) {
                $dotted = Arr::dot($crudTranslations);
                foreach ($dotted as $key => $value) {
                    $all["crud.{$key}"] = $value;
                }
            }

            // 2. Load model translations from lang/{locale}/models/*.php
            $modelsPath = lang_path("{$locale}/models");

            if (!is_dir($modelsPath)) {
                $fallback = config('app.fallback_locale', 'en');
                $modelsPath = lang_path("{$fallback}/models");
            }

            if (is_dir($modelsPath)) {
                foreach (glob("{$modelsPath}/*.php") as $file) {
                    $modelKey = basename($file, '.php');
                    $translations = require $file;

                    if (!is_array($translations)) {
                        continue;
                    }

                    $dotted = Arr::dot($translations);
                    foreach ($dotted as $key => $value) {
                        $all["models.{$modelKey}.{$key}"] = $value;
                    }
                }
            }

            return $all;
        });
    }
}

