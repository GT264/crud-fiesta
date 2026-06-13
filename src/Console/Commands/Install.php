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

        $this->info('📋 Istruzioni setup:');
        $this->newLine();
        $this->info('1. Nel tuo main.js, aggiungi:');
        $this->line('   import CrudPlugin from "crud-fiesta/resources/js/plugins/crudFiesta"');
        $this->line('   import PrimeVuePlugin from "crud-fiesta/resources/js/plugins/primevue"');
        $this->line('   ');
        $this->line('   app.use(PrimeVuePlugin)');
        $this->line('   app.use(CrudPlugin)');
        $this->newLine();

        $this->installNpmPackages();

        $this->newLine();
        $this->info('✅ CrudFiesta pronto! I componenti sono disponibili globalmente.');

        return self::SUCCESS;
    }

    // ----------------------------------------------------------------
    // Step 2 — Installa pacchetti npm richiesti
    // ----------------------------------------------------------------
    protected function installNpmPackages(): void
    {
        $packages = [
            'primevue',
            'primeicons',
        ];

        if (! file_exists(base_path('package.json'))) {
            $this->warn('⚠️  Nessun package.json trovato. Installa manualmente: ' . implode(' ', $packages));
            return;
        }

        $already = $this->alreadyInstalledPackages($packages);
        $toInstall = array_diff($packages, $already);

        if (empty($toInstall)) {
            $this->info('✅ Dipendenze npm già presenti.');
            return;
        }

        $cmd = 'npm install ' . implode(' ', $toInstall);
        $this->info("📥 Eseguo: $cmd");

        $result = Process::path(base_path())->run($cmd);

        $result->successful()
            ? $this->info('✅ Dipendenze npm installate.')
            : $this->error('❌ Errore npm: ' . $result->errorOutput());
    }

    // ----------------------------------------------------------------
    // Helper — controlla cosa è già in package.json
    // ----------------------------------------------------------------
    protected function alreadyInstalledPackages(array $packages): array
    {
        $packageJson = json_decode(file_get_contents(base_path('package.json')), true);
        $declared    = array_merge(
            $packageJson['dependencies']    ?? [],
            $packageJson['devDependencies'] ?? [],
        );

        return array_filter($packages, fn($p) => array_key_exists($p, $declared));
    }
}