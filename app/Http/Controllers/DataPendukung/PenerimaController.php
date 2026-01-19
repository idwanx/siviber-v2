<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataPendukung\PenerimaRequest;
use App\Http\Resources\DataPendukung\PenerimaResource;
use App\Models\Penerima;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

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
        $penerimas = Penerima::query()->select('penerimas.id', 'penerimas.nama_penerima', 'penerimas.norek', 'penerimas.npwp', 'penerimas.alamat', 'instansis.nama_instansi', 'users.name')
        ->leftJoin('instansis', 'penerimas.instansi_id', '=', 'instansis.id')
        ->leftJoin('users', 'penerimas.user_id', '=', 'users.id')
        ->when(request('cari'), function ($q) use ($request) {
            $q->where('penerimas.nama_penerima', 'like', "%{$request->cari}%");
        });
        if ($this->roleuser->slug === "pengguna-anggaran" || $this->roleuser->slug === "ppkeu" || $this->roleuser->slug === "bendahara") {
            $penerimas->where('penerimas.instansi_id', $this->roleuser->instansi_id);
        }
        $penerimas->orderBy('penerimas.created_at', 'desc');

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
        if(Gate::denies('isCurrentUser', $penerima)) {
            abort(404);
        }

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
        if(Gate::denies('isCurrentUser', $penerima)) {
            abort(404);
        }
        
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
