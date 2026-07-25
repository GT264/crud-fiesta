<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '../../lib/utils'

interface Props {
  id?: string
  modelValue?: boolean
  required?: boolean
  disabled?: boolean
  class?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    :id="id"
    v-model="modelValue"
    type="checkbox"
    :required="required"
    :disabled="disabled"
    :class="cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  />
</template>