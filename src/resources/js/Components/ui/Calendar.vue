<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn, inputClasses } from '../../lib/utils'

interface Props {
  id?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  class?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    :id="id"
    v-model="modelValue"
    type="date"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :class="cn(inputClasses, props.class)"
  />
</template>