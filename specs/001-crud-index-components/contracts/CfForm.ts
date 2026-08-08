/**
 * Contract: CfForm Props, Emits
 *
 * Dynamic form renderer that receives field configuration from the backend
 * (via CrudBaseDataTable form details) and renders appropriate inputs.
 * Used inside the Create/Edit drawer in CfIndex.
 */

export interface FieldConfig {
  field: string
  label: string
  form_type: string
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>
}

export interface CfFormProps {
  /** Field configuration from backend (create/edit form details) */
  formDetails: Record<string, FieldConfig>
  /** Existing item data (present for edit, absent for create) */
  item?: Record<string, unknown>
  /** Laravel route name prefix (e.g., 'admin.posts') */
  routePrefix: string
  /** Action type */
  action: 'create' | 'edit'
  /** Loading state for submit button */
  loading?: boolean
}

export interface CfFormEmits {
  (e: 'submit', data: Record<string, unknown>): void
  (e: 'cancel'): void
}