<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { toast } from 'vue-sonner'
import { useIntervalFn } from '@vueuse/core'
import CfDataTable from './CfDataTable.vue'
import type { CrudIndexPageProps, FilterConfig } from '../../types/crud-fiesta'

interface ExportStatusResponse {
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'not_found'
  processed?: number
  total?: number
  error?: string
}

const props = defineProps<CrudIndexPageProps>()

// Read initial state from URL query string
function getParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key)
}

function getFilters(): Record<string, unknown> {
  const params = new URLSearchParams(window.location.search)
  const filters: Record<string, unknown> = {}
  for (const [key, val] of params.entries()) {
    if (key.startsWith('filters[')) {
      const match = key.match(/^filters\[([^\]]+)\]$/)
      if (match) {
        const filterKey = match[1]
        if (filters[filterKey] !== undefined) {
          if (Array.isArray(filters[filterKey])) {
            (filters[filterKey] as string[]).push(val)
          } else {
            filters[filterKey] = [filters[filterKey] as string, val]
          }
        } else {
          filters[filterKey] = val
        }
      }
    }
  }
  return filters
}

const currentPage = computed(() => props.column_data.current_page)
const perPage = computed(() => props.column_data.per_page)
const sortField = computed(() => getParam('sort_field'))
const sortOrder = computed(() => {
  const val = getParam('sort_order')
  if (val === '1') return 'asc' as const
  if (val === '-1') return 'desc' as const
  return null
})
const filters = ref<Record<string, unknown>>(getFilters())
const searchValue = ref(getParam('search') || '')
const loading = ref(false)

// Pagination meta
const pagination = computed(() => ({
  currentPage: props.column_data.current_page,
  lastPage: props.column_data.last_page,
  perPage: props.column_data.per_page,
  total: props.column_data.total,
  from: props.column_data.from,
  to: props.column_data.to,
}))

// Export state
const exportStatus = ref<'idle' | 'queued' | 'processing' | 'completed' | 'failed' | 'timeout'>('idle')
const exportProgress = ref({ processed: 0, total: 0 })
const exportId = ref<string | null>(null)
const exportFormat = ref<'xlsx' | 'csv' | null>(null)
const { pause: pausePoll, resume: resumePoll } = useIntervalFn(pollExportStatus, 2000, { immediate: false })

let exportTimeout: ReturnType<typeof setTimeout> | null = null

// Toast integration
function checkFlash() {
  const flash = usePage().props.flash as { success?: string; error?: string } | undefined
  if (flash?.success) {
    toast.success(flash.success)
  }
  if (flash?.error) {
    toast.error(flash.error)
  }
}
checkFlash()
watch(() => usePage().props.flash, () => {
  checkFlash()
})

function buildQueryString(overrides: Record<string, string | number | null>): string {
  const params = new URLSearchParams(window.location.search)

  for (const [key, val] of Object.entries(overrides)) {
    if (val === null || val === undefined || val === '') {
      params.delete(key)
    } else {
      params.set(key, String(val))
    }
  }

  const qs = params.toString()
  return qs ? `?${qs}` : window.location.pathname
}

function navigate(overrides: Record<string, string | number | null>) {
  loading.value = true
  const url = new URL(window.location.href)
  const qs = buildQueryString(overrides)
  url.search = qs

  router.get(url.href, {}, {
    preserveState: true,
    preserveScroll: true,
    onFinish: () => {
      loading.value = false
    },
    onError: () => {
      loading.value = false
    },
  })
}

// Event handlers
function handleSort(field: string) {
  const current = sortField.value
  const order = sortOrder.value
  let nextOrder: 'asc' | 'desc' | null

  if (current !== field || !order) {
    nextOrder = 'asc'
  } else if (order === 'asc') {
    nextOrder = 'desc'
  } else {
    nextOrder = null
  }

  navigate({
    sort_field: nextOrder ? field : null,
    sort_order: nextOrder === 'asc' ? '1' : nextOrder === 'desc' ? '-1' : null,
    page: '1',
  })
}

function handleFilter(field: string, value: unknown) {
  filters.value = { ...filters.value }

  if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
    delete filters.value[field]
  } else {
    filters.value[field] = value
  }

  // Build filters params
  const overrides: Record<string, string | number | null> = { page: '1' }
  for (const key of Object.keys(filters.value)) {
    const v = filters.value[key]
    if (v !== null && v !== undefined) {
      overrides[`filters[${key}]`] = String(v)
    }
  }

  navigate(overrides)
}

function handleClearFilters() {
  filters.value = {}
  const params = new URLSearchParams(window.location.search)
  const keysToDelete: string[] = []
  for (const key of params.keys()) {
    if (key.startsWith('filters[')) keysToDelete.push(key)
  }
  const overrides: Record<string, string | number | null> = { page: '1' }
  for (const k of keysToDelete) overrides[k] = null
  navigate(overrides)
}

function handlePageChange(page: number) {
  navigate({ page })
}

function handlePerPageChange(newPerPage: number) {
  navigate({ per_page: newPerPage, page: '1' })
}

function handleSearch(term: string) {
  searchValue.value = term
  navigate({ search: term || null, page: '1' })
}

async function handleExport(format: 'xlsx' | 'csv') {
  try {
    const routeName = `${props.route_prefix}.exportStart`
    const response = await fetch(route(routeName), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
      },
      body: JSON.stringify({
        format,
        search: searchValue.value,
        sort_field: sortField.value,
        sort_order: sortOrder.value === 'asc' ? 1 : sortOrder.value === 'desc' ? -1 : null,
        filters: filters.value,
      }),
    })
    const data = await response.json()
    exportId.value = data.export_id
    exportFormat.value = format
    exportStatus.value = 'queued'
    exportProgress.value = { processed: 0, total: 0 }
    resumePoll()

    exportTimeout = setTimeout(() => {
      exportStatus.value = 'timeout'
      pausePoll()
      toast.error('Export timed out after 5 minutes')
    }, 5 * 60 * 1000)
  } catch {
    toast.error('Failed to start export')
  }
}

async function pollExportStatus() {
  if (!exportId.value) return
  try {
    const routeName = `${props.route_prefix}.exportStatus`
    const response = await fetch(route(routeName, { id: exportId.value }))
    const data: ExportStatusResponse = await response.json()

    if (data.status === 'not_found') {
      exportStatus.value = 'failed'
      pausePoll()
      toast.error('Export not found')
      if (exportTimeout) clearTimeout(exportTimeout)
      return
    }

    exportStatus.value = data.status
    if (data.processed !== undefined) exportProgress.value.processed = data.processed
    if (data.total !== undefined) exportProgress.value.total = data.total

    if (data.status === 'completed') {
      pausePoll()
      if (exportTimeout) clearTimeout(exportTimeout)
      // Trigger download
      const downloadUrl = route(`${props.route_prefix}.exportDownload`, { id: exportId.value })
      window.open(downloadUrl, '_blank')
      toast.success('Export completed')
    } else if (data.status === 'failed') {
      pausePoll()
      if (exportTimeout) clearTimeout(exportTimeout)
      toast.error(data.error || 'Export failed')
    }
  } catch {
    // Retry next poll
  }
}

// Drawer state for Create/Edit
const drawerOpen = ref(false)
const drawerMode = ref<'create' | 'edit'>('create')
const drawerFormDetails = ref<Record<string, any>>({})
const drawerItem = ref<Record<string, unknown> | undefined>(undefined)
const drawerLoading = ref(false)

async function openCreateDrawer() {
  try {
    drawerMode.value = 'create'
    drawerItem.value = undefined
    const routeName = `${props.route_prefix}.create`
    const response = await fetch(route(routeName))
    const data = await response.json()
    drawerFormDetails.value = data
    drawerOpen.value = true
  } catch {
    toast.error('Failed to load create form')
  }
}

async function openEditDrawer(rowId: string | number) {
  try {
    drawerMode.value = 'edit'
    const routeName = `${props.route_prefix}.edit`
    const response = await fetch(route(routeName, { id: rowId }))
    const data = await response.json()
    drawerFormDetails.value = data.form_details
    drawerItem.value = data.item
    drawerOpen.value = true
  } catch {
    toast.error('Failed to load edit form')
  }
}

// Override Create button click (default Inertia Link won't work, need drawer)
function handleCreateClick(event: Event) {
  event.preventDefault()
  openCreateDrawer()
}

function reloadTable() {
  router.reload({
    preserveState: true,
    preserveScroll: true,
    onFinish: () => {
      loading.value = false
    },
  })
}

// Delete confirm state
const deleteDialogOpen = ref(false)
const deleteTarget = ref<Record<string, unknown> | null>(null)

function handleDelete(row: Record<string, unknown>) {
  deleteTarget.value = row
  deleteDialogOpen.value = true
}

function confirmDelete() {
  if (!deleteTarget.value) return
  const id = deleteTarget.value[props.key_name] as string | number
  router.delete(route(`${props.route_prefix}.destroy`, { id }), {
    onFinish: () => {
      deleteDialogOpen.value = false
      deleteTarget.value = null
    },
  })
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold tracking-tight">
        <slot name="title">
          {{ model_lang }}
        </slot>
      </h1>
    </div>

    <!-- Export progress -->
    <div v-if="exportStatus !== 'idle'" class="mb-4 p-3 rounded-md border bg-muted/30">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">
          Export {{ exportFormat?.toUpperCase() }}:
          {{ exportStatus === 'queued' ? 'Queued...' : exportStatus === 'processing' ? `Processing (${exportProgress.processed}/${exportProgress.total})` : exportStatus === 'completed' ? 'Complete' : exportStatus === 'failed' ? 'Failed' : 'Timed out' }}
        </span>
        <button
          v-if="exportStatus === 'completed' || exportStatus === 'failed' || exportStatus === 'timeout'"
          type="button"
          class="text-sm underline"
          @click="exportStatus = 'idle'"
        >
          Dismiss
        </button>
      </div>
      <div
        v-if="exportStatus === 'processing' && exportProgress.total > 0"
        class="mt-2 h-2 rounded-full bg-muted overflow-hidden"
      >
        <div
          class="h-full bg-primary transition-all duration-500"
          :style="{ width: `${(exportProgress.processed / exportProgress.total) * 100}%` }"
        />
      </div>
    </div>

    <CfDataTable
      :columns-details="columns_details"
      :data="column_data.data"
      :column-filters="column_filters"
      :sort-field="sortField"
      :sort-order="sortOrder"
      :filters="filters"
      :route-prefix="route_prefix"
      :key-name="key_name"
      :crud-buttons="crud_buttons"
      :actions-label="actions_label"
      :pagination="pagination"
      :per-page="perPage"
      :per-page-options="pagination_per_page_options"
      :loading="loading"
      :search-value="searchValue"
      @sort="handleSort"
      @filter="handleFilter"
      @clear-filters="handleClearFilters"
      @page-change="handlePageChange"
      @per-page-change="handlePerPageChange"
      @export="handleExport"
      @search="handleSearch"
      @edit="openEditDrawer"
      @delete="handleDelete"
    >
      <template
        v-for="(detail, idx) in columns_details"
        :key="idx"
        #[`cell-${detail.field}`]="slotProps"
      >
        <slot :name="`cell-${detail.field}`" v-bind="slotProps">
          <span>{{ slotProps.value }}</span>
        </slot>
      </template>
      <template
        v-for="(detail, idx) in columns_details"
        :key="idx"
        #[`header-${detail.field}`]="slotProps"
      >
        <slot :name="`header-${detail.field}`" v-bind="slotProps">
          <span class="inline-flex items-center gap-1">{{ detail.header }}</span>
        </slot>
      </template>
      <template
        v-for="(detail, idx) in columns_details"
        :key="idx"
        #[`filter-${detail.field}`]="slotProps"
      >
        <slot :name="`filter-${detail.field}`" v-bind="slotProps" />
      </template>
      <template #toolbar-prepend>
        <slot name="toolbar-prepend" />
      </template>
      <template #toolbar-append>
        <slot name="toolbar-append" />
      </template>
      <template #create-button>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 gap-2"
          @click="openCreateDrawer"
        >
          <slot name="create-button-content">
            Create
          </slot>
        </button>
      </template>
      <template #empty>
        <slot name="empty">
          No records found.
        </slot>
      </template>
    </CfDataTable>

    <!-- Create/Edit Drawer -->
    <div v-if="drawerOpen" class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="drawerOpen = false" />
      <div class="fixed inset-y-0 right-0 w-full max-w-md bg-background shadow-lg border-l overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold">
              {{ drawerMode === 'create' ? 'Create' : 'Edit' }}
            </h2>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9"
              @click="drawerOpen = false"
            >
              ×
            </button>
          </div>

          <!-- Placeholder: CfForm will be integrated here (Phase 7) -->
          <div class="text-muted-foreground text-sm">
            Form placeholder — CfForm component integration in Phase 7.
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirm Dialog -->
    <div v-if="deleteDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="deleteDialogOpen = false" />
      <div class="relative z-50 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
        <h3 class="text-lg font-semibold mb-2">Confirm Delete</h3>
        <p class="text-sm text-muted-foreground mb-6">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            @click="deleteDialogOpen = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4 py-2"
            @click="confirmDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
