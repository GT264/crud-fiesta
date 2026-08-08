<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { Eye, Pencil, Trash2 } from 'lucide-vue-next'
import { useCrudFiesta } from './utils/useCrudFiesta'
import type { CrudButton } from '../../types/crud-fiesta'

const props = defineProps<{
  buttons: CrudButton[]
  row: Record<string, unknown>
  routePrefix: string
  keyName: string
}>()

const emit = defineEmits<{
  (e: 'edit', rowId: string | number): void
  (e: 'delete', row: Record<string, unknown>): void
}>()

const { buildRoute } = useCrudFiesta()

const rowId = props.row[props.keyName] as string | number

const iconMap: Record<string, any> = { Eye, Pencil, Trash2 }

function handleClick(button: CrudButton) {
  if (button.event === 'edit') {
    emit('edit', rowId)
  } else if (button.action === 'destroy') {
    emit('delete', props.row)
  }
}
</script>

<template>
  <div class="flex items-center gap-1">
    <template v-for="button in buttons" :key="button.action">
      <slot
        v-if="$slots.button"
        name="button"
        :button="button"
        :row="row"
      />
      <component
        v-else-if="button.action === 'show'"
        :is="Link"
        :href="buildRoute(button.route_name, { [keyName]: rowId })"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
      >
        <component :is="iconMap[button.icon]" class="size-4" />
        <span class="sr-only">{{ button.label }}</span>
      </component>
      <button
        v-else
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        @click="handleClick(button)"
      >
        <component :is="iconMap[button.icon]" class="size-4" />
        <span class="sr-only">{{ button.label }}</span>
      </button>
    </template>
  </div>
</template>
