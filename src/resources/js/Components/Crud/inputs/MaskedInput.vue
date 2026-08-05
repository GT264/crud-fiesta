<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn, inputClasses } from '../../../lib/utils'

interface Props {
  id?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  mask?: string
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    :id="id"
    v-model="modelValue"
    v-maska="mask"
    :placeholder="placeholder"
    :required="required"
    :class="cn(inputClasses, props.class)"
  />
</template>