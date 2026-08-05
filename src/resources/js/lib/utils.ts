import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inputClasses =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

export const textareaClasses =
  'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

export interface ColumnFilterOption {
  label: string
  value: string | number
}

export interface ColumnFilterConfig {
  field: string
  type: 'select' | 'multiselect' | 'date' | 'date_range'
  options?: ColumnFilterOption[]
}

export type FilterValues = Record<string, string | string[] | undefined>

export type FilterPayload = Record<string, { type: string; value: any }>

export function buildFilterPayload(
  columns: Array<{ field: string; filter_config?: ColumnFilterConfig }>,
  filterValues: FilterValues,
): FilterPayload {
  const payload: FilterPayload = {}
  for (const col of columns) {
    if (!col.filter_config) continue
    const field = col.field
    const config = col.filter_config
    if (config.type === 'date_range') {
      const start = filterValues[field + '_start']
      const end = filterValues[field + '_end']
      if (start || end) {
        payload[field] = { type: 'date_range', value: { start: start || '', end: end || '' } }
      }
    } else {
      const val = filterValues[field]
      if (val !== undefined && val !== null && val !== '' && (!Array.isArray(val) || val.length > 0)) {
        payload[field] = { type: config.type, value: val }
      }
    }
  }
  return payload
}
