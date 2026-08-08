import { route } from 'ziggy-js'

export function useCrudFiesta() {
  function buildRoute(routeName: string, params?: Record<string, string | number>): string {
    return route(routeName, params)
  }

  function formatColumnValue(
    row: Record<string, unknown>,
    field: string,
    relation?: { relation: string; display_field: string }
  ): string {
    if (relation) {
      const related = row[relation.relation] as Record<string, unknown> | undefined
      if (related && typeof related[relation.display_field] !== 'undefined') {
        return String(related[relation.display_field] ?? '')
      }
      return ''
    }
    return String(row[field] ?? '')
  }

  function getSortIcon(
    field: string,
    sortField: string | null,
    sortOrder: 'asc' | 'desc' | null
  ): string | null {
    if (sortField !== field || !sortOrder) return null
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'
  }

  function getNextSortOrder(
    field: string,
    currentField: string | null,
    currentOrder: 'asc' | 'desc' | null
  ): 'asc' | 'desc' | null {
    if (currentField !== field || !currentOrder) return 'asc'
    if (currentOrder === 'asc') return 'desc'
    return null
  }

  return { buildRoute, formatColumnValue, getSortIcon, getNextSortOrder }
}
