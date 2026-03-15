<?php

namespace GT264\CrudFiesta\Console\Commands;

use Illuminate\Console\Command;

class GenerateCrud extends Command
{
    protected $argumentName = 'model_name';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'crud:generate {model_name}';
 
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create the complete crud for the model, with controller, repository, policy, migration, and table';
 
    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        dd($this->argument('model_name'));

    }

}