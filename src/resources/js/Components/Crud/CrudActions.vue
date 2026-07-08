<template>
  <div class="flex gap-2 justify-center">
    <Button
      v-for="button in buttons"
      :key="button.action"
      :icon="button.icon"
      :label="button.label"
      :severity="button.severity"
      size="small"
      text
      :title="button.label"
      @click="handleAction(button.action)"
    />
  </div>
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

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

const confirm = useConfirm()

const rowId = computed(() => props.row.id ?? Object.values(props.row)[0])

const handleAction = (action: string) => {
  if (action === 'delete') {
    confirm.require({
      message: crudT('crud.delete_confirm.message'),
      header: crudT('crud.delete_confirm.header'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        emit('delete', rowId.value)
      },
    })
  } else {
    emit(action as 'view' | 'edit', rowId.value)
  }
}
</script>
