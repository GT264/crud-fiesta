/**
 * Contract: Inertia Page Props for CfIndex
 *
 * Shape of props passed from CrudBaseController::index() to the Inertia page.
 * CfIndex.vue MUST accept these exact prop names and types.
 */

export interface LengthAwarePaginator<T = Record<string, unknown>> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
}

export interface ColumnDetail {
  field: string
  header: string
  filter_config?: FilterConfig
  relation?: { relation: string; display_field: string }
}

export type FilterType = 'select' | 'multiselect' | 'date' | 'date_range'

export interface FilterConfig {
  field: string
  type: FilterType
  options?: Array<{ label: string; value: string | number }>
}

export type CrudAction = 'show' | 'edit' | 'destroy'

export interface CrudButton {
  action: CrudAction
  icon: string
  label: string
  route_name: string
  event?: string
}

export interface CrudIndexPageProps {
  column_data: LengthAwarePaginator
  columns_details: ColumnDetail[]
  column_filters: Record<string, FilterConfig>
  route_prefix: string
  key_name: string
  model_lang: string
  crud_buttons: CrudButton[]
  optional_buttons: CrudButton[]
  actions_label: string
  lang: string
  pagination_per_page: number
  pagination_per_page_options: number[]
  flash?: { success?: string; error?: string }
}