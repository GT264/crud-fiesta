<?php

namespace GT264\CrudFiesta\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Access\AuthorizationException;
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

    use AuthorizesRequests, SetLanguage, SetRoutePrefix;

    protected const string view_name = 'Pages/Index';

    protected const string storeRequestClass = '';

    protected const string updateRequestClass = ''; 

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

    protected function redirectToIndex(
        string $with,
        string $message
    ) : RedirectResponse
    {
        return redirect()->route($this->route_prefix . '.index')
            ->with($with, $message);
    }

    protected function redirectWithError(
        string $message
    ) : RedirectResponse
    {
        return $this->redirectToIndex('error', $message);
    }

    protected function redirectWithSuccess(
        string $message
    ) : RedirectResponse
    {
        return $this->redirectToIndex('success', $message);
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


    //----------------------------------------------------------------------------
    // TEST HELPERS
    //----------------------------------------------------------------------------

    public function getRouteNamePrefix() : string
    {
        return $this->route_prefix;
    }

    public function getInertiaPage() : String
    {
        return self::view_name;
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
            repository: $this->crud_base_repository,
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

    /**
     * Get validation rules from the FormRequest class without triggering
     * Laravel's automatic FormRequest validation.
     *
     * @param  string  $requestClass
     * @return array
     *
     * @throws \RuntimeException
     */
    protected function getValidationRules(string $requestClass, Request $request): array
    {
        if (!class_exists($requestClass)) {
            $modelName = class_basename($this->model::class);
            throw new \RuntimeException(
                "Form Request class [{$requestClass}] not found. " .
                "Run 'php artisan crud:generate {$modelName}' to create it."
            );
        }

        /** @var \Illuminate\Foundation\Http\FormRequest $formRequest */
        $formRequest = $requestClass::createFrom($request);
        $formRequest->setContainer(app());

        if (method_exists($formRequest, 'authorize') && !$formRequest->authorize()) {
            throw new AuthorizationException;
        }

        return $formRequest->rules();
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

        return Inertia::render(self::view_name, [
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

    public function store(Request $request) : RedirectResponse
    {
        $this->authorize('create', $this->model::class);

        $validated = $request->validate($this->getValidationRules(static::storeRequestClass, $request));

        $this->crud_base_repository->create($validated);

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

    public function update(Request $request, string|int $id) : RedirectResponse
    {
        
        $item = $this->crud_base_repository->findOrFail($id);
        $this->authorize('update', $item);

        $validated = $request->validate($this->getValidationRules(static::updateRequestClass, $request));

        $this->crud_base_repository->update($id, $validated);

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
