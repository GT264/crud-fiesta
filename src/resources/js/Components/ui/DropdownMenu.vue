<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../../lib/utils'

interface MenuItem {
  label: string
  icon?: string
  command?: () => void
  disabled?: boolean
}

interface Props {
  items?: MenuItem[]
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
})

const isOpen = ref(false)

function toggleMenu(event: Event) {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function onItemClick(item: MenuItem) {
  if (item.command) {
    item.command()
  }
  closeMenu()
}
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger Slot -->
    <div @click="toggleMenu">
      <slot name="trigger" />
    </div>

    <!-- Menu Content -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40"
        @click="closeMenu"
      />
    </Teleport>
    <div
      v-if="isOpen"
      :class="cn(
        'absolute right-0 z-50 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        props.class,
      )"
    >
      <button
        v-for="(item, index) in items"
        :key="index"
        :disabled="item.disabled"
        class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        @click="onItemClick(item)"
      >
        <slot name="item" :item="item">
          <span v-if="item.icon" :class="item.icon" />
          <span class="inline-block border border-border rounded px-2 py-0.5 text-xs bg-muted">{{ item.label }}</span>
        </slot>
      </button>
    </div>
  </div>
</template>