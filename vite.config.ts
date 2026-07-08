import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/resources/js/index.ts'),
            formats: ['es'],
            fileName: () => 'index.js',
        },
        rollupOptions: {
            // Vue e PrimeVue sono nel consumer: non bundliamo per evitare
            // istanze doppie (il PrimeVue plugin va registrato una volta sola)
            external: ['vue', /^vue\//, /^primevue/, /^primeicons/, '@inertiajs/vue3', 'laravel-vue-i18n'],
            output: {
                // Preserva la struttura delle cartelle in dist/
                preserveModules: true,
                preserveModulesRoot: 'dist',
            },
        },
        outDir: 'dist'
    },
})