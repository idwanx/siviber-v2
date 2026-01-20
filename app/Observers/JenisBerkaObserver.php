<?php

namespace App\Observers;

use App\Models\JenisBerka;
use Illuminate\Support\Facades\Cache;

class JenisBerkaObserver
{
    /**
     * Handle the JenisBerka "created" event.
     */
    public function created(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the JenisBerka "updated" event.
     */
    public function updated(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the JenisBerka "deleted" event.
     */
    public function deleted(): void
    {
        Cache::forget('dataPendukung');
    }

    /**
     * Handle the JenisBerka "restored" event.
     */
    public function restored(JenisBerka $jenisBerka): void
    {
        //
    }

    /**
     * Handle the JenisBerka "force deleted" event.
     */
    public function forceDeleted(JenisBerka $jenisBerka): void
    {
        //
    }
}
