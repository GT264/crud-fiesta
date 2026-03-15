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
    protected string $model_class;
    protected string $data_table_class;
    protected string $repository_class;

    protected string $view_name = 'Crud/Index';

    protected Model $model;
    protected CrudBaseDataTable $data_table;
    protected CrudBaseRepository $repository;

    use AuthorizesRequests, SetLanguage, SetRoutePrefix;

    public function __construct()
    {
        $this->model = app($this->model_class);
        $this->authorizeResource($this->model_class, $this->model->getKeyName());
        $this->data_table = app($this->data_table_class);
        $this->repository = app($this->repository_class);
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
            'column_data' => $this->repository->paginate($this->data_table->per_page, [...$this->data_table::default_columns, $this->model->getKeyName()]),
            'columns_details' => array_values($this->data_table->details_columns),
            'route_prefix' => $this->route_prefix,
            'optional_buttons' => $this->data_table->getOptionalButtons(),
            'crud_buttons' => $this->data_table->getCrudButtons(),
        ]);
    }

    public function create() : JsonResponse
    {
        $form_details = $this->data_table->getCreationFormDetails();

        return response()->json($form_details);
    }

    public function store(
        Request $request
    ) : RedirectResponse
    {
        try {
            $this->repository->create($request->all());
            return $this->redirectWithSuccess('Record created successfully');
        } catch (\Exception $e) {
            return $this->redirectWithError($e->getMessage());
        }
    }

    public function show(
        string|int $id
    ) : InertiaResponse
    {
        $item = $this->repository->findOrFail($id);
        return Inertia::render('Crud/Show', [
            'item' => $item,
            'action' => 'show'
        ]);
    }

    public function edit(
        string|int $id
    ) : JsonResponse
    {
        $item = $this->repository->findOrFail($id);
        return response()->json([
            'item' => $item,
            'action' => 'edit',
            'form_details' => $this->data_table->getEditFormDetails()
        ]);
    }

    public function update(
        Request $request,
        string|int $id
    ) : RedirectResponse
    {
        try {
            $this->repository->update($id, $request->all());
            return $this->redirectWithSuccess('Record updated successfully');
        } catch (\Exception $e) {
            return $this->redirectWithError($e->getMessage());
        }
    }

    public function destroy(
        string|int $id
    ) : RedirectResponse
    {
        try {
            if ($this->repository->delete($id)) {
                return $this->redirectWithSuccess('Record deleted successfully');
            } else {
                return $this->redirectWithError('Record not deleted');
            }
        } catch (\Exception $e) {
            return $this->redirectWithError($e->getMessage());
        }
    }
}
