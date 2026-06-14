<?php

namespace GT264\CrudFiesta\Traits;

use Illuminate\Support\Str;
use Illuminate\Support\Pluralizer;

trait SetLanguage
{
    protected string $lang;
    protected string $model_name_singular;
    protected string $model_name_plural;

    protected function setLang(): void
    {
        $this->model_name_singular = Str::snake(class_basename($this->model));
        $this->model_name_plural = Pluralizer::plural($this->model_name_singular);

        $this->lang = "models/{$this->model_name_singular}";
    }
}