<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $tahun = $request->tahun === null ? now()->year : (int)$request->tahun;
        
        // $user = Auth::user()->roleuser()->firstOrFail();

        // if ($user->instansi_id === null) {
        //     $cacheKey = 'total_'.$tahun;

        //     Cache::remember($cacheKey, 60, function () use ($tahun) {
        //         return DB::table('berkas')
        //             ->selectRaw("count(case when status_berka_id = 1 then 1 end) as registrasi")
        //             ->selectRaw("count(case when status_berka_id = 2 then 1 end) as verifikasi")
        //             ->selectRaw("count(case when status_berka_id = 3 then 1 end) as penolakan")
        //             ->selectRaw("count(case when status_berka_id = 4 then 1 end) as sp2d")
        //             ->whereYear('berkas.tgl_spm', $tahun)
        //             ->first();
        //     });

        // } else {
        //     $cacheKey = 'total_'.$user->instansi_id.'_'.$tahun;

        //     Cache::remember($cacheKey, 60, function () use ($user, $tahun) {
        //         return DB::table('berkas')
        //             ->selectRaw("count(case when status_berka_id = 1 then 1 end) as registrasi")
        //             ->selectRaw("count(case when status_berka_id = 2 then 1 end) as verifikasi")
        //             ->selectRaw("count(case when status_berka_id = 3 then 1 end) as penolakan")
        //             ->selectRaw("count(case when status_berka_id = 4 then 1 end) as sp2d")
        //             ->whereYear('berkas.tgl_spm', $tahun)
        //             ->where('instansi_id', $user->instansi_id)
        //             ->first();
        //     });
        // }

        return Inertia::render('dashboard', [
            // 'tahun' => $tahun,
            // 'totals' => $user->instansi_id === null ? Cache::get('total_'.$tahun) : Cache::get('total_'.$user->instansi_id.'_'.$tahun),
        ]);
    }
}
