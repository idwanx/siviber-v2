<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataPendukung\JenisBelanjaRequest;
use App\Models\JenisBelanja;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class JenisBelanjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $jenisbelanja = JenisBelanja::select('kode_jenis_belanja', 'nama_jenis_belanja', 'slug')->orderBy('id', 'desc')->get();

        return Inertia::render('data-pendukung/jenis-belanja/main-jenis-belanja', [
            'jenisbelanja' => $jenisbelanja
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
    public function store(JenisBelanjaRequest $request): RedirectResponse
    {
        try {
            JenisBelanja::create([
                'kode_jenis_belanja' => $request->kode_jenis_belanja,
                'nama_jenis_belanja' => $request->nama_jenis_belanja,
                'slug' => Str::slug($request->nama_jenis_belanja),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Jenis belanja '.$request->nama_jenis_belanja.' berhasil ditambahkan',
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
    public function update(JenisBelanjaRequest $request, JenisBelanja $jenisBelanja): RedirectResponse
    {
        try {
            $jenisBelanja->update([
                'kode_jenis_belanja' => $request->kode_jenis_belanja,
                'nama_jenis_belanja' => $request->nama_jenis_belanja,
                'slug' => Str::slug($request->nama_jenis_belanja),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Jenis belanja '.$request->nama_jenis_belanja.' berhasil disimpan',
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
    public function destroy(JenisBelanja $jenisBelanja): RedirectResponse
    {
        try {
            $jenisBelanja->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Jenis belanja '.$jenisBelanja->nama_jenis_belanja.' berhasil dihapus',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }
}
