<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataPendukung\RincianBelanjaRequest;
use App\Http\Resources\DataPendukung\RincianBelanjaResource;
use Illuminate\Http\Request;
use App\Models\JenisBelanja;
use App\Models\RincianBelanja;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RincianBelanjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $loadDefault = '15';

    public function index(Request $request): Response
    {
        $rincianbelanjas = RincianBelanja::query()->select('rincian_belanjas.jenis_belanja_id', 'rincian_belanjas.kode_rincian_belanja', 'rincian_belanjas.nama_rincian_belanja', 'rincian_belanjas.slug', 'jenis_belanjas.nama_jenis_belanja')
        ->when(request('cari'), function ($q) use ($request) {
            $q->where('rincian_belanjas.nama_rincian_belanja', 'like', "%{$request->cari}%");
        })
        ->leftJoin('jenis_belanjas', 'rincian_belanjas.jenis_belanja_id', '=', 'jenis_belanjas.id')
        ->orderBy('rincian_belanjas.id', 'desc');

        return Inertia::render('data-pendukung/rincian-belanja/main-rincian-belanja', [
            'rincianbelanjas' => RincianBelanjaResource::collection($rincianbelanjas->paginate($request->load ?? $this->loadDefault)->withQueryString()),
            'filtered' => $request->load ? $request->only(['load','cari','page']) : ['load' => $this->loadDefault],
            'jenisbelanjas' => JenisBelanja::select('id', 'nama_jenis_belanja')->orderBy('id', 'asc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RincianBelanjaRequest $request)
    {
        try {
            RincianBelanja::create([
                'jenis_belanja_id' => $request->jenis_belanja_id,
                'kode_rincian_belanja' => $request->kode_rincian_belanja,
                'nama_rincian_belanja' => $request->nama_rincian_belanja,
                'slug' => Str::slug($request->nama_rincian_belanja),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Rincian belanja '.$request->nama_rincian_belanja.' berhasil ditambahkan',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal ditambahkan, hubungi admin',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RincianBelanjaRequest $request, RincianBelanja $rincianBelanja)
    {
        try {
            $rincianBelanja->update([
                'jenis_belanja_id' => $request->jenis_belanja_id,
                'kode_rincian_belanja' => $request->kode_rincian_belanja,
                'nama_rincian_belanja' => $request->nama_rincian_belanja,
                'slug' => Str::slug($request->nama_rincian_belanja),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Rincian belanja '.$request->nama_rincian_belanja.' berhasil disimpan',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal diupdate, hubungi admin',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RincianBelanja $rincianBelanja)
    {
        try {
            $rincianBelanja->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Rincian belanja '.$rincianBelanja->nama_rincian_belanja.' berhasil dihapus',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }
}
