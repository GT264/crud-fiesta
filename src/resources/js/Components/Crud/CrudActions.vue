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

const confirm = useConfirm()

const rowId = computed(() => props.row.id ?? Object.values(props.row)[0])

const handleAction = (action: string) => {
  if (action === 'delete') {
    confirm.require({
      message: 'Sei sicuro di voler eliminare questo elemento?',
      header: 'Conferma',
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
