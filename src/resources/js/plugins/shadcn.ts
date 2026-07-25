import { App } from 'vue'

export default {
    install: (_app: App) => {
        // shadcn-vue components are imported directly where needed (no global registration).
        // Global CSS should be imported by the consumer application (e.g. @/assets/shadcn.css).
        // The Toast component is rendered inline in Index.vue via provide/inject pattern below.
    }
}