import { ref, type Ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import type ToastComponent from '../Components/ui/Toast.vue'

export function useFlashToasts() {
  const page = usePage()
  const toastRef: Ref<InstanceType<typeof ToastComponent> | null> = ref(null)
  const shownFlashes = new Set<string>()

  router.on('finish', () => {
    const flash = page.props.flash as Record<string, any> | undefined
    if (flash?.success && !shownFlashes.has('success:' + flash.success)) {
      shownFlashes.add('success:' + flash.success)
      toastRef.value?.add({ severity: 'success', summary: 'Success', detail: flash.success, life: 5000 })
    }
    if (flash?.error && !shownFlashes.has('error:' + flash.error)) {
      shownFlashes.add('error:' + flash.error)
      toastRef.value?.add({ severity: 'error', summary: 'Error', detail: flash.error, life: 5000 })
    }
  })

  return { toastRef }
}