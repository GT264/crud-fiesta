<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'

interface Props {
  modelValue?: File | null
  accept?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), { accept: '*/*' })

const emit = defineEmits<{ 'update:modelValue': [value: File | null] }>()

const { files, open, reset } = useFileDialog({ accept: props.accept, multiple: false })
const selectedFile = computed<File | null>(() => (files.value && files.value.length > 0 ? files.value[0] : null))
const label = computed(() => selectedFile.value ? selectedFile.value.name : (props.accept.startsWith('image/') ? 'Choose image...' : 'Choose file...'))
</script>

<template>
  <div class="flex items-center gap-2">
    <Button variant="outline" size="sm" type="button" @click="open()">{{ label }}</Button>
    <Button v-if="selectedFile" variant="ghost" size="sm" type="button" class="text-destructive" @click="reset(); emit('update:modelValue', null)">Remove</Button>
  </div>
</template>