<template>
  <div class="crud-index-page">
    <Toast ref="toastRef" />
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <Button variant="default" @click="goToCreate(crudT('crud.button.create'))">
        <Plus class="h-4 w-4 mr-1" />
        {{ crudT('crud.button.create') }}
      </Button>
    </div>
    <CrudDataTable
      :items="paginatedData.data"
      :columns="tableColumns"
      :total-records="paginatedData.total"
      :per-page="paginatedData.per_page"
      :per-page-options="pagination_per_page_options"
      :loading="loading"
      :key-name="key_name"
      :route-prefix="route_prefix"
      @paginate="onPaginate" @sort="onSort" @search="onSearch" @filter="onFilter"
      @per-page-change="onPerPageChange" @export="onExport"
    >
      <template #actions="{ row }">
        <CrudActions :row="row" :buttons="mappedButtons" :key-name="key_name"
          @view="onView" @edit="(id) => onEdit(id, crudT('crud.button.edit'))" @delete="onDelete" />
      </template>
    </CrudDataTable>
    <CrudForm
      :visible="formVisible" :title="formTitle" :fields="formFields" :form="form"
      :loading="form.processing" :is-edit="formIsEdit" :errors="form.errors"
      @update:visible="formVisible = $event" @submit="onFormSubmit" @close="onFormClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { Plus } from 'lucide-vue-next'
import Button from '../Components/ui/Button.vue'
import ToastComponent from '../Components/ui/Toast.vue'
import CrudDataTable from '../Components/Crud/CrudDataTable.vue'
import CrudActions from '../Components/Crud/CrudActions.vue'
import CrudForm from '../Components/Crud/CrudForm.vue'
import { useCrudTranslation } from '../composables/useCrudTranslation'
import { useFlashToasts } from '../composables/useFlashToasts'
import { useCrudForm } from '../composables/useCrudForm'
import { useExport } from '../composables/useExport'

interface ColumnDetail { field: string; header: string }
interface BackendCrudButton { action: string; icon: string; label: string; route_name: string; event?: string }
interface PaginatorData { data: Record<string, any>[]; total: number; per_page: number; current_page: number }
interface Props {
  column_data: PaginatorData
  columns_details: ColumnDetail[]
  route_prefix: string
  key_name: string
  model_lang: string
  crud_buttons: BackendCrudButton[]
  pagination_per_page_options: number[]
}

const props = withDefaults(defineProps<Props>(), {
  pagination_per_page_options: () => [10, 25, 50, 100],
})
const { crudT } = useCrudTranslation()

const paginatedData = computed(() => props.column_data)
const tableColumns = computed(() => props.columns_details)
const modelTranslationKey = computed(() => props.model_lang)

const modelPlural = computed(() => {
  const key = modelTranslationKey.value
  const fromModel = crudT(key + '.plural')
  if (fromModel !== key + '.plural') return fromModel
  const parts = (key || '').split('.')
  return parts[parts.length - 1] || 'Items'
})
const title = computed(() => crudT('crud.title.index').replace(':model_name', modelPlural.value))

const { toastRef } = useFlashToasts()

const {
  formVisible, formTitle, formFields, formIsEdit, form,
  mappedButtons, goToCreate, onEdit, onFormSubmit, onFormClose, onView, onDelete,
} = useCrudForm(props.route_prefix, props.crud_buttons)

const loading = ref(false)
const currentSortField = ref<string | null>(null)
const currentSortOrder = ref<number>(1)
const currentSearch = ref<string>('')
const currentFilters = ref<Record<string, { type: string; value: any }>>({})

const { onExport } = useExport(props.route_prefix, toastRef, currentSearch, currentSortField, currentSortOrder, currentFilters)

function onPaginate(event: { page: number; rows: number }) {
  router.get(window.location.pathname, { page: event.page + 1, per_page: event.rows }, { preserveState: true, preserveScroll: true, only: ['column_data'], onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onPerPageChange(perPage: number) {
  router.get(window.location.pathname, { per_page: perPage, page: 1 }, { preserveState: true, preserveScroll: true, only: ['column_data'], onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onSort(event: { sortField: string; sortOrder: number }) {
  currentSortField.value = event.sortField; currentSortOrder.value = event.sortOrder
  router.get(window.location.pathname, { page: paginatedData.value.current_page, per_page: paginatedData.value.per_page, sort_field: event.sortField, sort_order: event.sortOrder }, { preserveState: true, preserveScroll: true, only: ['column_data'], onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onSearch(event: { query: string }) {
  currentSearch.value = event.query
  router.get(window.location.pathname, { search: event.query }, { preserveState: true, preserveScroll: true, only: ['column_data'], replace: true, onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onFilter(event: { globalFilter: Record<string, { type: string; value: any }> }) {
  currentFilters.value = event.globalFilter
  router.get(window.location.pathname, { filters: event.globalFilter }, { preserveState: true, preserveScroll: true, only: ['column_data'], replace: true, onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
</script>