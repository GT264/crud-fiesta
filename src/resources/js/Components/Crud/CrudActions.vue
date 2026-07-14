<template>
  <div class="flex justify-center">
    <Button
      :label="crudT('crud.button.actions')"
      icon="pi pi-ellipsis-v"
      severity="secondary"
      size="small"
      outlined
      @click="toggleMenu"
    />
    <Menu
      ref="menuRef"
      :model="menuItems"
      :popup="true"
    >
      <template #item="{ item }">
        <div class="flex items-center gap-2 w-full">
          <i :class="item.icon" />
          <span class="action-label-rect">{{ item.label }}</span>
        </div>
      </template>
    </Menu>

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
import Menu from 'primevue/menu'

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
const menuRef = ref<InstanceType<typeof Menu> | null>(null)

function toggleMenu(event: Event) {
  menuRef.value?.toggle(event)
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
  border: 1px solid var(--p-surface-400);
  border-radius: 4px;
  padding: 2px 8px;
  background: var(--p-surface-50);
  font-size: 0.875rem;
}
</style>