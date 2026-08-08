import type { App } from 'vue'
import CfIndex from './Components/Crud/CfIndex.vue'
import CfDataTable from './Components/Crud/CfDataTable.vue'
import CfActions from './Components/Crud/CfActions.vue'
import CfForm from './Components/Crud/CfForm.vue'

export const CrudPlugin = {
  install(app: App) {
    app.component('CfIndex', CfIndex)
    app.component('CfDataTable', CfDataTable)
    app.component('CfActions', CfActions)
    app.component('CfForm', CfForm)
  },
}

export const ShadcnPlugin = {
  install(_app: App) {
    // shadcn-vue components are configured by the consumer project.
    // This plugin is a placeholder for cross-package compatibility.
  },
}

export const crudPages: Record<string, any> = {
  'Pages/Index': CfIndex,
}

export { CfIndex, CfDataTable, CfActions, CfForm }
export { useCrudFiesta } from './Components/Crud/utils/useCrudFiesta'

export type {
  LengthAwarePaginator,
  ColumnDetail,
  FilterConfig,
  FilterType,
  CrudAction,
  CrudButton,
  CrudIndexPageProps,
} from './types/crud-fiesta'

export type {
  PaginationMeta,
  CfDataTableProps,
} from './types/cf-data-table'

export type { CfActionsProps } from './types/cf-actions'

export type { FieldConfig, CfFormProps } from './types/cf-form'