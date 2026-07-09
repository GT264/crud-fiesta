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

        <!-- InputText -->
        <InputText
          v-if="field.type === 'InputText'"
          :id="key"
          v-model="formData[key]"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- Email -->
        <InputText
          v-else-if="field.type === 'email'"
          :id="key"
          v-model="formData[key]"
          type="email"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- InputTextarea -->
        <Textarea
          v-else-if="field.type === 'InputTextarea'"
          :id="key"
          v-model="formData[key]"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
          rows="4"
        />

        <!-- InputNumber -->
        <InputNumber
          v-else-if="field.type === 'InputNumber'"
          :id="key"
          v-model="formData[key]"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- Calendar / DatePicker -->
        <DatePicker
          v-else-if="field.type === 'Calendar'"
          :id="key"
          v-model="formData[key]"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- Checkbox -->
        <Checkbox
          v-else-if="field.type === 'Checkbox'"
          :id="key"
          v-model="formData[key]"
          :binary="true"
          :required="field.required"
        />

        <!-- Password -->
        <Password
          v-else-if="field.type === 'Password'"
          :id="key"
          v-model="formData[key]"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
          toggle-mask
        />

        <!-- Rating -->
        <Rating
          v-else-if="field.type === 'Rating'"
          v-model="formData[key]"
          :required="field.required"
        />

        <!-- InputMask -->
        <InputMask
          v-else-if="field.type === 'InputMask'"
          :id="key"
          v-model="formData[key]"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- Editor (rich text) -->
        <Editor
          v-else-if="field.type === 'Editor'"
          v-model="formData[key]"
          editor-style="height: 200px"
          :required="field.required"
        />

        <!-- Dropdown (placeholder for later) -->
        <Dropdown
          v-else-if="field.type === 'Dropdown'"
          :id="key"
          v-model="formData[key]"
          :options="field.options || []"
          option-label="label"
          option-value="value"
          :placeholder="field.placeholder"
          class="w-full"
          :required="field.required"
        />

        <!-- MultiSelect (placeholder for later) -->
        <MultiSelect
          v-else-if="field.type === 'MultiSelect'"
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
          v-else-if="field.type === 'File'"
          :id="key"
          v-model="formData[key]"
          :auto="false"
          :multiple="false"
          :required="field.required"
        />

        <!-- Image -->
        <FileUpload
          v-else-if="field.type === 'Image'"
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
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Password from 'primevue/password'
import Rating from 'primevue/rating'
import InputMask from 'primevue/inputmask'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'

const Editor = defineAsyncComponent(() => import('primevue/editor'))

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
  { immediate: true },
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