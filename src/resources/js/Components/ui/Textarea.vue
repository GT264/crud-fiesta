<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn, textareaClasses } from '../../lib/utils'

interface Props {
  id?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <textarea
    :id="id"
    v-model="modelValue"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :rows="rows"
    :class="cn(textareaClasses, props.class)"
  />
</template>