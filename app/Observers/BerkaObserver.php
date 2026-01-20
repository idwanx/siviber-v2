<?php

namespace App\Observers;

use App\Models\Berka;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class BerkaObserver
{
    /**
     * Handle the Berka "created" event.
     */
    public function created(Berka $berka): void
    {

        // Log::info("berkas baru ditambahkan " . $berka->tgl_spm->year);
        Cache::forget('total_'.$berka->tgl_spm->year);
        Cache::forget('total_'.$berka->instansi_id.'_'.$berka->tgl_spm->year);

    }

    /**
     * Handle the Berka "updated" event.
     */
    public function updated(Berka $berka): void
    {
        Cache::forget('total_'.$berka->tgl_spm->year);
        Cache::forget('total_'.$berka->instansi_id.'_'.$berka->tgl_spm->year);
    }

    /**
     * Handle the Berka "deleted" event.
     */
    public function deleted(Berka $berka): void
    {
        Cache::forget('total_'.$berka->tgl_spm->year);
        Cache::forget('total_'.$berka->instansi_id.'_'.$berka->tgl_spm->year);
    }

    /**
     * Handle the Berka "restored" event.
     */
    public function restored(Berka $berka): void
    {
        //
    }

    /**
     * Handle the Berka "force deleted" event.
     */
    public function forceDeleted(Berka $berka): void
    {
        //
    }
}
