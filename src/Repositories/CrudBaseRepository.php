<?php

namespace GT264\CrudFiesta\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class CrudBaseRepository
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     */
    public function __construct()
    {
        $this->model = $this->makeModel();
    }

    /**
     * Crea un'istanza del model
     *
     * @return Model
     */
    abstract protected function makeModel(): Model;


    /**
     * Recupera tutti i record
     *
     * @param array $columns
     * @return Collection
     */
    public function all(array $columns = ['*']): Collection
    {
        return $this->model->all($columns);
    }

    /**
     * Trova un record per ID
     *
     * @param int $id
     * @param array $columns
     * @return Model|null
     */
    public function find(int $id, array $columns = ['*']): ?Model
    {
        return $this->model->find($id, $columns);
    }

    /**
     * Trova un record per ID o fallisce
     *
     * @param int $id
     * @param array $columns
     * @return Model
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail(int $id, array $columns = ['*']): Model
    {
        return $this->model->findOrFail($id, $columns);
    }

    /**
     * Crea un nuovo record
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * Aggiorna un record esistente
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $record = $this->find($id);
        
        if (!$record) {
            return false;
        }

        return $record->update($data);
    }

    /**
     * Elimina un record
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $record = $this->find($id);
        
        if (!$record) {
            return false;
        }

        return $record->delete();
    }

    /**
     * Paginazione dei risultati
     *
     * @param int $perPage
     * @param array $columns
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15, array $columns = ['*'], ?string $sortField = null, string $sortOrder = 'asc', array $relations = [], ?string $search = null, ?array $filters = null): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($sortField !== null) {
            $query->orderBy($sortField, $sortOrder);
        }

        if ($search !== null && $search !== '') {
            $searchableColumns = $columns !== ['*'] ? $columns : [];
            $query->where(function ($q) use ($search, $searchableColumns, $relations) {
                if (!empty($searchableColumns)) {
                    foreach ($searchableColumns as $col) {
                        if (isset($relations[$col])) {
                            $relationName = $relations[$col]['relation'];
                            $displayField = $relations[$col]['display_field'];
                            $q->orWhereHas($relationName, function ($r) use ($search, $displayField) {
                                $r->where($displayField, 'LIKE', '%' . $search . '%');
                            });
                        } else {
                            $q->orWhere($col, 'LIKE', '%' . $search . '%');
                        }
                    }
                }
            });
        }

        if ($filters !== null && !empty($filters)) {
            foreach ($filters as $field => $filterConfig) {
                $type = $filterConfig['type'] ?? 'select';
                $value = $filterConfig['value'] ?? null;

                if ($value === null || $value === '' || (is_array($value) && empty($value))) {
                    continue;
                }

                // Relation column: use whereHas
                if (isset($relations[$field])) {
                    $relationName = $relations[$field]['relation'];
                    $displayField = $relations[$field]['display_field'];

                    $query->whereHas($relationName, function ($r) use ($type, $displayField, $value) {
                        $keyName = $r->getModel()->getKeyName();
                        match ($type) {
                            'multiselect' => $r->whereIn($keyName, (array) $value),
                            'date_range' => $r->whereBetween($displayField, [$value['start'], $value['end']]),
                            default => $r->where($keyName, $value),
                        };
                    });
                } else {
                    // Regular column
                    match ($type) {
                        'multiselect' => $query->whereIn($field, (array) $value),
                        'date_range' => $query->whereBetween($field, [$value['start'], $value['end']]),
                        default => $query->where($field, $value),
                    };
                }
            }
        }

        foreach ($relations as $foreignKey => $relationConfig) {
            $relationName = $relationConfig['relation'];
            $displayField = $relationConfig['display_field'];

            $query->with([
                $relationName => function ($q) use ($foreignKey, $displayField) {
                    // Carica solo la chiave primaria e il campo da mostrare
                    $relatedModel = $q->getModel();
                    $q->select([$relatedModel->getKeyName(), $displayField]);
                }
            ]);
        }

        return $query->paginate($perPage, $columns);
    }

    /**
     * Ricerca con criteri personalizzati
     *
     * @param array $criteria
     * @param array $columns
     * @return Collection
     */
    public function findWhere(array $criteria, array $columns = ['*']): Collection
    {
        $query = $this->model->newQuery();

        foreach ($criteria as $field => $value) {
            if (is_array($value)) {
                $query->whereIn($field, $value);
            } else {
                $query->where($field, $value);
            }
        }

        return $query->get($columns);
    }

    /**
     * Ricerca con criteri personalizzati (primo risultato)
     *
     * @param array $criteria
     * @param array $columns
     * @return Model|null
     */
    public function findWhereFirst(array $criteria, array $columns = ['*']): ?Model
    {
        $query = $this->model->newQuery();

        foreach ($criteria as $field => $value) {
            if (is_array($value)) {
                $query->whereIn($field, $value);
            } else {
                $query->where($field, $value);
            }
        }

        return $query->first($columns);
    }

    /**
     * Conta i record
     *
     * @return int
     */
    public function count(): int
    {
        return $this->model->count();
    }

    /**
     * Restituisce il model
     *
     * @return Model
     */
    public function getModel(): Model
    {
        return $this->model;
    }

    /**
     * Inizia una nuova query
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        return $this->model->newQuery();
    }
}
