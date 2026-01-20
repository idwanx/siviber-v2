<?php

namespace App\Observers;

use App\Models\SumberDana;
use Illuminate\Support\Facades\Cache;

class SumberDanaObserver
{
    /**
     * Handle the SumberDana "created" event.
     */
    public function created(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the SumberDana "updated" event.
     */
    public function updated(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the SumberDana "deleted" event.
     */
    public function deleted(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the SumberDana "restored" event.
     */
    public function restored(SumberDana $sumberDana): void
    {
        //
    }

    /**
     * Handle the SumberDana "force deleted" event.
     */
    public function forceDeleted(SumberDana $sumberDana): void
    {
        //
    }
}
