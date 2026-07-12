<template>
  <div class="crud-index-page">
    <Toast />
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

    <CrudForm
      :visible="formVisible"
      :title="formTitle"
      :fields="formFields"
      :data="formData"
      :loading="formLoading"
      :is-edit="formIsEdit"
      @update:visible="formVisible = $event"
      @submit="onFormSubmit"
      @close="onFormClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { route } from 'ziggy-js'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import CrudDataTable from '../Components/Crud/CrudDataTable.vue'
import CrudActions from '../Components/Crud/CrudActions.vue'
import CrudForm from '../Components/Crud/CrudForm.vue'

interface ColumnDetail {
  field: string
  header: string
}

interface BackendCrudButton {
  action: string
  icon: string
  label: string
  route_name: string
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

const toast = useToast()

const loading = ref(false)

// ── Flash message → Toast ───────────────────────────────────────────────

router.on('finish', () => {
  const flash = page.props.flash as Record<string, any> | undefined
  if (flash?.success) {
    toast.add({ severity: 'success', summary: 'Success', detail: flash.success, life: 5000 })
  }
  if (flash?.error) {
    toast.add({ severity: 'error', summary: 'Error', detail: flash.error, life: 5000 })
  }
})

// ── CrudForm dialog state ──────────────────────────────────────────────

const formVisible = ref(false)
const formTitle = ref('')
const formFields = ref<Record<string, any>>({})
const formData = ref<Record<string, any> | null>(null)
const formIsEdit = ref(false)
const formLoading = ref(false)
const editingId = ref<number | string | null>(null)

// ── Button mapping ─────────────────────────────────────────────────────

const routeSegmentToAction: Record<string, string> = {
  show: 'view',
  edit: 'edit',
  destroy: 'delete',
}

function mapButtonAction(btn: BackendCrudButton): string {
  if (btn.event) return btn.event
  return routeSegmentToAction[btn.action] || btn.action
}

const mappedButtons = computed<FrontendCrudButton[]>(() =>
  props.crud_buttons.map((btn) => ({
    action: mapButtonAction(btn),
    icon: btn.icon,
    label: btn.label,
  })),
)

// ── Create / Edit ──────────────────────────────────────────────────────

function buildRoute(name: string): string {
  return route(name)
}

function buildRouteWithId(name: string, id: string | number): string {
  return route(name, { id })
}

async function goToCreate() {
  const btn = props.crud_buttons.find(b => b.action === 'create')
  formLoading.value = true
  try {
    const url = btn ? buildRoute(btn.route_name) : `/${props.route_prefix}/create`
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    })
    const fields = await res.json()
    formFields.value = fields
    formTitle.value = crudT('crud.button.create')
    formData.value = null
    formIsEdit.value = false
    editingId.value = null
    formVisible.value = true
  } catch (err) {
    console.error('Failed to load create form:', err)
  } finally {
    formLoading.value = false
  }
}

async function onEdit(id: any) {
  const btn = props.crud_buttons.find(b => b.action === 'edit')
  formLoading.value = true
  try {
    const url = btn ? buildRouteWithId(btn.route_name, id) : `/${props.route_prefix}/${id}/edit`
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    })
    const json = await res.json()
    formFields.value = json.form_details
    formTitle.value = crudT('crud.button.edit')
    formData.value = json.item
    formIsEdit.value = true
    editingId.value = id
    formVisible.value = true
  } catch (err) {
    console.error('Failed to load edit form:', err)
  } finally {
    formLoading.value = false
  }
}

function onFormSubmit(data: Record<string, any>) {
  formLoading.value = true

  if (formIsEdit.value && editingId.value !== null) {
    router.put(`/${props.route_prefix}/${editingId.value}`, data, {
      onFinish: () => {
        formLoading.value = false
        formVisible.value = false
      },
    })
  } else {
    router.post(`/${props.route_prefix}`, data, {
      onFinish: () => {
        formLoading.value = false
        formVisible.value = false
      },
    })
  }
}

function onFormClose() {
  formVisible.value = false
  formData.value = null
  editingId.value = null
}

// ── View / Delete ──────────────────────────────────────────────────────

function onView(_id: any) {
  // Show is ignored for now
}

function onDelete(id: any) {
  router.delete(`/${props.route_prefix}/${id}`)
}

// ── Pagination / Sort / Search ─────────────────────────────────────────

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