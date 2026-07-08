import { App } from 'vue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Aura from '@primeuix/themes/aura'

export default {
    install: (app: App) => {
        app.use(PrimeVue, {
            theme: { preset: Aura }
        })
        app.use(ConfirmationService)
    }
}
