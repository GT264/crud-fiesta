<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn, inputClasses } from '../../lib/utils'

interface Props {
  id?: string
  type?: string
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    :id="id"
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :class="cn(inputClasses, props.class)"
  />
</template>