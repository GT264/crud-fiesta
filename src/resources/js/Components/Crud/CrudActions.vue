<template>
  <div class="flex justify-center">
    <DropdownMenu :items="menuItems">
      <template #trigger>
        <Button
          :label="crudT('crud.button.actions')"
          variant="secondary"
          size="sm"
        >
          <EllipsisVertical class="h-4 w-4 mr-1" />
          {{ crudT('crud.button.actions') }}
        </Button>
      </template>
      <template #item="{ item }">
        <div class="flex items-center gap-2 w-full">
          <component :is="getIcon(item.action)" class="h-4 w-4" />
          <span class="action-label-rect">{{ item.label }}</span>
        </div>
      </template>
    </DropdownMenu>

    <Dialog :open="deleteDialogVisible" @update:open="deleteDialogVisible = $event" @close="deleteDialogVisible = false">
      <div class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">{{ crudT('crud.delete_confirm.header') }}</h2>
        <div class="flex items-center gap-3">
          <AlertTriangle class="h-6 w-6 text-yellow-500" />
          <span>{{ crudT('crud.delete_confirm.message') }}</span>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <Button variant="secondary" @click="deleteDialogVisible = false">
            {{ crudT('crud.button.cancel') }}
          </Button>
          <Button variant="destructive" @click="confirmDelete">
            {{ crudT('crud.button.delete') }}
          </Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Eye, Pencil, Trash2, EllipsisVertical, AlertTriangle } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'
import DropdownMenu from '../ui/DropdownMenu.vue'
import { useCrudTranslation } from '../../composables/useCrudTranslation'

interface CrudButton {
  action: string
  icon: string
  label: string
  severity?: string
}

interface MenuItem {
  label: string
  icon: string
  action: string
  command: () => void
}

interface Props {
  row: Record<string, any>
  buttons: CrudButton[]
  keyName?: string
}

const props = withDefaults(defineProps<Props>(), { keyName: 'id' })

const emit = defineEmits<{
  view: [id: any]
  edit: [id: any]
  delete: [id: any]
}>()

const { crudT } = useCrudTranslation()

const rowId = computed(() => props.row[props.keyName] ?? Object.values(props.row)[0])
const deleteDialogVisible = ref(false)

function getIcon(action: string) {
  const iconMap: Record<string, any> = {
    view: Eye,
    edit: Pencil,
    delete: Trash2,
  }
  return iconMap[action] || Eye
}

function handleAction(action: string) {
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

const menuItems = computed<MenuItem[]>(() =>
  props.buttons.map((btn) => ({
    label: btn.label,
    icon: btn.icon,
    action: btn.action,
    command: () => handleAction(btn.action),
  })),
)
</script>

<style scoped>
.action-label-rect {
  display: inline-block;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 4px;
  padding: 2px 8px;
  background: var(--muted, #f8fafc);
  font-size: 0.875rem;
}
</style>