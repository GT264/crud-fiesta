<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FieldConfig } from '../../types/cf-form'

const props = withDefaults(defineProps<{
  formDetails: Record<string, FieldConfig>
  item?: Record<string, unknown>
  routePrefix: string
  action: 'create' | 'edit'
  loading?: boolean
}>(), {
  loading: false,
})

const emit = defineEmits<{
  (e: 'submit', data: Record<string, unknown>): void
  (e: 'cancel'): void
}>()

const formData = reactive<Record<string, unknown>>({})

function initForm() {
  for (const [field, config] of Object.entries(props.formDetails)) {
    if (props.item && props.item[field] !== undefined) {
      formData[field] = props.item[field]
    } else {
      formData[field] = ''
    }
  }
}
initForm()
watch(() => props.item, () => initForm())

function handleSubmit() {
  emit('submit', { ...formData })
}

function renderInput(field: string, config: FieldConfig): string {
  const ft = config.form_type as string
  if (['select', 'multiselect', 'checkbox', 'radio'].includes(ft)) return ft
  if (ft === 'richtext') return 'richtext'
  if (ft === 'textarea') return 'textarea'
  if (['date', 'datetime', 'datetime-local'].includes(ft)) return ft
  if (['image', 'file'].includes(ft)) return 'file'
  if (ft === 'password') return 'password'
  return 'text'
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div v-for="(config, field) in formDetails" :key="field" class="space-y-2">
      <label :for="`field-${field}`" class="text-sm font-medium leading-none">
        {{ config.label }}
      </label>

      <!-- Text/email/number/url/password -->
      <input
        v-if="renderInput(field, config) === 'text' || renderInput(field, config) === 'email' || renderInput(field, config) === 'number' || renderInput(field, config) === 'url' || renderInput(field, config) === 'password'"
        :id="`field-${field}`"
        v-model="formData[field]"
        :type="renderInput(field, config)"
        :placeholder="config.placeholder"
        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />

      <!-- Textarea -->
      <textarea
        v-else-if="renderInput(field, config) === 'textarea'"
        :id="`field-${field}`"
        v-model="formData[field]"
        :placeholder="config.placeholder"
        rows="4"
        class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />

      <!-- Select -->
      <select
        v-else-if="renderInput(field, config) === 'select'"
        :id="`field-${field}`"
        v-model="formData[field]"
        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <option value="">{{ config.placeholder || 'Select...' }}</option>
        <option
          v-for="opt in (config.options || [])"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>

      <!-- Multiselect -->
      <div v-else-if="renderInput(field, config) === 'multiselect'" class="space-y-1">
        <label
          v-for="opt in (config.options || [])"
          :key="opt.value"
          class="flex items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            :value="opt.value"
            :checked="(Array.isArray(formData[field]) ? formData[field] as unknown[] : []).includes(opt.value)"
            @change="(e: Event) => {
              const target = e.target as HTMLInputElement
              const arr = Array.isArray(formData[field]) ? [...formData[field] as unknown[]] : []
              if (target.checked) {
                arr.push(opt.value)
              } else {
                const idx = arr.indexOf(opt.value)
                if (idx > -1) arr.splice(idx, 1)
              }
              formData[field] = arr
            }"
            class="size-4 rounded border border-input"
          />
          {{ opt.label }}
        </label>
      </div>

      <!-- Date / Datetime -->
      <input
        v-else-if="renderInput(field, config) === 'date' || renderInput(field, config) === 'datetime' || renderInput(field, config) === 'datetime-local'"
        :id="`field-${field}`"
        v-model="formData[field]"
        :type="renderInput(field, config) === 'datetime' ? 'datetime-local' : renderInput(field, config)"
        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />

      <!-- Checkbox -->
      <div v-else-if="renderInput(field, config) === 'checkbox'" class="flex items-center gap-2">
        <input
          type="checkbox"
          :id="`field-${field}`"
          v-model="formData[field]"
          class="size-4 rounded border border-input"
        />
        <label :for="`field-${field}`" class="text-sm">{{ config.label }}</label>
      </div>

      <!-- File upload placeholder -->
      <input
        v-else-if="renderInput(field, config) === 'file'"
        :id="`field-${field}`"
        type="file"
        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium"
      />

      <!-- Rich text placeholder -->
      <textarea
        v-else-if="renderInput(field, config) === 'richtext'"
        :id="`field-${field}`"
        v-model="formData[field]"
        rows="6"
        class="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>

    <div class="flex justify-end gap-2 pt-4 border-t">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
        @click="emit('cancel')"
        :disabled="loading"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : action === 'create' ? 'Create' : 'Save' }}
      </button>
    </div>
  </form>
</template>
