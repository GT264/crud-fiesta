<script setup lang="ts">
import { type ButtonVariants, buttonVariants } from './button'
import { cn } from '../../lib/utils'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>