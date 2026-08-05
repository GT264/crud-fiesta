<?php

namespace GT264\CrudFiesta\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

use GT264\CrudFiesta\DataTables\CrudBaseDataTable;
use GT264\CrudFiesta\Jobs\ExportDataJob;
use GT264\CrudFiesta\Repositories\CrudBaseRepository;
use GT264\CrudFiesta\Traits\SetLanguage;
use GT264\CrudFiesta\Traits\SetRoutePrefix;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

abstract class CrudBaseController extends Controller
{
    protected string $view_name = 'Crud/Index';

    use AuthorizesRequests, SetLanguage, SetRoutePrefix;

    //----------------------------------------------------------------------------
    // CONSTRUCTOR
    //----------------------------------------------------------------------------

    public function __construct(
        protected Model $model,
        protected CrudBaseDataTable $crud_data_table,
        protected CrudBaseRepository $crud_base_repository
    )
    {
        $this->setLang();
        $this->setRoutePrefix();
    }

    //----------------------------------------------------------------------------
    // HELPER METHODS
    //----------------------------------------------------------------------------

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

    protected function getRepositoryParametersFromRequest(Request $request) : array
    {
        $sortField = $request->query('sort_field');
        $sortOrder = $request->query('sort_order');
        $search = $request->query('search');
        $filters = $request->query('filters', []);

        // Map sort order: 1 = ascending, -1 = descending
        $sortDirection = 'asc';
        if ($sortOrder !== null) {
            $sortDirection = (int) $sortOrder === -1 ? 'desc' : 'asc';
        }

        return [
            'sortField' => $sortField,
            'sortDirection' => $sortDirection,
            'search' => $search,
            'filters' => $filters,
        ];
    }

    //---------------------------------------------------------------------------
    // EXPORT METHODS
    //---------------------------------------------------------------------------

    public function exportStart(Request $request) : JsonResponse
    {
        $this->authorize('viewAny', $this->model::class);

        $validated = $request->validate([
            'format' => 'required|in:xlsx,csv',
            'search' => 'nullable|string',
            'sort_field' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'filters' => 'nullable|array',
        ]);

        [
            'sortField' => $sortField,
            'sortDirection' => $sortDirection,
            'search' => $search,
            'filters' => $filters,
        ] = $this->getRepositoryParametersFromRequest($request);

        $format = $validated['format'];

        $exportId = (string) Str::uuid();
        $timestamp = now()->format('Y-m-d_His');
        $modelName = Str::plural(Str::snake(class_basename($this->model::class)));
        $columns = $this->crud_data_table->getColumnsToExport();
        $relationMap = $this->crud_data_table->getRelationDisplayMap();

        Cache::put("crud-fiesta:export:{$exportId}", [
            'status' => 'queued',
            'format' => $format,
        ], now()->addHours(24));

        ExportDataJob::dispatch(
            exportId: $exportId,
            modelClass: $this->model::class,
            modelName: $modelName,
            columns: $columns,
            relationMap: $relationMap,
            sortField: $sortField,
            sortDirection: $sortDirection,
            search: $search,
            filters: $filters,
            format: $format,
            timestamp: $timestamp,
        );

        return response()->json(['export_id' => $exportId]);
    }

    public function exportStatus(string $id) : JsonResponse
    {
        $data = Cache::get("crud-fiesta:export:{$id}");

        if (!$data) {
            return response()->json(['status' => 'not_found'], 404);
        }

        $response = [
            'status' => $data['status'],
            'processed' => $data['processed'] ?? 0,
            'total' => $data['total'] ?? 0,
        ];

        if ($data['status'] === 'failed') {
            $response['error'] = $data['error'] ?? 'Unknown error';
        }

        return response()->json($response);
    }

    public function exportDownload(string $id) : StreamedResponse
    {
        $data = Cache::get("crud-fiesta:export:{$id}");

        if (!$data || $data['status'] !== 'completed') {
            abort(404);
        }

        $filePath = $data['file_path'];

        if (!file_exists($filePath)) {
            Cache::forget("crud-fiesta:export:{$id}");
            abort(404);
        }

        $filename = basename($filePath);
        $mimeType = $data['format'] === 'csv'
            ? 'text/csv'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        return response()->streamDownload(function () use ($filePath, $id) {
            readfile($filePath);
            @unlink($filePath);
            Cache::forget("crud-fiesta:export:{$id}");
        }, $filename, ['Content-Type' => $mimeType]);
    }

    //----------------------------------------------------------------------------
    // CRUD METHODS
    //----------------------------------------------------------------------------

    public function index(
        Request $request
    ) : InertiaResponse
    {
        $this->authorize('viewAny', $this->model::class);

        $relations = $this->crud_data_table->getRelationDisplayMap();

        [
            'sortField' => $sortField,
            'sortDirection' => $sortDirection,
            'search' => $search,
            'filters' => $filters,
        ] = $this->getRepositoryParametersFromRequest($request);

        $perPage = (int) $request->query('per_page', config('crud-fiesta.pagination_per_page', 10));

        return Inertia::render($this->view_name, [
            'column_data' => $this->crud_base_repository->paginate(
                $perPage,
                array_unique(array_merge($this->crud_data_table::default_columns, [$this->model->getKeyName()])),
                $sortField,
                $sortDirection,
                $relations,
                $search,
                $filters,
            ),
            'columns_details' => array_values($this->crud_data_table->details_columns),
            'column_filters' => $this->crud_data_table->getColumnFilters(),
            'route_prefix' => $this->route_prefix,
            'key_name' => $this->model->getKeyName(),
            'model_lang' => $this->lang,
            'optional_buttons' => $this->crud_data_table->getOptionalButtons(),
            'crud_buttons' => $this->crud_data_table->getCrudButtons(),
            'actions_label' => __('crud-fiesta::crud.button.actions'),
            'lang' => $this->lang,
            'pagination_per_page' => config('crud-fiesta.pagination_per_page', 10),
            'pagination_per_page_options' => config('crud-fiesta.pagination_per_page_options', [10, 25, 50, 100]),
        ]);
    }

    public function create() : JsonResponse
    {
        $this->authorize('create', $this->model::class);

        $form_details = $this->crud_data_table->getCreationFormDetails();

        return response()->json($form_details);
    }

    protected function doStore(
        array $validatedData
    ) : RedirectResponse
    {
        $this->authorize('create', $this->model::class);

        $this->crud_base_repository->create($validatedData);

        return $this->redirectWithSuccess(__('crud-fiesta::crud.message.success_create', ['model_name' => $this->model_name_singular]));
    }

    public function show(
        string|int $id
    ) : InertiaResponse
    {
        $item = $this->crud_base_repository->findOrFail($id);
        $this->authorize('view', $item);
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
        $this->authorize('update', $item);
        return response()->json([
            'item' => $item,
            'action' => 'edit',
            'form_details' => $this->crud_data_table->getEditFormDetails()
        ]);
    }

    protected function doUpdate(
        string|int $id, 
        array $validatedData
    ) : RedirectResponse
    {
        $item = $this->crud_base_repository->findOrFail($id);
        $this->authorize('update', $item);

        $this->crud_base_repository->update($id, $validatedData);

        return $this->redirectWithSuccess(__('crud-fiesta::crud.message.success_update', ['model_name' => $this->model_name_singular]));
    }

    public function destroy(
        string|int $id
    ) : RedirectResponse
    {
        $item = $this->crud_base_repository->findOrFail($id);
        $this->authorize('delete', $item);

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
