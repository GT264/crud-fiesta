import { App } from 'vue'
import CrudIndex from '../Pages/Index.vue'
import CrudDataTable from '../Components/Crud/CrudDataTable.vue'
import CrudForm from '../Components/Crud/CrudForm.vue'
import CrudActions from '../Components/Crud/CrudActions.vue'

const components = {
    CrudIndex,
    CrudDataTable,
    CrudForm,
    CrudActions,
}

export { CrudIndex, CrudDataTable, CrudForm, CrudActions }

export default {
    install: (app: App) => {
        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component)
        })
    }
}
