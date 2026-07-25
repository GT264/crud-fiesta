<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../../lib/utils'
import { X } from 'lucide-vue-next'

export interface Toast {
  id: string
  severity?: 'success' | 'error' | 'info' | 'warning'
  summary?: string
  detail?: string
  life?: number
}

const toasts = ref<Toast[]>([])

let toastId = 0

function add(toast: Omit<Toast, 'id'>) {
  const id = String(++toastId)
  const t = { ...toast, id }
  toasts.value.push(t)
  if (toast.life) {
    setTimeout(() => remove(id), toast.life)
  }
}

function remove(id: string) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

defineExpose({ add, remove })
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="cn(
          'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all',
          toast.severity === 'success' && 'border-green-200 bg-green-50 text-green-800',
          toast.severity === 'error' && 'border-red-200 bg-red-50 text-red-800',
          toast.severity === 'warning' && 'border-yellow-200 bg-yellow-50 text-yellow-800',
          toast.severity === 'info' && 'border-blue-200 bg-blue-50 text-blue-800',
          !toast.severity && 'border-gray-200 bg-white text-gray-800',
        )"
      >
        <div class="flex-1">
          <div v-if="toast.summary" class="font-semibold text-sm">{{ toast.summary }}</div>
          <div v-if="toast.detail" class="text-sm opacity-80">{{ toast.detail }}</div>
        </div>
        <button class="opacity-50 hover:opacity-100" @click="remove(toast.id)">
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>
  </Teleport>
</template>