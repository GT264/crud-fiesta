/**
 * Contract: CfActions Props, Emits, Slots
 *
 * Renders CRUD action buttons for a single table row.
 * Receives button configuration and the row data, emits events
 * when the user triggers an action (edit opens drawer, delete shows confirm dialog).
 */

import type { CrudButton } from './CfIndex-props'

export interface CfActionsProps {
  buttons: CrudButton[]
  row: Record<string, unknown>
  routePrefix: string
  keyName: string
}

export interface CfActionsEmits {
  (e: 'edit', rowId: string | number): void
  (e: 'delete', row: Record<string, unknown>): void
}

/**
 * Slot: #button
 *
 * Props passed to the slot:
 *   button: CrudButton
 *   row: Record<string, unknown>
 *
 * Override the default rendering of a single action button.
 * Example:
 *   <template #button="{ button, row }">Custom...</template>
 */