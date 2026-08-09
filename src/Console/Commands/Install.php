<?php

namespace GT264\CrudFiesta\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\File;

class Install extends Command
{
    protected $signature   = 'crud-fiesta:install';
    protected $description = 'Installa CrudFiesta: componenti Vue, tipi TS e dipendenze npm';

    public function handle(): int
    {
        $this->info('🚀 Installazione CrudFiesta...');

        $this->createAppResources();

        $this->installNpmPackages();

        $this->newLine();
        $this->info('📋 Aggiungi l\'alias nel tuo vite.config.ts:');
        $this->line('');
        $this->line("   import path from 'path'");
        $this->line('');
        $this->line("   resolve: {");
        $this->line("     alias: {");
        $this->line("       '@': '/resources/js',");
        $this->line("       '@crud-fiesta': path.resolve(__dirname, 'vendor/gt264/crud-fiesta/dist'),");
        $this->line("     }");
        $this->line("   }");
        $this->newLine();
        $this->info('📋 Aggiungi nel tuo app.ts:');
        $this->line('');
        $this->line("   import { ShadcnPlugin, CrudPlugin } from '@crud-fiesta'");
        $this->line("   import './assets/shadcn.css'");
        $this->line("   app.use(ShadcnPlugin)");
        $this->line("   app.use(CrudPlugin)");
        $this->newLine();
        $this->info('✅ CrudFiesta pronto!');

        return self::SUCCESS;
    }


    // ----------------------------------------------------------------
    // Step 1 — Crea l'enum delle risorse
    // ----------------------------------------------------------------
    protected function createAppResources(): void
    {
        $resources_path = base_path('app/Enums/AppResource.php');
        $enums_path = base_path('app/Enums');

        if (file_exists($resources_path)) {
            $this->warn('⚠️  Il file AppResource.php esiste già. Ignorato.');
            return;
        }

        $this->info("📥 Creazione di {$resources_path}...");

        $content = File::get(__DIR__ . '/../../Stubs/AppResourceStubs/AppResource.stub');

         if (
            !File::exists($enums_path)
        ) {
            File::makeDirectory($enums_path, 0777, true);
        }

        File::put($resources_path, $content);

        $this->info('✅ Enum delle risorse creato.');
    }

    // ----------------------------------------------------------------
    // Step 2 — Installa pacchetti npm richiesti
    // ----------------------------------------------------------------
    protected function installNpmPackages(): void
    {
        $packages = [
            'lucide-vue-next',
            '@vueuse/core',
            'maska',
            '@tiptap/vue-3',
            '@tiptap/starter-kit',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
        ];

        if (! file_exists(base_path('package.json'))) {
            $this->warn('⚠️  Nessun package.json trovato. Installa manualmente: ' . implode(' ', $packages));
            return;
        }

        $cmd = 'npm install ' . implode(' ', $packages);
        $this->info("📥 Eseguo: {$cmd}");

        $result = Process::path(base_path())->run($cmd);

        $result->successful()
            ? $this->info('✅ Dipendenze npm installate.')
            : $this->error('❌ Errore npm: ' . $result->errorOutput());
    }
}