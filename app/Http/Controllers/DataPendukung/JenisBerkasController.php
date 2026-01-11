<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataPendukung\JenisBerkasRequest;
use App\Models\JenisBerka;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class JenisBerkasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $jenisberkas = JenisBerka::select('nama_jenis_berkas', 'slug')->orderBy('id', 'desc')->get();

        return Inertia::render('data-pendukung/jenis-berkas/main-jenis-berkas', [
            'jenisberkas' => $jenisberkas
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
    public function store(JenisBerkasRequest $request): RedirectResponse
    {
        try {
            JenisBerka::create([
                'nama_jenis_berkas' => $request->nama_jenis_berkas,
                'slug' => Str::slug($request->nama_jenis_berkas),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Jenis berkas '.$request->nama_jenis_berkas.' berhasil ditambahkan',
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
    public function update(JenisBerkasRequest $request, JenisBerka $jenisBerka): RedirectResponse
    {
        try {
            $jenisBerka->update([
                'nama_jenis_berkas' => $request->nama_jenis_berkas,
                'slug' => Str::slug($request->nama_jenis_berkas),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Jenis berkas '.$request->nama_jenis_berkas.' berhasil disimpan',
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
    public function destroy(JenisBerka $jenisBerka): RedirectResponse
    {
        try {
            $jenisBerka->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Jenis berkas '.$jenisBerka->nama_jenis_berkas.' berhasil dihapus',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }
}
