<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use App\Models\JenisBelanja;
use App\Models\JenisBerka;
use App\Models\Penerima;
use App\Models\SumberDana;
use Illuminate\Support\Facades\Auth;

class FetchDataController extends Controller
{
    public $roleuser;

    public function __construct()
    {
        $this->roleuser = Auth::user()->roleuser()->firstOrFail();
    }

    public function getJenisBelanja()
    {
        $jenisbelanjas = JenisBelanja::select('id', 'nama_jenis_belanja')->orderBy('id', 'asc')->get();

        return response()->json([
            'jenisbelanjas' => $jenisbelanjas
        ]);
    }
    
    public function getDataPendkungRegis()
    {
        $jenisBerkas = JenisBerka::select('id', 'nama_jenis_berkas')->orderBy('nama_jenis_berkas', 'asc')->get();
        $sumberDanas = SumberDana::select('id', 'nama_sumber_dana')->orderBy('nama_sumber_dana', 'asc')->get();
        $penerimas = Penerima::select('id', 'nama_penerima', 'norek', 'npwp')->where('instansi_id', $this->roleuser->instansi_id)->orderBy('nama_penerima', 'asc')->get();

        return response()->json([
            'jenisberkas' => $jenisBerkas,
            'sumberdanas' => $sumberDanas,
            'penerimas' => $penerimas
        ]);
    }
}
