/**
 * Contract: CfDataTable Props, Emits, Slots
 *
 * CfDataTable is a TanStack Table wrapper that is purely presentational.
 * It receives data and configuration as props, and emits events for all
 * user interactions. State management is the parent's responsibility.
 */

import type { ColumnDetail, FilterConfig, CrudButton } from './CfIndex-props'

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  from: number | null
  to: number | null
}

export interface CfDataTableProps {
  columnsDetails: ColumnDetail[]
  data: Record<string, unknown>[]
  columnFilters: Record<string, FilterConfig>
  sortField: string | null
  sortOrder: 'asc' | 'desc' | null
  filters: Record<string, unknown>
  routePrefix: string
  keyName: string
  crudButtons: CrudButton[]
  actionsLabel: string
  pagination: PaginationMeta
  perPage: number
  perPageOptions: number[]
  loading?: boolean
  searchValue?: string
}

export interface CfDataTableEmits {
  (e: 'sort', field: string): void
  (e: 'filter', field: string, value: unknown): void
  (e: 'clearFilters'): void
  (e: 'pageChange', page: number): void
  (e: 'perPageChange', perPage: number): void
  (e: 'export', format: 'xlsx' | 'csv'): void
  (e: 'search', term: string): void
  (e: 'edit', rowId: string | number): void
  (e: 'delete', row: Record<string, unknown>): void
}

/**
 * Available slots for consumer customization.
 *
 * Dynamic slots use `[field]` placeholder, e.g.:
 *   #header-title, #cell-status, #filter-role
 *
 * Static slots:
 *   #actions, #toolbar-prepend, #toolbar-append, #empty, #create-button
 */
export type CfDataTableSlots =
  | `header-${string}`
  | `cell-${string}`
  | `filter-${string}`
  | 'actions'
  | 'toolbar-prepend'
  | 'toolbar-append'
  | 'empty'
  | 'create-button'