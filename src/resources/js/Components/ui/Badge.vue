<script setup lang="ts">
import { cn } from '../../lib/utils'

interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors',
      props.variant === 'default' && 'border-transparent bg-primary text-primary-foreground shadow',
      props.variant === 'secondary' && 'border-transparent bg-secondary text-secondary-foreground',
      props.variant === 'destructive' && 'border-transparent bg-destructive text-destructive-foreground shadow',
      props.variant === 'outline' && 'text-foreground',
      props.class,
    )"
  >
    <slot />
  </span>
</template>