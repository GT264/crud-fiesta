import { App } from 'vue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

export default {
    install: (app: App) => {
        app.use(PrimeVue, {
            theme: { preset: Aura }
        })
        app.use(ConfirmationService)
        app.use(ToastService)
    }
}
