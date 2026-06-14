<?php

namespace GT264\CrudFiesta\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;

class Install extends Command
{
    protected $signature   = 'crud-fiesta:install';
    protected $description = 'Installa CrudFiesta: componenti Vue, tipi TS e dipendenze npm';

    public function handle(): int
    {
        $this->info('🚀 Installazione CrudFiesta...');

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
        $this->line("   import { PrimeVuePlugin, CrudPlugin } from '@crud-fiesta'");
        $this->line("   app.use(PrimeVuePlugin)");
        $this->line("   app.use(CrudPlugin)");
        $this->newLine();
        $this->info('✅ CrudFiesta pronto!');

        return self::SUCCESS;
    }

    // ----------------------------------------------------------------
    // Step 2 — Installa pacchetti npm richiesti
    // ----------------------------------------------------------------
    protected function installNpmPackages(): void
    {
        $packages = [
            'primevue',
            '@primevue/themes',
            'primeicons',
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