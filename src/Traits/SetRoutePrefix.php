<?php

namespace GT264\CrudFiesta\Traits;

trait SetRoutePrefix {

    protected string $route_prefix;

    protected function setRoutePrefix(): void
    {
        $this->route_prefix = $this->model_name_plural;
    }
}