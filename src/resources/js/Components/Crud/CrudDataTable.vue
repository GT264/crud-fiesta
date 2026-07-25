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
        <Button variant="outline" size="sm" :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <span class="text-sm text-muted-foreground">
          {{ totalRecords > 0 ? (currentPage - 1) * perPage + 1 : 0 }}-{{ Math.min(currentPage * perPage, totalRecords) }}
          {{ crudT('crud.datatable.of') || 'of' }}
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
                {{ col.header }}
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
          <tr v-for="row in items" :key="row.id" class="border-b transition-colors hover:bg-muted/50">
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
        Previous
      </Button>
      <span class="text-sm text-muted-foreground">
        Page {{ currentPage }} of {{ Math.max(1, Math.ceil(totalRecords / perPage)) }}
      </span>
      <Button variant="outline" size="sm" :disabled="currentPage * perPage >= totalRecords" @click="goToPage(currentPage + 1)">
        Next
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Loader2 } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

interface TableColumn {
  field: string
  header: string
  relation?: { relation: string; display_field: string }
}

interface Props {
  items: any[]
  columns: TableColumn[]
  totalRecords: number
  perPage?: number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), { perPage: 25, loading: false })

const emit = defineEmits<{
  paginate: [event: { page: number; rows: number }]
  sort: [event: { sortField: string; sortOrder: number }]
  filter: [event: { globalFilter: any }]
  search: [event: { query: string }]
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

function goToPage(p: number) {
  currentPage.value = p
  emit('paginate', { page: p - 1, rows: props.perPage })
}

function onSort(field: string) {
  sortField.value = field
  sortOrder.value = sortField.value === field && sortOrder.value === 1 ? -1 : 1
  emit('sort', { sortField: field, sortOrder: sortOrder.value })
}

function onSearchInput() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => emit('search', { query: searchQuery.value }), 300)
}

function resolveRelationValue(row: Record<string, any>, col: TableColumn): any {
  if (!col.relation) return row[col.field]
  const { relation: relName, display_field: displayField } = col.relation
  const related = row[relName]
  return (related && typeof related === 'object' && displayField in related)
    ? related[displayField]
    : row[col.field]
}
</script>