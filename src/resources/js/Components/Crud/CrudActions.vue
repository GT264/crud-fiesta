<template>
  <div class="flex gap-2 justify-center">
    <!-- Single action: show button directly -->
    <Button
      v-if="buttons.length === 1"
      :icon="buttons[0].icon"
      :label="buttons[0].label"
      :severity="buttons[0].severity"
      size="small"
      outlined
      :title="buttons[0].label"
      @click="handleAction(buttons[0].action)"
    />

    <!-- Multiple actions: dropdown menu -->
    <div v-else-if="buttons.length > 1" class="relative">
      <Button
        :label="crudT('crud.button.actions')"
        icon="pi pi-chevron-down"
        icon-pos="right"
        :severity="actionsSeverity"
        size="small"
        outlined
        @click="toggleMenu"
      />
      <Menu
        ref="menu"
        :model="menuItems"
        :popup="true"
      />
    </div>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
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
const menu = ref()

const rowId = computed(() => props.row.id ?? Object.values(props.row)[0])

// Derive severity for the dropdown trigger from the most "important" action
const actionsSeverity = computed(() => {
  if (props.buttons.some((b) => b.action === 'delete')) return 'danger'
  return 'secondary'
})

const menuItems = computed(() =>
  props.buttons.map((btn) => ({
    label: btn.label,
    icon: btn.icon,
    command: () => handleAction(btn.action),
  })),
)

function toggleMenu(event: Event) {
  menu.value.toggle(event)
}

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