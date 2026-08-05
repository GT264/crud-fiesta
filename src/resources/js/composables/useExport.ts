import { ref, onUnmounted, type Ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import type ToastComponent from '../Components/ui/Toast.vue'

export function useExport(
  routePrefix: string,
  toastRef: Ref<InstanceType<typeof ToastComponent> | null>,
  currentSearch: Ref<string>,
  currentSortField: Ref<string | null>,
  currentSortOrder: Ref<number>,
  currentFilters: Ref<Record<string, { type: string; value: any }>>,
) {
  const page = usePage()
  let pollInterval: ReturnType<typeof setInterval> | null = null

  async function onExport(format: 'xlsx' | 'csv') {
    try {
      const body: Record<string, any> = { format }

      if (currentSearch.value) {
        body.search = currentSearch.value
      }
      if (currentSortField.value) {
        body.sort_field = currentSortField.value
        body.sort_order = currentSortOrder.value
      }
      if (Object.keys(currentFilters.value).length > 0) {
        body.filters = currentFilters.value
      }

      const resp = await fetch(`/${routePrefix}/export/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': (page.props as any).csrf_token ?? '',
        },
        body: JSON.stringify(body),
      })

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ message: 'Export request failed' }))
        toastRef.value?.add({ severity: 'error', summary: 'Export Error', detail: err.message || 'Export request failed', life: 5000 })
        return
      }

      const { export_id } = await resp.json()
      toastRef.value?.add({ severity: 'info', summary: 'Export', detail: 'Export started — preparing your file...', life: 120000 })
      startPolling(export_id)
    } catch (err: any) {
      toastRef.value?.add({ severity: 'error', summary: 'Export Error', detail: 'Export failed: ' + (err.message || 'Unknown error'), life: 5000 })
    }
  }

  function startPolling(exportId: string) {
    stopPolling()

    pollInterval = setInterval(async () => {
      try {
        const resp = await fetch(`/${routePrefix}/export/status/${exportId}`, {
          headers: { Accept: 'application/json' },
        })

        if (!resp.ok) {
          console.warn('[crud-fiesta] Export status returned non-OK:', resp.status)
          return
        }

        const data = await resp.json()

        if (data.status === 'queued' || data.status === 'processing') {
          const detail = data.status === 'queued'
            ? 'Export started — preparing your file...'
            : `Exporting ${data.processed ?? 0} of ${data.total ?? 0} records...`
          toastRef.value?.add({ severity: 'info', summary: 'Export', detail, life: 120000 })
        } else if (data.status === 'completed') {
          stopPolling()
          triggerDownload(exportId)
        } else if (data.status === 'failed') {
          stopPolling()
          toastRef.value?.add({ severity: 'error', summary: 'Export Failed', detail: 'Export failed: ' + (data.error || 'Unknown error'), life: 10000 })
        }
      } catch (err) {
        console.warn('[crud-fiesta] Export polling error:', err)
      }
    }, 2000)
  }

  async function triggerDownload(exportId: string) {
    toastRef.value?.add({ severity: 'info', summary: 'Downloading...', detail: 'Your export file is being prepared', life: 5000 })

    const url = `/${routePrefix}/export/download/${exportId}`
    const resp = await fetch(url)
    const blob = await resp.blob()
    const blobUrl = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = blobUrl
    anchor.download = ''
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(blobUrl)
  }

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval)
      pollInterval = null
    }
  }

  onUnmounted(() => {
    stopPolling()
  })

  return { onExport }
}