<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '../../lib/utils'
import { X } from 'lucide-vue-next'

interface Props {
  open?: boolean
  modal?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  modal: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const isOpen = useVModel(props, 'open', emit)

function onClose() {
  isOpen.value = false
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="fixed inset-0 bg-black/50"
        @click="modal ? undefined : onClose()"
      />
      <div
        :class="cn(
          'relative z-50 w-full max-w-lg gap-4 border bg-background p-6 shadow-lg rounded-lg md:w-full',
          props.class,
        )"
      >
        <button
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          @click="onClose"
        >
          <X class="h-4 w-4" />
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>