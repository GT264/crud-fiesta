<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { Link } from '@inertiajs/vue3'
import {
  useTable,
  createCoreRowModel,
  createSortedRowModel,
  FlexRender,
} from '@tanstack/vue-table'
import { Search, Plus, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Download } from 'lucide-vue-next'
import { useDebounceFn } from '@vueuse/core'
import { useCrudFiesta } from './utils/useCrudFiesta'
import CfActions from './CfActions.vue'
import type { ColumnDetail, FilterConfig, CrudButton } from '../../types/crud-fiesta'
import type { PaginationMeta } from '../../types/cf-data-table'

const props = withDefaults(defineProps<{
  columnsDetails: ColumnDetail[]
  data: Record<string, unknown>[]
  columnFilters: Record<string, FilterConfig>
  sortField: string | null
  sortOrder: 'asc' | 'desc' | null
  filters: Record<string, unknown>
  routePrefix: string
  keyName: string
  crudButtons: CrudButton[]
  actionsLabel: string
  pagination: PaginationMeta
  perPage: number
  perPageOptions: number[]
  loading?: boolean
  searchValue?: string
}>(), {
  loading: false,
  searchValue: '',
})

const emit = defineEmits<{
  (e: 'sort', field: string): void
  (e: 'filter', field: string, value: unknown): void
  (e: 'clearFilters'): void
  (e: 'pageChange', page: number): void
  (e: 'perPageChange', perPage: number): void
  (e: 'export', format: 'xlsx' | 'csv'): void
  (e: 'search', term: string): void
  (e: 'edit', rowId: string | number): void
  (e: 'delete', row: Record<string, unknown>): void
}>()

const slots = useSlots()
const { formatColumnValue, getSortIcon, getNextSortOrder, buildRoute } = useCrudFiesta()

const debouncedSearch = useDebounceFn((term: string) => {
  emit('search', term)
}, 300)

function handleSort(field: string) {
  emit('sort', field)
}

function hasSlot(name: string): boolean {
  return name in slots
}

const columns = computed(() =>
  props.columnsDetails.map((col) => ({
    accessorKey: col.field,
    header: col.header,
    meta: col,
  }))
)

const table = useTable({
  get data() { return props.data },
  get columns() { return columns.value },
  getCoreRowModel: createCoreRowModel(),
  getSortedRowModel: createSortedRowModel(),
  manualSorting: true,
  manualPagination: true,
  get pageCount() { return props.pagination.lastPage },
  state: {
    get sorting() {
      if (!props.sortField || !props.sortOrder) return []
      return [{ id: props.sortField, desc: props.sortOrder === 'desc' }]
    },
    get pagination() {
      return { pageIndex: props.pagination.currentPage - 1, pageSize: props.perPage }
    },
  },
})

const activeFilterCount = computed(() => {
  const f = props.filters || {}
  return Object.keys(f).filter((k) => {
    const v = f[k]
    return v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
  }).length
})

const activeFilterEntries = computed(() => {
  const entries: Array<{ field: string; label: string; value: string }> = []
  const f = props.filters || {}
  for (const [field, val] of Object.entries(f)) {
    if (val === null || val === '' || (Array.isArray(val) && val.length === 0)) continue
    const col = props.columnsDetails.find((c) => c.field === field)
    const label = col?.header ?? field
    entries.push({ field, label, value: Array.isArray(val) ? val.join(', ') : String(val) })
  }
  return entries
})

const pageRange = computed(() => {
  const { currentPage, lastPage } = props.pagination
  const pages: number[] = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(lastPage, currentPage + 2)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const sortIconForField = (field: string) => getSortIcon(field, props.sortField, props.sortOrder)
</script>

<template>
  <div class="rounded-md border">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-3 p-4 border-b">
      <slot name="toolbar-prepend" />

      <!-- Search -->
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <input
          type="text"
          :value="searchValue"
          placeholder="Search..."
          class="flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          @input="debouncedSearch(($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Export dropdown -->
      <div class="relative inline-block text-left">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2"
          @click="emit('export', 'xlsx')"
        >
          <Download class="size-4" />
          Export
        </button>
      </div>

      <div class="flex-1" />

      <!-- Create button -->
      <slot name="create-button">
        <Link
          :href="buildRoute(routePrefix + '.create')"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 gap-2"
        >
          <Plus class="size-4" />
          Create
        </Link>
      </slot>

      <slot name="toolbar-append" />
    </div>

    <!-- Active filters -->
    <div v-if="activeFilterCount > 0" class="flex flex-wrap items-center gap-2 px-4 py-2 border-b bg-muted/30">
      <span class="text-sm text-muted-foreground">Active filters:</span>
      <span
        v-for="entry in activeFilterEntries"
        :key="entry.field"
        class="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-0.5 text-xs font-semibold"
      >
        {{ entry.label }}: {{ entry.value }}
        <button
          type="button"
          class="ml-1 rounded-full hover:bg-muted p-0.5"
          @click="emit('filter', entry.field, null)"
        >
          ×
        </button>
      </span>
      <button
        type="button"
        class="text-xs text-muted-foreground hover:text-foreground underline"
        @click="emit('clearFilters')"
      >
        Clear all
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50">
            <th
              v-for="header in table.getFlatHeaders()"
              :key="header.id"
              class="h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none"
              @click="handleSort(header.column.columnDef.accessorKey as string)"
            >
              <slot
                v-if="hasSlot(`header-${header.column.columnDef.accessorKey}`)"
                :name="`header-${header.column.columnDef.accessorKey}`"
                :column="header.column"
              />
              <span v-else class="inline-flex items-center gap-1">
                {{ header.column.columnDef.header }}
                <ArrowUp v-if="sortIconForField(header.column.columnDef.accessorKey as string) === 'ArrowUp'" class="size-3" />
                <ArrowDown v-if="sortIconForField(header.column.columnDef.accessorKey as string) === 'ArrowDown'" class="size-3" />
              </span>
            </th>
            <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
              {{ actionsLabel }}
            </th>
          </tr>
        </thead>

        <!-- Skeleton loading -->
        <tbody v-if="loading">
          <tr v-for="i in perPage" :key="'sk-' + i" class="border-b animate-pulse">
            <td v-for="col in columnsDetails" :key="col.field" class="p-4">
              <div class="h-4 bg-muted rounded w-3/4" />
            </td>
            <td class="p-4">
              <div class="h-4 bg-muted rounded w-16" />
            </td>
          </tr>
        </tbody>

        <!-- Empty state -->
        <tbody v-else-if="data.length === 0">
          <tr>
            <td :colspan="columnsDetails.length + 1" class="p-8 text-center text-muted-foreground">
              <slot name="empty">
                No records found.
              </slot>
            </td>
          </tr>
        </tbody>

        <!-- Data rows -->
        <tbody v-else>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-b transition-colors hover:bg-muted/50"
          >
            <td
              v-for="cell in row.getAllCells()"
              :key="cell.id"
              class="p-4 align-middle"
            >
              <slot
                v-if="hasSlot(`cell-${cell.column.columnDef.accessorKey}`)"
                :name="`cell-${cell.column.columnDef.accessorKey}`"
                :row="row.original"
                :column="cell.column"
                :value="formatColumnValue(row.original, cell.column.columnDef.accessorKey as string, cell.column.columnDef.meta?.relation)"
              />
              <span v-else>
                {{ formatColumnValue(row.original, cell.column.columnDef.accessorKey as string, cell.column.columnDef.meta?.relation) }}
              </span>
            </td>
            <td class="p-4 align-middle">
              <slot name="actions" :row="row.original">
                <CfActions
                  :buttons="crudButtons"
                  :row="row.original"
                  :route-prefix="routePrefix"
                  :key-name="keyName"
                  @edit="(id) => emit('edit', id)"
                  @delete="(r) => emit('delete', r)"
                />
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.lastPage > 1" class="flex flex-wrap items-center justify-between gap-2 p-4 border-t">
      <div class="text-sm text-muted-foreground">
        Showing {{ pagination.from ?? 0 }}–{{ pagination.to ?? 0 }} of {{ pagination.total }}
      </div>

      <div class="flex items-center gap-1">
        <button
          type="button"
          :disabled="pagination.currentPage <= 1"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
          @click="emit('pageChange', pagination.currentPage - 1)"
        >
          <ChevronLeft class="size-4" />
        </button>

        <button
          v-if="pagination.currentPage > 3"
          type="button"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
          @click="emit('pageChange', 1)"
        >
          1
        </button>
        <span v-if="pagination.currentPage > 3" class="px-1 text-muted-foreground">…</span>

        <button
          v-for="p in pageRange"
          :key="p"
          type="button"
          :class="[
            'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-8 px-3',
            p === pagination.currentPage
              ? 'border border-input bg-primary text-primary-foreground'
              : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
          ]"
          @click="emit('pageChange', p)"
        >
          {{ p }}
        </button>

        <span v-if="pagination.currentPage < pagination.lastPage - 2" class="px-1 text-muted-foreground">…</span>
        <button
          v-if="pagination.currentPage < pagination.lastPage - 2"
          type="button"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
          @click="emit('pageChange', pagination.lastPage)"
        >
          {{ pagination.lastPage }}
        </button>

        <button
          type="button"
          :disabled="pagination.currentPage >= pagination.lastPage"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
          @click="emit('pageChange', pagination.currentPage + 1)"
        >
          <ChevronRight class="size-4" />
        </button>
      </div>

      <!-- Per page selector -->
      <div class="flex items-center gap-2" v-if="perPageOptions.length > 1">
        <span class="text-sm text-muted-foreground">Per page</span>
        <select
          :value="perPage"
          class="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm"
          @change="emit('perPageChange', Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
