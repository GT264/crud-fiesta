<template>
  <Dialog :open="isOpen" :modal="true" class="w-full md:w-1/2" @update:open="isOpen = $event" @close="onClose">
    <div class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <form id="crud-form" class="space-y-4" @submit.prevent="onSubmit">
        <div v-for="(field, key) in fields" :key="key" class="field">
          <label :for="key" class="block mb-2 font-semibold text-sm">
            {{ crudT(field.label) }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>
          <Input v-if="field.type === 'text'" :id="key" v-model="formData[key]" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" />
          <Input v-else-if="field.type === 'email'" :id="key" v-model="formData[key]" type="email" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" />
          <Textarea v-else-if="field.type === 'textarea'" :id="key" v-model="formData[key]" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" rows="4" />
          <Input v-else-if="field.type === 'number'" :id="key" v-model.number="formData[key]" type="number" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" />
          <Calendar v-else-if="field.type === 'date'" :id="key" v-model="formData[key]" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" />
          <Checkbox v-else-if="field.type === 'checkbox'" :id="key" v-model="formData[key]" :required="field.required" />
          <Input v-else-if="field.type === 'password'" :id="key" v-model="formData[key]" type="password" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" />
          <Select v-else-if="field.type === 'select'" :id="key" v-model="formData[key]" :options="field.options || []" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" />
          <Select v-else-if="field.type === 'multi_select'" :id="key" v-model="formData[key]" :options="field.options || []" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" multiple />
          <MaskedInput v-else-if="field.type === 'mask'" :id="key" v-model="formData[key]" :placeholder="crudT(field.placeholder)" class="w-full" :required="field.required" />
          <RichTextInput v-else-if="field.type === 'rich_text'" v-model="formData[key]" :required="field.required" />
          <FileInput v-else-if="field.type === 'file'" :key="'file-' + key" :required="field.required" accept="*/*" />
          <FileInput v-else-if="field.type === 'image'" :key="'image-' + key" :required="field.required" accept="image/*" />
        </div>
      </form>
      <div class="flex justify-end gap-2 mt-4">
        <Button variant="secondary" @click="onClose">{{ crudT('crud.button.cancel') }}</Button>
        <Button variant="default" :disabled="loading" type="submit" form="crud-form">
          <Loader2 v-if="loading" class="h-4 w-4 mr-1 animate-spin" />
          {{ props.isEdit ? crudT('crud.button.edit') : crudT('crud.button.create') }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Loader2 } from 'lucide-vue-next'
import Dialog from '../ui/Dialog.vue'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'
import Textarea from '../ui/Textarea.vue'
import Checkbox from '../ui/Checkbox.vue'
import Select from '../ui/Select.vue'
import Calendar from '../ui/Calendar.vue'
import RichTextInput from './inputs/RichTextInput.vue'
import FileInput from './inputs/FileInput.vue'
import MaskedInput from './inputs/MaskedInput.vue'

interface FieldConfig {
  label: string
  type: string
  placeholder?: string
  required?: boolean
  options?: Array<{ label: string; value: any }>
}

interface Props {
  visible: boolean
  title: string
  fields: Record<string, FieldConfig>
  data?: Record<string, any> | null
  loading?: boolean
  isEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), { loading: false, isEdit: false })

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: [data: Record<string, any>]
  close: []
}>()

const page = usePage()
function crudT(key?: string): string { return key ? ((page.props.crudLang as Record<string, string>)?.[key] ?? key) : '' }

const isOpen = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})

const formData = ref<Record<string, any>>({})

watch(() => props.visible, (newVal) => {
  formData.value = (newVal && props.data) ? { ...props.data } : {}
}, { immediate: true })

const onSubmit = () => emit('submit', formData.value)
const onClose = () => { formData.value = {}; emit('close'); emit('update:visible', false) }
</script>