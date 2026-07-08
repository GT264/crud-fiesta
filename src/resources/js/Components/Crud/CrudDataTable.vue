<template>
  <DataTable
    :value="items"
    :paginator="true"
    :rows="perPage"
    :total-records="totalRecords"
    :loading="loading"
    :lazy="true"
    :global-filter-fields="['*']"
    responsive-layout="scroll"
    @page="onPage"
    @sort="onSort"
    @filter="onFilter"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            :placeholder="crudT('crud.datatable.search_placeholder')"
            @input="onSearchInput"
          />
        </span>
      </div>
    </template>

    <template #empty>
      <div class="text-center py-8">
        <p class="text-gray-500">{{ crudT('crud.datatable.no_data') }}</p>
      </div>
    </template>

    <template #loadingicon>
      <i class="pi pi-spin pi-spinner" />
    </template>

    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="true"
    />

    <Column
      :header="crudT('crud.button.actions')"
      :body-style="{ width: '8rem' }"
      :style="{ 'text-align': 'center' }"
    >
      <template #body="{ data: row }">
        <slot name="actions" :row="row" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'

interface TableColumn {
  field: string
  header: string
}

interface Props {
  items: any[]
  columns: TableColumn[]
  totalRecords: number
  perPage?: number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 25,
  loading: false,
})

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

const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout> | undefined

const onPage = (event: any) => {
  emit('paginate', { page: event.page, rows: event.rows })
}

const onSort = (event: any) => {
  emit('sort', { sortField: event.sortField, sortOrder: event.sortOrder })
}

const onFilter = (event: any) => {
  emit('filter', { globalFilter: event.globalFilter })
}

const onSearchInput = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emit('search', { query: searchQuery.value })
  }, 300)
}
</script>
