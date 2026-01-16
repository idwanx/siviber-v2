<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataPendukung\InstansiRequest;
use App\Http\Resources\DataPendukung\InstansiResource;
use App\Models\Instansi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Exception;

class InstansiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $loadDefault = '15';

    public function index(Request $request): Response
    {
        $instansi = Instansi::select('nama_instansi', 'slug')
        ->when(request('cari'), function ($q) use ($request) {
            $q->where('nama_instansi', 'like', "%{$request->cari}%");
        })->orderBy('id', 'desc');

        return Inertia::render('data-pendukung/instansi/main-instansi', [
            'instansis' => InstansiResource::collection($instansi->paginate($request->load ?? $this->loadDefault)->withQueryString()),
            'filtered' => $request->load ? $request->only(['load','cari','page']) : ['load' => $this->loadDefault],
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
    public function store(InstansiRequest $request): RedirectResponse
    {
        try {
            Instansi::create([
                'nama_instansi' => $request->nama_instansi,
                'slug' => Str::slug($request->nama_instansi),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Instansi '.$request->nama_instansi.' berhasil ditambahkan',
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
    public function update(InstansiRequest $request, Instansi $instansi): RedirectResponse
    {
        try {
            $instansi->update([
                'nama_instansi' => $request->nama_instansi,
                'slug' => Str::slug($request->nama_instansi),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Instansi '.$request->nama_instansi.' berhasil disimpan',
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
    public function destroy(Instansi $instansi): RedirectResponse
    {
        try {
            $instansi->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Instansi '.$instansi->nama_instansi.' berhasil dihapus',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }
}
