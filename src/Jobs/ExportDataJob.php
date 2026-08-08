<?php

namespace GT264\CrudFiesta\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use OpenSpout\Writer\XLSX\Writer as XLSXWriter;
use OpenSpout\Writer\CSV\Writer as CSVWriter;
use OpenSpout\Writer\WriterInterface;
use OpenSpout\Common\Entity\Row;

use GT264\CrudFiesta\Repositories\CrudBaseRepository;

class ExportDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private CrudBaseRepository $repository,
        private string $exportId,
        private string $modelClass,
        private string $modelName,
        private array $columns,
        private array $relationMap,
        private ?string $sortField,
        private string $sortDirection,
        private ?string $search,
        private ?array $filters,
        private string $format,
        private string $timestamp,
    ) {}

    public function handle(): void
    {
        $cacheKey = "crud-fiesta:export:{$this->exportId}";

        // 1. Build query using the shared repository method (no duplication)
        $query = $this->repository->buildFilteredQuery(
            $this->columns,
            $this->sortField,
            $this->sortDirection,
            $this->relationMap,
            $this->search,
            $this->filters
        );

        // 2. Get total count (filtered, not all records)
        $total = $query->count();

        Cache::put($cacheKey, [
            'status' => 'processing',
            'processed' => 0,
            'total' => $total,
            'format' => $this->format,
        ], now()->addHours(24));

        // 3. Create temp file
        $disk = config('crud-fiesta.export.disk', 'local');
        $exportPath = config('crud-fiesta.export.path', 'exports');
        $filename = "{$this->modelName}-{$this->timestamp}.{$this->format}";
        $storagePath = $exportPath . '/' . $filename;
        $filePath = Storage::disk($disk)->path($storagePath);

        // Ensure directory exists
        $dir = dirname($filePath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        // 4. Write via openspout
        $writer = $this->createWriter($filePath);

        // Header row
        $writer->addRow(Row::fromValues($this->columns));

        // Chunk and write
        $processed = 0;
        $chunkSize = config('crud-fiesta.export.chunk_size', 50);

        $query->chunk($chunkSize, function ($rows) use ($writer, &$processed, $total, $cacheKey) {
            foreach ($rows as $row) {
                $rowData = [];
                foreach ($this->columns as $col) {
                    if (isset($this->relationMap[$col])) {
                        $rel = $this->relationMap[$col];
                        $rowData[] = $row->{$rel['relation']}?->{$rel['display_field']} ?? '';
                    } else {
                        $rowData[] = $row->{$col} ?? '';
                    }
                }
                $writer->addRow(Row::fromValues($rowData));
            }

            $processed += count($rows);

            Cache::put($cacheKey, [
                'status' => 'processing',
                'processed' => $processed,
                'total' => $total,
                'format' => $this->format,
            ], now()->addHours(24));
        });

        $writer->close();

        // 5. Mark complete
        Cache::put($cacheKey, [
            'status' => 'completed',
            'file_path' => $filePath,
            'processed' => $processed,
            'total' => $total,
            'format' => $this->format,
        ], now()->addHours(24));
    }

    public function failed(\Throwable $e): void
    {
        Cache::put("crud-fiesta:export:{$this->exportId}", [
            'status' => 'failed',
            'error' => $e->getMessage(),
        ], now()->addHours(24));
    }

    private function createWriter(string $filePath): WriterInterface
    {
        if (
            $this->format === 'csv'
        ) {
            $writer = new CSVWriter();
        } else if (
             $this->format === 'xlsx'
        ) {
            $writer = new XLSXWriter();
        } else {
            throw new \InvalidArgumentException("Unsupported export format: {$this->format}");
        }

        $writer->openToFile($filePath);
        return $writer;
    }
}