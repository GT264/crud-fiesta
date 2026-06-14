<template>
  <Dialog
    v-model:visible="isOpen"
    :header="title"
    :modal="true"
    :closable="true"
    class="w-full md:w-1/2"
    @hide="onClose"
  >
    <form id="crud-form" @submit.prevent="onSubmit" class="space-y-4">
      <div v-for="(field, key) in fields" :key="key" class="field">
        <label :for="key" class="block mb-2 font-semibold">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>

        <!-- Text / Email -->
        <InputText
          v-if="field.form_type === 'text' || field.form_type === 'email'"
          :id="key"
          v-model="formData[key]"
          :type="field.form_type"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- Textarea -->
        <Textarea
          v-else-if="field.form_type === 'textarea'"
          :id="key"
          v-model="formData[key]"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
          rows="4"
        />

        <!-- Dropdown -->
        <Dropdown
          v-else-if="field.form_type === 'dropdown'"
          :id="key"
          v-model="formData[key]"
          :options="field.options || []"
          option-label="label"
          option-value="value"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- MultiSelect -->
        <MultiSelect
          v-else-if="field.form_type === 'multi_select'"
          :id="key"
          v-model="formData[key]"
          :options="field.options || []"
          option-label="label"
          option-value="value"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- File -->
        <FileUpload
          v-else-if="field.form_type === 'file'"
          :id="key"
          v-model="formData[key]"
          :auto="false"
          :multiple="false"
          :required="field.required"
        />

        <!-- Image -->
        <FileUpload
          v-else-if="field.form_type === 'image'"
          :id="key"
          v-model="formData[key]"
          :auto="false"
          accept="image/*"
          :multiple="false"
          :required="field.required"
        />
      </div>
    </form>

    <template #footer>
      <Button
        label="Annulla"
        icon="pi pi-times"
        class="p-button-text"
        @click="onClose"
      />
      <Button
        label="Salva"
        icon="pi pi-check"
        :loading="loading"
        type="submit"
        form="crud-form"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'

interface FieldConfig {
  label: string
  form_type: string
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

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isEdit: false,
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: [data: Record<string, any>]
  close: []
}>()

const isOpen = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})

const formData = ref<Record<string, any>>({})

watch(
  () => props.visible,
  (newVal) => {
    if (newVal && props.data) {
      formData.value = { ...props.data }
    } else if (newVal) {
      formData.value = {}
    }
  },
  { immediate: true }
)

const onSubmit = () => {
  emit('submit', formData.value)
}

const onClose = () => {
  formData.value = {}
  emit('close')
  emit('update:visible', false)
}
</script>
