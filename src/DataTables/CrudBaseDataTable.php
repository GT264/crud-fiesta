<?php

namespace GT264\CrudFiesta\DataTables;

use GT264\CrudFiesta\Enums\Permission;
use GT264\CrudFiesta\Enums\Resource;
use GT264\CrudFiesta\Traits\SetLanguage;
use GT264\CrudFiesta\Traits\SetRoutePrefix;

use GT264\CrudFiesta\Helpers\FormType;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

abstract class CrudBaseDataTable
{
    use SetLanguage, SetRoutePrefix;

    protected string $model_class;
    protected Model $model;

    protected Resource $resource;

    /** @var array
     * Colonne mostrate nella index
     */
    public const array default_columns = [];

    public array $details_columns = [];

    public array $form_details = [];

    public int $per_page = 25;

    protected bool $enable_view = true;
    protected bool $enable_edit = true;
    protected bool $enable_delete = true;
    
    public function __construct() 
    {
        $this->model = app($this->model_class);
        $this->setLang();
        $this->setRoutePrefix();
        $this->initializeColumnsDetails();
        $this->resource = Resource::getResourceFromModel($this->model_class);
    }

    protected function initializeColumnsDetails() : void
    {
        foreach (
            static::default_columns as
            $column
        ) {
            $this->details_columns[$column] = [
                'field' => $column,
                'header' => __("$this->lang.fields.$column"),
            ];
        }
    }

    abstract protected function creationFormDetails() : array;
    abstract protected function editFormDetails() : array;

    abstract protected function commonFormDetails() : array;

    protected function setHeader($field) : void 
    {
        $this->form_details[$field]['label'] = __("$this->lang.fields.$field");
    }

    protected function setPlaceholder($field) : void
    {
        $formType = $this->form_details[$field]['form_type'] ?? 'text';
        
        $this->form_details[$field]['placeholder'] = match(
            $formType
        ) {
            FormType::IMAGE, FormType::FILE => __('crud.form.load', ['field' => __("$this->lang.fields.$field")]),
            FormType::DROPDOWN, FormType::MULTI_SELECT => __('crud.form.select', ['field' => __("$this->lang.fields.$field")]),
            default => __('crud.form.insert', ['field' => __("$this->lang.fields.$field")])
        };
    }

    protected function setFormDetails($form_details) : array 
    {
        foreach (
            $form_details as
            $field => $field_details
        ) {
            $this->form_details[$field] = $field_details;
            $this->setHeader($field);
            $this->setPlaceholder($field);
        }
        return $this->form_details;
    }

    public function getEditFormDetails() : array
    {
        return $this->setFormDetails($this->editFormDetails());
    }

    public function getCreationFormDetails() : array
    {
        return $this->setFormDetails($this->creationFormDetails());
    }

    public function getCrudButtons() : array {

        $crud_buttons = [];

        // Show button
        if (
            $this->enable_view && Permission::VIEW->getPermissionTo(Auth::user(), $this->resource)
        ) {
            $crud_buttons[] = [
                'icon' => 'pi pi-eye',
                'label' => __('crud.button.view'),
                'route' => route("$this->route_prefix.show", $this->model->getKeyName()),
                'binding' => $this->model->getKeyName(),
                'method' => 'get'
            ];
        }

        // Edit button
        if (
            $this->enable_edit && Permission::UPDATE->getPermissionTo(Auth::user(), $this->resource)
        ) {
            $crud_buttons[] = [
                'icon' => 'pi pi-pencil',
                'label' => __('crud.button.edit'),
                'route' => route("$this->route_prefix.edit", $this->model->getKeyName()),
                'binding' => $this->model->getKeyName(),
                'method' => 'get',
                'event' => 'edit'
            ];
        }

        if (
            $this->enable_delete && Permission::DELETE->getPermissionTo(Auth::user(), $this->resource)
        ) {
            $crud_buttons[] = [
                'icon' => 'pi pi-trash',
                'label' => __('crud.button.delete'),
                'route' => route("$this->route_prefix.destroy", $this->model->getKeyName()),
                'binding' => $this->model->getKeyName(),
                'method' => 'delete',
                'event' => 'delete' // Optional, handled by Inertia method usually
            ];
        }

        return $crud_buttons;
    }

    public function getOptionalButtons() : array
    {
        return [];
    }

}