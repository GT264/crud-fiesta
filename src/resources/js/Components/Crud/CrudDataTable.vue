<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="relative w-64">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          v-model="searchQuery"
          :placeholder="crudT('crud.datatable.search_placeholder')"
          class="flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          @input="onSearchInput"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-if="perPageOptions.length > 0"
          v-model="selectedPerPage"
          class="flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          @change="onPerPageChange"
        >
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
        <span class="text-xs text-muted-foreground whitespace-nowrap">{{ crudT('crud.datatable.per_page') }}</span>
        <Button variant="outline" size="sm" :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <span class="text-sm text-muted-foreground">
          {{ totalRecords > 0 ? (currentPage - 1) * perPage + 1 : 0 }}-{{ Math.min(currentPage * perPage, totalRecords) }}
          {{ crudT('crud.datatable.of') }}
          {{ totalRecords }}
        </span>
        <Button variant="outline" size="sm" :disabled="currentPage * perPage >= totalRecords" @click="goToPage(currentPage + 1)">
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
    </div>

    <div class="rounded-md border">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50">
            <th
              v-for="col in columns"
              :key="col.field"
              class="h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none"
              @click="onSort(col.field)"
            >
              <div class="flex items-center gap-1">
                {{ crudT(col.header) }}
                <span v-if="sortField === col.field">
                  <ArrowUp v-if="sortOrder === 1" class="h-3 w-3" />
                  <ArrowDown v-else class="h-3 w-3" />
                </span>
              </div>
            </th>
            <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32">
              {{ crudT('crud.button.actions') }}
            </th>
          </tr>
          <tr v-if="hasFilters" class="border-b bg-muted/20">
            <th v-for="col in columns" :key="'filter-' + col.field" class="px-4 py-1.5 align-middle">
              <!-- Select filter -->
              <select
                v-if="getFilterConfig(col.field)?.type === 'select'"
                v-model="filterValues[col.field]"
                class="flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                @change="onFilterChange(col.field)"
              >
                <option value="">{{ crudT('crud.datatable.filters.select_placeholder') }}</option>
                <option
                  v-for="opt in getFilterConfig(col.field)?.options"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>

              <!-- Multiselect filter -->
              <select
                v-else-if="getFilterConfig(col.field)?.type === 'multiselect'"
                v-model="filterValues[col.field]"
                multiple
                class="flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                @change="onFilterChange(col.field)"
              >
                <option
                  v-for="opt in getFilterConfig(col.field)?.options"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>

              <!-- Date filter -->
              <input
                v-else-if="getFilterConfig(col.field)?.type === 'date'"
                v-model="filterValues[col.field]"
                type="date"
                class="flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                @input="onFilterInputDelayed(col.field)"
              />

              <!-- Date range filter -->
              <div v-else-if="getFilterConfig(col.field)?.type === 'date_range'" class="flex items-center gap-1">
                <input
                  v-model="filterValues[col.field + '_start']"
                  type="date"
                  :placeholder="crudT('crud.datatable.filters.date_from')"
                  class="flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  @input="onFilterInputDelayed(col.field)"
                />
                <input
                  v-model="filterValues[col.field + '_end']"
                  type="date"
                  :placeholder="crudT('crud.datatable.filters.date_to')"
                  class="flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  @input="onFilterInputDelayed(col.field)"
                />
              </div>
            </th>
            <th class="px-4 py-1.5 align-middle w-32"></th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <tr v-if="loading" class="border-b transition-colors">
            <td :colspan="columns.length + 1" class="p-4 align-middle text-center">
              <Loader2 class="inline-block h-5 w-5 animate-spin text-muted-foreground" />
            </td>
          </tr>
          <tr v-else-if="items.length === 0" class="border-b transition-colors">
            <td :colspan="columns.length + 1" class="p-4 align-middle text-center">
              <p class="text-muted-foreground">{{ crudT('crud.datatable.no_data') }}</p>
            </td>
          </tr>
          <tr v-for="row in items" :key="row[props.keyName]" class="border-b transition-colors hover:bg-muted/50">
            <td v-for="col in columns" :key="col.field" class="p-4 align-middle">
              {{ col.relation ? resolveRelationValue(row, col) : row[col.field] }}
            </td>
            <td class="p-4 align-middle text-center">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-end gap-2">
      <Button variant="outline" size="sm" :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)">
        {{ crudT('crud.datatable.previous') }}
      </Button>
      <span class="text-sm text-muted-foreground">
        {{ crudT('crud.datatable.page') }} {{ currentPage }} {{ crudT('crud.datatable.of') }} {{ Math.max(1, Math.ceil(totalRecords / perPage)) }}
      </span>
      <Button variant="outline" size="sm" :disabled="currentPage * perPage >= totalRecords" @click="goToPage(currentPage + 1)">
        {{ crudT('crud.datatable.next') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Loader2 } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

interface ColumnFilterOption {
  label: string
  value: string | number
}

interface ColumnFilterConfig {
  field: string
  type: 'select' | 'multiselect' | 'date' | 'date_range'
  options?: ColumnFilterOption[]
}

interface TableColumn {
  field: string
  header: string
  relation?: { relation: string; display_field: string }
  filter_config?: ColumnFilterConfig
}

interface Props {
  items: any[]
  columns: TableColumn[]
  totalRecords: number
  perPage?: number
  perPageOptions?: number[]
  loading?: boolean
  keyName?: string
}

const props = withDefaults(defineProps<Props>(), { perPage: 25, perPageOptions: () => [10, 25, 50, 100], loading: false, keyName: 'id' })

const emit = defineEmits<{
  paginate: [event: { page: number; rows: number }]
  sort: [event: { sortField: string; sortOrder: number }]
  filter: [event: { globalFilter: any }]
  search: [event: { query: string }]
  perPageChange: [event: number]
}>()

const page = usePage()
function crudT(key: string): string {
  return (page.props.crudLang as Record<string, string>)?.[key] ?? key
}

const currentPage = ref(1)
const sortField = ref<string | null>(null)
const sortOrder = ref<number>(1)
const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout> | undefined

const filterValues = ref<Record<string, any>>({})
const filterTimers: Record<string, ReturnType<typeof setTimeout>> = {}

const hasFilters = computed(() => {
  return props.columns.some(col => col.filter_config != null)
})

function getFilterConfig(field: string): ColumnFilterConfig | undefined {
  const col = props.columns.find(c => c.field === field)
  return col?.filter_config
}

function buildFilterPayload(): Record<string, { type: string; value: any }> {
  const payload: Record<string, { type: string; value: any }> = {}
  for (const col of props.columns) {
    if (!col.filter_config) continue
    const field = col.field
    const config = col.filter_config
    if (config.type === 'date_range') {
      const start = filterValues.value[field + '_start']
      const end = filterValues.value[field + '_end']
      if (start || end) {
        payload[field] = { type: 'date_range', value: { start: start || '', end: end || '' } }
      }
    } else {
      const val = filterValues.value[field]
      if (val !== undefined && val !== null && val !== '' && (!Array.isArray(val) || val.length > 0)) {
        payload[field] = { type: config.type, value: val }
      }
    }
  }
  return payload
}

function emitFilters() {
  emit('filter', { globalFilter: buildFilterPayload() })
}

function onFilterChange(_field: string) {
  emitFilters()
}

function onFilterInputDelayed(field: string) {
  clearTimeout(filterTimers[field])
  filterTimers[field] = setTimeout(() => emitFilters(), 300)
}

function goToPage(p: number) {
  currentPage.value = p
  emit('paginate', { page: p - 1, rows: props.perPage })
}

const selectedPerPage = ref(props.perPage)

function onPerPageChange() {
  currentPage.value = 1
  emit('perPageChange', selectedPerPage.value)
}

function onSort(field: string) {
  const prevField = sortField.value
  sortField.value = field
  sortOrder.value = (prevField === field && sortOrder.value === 1) ? -1 : 1
  emit('sort', { sortField: field, sortOrder: sortOrder.value })
}

function onSearchInput() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => emit('search', { query: searchQuery.value }), 300)
}

onUnmounted(() => {
  clearTimeout(searchTimeout)
  Object.values(filterTimers).forEach(clearTimeout)
})

function resolveRelationValue(row: Record<string, any>, col: TableColumn): any {
  if (!col.relation) return row[col.field]
  const { relation: relName, display_field: displayField } = col.relation
  const related = row[relName]
  return (related && typeof related === 'object' && displayField in related)
    ? related[displayField]
    : row[col.field]
}
</script>