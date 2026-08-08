export interface FieldConfig {
  field: string
  label: string
  form_type: string
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>
}

export interface CfFormProps {
  formDetails: Record<string, FieldConfig>
  item?: Record<string, unknown>
  routePrefix: string
  action: 'create' | 'edit'
  loading?: boolean
}
