<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
      <Button
        v-if="canCreate"
        icon="pi pi-plus"
        label="Crea"
        @click="openCreate"
      />
    </div>

    <CrudDataTable
      :items="items"
      :columns="columns"
      :total-records="totalRecords"
      :per-page="perPage"
      :loading="loading"
      @paginate="onPaginate"
      @sort="onSort"
      @search="onSearch"
    >
      <template #actions="{ row }">
        <CrudActions
          :row="row"
          :buttons="crudButtons"
          @view="onView"
          @edit="openEdit"
          @delete="onDelete"
        />
      </template>
    </CrudDataTable>

    <CrudForm
      v-model:visible="formVisible"
      :title="formTitle"
      :fields="formFields"
      :data="editData"
      :loading="formLoading"
      :is-edit="isEdit"
      @submit="onSubmit"
      @close="closeForm"
    />

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import CrudDataTable from './../Components/Crud/CrudDataTable.vue'
import CrudForm from './../Components/Crud/CrudForm.vue'
import CrudActions from './../Components/Crud/CrudActions.vue'

interface TableColumn {
  field: string
  header: string
}

interface FieldConfig {
  label: string
  form_type: string
  placeholder?: string
  required?: boolean
  options?: Array<{ label: string; value: any }>
}

interface CrudButton {
  action: string
  icon: string
  label: string
  severity?: string
}

interface Props {
  title: string
  items: any[]
  columns: TableColumn[]
  totalRecords: number
  crudButtons: CrudButton[]
  formFields: Record<string, FieldConfig>
  perPage?: number
  canCreate?: boolean
  canEdit?: boolean
  canDelete?: boolean
  canView?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 25,
  canCreate: true,
  canEdit: true,
  canDelete: true,
  canView: true,
})

const emit = defineEmits<{
  create: []
  store: [data: Record<string, any>]
  edit: [id: any]
  update: [id: any, data: Record<string, any>]
  delete: [id: any]
  view: [id: any]
  search: [query: string]
  paginate: [page: number, rows: number]
}>()

const toast = useToast()
const loading = ref(false)
const formVisible = ref(false)
const formLoading = ref(false)
const isEdit = ref(false)
const editData = ref<Record<string, any> | null>(null)

const formTitle = computed(() =>
  isEdit.value ? `Modifica ${props.title}` : `Crea ${props.title}`
)

const onPaginate = (event: { page: number; rows: number }) => {
  emit('paginate', event.page + 1, event.rows)
}

const onSort = (_event: any) => {
  // gestione sort lato server: estendi qui se necessario
}

const onSearch = (event: { query: string }) => {
  emit('search', event.query)
}

const openCreate = () => {
  isEdit.value = false
  editData.value = null
  formVisible.value = true
  emit('create')
}

const openEdit = (id: any) => {
  isEdit.value = true
  editData.value = { id }
  formVisible.value = true
  emit('edit', id)
}

const onView = (id: any) => emit('view', id)

const onDelete = (id: any) => emit('delete', id)

const onSubmit = (data: Record<string, any>) => {
  formLoading.value = true
  try {
    if (isEdit.value && editData.value?.id) {
      emit('update', editData.value.id, data)
    } else {
      emit('store', data)
    }
    closeForm()
  } finally {
    formLoading.value = false
  }
}

const closeForm = () => {
  formVisible.value = false
  editData.value = null
  isEdit.value = false
}

defineExpose({
  showSuccess: (message: string) => {
    toast.add({ severity: 'success', summary: 'Successo', detail: message, life: 3000 })
  },
  showError: (message: string) => {
    toast.add({ severity: 'error', summary: 'Errore', detail: message, life: 3000 })
  },
})
</script>
