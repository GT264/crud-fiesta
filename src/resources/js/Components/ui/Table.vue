<script setup lang="ts">
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('w-full overflow-auto', props.class)">
    <table class="w-full caption-bottom text-sm">
      <slot />
    </table>
  </div>
</template>