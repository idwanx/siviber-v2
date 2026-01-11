<?php

namespace App\Http\Controllers;

use App\Models\Berka;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(?int $tahun = null): Response
    {
        $currentYear = now()->year;

        // $daftarberkas = DB::table('berkas')
        // ->select([
        //     'berkas.id',
        //     'berkas.kegiatan',
        //     DB::raw('COUNT(catatan_berkas.id) as catatans_count') // Count related table's IDs
        // ])
        // ->leftJoin('catatan_berkas', 'berkas.id', '=', 'catatan_berkas.berka_id')
        // ->whereYear('berkas.tgl_spm', $tahun)
        // // ->where('users.status', '<>', 1) // Example condition on the main table
        // // ->whereNull('posts.deleted_at') // Example condition on the related table
        // ->groupBy('berkas.id') // Group by main table columns
        // ->get();
        


        // $daftarberkas = DB::table('berkas')
        // ->join('riwayat_berkas', function (JoinClause $join) {
        //     $join->on('berkas.id', '=', 'riwayat_berkas.berka_id')
        //         ->whereNot('riwayat_berkas.status_berka_id', '!=', 1);
        // })
        // ->get();

        // $daftarberkas = Berka::whereDoesntHave('riwayat', function (Builder $query) {
        //     $query->whereIn('status_berka_id', [2,3,4]);
        // })
        // ->whereYear('berkas.tgl_spm', $tahun)
        // ->get();

        // $daftarberkas = DB::table('berkas')
        // ->select([
        //     'berkas.id',
        //     'berkas.kegiatan',
        //     DB::raw('COUNT(catatan_berkas.id) as catatans_count') // Count related table's IDs
        // ])
        // ->leftJoin('catatan_berkas', 'berkas.id', '=', 'catatan_berkas.berka_id')
        // ->whereNotExists(function ($query) {
        //         $query->select(DB::raw(1))
        //             ->from('riwayat_berkas')
        //             ->whereRaw('berkas.id = riwayat_berkas.berka_id')
        //             ->where('riwayat_berkas.status_berka_id', 2);
        //     })
        // ->whereYear('berkas.tgl_spm', $tahun)
        // ->groupBy('berkas.id') // Group by main table columns
        // ->get();


        // $daftarberkas = Berka::whereDoesntHave('riwayats', function (Builder $query) {
        //     $query->whereIn('status_berka_id', [3,4]);
        // })
        // ->whereHas('riwayats', function (Builder $query) {
        //     $query->whereIn('status_berka_id', [1,2]);
        // })
        //     ->leftJoin('riwayat_berkas', 'berkas.id', '=', 'riwayat_berkas.berka_id')
        //     ->leftJoin('status_berkas', 'riwayat_berkas.status_berka_id', '=', 'status_berkas.id')
        //     ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
        //     ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
        //     ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
        //     ->whereYear('berkas.tgl_spm', $tahun)
        // ->get();

        // $daftarberkas = DB::table('berkas')->select(['berkas.id', 'berkas.kode', 'berkas.no_spm', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'status_berkas.slug', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'sumber_danas.nama_sumber_dana'])
        // ->whereNotExists(function ($query) {
        //     $query->select(DB::raw(1))
        //         ->from('riwayat_berkas')
        //         ->whereRaw('berkas.id = riwayat_berkas.berka_id')
        //         ->where('riwayat_berkas.status_berka_id', '>', 1);
        // })
        // ->leftJoin('riwayat_berkas', 'berkas.id', '=', 'riwayat_berkas.berka_id')
        // ->leftJoin('status_berkas', 'riwayat_berkas.status_berka_id', '=', 'status_berkas.id')
        // ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
        // ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
        // ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
        // ->whereYear('berkas.tgl_spm', $tahun)
        // ->get();

        // $daftarberkas = Berka::with(['riwayats' => function ($query) {
        //     $query->where('status_berka_id', 1)->where('status_berka_id', 2)->whereNotIn('status_berka_id', [3,4]);
        // }])->get();

        // $daftarberkas = Berka::whereHas('riwayats', function ($query) {
        //     $query->where('status_berka_id', 2)->where(function ($subQuery) {
        //         $subQuery->whereDoesntHave('riwayats', function ($containerQuery) {
        //             $containerQuery->where('status_berka_id', '>', 2);
        //         });
        //     });
        // })->get();



        return Inertia::render('dashboard', [
            'tahun' => $tahun === null ? $currentYear : $tahun,
            // 'daftarberkas' => $daftarberkas
        ]);
    }
}
