<template>
  <div class="flex gap-2 justify-center">
    <Button
      v-for="btn in buttons"
      :key="btn.action"
      :severity="btn.action === 'delete' ? 'danger' : (btn.severity ?? 'secondary')"
      size="small"
      outlined
      :title="btn.label"
      @click="handleAction(btn.action)"
    >
      <template #icon>
        <i :class="btn.icon" />
      </template>
      {{ btn.label }}
    </Button>

    <Dialog
      v-model:visible="deleteDialogVisible"
      :header="crudT('crud.delete_confirm.header')"
      :modal="true"
      :style="{ width: '25rem' }"
    >
      <div class="flex items-center gap-3">
        <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem; color: var(--p-yellow-500)" />
        <span>{{ crudT('crud.delete_confirm.message') }}</span>
      </div>
      <template #footer>
        <Button :label="crudT('crud.button.cancel')" severity="secondary" outlined @click="deleteDialogVisible = false" />
        <Button :label="crudT('crud.button.delete')" severity="danger" @click="confirmDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

interface CrudButton {
  action: string
  icon: string
  label: string
  severity?: string
}

interface Props {
  row: Record<string, any>
  buttons: CrudButton[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  view: [id: any]
  edit: [id: any]
  delete: [id: any]
}>()

const page = usePage()

function crudT(key: string): string {
  return (page.props.crudLang as Record<string, string>)?.[key] ?? key
}

const rowId = computed(() => props.row.id ?? Object.values(props.row)[0])
const deleteDialogVisible = ref(false)

const handleAction = (action: string) => {
  if (action === 'delete') {
    deleteDialogVisible.value = true
  } else if (action === 'view') {
    emit('view', rowId.value)
  } else if (action === 'edit') {
    emit('edit', rowId.value)
  }
}

function confirmDelete() {
  deleteDialogVisible.value = false
  emit('delete', rowId.value)
}
</script>