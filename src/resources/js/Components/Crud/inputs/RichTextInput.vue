<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

interface Props {
  modelValue?: string
  required?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => { emit('update:modelValue', editor.getHTML()) },
})
</script>

<template>
  <div class="rounded-md border border-input">
    <EditorContent :editor="editor" class="prose prose-sm max-w-none min-h-[200px] p-3" />
  </div>
</template>