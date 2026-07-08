<template>
  <div class="crud-index-page">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <Button
        :label="crudT('crud.button.create')"
        icon="pi pi-plus"
        @click="goToCreate"
      />
    </div>

    <CrudDataTable
      :items="column_data.data"
      :columns="columns_details"
      :total-records="column_data.total"
      :per-page="column_data.per_page"
      :loading="loading"
      @paginate="onPaginate"
      @sort="onSort"
      @search="onSearch"
    >
      <template #actions="{ row }">
        <CrudActions
          :row="row"
          :buttons="mappedButtons"
          @view="onView"
          @edit="onEdit"
          @delete="onDelete"
        />
      </template>
    </CrudDataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import Button from 'primevue/button'
import CrudDataTable from '../Components/Crud/CrudDataTable.vue'
import CrudActions from '../Components/Crud/CrudActions.vue'

interface ColumnDetail {
  field: string
  header: string
}

interface BackendCrudButton {
  icon: string
  label: string
  route: string
  binding: string
  placeholder: string
  method: string
  event?: string
}

interface FrontendCrudButton {
  action: string
  icon: string
  label: string
}

interface PaginatorData {
  data: Record<string, any>[]
  total: number
  per_page: number
  current_page: number
}

interface Props {
  title?: string
  column_data: PaginatorData
  columns_details: ColumnDetail[]
  route_prefix: string
  crud_buttons: BackendCrudButton[]
}

const page = usePage()

function crudT(key: string): string {
  return (page.props.crudLang as Record<string, string>)?.[key] ?? key
}

const props = withDefaults(defineProps<Props>(), {
  title: 'CRUD Index',
})

const loading = ref(false)

/**
 * Map backend crud_buttons to the format expected by CrudActions.
 *
 * Backend button shape (from CrudBaseDataTable::makeCrudButton):
 *   { icon, label, route, binding, placeholder, method, event? }
 *
 * The `route` value is a Laravel route name (e.g. "posts.show").
 * We extract the last segment to determine the action.
 *
 * CrudActions expects:
 *   { action: 'view' | 'edit' | 'delete', icon, label }
 */
const routeSegmentToAction: Record<string, string> = {
  show: 'view',
  edit: 'edit',
  destroy: 'delete',
}

function mapButtonAction(btn: BackendCrudButton): string {
  if (btn.event) {
    return btn.event
  }
  const segments = btn.route.split('.')
  const lastSegment = segments[segments.length - 1]
  return routeSegmentToAction[lastSegment] || lastSegment
}

const mappedButtons = computed<FrontendCrudButton[]>(() =>
  props.crud_buttons.map((btn) => ({
    action: mapButtonAction(btn),
    icon: btn.icon,
    label: btn.label,
  })),
)

function goToCreate() {
  router.get(`/${props.route_prefix}/create`)
}

function onView(id: any) {
  router.get(`/${props.route_prefix}/${id}`)
}

function onEdit(id: any) {
  router.get(`/${props.route_prefix}/${id}/edit`)
}

function onDelete(id: any) {
  router.delete(`/${props.route_prefix}/${id}`)
}

function onPaginate(event: { page: number; rows: number }) {
  router.get(
    window.location.pathname,
    { page: event.page + 1, per_page: event.rows },
    {
      preserveState: true,
      preserveScroll: true,
      only: ['column_data'],
      onStart: () => (loading.value = true),
      onFinish: () => (loading.value = false),
    },
  )
}

function onSort(event: { sortField: string; sortOrder: number }) {
  router.get(
    window.location.pathname,
    {
      page: props.column_data.current_page,
      per_page: props.column_data.per_page,
      sort_field: event.sortField,
      sort_order: event.sortOrder,
    },
    {
      preserveState: true,
      preserveScroll: true,
      only: ['column_data'],
      onStart: () => (loading.value = true),
      onFinish: () => (loading.value = false),
    },
  )
}

function onSearch(event: { query: string }) {
  router.get(
    window.location.pathname,
    { search: event.query },
    {
      preserveState: true,
      preserveScroll: true,
      only: ['column_data'],
      replace: true,
      onStart: () => (loading.value = true),
      onFinish: () => (loading.value = false),
    },
  )
}
</script>