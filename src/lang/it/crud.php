<?php

return [
    'button' => [
        'actions' => 'Azioni',
        'view'    => 'Visualizza',
        'edit'    => 'Modifica',
        'delete'  => 'Elimina',
        'create'  => 'Crea',
        'cancel'  => 'Annulla',
    ],
    'form' => [
        'insert' => 'Inserisci :field',
        'select' => 'Seleziona :field',
        'load'   => 'Carica :field',
    ],
    'message' => [
        'success_create' => ':model_name creato con successo.',
        'success_update' => ':model_name aggiornato con successo.',
        'success_delete' => ':model_name eliminato con successo.',
        'error_create' => ':model_name creazione fallita.',
        'error_update' => ':model_name aggiornamento fallito.',
        'error_delete' => ':model_name eliminazione fallita.',
    ],
    'datatable' => [
        'search_placeholder' => 'Cerca...',
        'no_data' => 'Nessun dato disponibile',
        'filters' => [
            'select_placeholder' => 'Seleziona...',
            'date_from' => 'Da',
            'date_to' => 'A',
        ],
        'per_page' => 'per pagina',
        'previous' => 'Precedente',
        'next' => 'Successivo',
        'current_of_total' => 'Pagina :current di :total',
        'page' => 'Pagina',
    ],
    'delete_confirm' => [
        'header' => 'Conferma',
        'message' => 'Sei sicuro di voler eliminare questo elemento?',
    ],
    'title' => [
        'index' => 'Elenco :model_name',
    ],
    'export' => [
        'label' => 'Esporta',
        'excel' => 'Esporta Excel',
        'csv' => 'Esporta CSV',
        'started' => 'Esportazione avviata — preparazione del file...',
        'processing' => 'Esportazione di :processed di :total record...',
        'ready' => 'Esportazione pronta!',
        'download' => 'Scarica',
        'failed' => 'Esportazione fallita: :error',
    ],
];