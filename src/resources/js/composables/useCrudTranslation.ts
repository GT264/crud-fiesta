import { usePage } from '@inertiajs/vue3'

export function useCrudTranslation() {
  const page = usePage()

  function crudT(key: string | undefined, replacements?: Record<string, string | number>): string {
    if (!key) return ''
    let value: string = (page.props.crudLang as Record<string, string>)?.[key] ?? key
    if (replacements) {
      for (const [param, val] of Object.entries(replacements)) {
        value = value.replace(`:${param}`, String(val))
      }
    }
    return value
  }

  return { crudT }
}