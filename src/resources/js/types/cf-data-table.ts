import type { ColumnDetail, FilterConfig, CrudButton } from './crud-fiesta'

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
