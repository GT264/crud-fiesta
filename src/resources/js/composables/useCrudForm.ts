import { computed, ref } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
import { route } from 'ziggy-js'

interface BackendCrudButton {
  action: string
  icon: string
  label: string
  route_name: string
  event?: string
}

interface FrontendCrudButton {
  action: string
  icon: string
  label: string
}

export function useCrudForm(routePrefix: string, crudButtons: BackendCrudButton[]) {
  const formVisible = ref(false)
  const formTitle = ref('')
  const formFields = ref<Record<string, any>>({})
  const formIsEdit = ref(false)
  const editingId = ref<number | string | null>(null)

  const form = useForm({})

  const routeSegmentToAction: Record<string, string> = { show: 'view', edit: 'edit', destroy: 'delete' }
  function mapButtonAction(btn: BackendCrudButton): string {
    return btn.event || routeSegmentToAction[btn.action] || btn.action
  }
  const mappedButtons = computed<FrontendCrudButton[]>(() =>
    crudButtons.map((btn) => ({ action: mapButtonAction(btn), icon: btn.icon, label: btn.label })),
  )

  function buildRoute(name: string): string { return route(name) }
  function buildRouteWithId(name: string, id: string | number): string { return route(name, { id }) }

  function resetFormData(initial: Record<string, any>) {
    Object.keys(form).forEach((k) => delete (form as any)[k])
    Object.entries(initial).forEach(([k, v]) => {
      (form as Record<string, any>)[k] = v
    })
    form.clearErrors()
  }

  async function goToCreate(title: string) {
    const btn = crudButtons.find((b) => b.action === 'create')
    try {
      const url = btn ? buildRoute(btn.route_name) : `/${routePrefix}/create`
      const fields = await (await fetch(url, { headers: { Accept: 'application/json' } })).json()
      resetFormData({})
      formFields.value = fields
      formTitle.value = title
      formIsEdit.value = false
      editingId.value = null
      formVisible.value = true
    } catch (err) {
      console.error('Failed to load create form:', err)
    }
  }

  async function onEdit(id: any, title: string) {
    const btn = crudButtons.find((b) => b.action === 'edit')
    try {
      const url = btn ? buildRouteWithId(btn.route_name, id) : `/${routePrefix}/${id}/edit`
      const json = await (await fetch(url, { headers: { Accept: 'application/json' } })).json()
      resetFormData(json.item ?? {})
      formFields.value = json.form_details
      formTitle.value = title
      formIsEdit.value = true
      editingId.value = id
      formVisible.value = true
    } catch (err) {
      console.error('Failed to load edit form:', err)
    }
  }

  function onFormSubmit() {
    form.clearErrors()
    const url = formIsEdit.value ? `/${routePrefix}/${editingId.value}` : `/${routePrefix}`

    if (formIsEdit.value) {
      form.put(url, { onSuccess: () => { formVisible.value = false } })
    } else {
      form.post(url, { onSuccess: () => { formVisible.value = false } })
    }
  }

  function onFormClose() {
    formVisible.value = false
    editingId.value = null
    resetFormData({})
  }

  function onView(id: any) {
    router.get(`/${routePrefix}/${id}`)
  }

  function onDelete(id: any) {
    router.delete(`/${routePrefix}/${id}`)
  }

  return {
    formVisible,
    formTitle,
    formFields,
    formIsEdit,
    editingId,
    form,
    mappedButtons,
    goToCreate,
    onEdit,
    onFormSubmit,
    onFormClose,
    onView,
    onDelete,
  }
}