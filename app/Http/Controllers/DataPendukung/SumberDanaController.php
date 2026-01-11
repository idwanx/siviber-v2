<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataPendukung\SumberDanaRequest;
use App\Models\SumberDana;
use Inertia\Inertia;
use Inertia\Response;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class SumberDanaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(): Response
    {
        $sumberdanas = SumberDana::select('nama_sumber_dana', 'slug')->orderBy('id', 'desc')->get();

        return Inertia::render('data-pendukung/sumber-dana/main-sumber-dana', [
            'sumberdanas' => $sumberdanas
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
    public function store(SumberDanaRequest $request): RedirectResponse
    {
        try {
            SumberDana::create([
                'nama_sumber_dana' => $request->nama_sumber_dana,
                'slug' => Str::slug($request->nama_sumber_dana),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Sumber dana '.$request->nama_sumber_dana.' berhasil ditambahkan',
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
    public function update(SumberDanaRequest $request, SumberDana $sumberDana): RedirectResponse
    {
        try {
            $sumberDana->update([
                'nama_sumber_dana' => $request->nama_sumber_dana,
                'slug' => Str::slug($request->nama_sumber_dana),
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Sumber dana '.$request->nama_sumber_dana.' berhasil disimpan',
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
    public function destroy(SumberDana $sumberDana): RedirectResponse
    {
        try {
            $sumberDana->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Sumber dana '.$sumberDana->nama_sumber_dana.' berhasil dihapus',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }
}
