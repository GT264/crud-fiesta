import type { CrudButton } from './crud-fiesta'

export interface CfActionsProps {
  buttons: CrudButton[]
  row: Record<string, unknown>
  routePrefix: string
  keyName: string
}
