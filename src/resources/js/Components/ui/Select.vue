<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn, inputClasses } from '../../lib/utils'

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
    :class="cn(inputClasses, props.class)"
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