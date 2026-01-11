<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataPendukung\PenerimaRequest;
use App\Http\Resources\DataPendukung\PenerimaResource;
use App\Models\Penerima;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class PenerimaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $loadDefault;
    public $roleuser;

    public function __construct()
    {
        $this->loadDefault = '15';
        $this->roleuser = Auth::user()->roleuser()->firstOrFail();
    }

    public function index(Request $request): Response
    {
        $penerimas = Penerima::query()->select('id', 'nama_penerima', 'norek', 'npwp', 'alamat')
        ->when(request('cari'), function ($q) use ($request) {
            $q->where('nama_penerima', 'like', "%{$request->cari}%");
        });
        $penerimas->where('instansi_id', $this->roleuser->instansi_id)->orderBy('id', 'desc');

        return Inertia::render('data-pendukung/penerima/main-penerima', [
            'penerimas' => PenerimaResource::collection($penerimas->paginate($request->load ?? $this->loadDefault)->withQueryString()),
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
    public function store(PenerimaRequest $request): RedirectResponse
    {
        try {
            Penerima::create([
                'instansi_id' => $this->roleuser->instansi_id,
                'nama_penerima' => $request->nama_penerima,
                'norek' => $request->norek,
                'npwp' => $request->npwp,
                'alamat' => $request->alamat,
                'user_id' => $request->user()->id,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Penerima '.$request->nama_penerima.' berhasil ditambahkan',
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
    public function update(PenerimaRequest $request, Penerima $penerima): RedirectResponse
    {
        try {
            $penerima->update([
                'nama_penerima' => $request->nama_penerima,
                'norek' => $request->norek,
                'npwp' => $request->npwp,
                'alamat' => $request->alamat,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Penerima '.$request->nama_penerima.' berhasil disimpan',
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
    public function destroy(Penerima $penerima): RedirectResponse
    {
        try {
            $penerima->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Penerima '.$penerima->nama_penerima.' berhasil dihapus',
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }
}
