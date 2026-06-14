<?php

namespace GT264\CrudFiesta\Enums;

interface Resource
{
    public static function getResourceFromModel(string $model_class): self;
}