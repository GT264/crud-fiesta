<template>
  <div class="crud-index-page">
    <Toast ref="toastRef" />
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <Button variant="default" @click="goToCreate">
        <Plus class="h-4 w-4 mr-1" />
        {{ crudT('crud.button.create') }}
      </Button>
    </div>
    <CrudDataTable :items="column_data.data" :columns="columns_details" :total-records="column_data.total" :per-page="column_data.per_page" :per-page-options="pagination_per_page_options" :loading="loading" :key-name="key_name" :route-prefix="route_prefix" @paginate="onPaginate" @sort="onSort" @search="onSearch" @filter="onFilter" @per-page-change="onPerPageChange" @export="onExport">
      <template #actions="{ row }">
        <CrudActions :row="row" :buttons="mappedButtons" :key-name="key_name" @view="onView" @edit="onEdit" @delete="onDelete" />
      </template>
    </CrudDataTable>
    <CrudForm :visible="formVisible" :title="formTitle" :fields="formFields" :data="formData" :loading="formLoading" :is-edit="formIsEdit" @update:visible="formVisible = $event" @submit="onFormSubmit" @close="onFormClose" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { route } from 'ziggy-js'
import { Plus } from 'lucide-vue-next'
import Button from '../Components/ui/Button.vue'
import ToastComponent from '../Components/ui/Toast.vue'
import CrudDataTable from '../Components/Crud/CrudDataTable.vue'
import CrudActions from '../Components/Crud/CrudActions.vue'
import CrudForm from '../Components/Crud/CrudForm.vue'

interface ColumnDetail { field: string; header: string }
interface BackendCrudButton { action: string; icon: string; label: string; route_name: string; event?: string }
interface FrontendCrudButton { action: string; icon: string; label: string }
interface PaginatorData { data: Record<string, any>[]; total: number; per_page: number; current_page: number }
interface Props { column_data: PaginatorData; columns_details: ColumnDetail[]; route_prefix: string; key_name: string; model_lang: string; crud_buttons: BackendCrudButton[]; pagination_per_page: number; pagination_per_page_options: number[] }

const page = usePage()
function crudT(key: string): string { return (page.props.crudLang as Record<string, string>)?.[key] ?? key }
const props = withDefaults(defineProps<Props>(), {})

const modelPlural = computed(() => {
  const fromModel = crudT(props.model_lang + '.plural')
  if (fromModel !== props.model_lang + '.plural') return fromModel
  const parts = (props.model_lang || '').split('.')
  return parts[parts.length - 1] || 'Items'
})

const title = computed(() => {
  return crudT('crud.title.index').replace(':model_name', modelPlural.value)
})

const Toast = ToastComponent
const toastRef = ref<InstanceType<typeof ToastComponent> | null>(null)
const loading = ref(false)
const shownFlashes = new Set<string>()

router.on('finish', () => {
  const flash = page.props.flash as Record<string, any> | undefined
  if (flash?.success && !shownFlashes.has('success:' + flash.success)) {
    shownFlashes.add('success:' + flash.success)
    toastRef.value?.add({ severity: 'success', summary: 'Success', detail: flash.success, life: 5000 })
  }
  if (flash?.error && !shownFlashes.has('error:' + flash.error)) {
    shownFlashes.add('error:' + flash.error)
    toastRef.value?.add({ severity: 'error', summary: 'Error', detail: flash.error, life: 5000 })
  }
})

const formVisible = ref(false); const formTitle = ref(''); const formFields = ref<Record<string, any>>({})
const formData = ref<Record<string, any> | null>(null); const formIsEdit = ref(false)
const formLoading = ref(false); const editingId = ref<number | string | null>(null)

const routeSegmentToAction: Record<string, string> = { show: 'view', edit: 'edit', destroy: 'delete' }
function mapButtonAction(btn: BackendCrudButton): string { return btn.event || routeSegmentToAction[btn.action] || btn.action }
const mappedButtons = computed<FrontendCrudButton[]>(() => props.crud_buttons.map((btn) => ({ action: mapButtonAction(btn), icon: btn.icon, label: btn.label })))

function buildRoute(name: string): string { return route(name) }
function buildRouteWithId(name: string, id: string | number): string { return route(name, { id }) }

async function goToCreate() {
  const btn = props.crud_buttons.find(b => b.action === 'create')
  formLoading.value = true
  try {
    const url = btn ? buildRoute(btn.route_name) : `/${props.route_prefix}/create`
    const fields = await (await fetch(url, { headers: { 'Accept': 'application/json' } })).json()
    formFields.value = fields; formTitle.value = crudT('crud.button.create')
    formData.value = null; formIsEdit.value = false; editingId.value = null; formVisible.value = true
  } catch (err) { console.error('Failed to load create form:', err) }
  finally { formLoading.value = false }
}

async function onEdit(id: any) {
  const btn = props.crud_buttons.find(b => b.action === 'edit')
  formLoading.value = true
  try {
    const url = btn ? buildRouteWithId(btn.route_name, id) : `/${props.route_prefix}/${id}/edit`
    const json = await (await fetch(url, { headers: { 'Accept': 'application/json' } })).json()
    formFields.value = json.form_details; formTitle.value = crudT('crud.button.edit')
    formData.value = json.item; formIsEdit.value = true; editingId.value = id; formVisible.value = true
  } catch (err) { console.error('Failed to load edit form:', err) }
  finally { formLoading.value = false }
}

function onFormSubmit(data: Record<string, any>) {
  formLoading.value = true
  const finish = () => { formLoading.value = false; formVisible.value = false }
  formIsEdit.value ? router.put(`/${props.route_prefix}/${editingId.value}`, data, { onFinish: finish }) : router.post(`/${props.route_prefix}`, data, { onFinish: finish })
}

function onFormClose() { formVisible.value = false; formData.value = null; editingId.value = null }
function onView(_id: any) {}
function onDelete(id: any) { router.delete(`/${props.route_prefix}/${id}`) }

function onPaginate(event: { page: number; rows: number }) {
  router.get(window.location.pathname, { page: event.page + 1, per_page: event.rows }, { preserveState: true, preserveScroll: true, only: ['column_data'], onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onPerPageChange(perPage: number) {
  router.get(window.location.pathname, { per_page: perPage, page: 1 }, { preserveState: true, preserveScroll: true, only: ['column_data'], onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onSort(event: { sortField: string; sortOrder: number }) {
  currentSortField.value = event.sortField
  currentSortOrder.value = event.sortOrder
  router.get(window.location.pathname, { page: props.column_data.current_page, per_page: props.column_data.per_page, sort_field: event.sortField, sort_order: event.sortOrder }, { preserveState: true, preserveScroll: true, only: ['column_data'], onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onSearch(event: { query: string }) {
  currentSearch.value = event.query
  router.get(window.location.pathname, { search: event.query }, { preserveState: true, preserveScroll: true, only: ['column_data'], replace: true, onStart: () => loading.value = true, onFinish: () => loading.value = false })
}
function onFilter(event: { globalFilter: Record<string, { type: string; value: any }> }) {
  currentFilters.value = event.globalFilter
  router.get(window.location.pathname, { filters: event.globalFilter }, { preserveState: true, preserveScroll: true, only: ['column_data'], replace: true, onStart: () => loading.value = true, onFinish: () => loading.value = false })
}

//----------------------------------------------------------------------------
// EXPORT LOGIC
//----------------------------------------------------------------------------

const currentSortField = ref<string | null>(null)
const currentSortOrder = ref<number>(1)
const currentSearch = ref<string>('')
const currentFilters = ref<Record<string, { type: string; value: any }>>({})

let pollInterval: ReturnType<typeof setInterval> | null = null

async function onExport(format: 'xlsx' | 'csv') {
  try {
    const body: Record<string, any> = { format }

    if (currentSearch.value) {
      body.search = currentSearch.value
    }
    if (currentSortField.value) {
      body.sort_field = currentSortField.value
      body.sort_order = currentSortOrder.value
    }
    if (Object.keys(currentFilters.value).length > 0) {
      body.filters = currentFilters.value
    }

    const resp = await fetch(`/${props.route_prefix}/export/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': (page.props as any).csrf_token ?? '',
      },
      body: JSON.stringify(body),
    })

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ message: 'Export request failed' }))
      toastRef.value?.add({ severity: 'error', summary: 'Export Error', detail: err.message || 'Export request failed', life: 5000 })
      return
    }

    const { export_id } = await resp.json()

    toastRef.value?.add({ severity: 'info', summary: 'Export', detail: 'Export started — preparing your file...', life: 120000 })

    // Begin polling
    startPolling(export_id)
  } catch (err: any) {
    toastRef.value?.add({ severity: 'error', summary: 'Export Error', detail: 'Export failed: ' + (err.message || 'Unknown error'), life: 5000 })
  }
}

function startPolling(exportId: string) {
  stopPolling()

  pollInterval = setInterval(async () => {
    try {
      const resp = await fetch(`/${props.route_prefix}/export/status/${exportId}`, {
        headers: { 'Accept': 'application/json' },
      })

      if (!resp.ok) {
        console.warn('[crud-fiesta] Export status returned non-OK:', resp.status)
        return
      }

      const data = await resp.json()

      if (data.status === 'queued' || data.status === 'processing') {
        const detail = data.status === 'queued'
          ? 'Export started — preparing your file...'
          : `Exporting ${data.processed ?? 0} of ${data.total ?? 0} records...`

        toastRef.value?.add({ severity: 'info', summary: 'Export', detail, life: 120000 })
      } else if (data.status === 'completed') {
        stopPolling()
        triggerDownload(exportId)
      } else if (data.status === 'failed') {
        stopPolling()
        toastRef.value?.add({ severity: 'error', summary: 'Export Failed', detail: 'Export failed: ' + (data.error || 'Unknown error'), life: 10000 })
      }
    } catch (err) {
      console.warn('[crud-fiesta] Export polling error:', err)
      // Keep trying on network errors
    }
  }, 2000)
}

async function triggerDownload(exportId: string) {
  toastRef.value?.add({ severity: 'info', summary: 'Downloading...', detail: 'Your export file is being prepared', life: 5000 })

  const url = `/${props.route_prefix}/export/download/${exportId}`
  const resp = await fetch(url)
  const blob = await resp.blob()
  const blobUrl = URL.createObjectURL(blob)

  const anchor = document.createElement('a')
  anchor.href = blobUrl
  anchor.download = ''
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(blobUrl)
}

function stopPolling() {
  if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
}

onUnmounted(() => {
  stopPolling()
})
</script>