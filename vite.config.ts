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
            // Vue e shadcn-vue sono nel consumer: non bundliamo per evitare
            // istanze doppie
            external: ['vue', /^vue\//, '@inertiajs/vue3', 'ziggy-js', 'lucide-vue-next', '@vueuse/core', 'maska', '@tiptap/vue-3', '@tiptap/starter-kit', 'clsx', 'tailwind-merge', 'class-variance-authority'],
            output: {
                // Preserva la struttura delle cartelle in dist/
                preserveModules: true,
                preserveModulesRoot: 'dist',
            },
        },
        outDir: 'dist'
    },
})