<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '../../lib/utils'

interface Option {
  label: string
  value: string | number
}

interface Props {
  id?: string
  modelValue?: string | number | (string | number)[]
  options?: Option[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  multiple: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[]]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <select
    :id="id"
    v-model="modelValue"
    :required="required"
    :disabled="disabled"
    :multiple="multiple"
    :class="cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>