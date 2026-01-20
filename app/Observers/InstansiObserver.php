<?php

namespace App\Observers;

use App\Models\Instansi;
use Illuminate\Support\Facades\Cache;

class InstansiObserver
{
    /**
     * Handle the Instansi "created" event.
     */
    public function created(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the Instansi "updated" event.
     */
    public function updated(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the Instansi "deleted" event.
     */
    public function deleted(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the Instansi "restored" event.
     */
    public function restored(Instansi $instansi): void
    {
        //
    }

    /**
     * Handle the Instansi "force deleted" event.
     */
    public function forceDeleted(Instansi $instansi): void
    {
        //
    }
}
