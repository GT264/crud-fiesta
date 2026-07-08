<?php

namespace GT264\CrudFiesta\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use GT264\CrudFiesta\DataTables\CrudBaseDataTable;
use GT264\CrudFiesta\Repositories\CrudBaseRepository;
use GT264\CrudFiesta\Traits\SetLanguage;
use GT264\CrudFiesta\Traits\SetRoutePrefix;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

abstract class CrudBaseController extends Controller
{
    protected string $view_name = 'Crud/Index';

    use AuthorizesRequests, SetLanguage, SetRoutePrefix;

    public function __construct(
        protected Model $model,
        protected CrudBaseDataTable $crud_data_table,
        protected CrudBaseRepository $crud_base_repository
    )
    {
        $this->authorizeResource($this->model::class, $this->model->getKeyName());
        $this->setLang();
        $this->setRoutePrefix();
    }

    protected function redirect(
        string $with,
        string $message
    ) : RedirectResponse
    {
        return redirect()->back()->with($with, $message);
    }

    protected function redirectWithError(
        string $message
    ) : RedirectResponse
    {
        return $this->redirect('error', $message);
    }

    protected function redirectWithSuccess(
        string $message
    ) : RedirectResponse
    {
        return $this->redirect('success', $message);
    }

    public function index() : InertiaResponse
    {
        return Inertia::render($this->view_name, [
            'column_data' => $this->crud_base_repository->paginate($this->crud_data_table->per_page, [...$this->crud_data_table::default_columns, $this->model->getKeyName()]),
            'columns_details' => array_values($this->crud_data_table->details_columns),
            'route_prefix' => $this->route_prefix,
            'optional_buttons' => $this->crud_data_table->getOptionalButtons(),
            'crud_buttons' => $this->crud_data_table->getCrudButtons(),
            'actions_label' => __('crud-fiesta::crud.button.actions'),
        ]);
    }

    public function create() : JsonResponse
    {
        $form_details = $this->crud_data_table->getCreationFormDetails();

        return response()->json($form_details);
    }

    public function store(
        Request $request
    ) : RedirectResponse
    {
        try {
            $this->crud_base_repository->create($request->all());
            return $this->redirectWithSuccess(__('crud-fiesta::crud.message.success_create', ['model_name' => $this->model_name_singular]));
        } catch (\Exception $e) {
            return $this->redirectWithError(__('crud-fiesta::crud.message.error_create', ['model_name' => $this->model_name_singular]));
        }
    }

    public function show(
        string|int $id
    ) : InertiaResponse
    {
        $item = $this->crud_base_repository->findOrFail($id);
        return Inertia::render('Crud/Show', [
            'item' => $item,
            'action' => 'show'
        ]);
    }

    public function edit(
        string|int $id
    ) : JsonResponse
    {
        $item = $this->crud_base_repository->findOrFail($id);
        return response()->json([
            'item' => $item,
            'action' => 'edit',
            'form_details' => $this->crud_data_table->getEditFormDetails()
        ]);
    }

    public function update(
        Request $request,
        string|int $id
    ) : RedirectResponse
    {
        try {
            $this->crud_base_repository->update($id, $request->all());
            return $this->redirectWithSuccess(__('crud-fiesta::crud.message.success_update', ['model_name' => $this->model_name_singular]));
        } catch (\Exception $e) {
            return $this->redirectWithError($e->getMessage());
        }
    }

    public function destroy(
        string|int $id
    ) : RedirectResponse
    {
        try {
            if ($this->crud_base_repository->delete($id)) {
                return $this->redirectWithSuccess(__('crud-fiesta::crud.message.success_delete', ['model_name' => $this->model_name_singular]));
            } else {
                return $this->redirectWithError(__('crud-fiesta::crud.message.error_delete', ['model_name' => $this->model_name_singular]));
            }
        } catch (\Exception $e) {
            return $this->redirectWithError($e->getMessage());
        }
    }
}
