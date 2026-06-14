<?php

namespace GT264\CrudFiesta\Helpers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class GenerateCrud
{
    protected $stubs;

    public function generateCrud(
        string $model_name
    ) : void
    {
        // Get Stubs
        $stub_folder =__DIR__ . '/../Stubs';

        if (
            !File::exists($stub_folder)
        ) {
            throw new \Exception('Stubs folder not found');
        }

        // Generate all the info used in the subs
        $model_name = Str::studly($model_name);

        // Namespaces
        $controller_namespace = "App\Http\Controllers";
        $model_namespace = "App\Models";
        $data_table_namespace = "App\DataTables";
        $repository_namespace = "App\Repositories";
        $policy_namespace = "App\Policies";

        // Classes
        $model_class = "{$model_name}";
        $data_table_class = "{$model_name}DataTable";
        $repository_class = "{$model_name}Repository";

        // Use statements
        $use_model = "{$model_namespace}\\{$model_class}";
        $use_data_table = "{$data_table_namespace}\\{$data_table_class}";
        $use_repository = "{$repository_namespace}\\{$repository_class}";

        // Name for language files
        $language_name = Str::lower(Str::snake($model_name));

        $stub_files = File::files($stub_folder);

        foreach (
            $stub_files as 
            $stub_file
        ) {
            $content = File::get($stub_file);
            
            // Perform substitutions
            $content = str_replace([
                '{{ model_name }}',

                '{{ controller_namespace }}',
                '{{ model_namespace }}',
                '{{ data_table_namespace }}',
                '{{ policy_namespace }}',
                '{{ repository_namespace }}',
                
                '{{ use_model }}',
                '{{ use_data_table }}',
                '{{ use_repository }}',

                '{{ model_class }}',
                '{{ data_table_class }}',
                '{{ repository_class }}',

            ], [
                $model_name,

                $controller_namespace,
                $model_namespace,
                $data_table_namespace,
                $policy_namespace,
                $repository_namespace,

                $use_model,
                $use_data_table,
                $use_repository,

                $model_class,
                $data_table_class,
                $repository_class

            ], $content);

            // Generate file name and positioning
            switch (
                $stub_file->getFilename()
            ) {
                case 'CrudController.stub':
                    $path = app_path('Http/Controllers');
                    $filename = "{$model_class}CrudController.php";
                    break;
                case 'DataTable.stub':
                    $path = app_path('DataTables');
                    $filename = "{$data_table_class}.php";
                    break;
                case 'Migration.stub':
                    $timestamp = date('Y_m_d_His');
                    $path = database_path('migrations');
                    $table_name = Str::snake(Str::plural($model_name));
                    $filename = "{$timestamp}_create_{$table_name}_table.php";
                    break;
                case 'Language.stub':
                    $path = lang_path('en/models');
                    $filename = "{$language_name}.php";
                    break;
                case 'Policy.stub':
                    $path = app_path('Policies');
                    $filename = "{$model_class}Policy.php";
                    break;
                
                case 'Model.stub':
                    $path = app_path('Models');
                    $filename = "{$model_class}.php";
                    break;
                case 'Repository.stub':
                    $path = app_path('Repositories');
                    $filename = "{$model_class}Repository.php";
                    break;
                default:
                    // Todo error
                break;
            }

            // Create directory if not exists
            if (
                !File::exists($path)
            ) {
                File::makeDirectory($path, 0777, true);
            }

            // Write file
            File::put("{$path}/{$filename}", $content);
        }
    }
}