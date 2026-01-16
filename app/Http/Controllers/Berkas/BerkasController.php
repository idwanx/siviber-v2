<?php

namespace App\Http\Controllers\Berkas;

use App\Events\StatusBerkasEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Berkas\AddRiwayatRequest;
use App\Http\Requests\Berkas\BerkasStoreRequest;
use App\Http\Resources\Berkas\BerkasResource;
use App\Http\Resources\Berkas\CekVerifikatorKonfirmasiResource;
use App\Http\Resources\Berkas\DetailBerkasResource;
use App\Http\Resources\Berkas\FindBerkasResource;
use App\Http\Resources\Berkas\RiwayatBerkasResource;
use App\Models\Berka;
use App\Models\RiwayatBerka;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BerkasController extends Controller
{
    public $loadDefault;
    public $roleuser;

    public function __construct()
    {
        $this->loadDefault = '15';
        $this->roleuser = Auth::user()->roleuser()->firstOrFail();
    }

    public function index(int $tahun, string $statusberkas, Request $request): Response
    {
        switch ($statusberkas) {
            case 'registrasi': 
                $status = 1;
                break;
            case 'verifikasi': 
                $status = 2;
                break;
            case 'penolakan': 
                $status = 3;
                break;
            case 'sp2d': 
                $status = 4;
                break;
            default: abort(404); break;
        }

        $daftarberkas = Berka::query()->select(['berkas.id', 'berkas.kode', 'berkas.no_spm', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'berkas.status_berka_id', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'sumber_danas.nama_sumber_dana'])
        ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
        ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
        ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
        ->withCount('catatans')
        ->with('riwayats:berka_id,id,status_berka_id,user_id');
        if ($this->roleuser->slug === "pengguna-anggaran" || $this->roleuser->slug === "ppkeu" || $this->roleuser->slug === "bendahara") {
            $daftarberkas->where('berkas.instansi_id', $this->roleuser->instansi_id);
        }
        $daftarberkas->when(request('cari'), function ($q) use ($request) {
            $q->where('berkas.kegiatan', 'like', "%{$request->cari}%");
        })
        ->whereYear('berkas.tgl_spm', $tahun)
        ->where('berkas.status_berka_id', $status)
        ->latest();

        // $data = BerkasResource::collection($daftarberkas->paginate($request->load ?? $this->loadDefault)->withQueryString());

        return Inertia::render('berkas/layout-berkas', [
            'daftarberkas' => BerkasResource::collection($daftarberkas->paginate($request->load ?? $this->loadDefault)->withQueryString()),
            // 'daftarberkas' => $data,
            'tahun' => $tahun,
            'menuOption' => $statusberkas,
            'filtered' => $request->load ? $request->only(['load','cari','page']) : ['load' => $this->loadDefault],
        ]);
    }

    public function storeBerkas(BerkasStoreRequest $request): RedirectResponse
    {
        $explodeJenisSpm = explode('-', $request->jenis_spm_text);
        $explodeSumberDana = explode('-', $request->sumber_dana_text);

        try {
            $berkas = Berka::create([
                'user_id' => $request->user()->id,
                'instansi_id' => $this->roleuser->instansi_id,
                'kode' => now()->format('YmdHisu'),
                'jenis_berka_id' => $request->jenis_berka_id,
                'penerima_id' =>$request->penerima_id,
                'sumber_dana_id' => $request->sumber_dana_id,
                'no_spm' => $request->no_spm,
                'tgl_spm' => $request->tgl_spm,
                'nilai_spm' => $request->nilai_spm,
                'kegiatan' => $request->kegiatan,
                'status_berka_id' => 1,
            ]);

            $riwayatBaru = $berkas->riwayatberkas()->create([
                'user_id' => $request->user()->id,
                'status_berka_id' => 1,
            ]);

            $hariIni = Carbon::now();
            $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

            $newData = [
                'action' => "newBerkas",
                'info' => "berkas",
                'instansi_id' => $this->roleuser->instansi_id,
                'user_id' => $request->user()->id,
                'status_berka_id' => 1,
                'data' => [
                    'hari' => $berkas->created_at->isoFormat('dddd'),
                    'hari_ke' => $berkas->tgl_spm->diffInDays($formatHariIni),
                    'id' => $berkas->id,
                    'jam' => $berkas->created_at->format('H:m:s'),
                    'jumlah_catatan' => 0,
                    'kegiatan' => $berkas->kegiatan,
                    'kode' => $berkas->kode,
                    'nama_instansi' => $this->roleuser->nama_instansi,
                    'nama_jenis_berkas' => $explodeJenisSpm[1],
                    'nama_sumber_dana' => $explodeSumberDana[1],
                    'no_spm' => $berkas->no_spm,
                    'riwayats' => [
                        [
                            'berka_id' => $riwayatBaru->berka_id,
                            'id' => $riwayatBaru->id,
                            'user_id' => $request->user()->id,
                            'status_berka_id' => 1
                        ]
                    ],
                    'status_berka_id' => 1,
                    'tgl_registrasi' => $berkas->created_at->isoFormat('D MMMM Y'),
                    'tgl_spm' => $berkas->tgl_spm->isoFormat('D MMMM Y'),
                ]
            ];

            broadcast(new StatusBerkasEvent($this->roleuser->instansi_id, $newData))->toOthers();
            
            return back()->with([
                'type' => 'success',
                'message' => 'Registrasi berhasil.',
                'datas' => $newData,
            ]);

        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Registrasi gagal, hubungi admin.',
            ]);
        }
    }

    public function updateBerkas(BerkasStoreRequest $request, Berka $berka): RedirectResponse
    {
        $explodeJenisSpm = explode('-', $request->jenis_spm_text);
        $explodeSumberDana = explode('-', $request->sumber_dana_text);

        try {
            $berka->update([
                'user_id' => $request->user()->id,
                'jenis_berka_id' => $request->jenis_berka_id,
                'penerima_id' =>$request->penerima_id,
                'sumber_dana_id' => $request->sumber_dana_id,
                'no_spm' => $request->no_spm,
                'tgl_spm' => $request->tgl_spm,
                'nilai_spm' => $request->nilai_spm,
                'kegiatan' => $request->kegiatan,
            ]);

            $hariIni = Carbon::now();
            $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

            $newData = [
                'hari_ke' => $berka->tgl_spm->diffInDays($formatHariIni),
                'id' => $berka->id,
                'info' => "berkas",
                'action' => "updateBerkas",
                'kegiatan' => $berka->kegiatan,
                'nama_jenis_berkas' => $explodeJenisSpm[1],
                'nama_sumber_dana' => $explodeSumberDana[1],
                'no_spm' => $berka->no_spm,
                'tgl_spm' => $berka->tgl_spm->isoFormat('D MMMM Y'),
            ];

            broadcast(new StatusBerkasEvent($this->roleuser->instansi_id, $newData))->toOthers();

            return back()->with([
                'type' => 'success',
                'message' => 'Berkas berhasil diupdate.',
                'datas' => $newData,
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal diupdate, hubungi admin',
            ]);
        }
    }

    public function destroyBerkas(Berka $berka, Request $request): RedirectResponse
    {
        try {
            $berka->delete();

            $newData = [
                'id' => $berka->id,
                'info' => "berkas",
                'action' => "destroyBerkas",
                'user_id' => Auth::user()->id,
            ];

            broadcast(new StatusBerkasEvent($this->roleuser->instansi_id, $newData))->toOthers();

            return back()->with([
                'type' => 'success',
                'message' => 'Verkas '.$berka->kegiatan.' berhasil dihapus',
                'datas' => $newData,
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }

    public function addRiwayat(AddRiwayatRequest $request)
    {
        switch ($request->statusberkas) {
            case 2:
                $berkas = Berka::select(['berkas.id', 'berkas.instansi_id', 'berkas.kode', 'berkas.no_spm', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'sumber_danas.nama_sumber_dana'])
                ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
                ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
                ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
                ->withCount('catatans')
                ->with(['riwayats' => function ($query) {
                    $query->orderBy('id', 'desc');
                }])->find($request->berkasid);

                // Cek apakah berkas sudah penolakan atau sp2d
                $containsPenolakanSp2d = $berkas->riwayats->contains(function ($value, $key) {
                    return $value['status_berka_id'] === 3 || $value['status_berka_id'] === 4;
                });

                // cek apakah user sudah melakukan verifikasi atau belum
                $filteredUsers = $berkas->riwayats->filter(function ($value) use ($request) {
                    return $value['status_berka_id'] === 2 && $value['user_id'] === $request->user()->id;
                });

                // cek apakah status berkas verifikasi sudah ada
                $isVerifikasi = $berkas->riwayats->filter(function ($value) {
                    return $value['status_berka_id'] === 2;
                });
                
                // ambil data riwayat sebelumnya
                $beforeLastCurrentStatus = $berkas->riwayats->skip(1)->first();

                // jika berkas belum penolakan atau sp2d
                if (!$containsPenolakanSp2d) {
                    // jika status berkas sudah ada yang verifikasi
                    if ($isVerifikasi->count() > 0) {
                        // cek jika user ini sudah melakukan verifikasi
                        if ($filteredUsers->count() > 0) {
                            // hapus riwayat berkas dari user
                            RiwayatBerka::destroy($filteredUsers->value('id'));

                            if ($beforeLastCurrentStatus->status_berka_id === 2) {
                                $newData = [
                                    'action' => "updateStatus",
                                    'berka_id' => $berkas->id,
                                    'info' => "berkas",
                                    'user_id' => $request->user()->id,
                                    'data' => [
                                        'berka_id' => $berkas->id,
                                        'id' => $filteredUsers->value('id'),
                                        'status_berka_id' => $beforeLastCurrentStatus->status_berka_id,
                                    ]
                                ];

                                return back()->with([
                                    'type' => 'success',
                                    'message' => 'Status berkas berhasil diupdate',
                                    'datas' => $newData,
                                ]);
                                
                            } else {

                                $berkas->update(['status_berka_id' => $beforeLastCurrentStatus->status_berka_id]);

                                $hariIni = Carbon::now();
                                $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

                                $newData = [
                                    'action' => "updateStatus",
                                    'berka_id' => $berkas->id,
                                    'info' => "berkas",
                                    'user_id' => $request->user()->id,
                                    'data' => [
                                        'id' => $berkas->id,
                                        'hari' => $berkas->created_at->isoFormat('dddd'),
                                        'hari_ke' => $berkas->tgl_spm->diffInDays($formatHariIni),
                                        'jam' => $berkas->created_at->format('H:m:s'),
                                        'jumlah_catatan' => $berkas->catatans_count,
                                        'kegiatan' => $berkas->kegiatan,
                                        'kode' => $berkas->kode,
                                        'nama_instansi' => $berkas->nama_instansi,
                                        'nama_jenis_berkas' => $berkas->nama_jenis_berkas,
                                        'nama_sumber_dana' => $berkas->nama_sumber_dana,
                                        'no_spm' => $berkas->no_spm,
                                        'status_berka_id' => $beforeLastCurrentStatus->status_berka_id,
                                        'tgl_registrasi' => $berkas->created_at->isoFormat('D MMMM Y'),
                                        'tgl_spm' => $berkas->tgl_spm->isoFormat('D MMMM Y'),
                                        'riwayats' => $berkas->riwayats
                                    ]
                                ];

                                broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

                                return back()->with([
                                    'type' => 'success',
                                    'message' => 'Status berkas berhasil diupdate',
                                    'datas' => [
                                        'berka_id' => $berkas->id,
                                        'data' => [
                                            'status_berka_id' => $beforeLastCurrentStatus->status_berka_id,
                                        ]
                                    ],
                                ]);

                            }
                        } else {
                            
                            $addRiwayat = $berkas->riwayatberkas()->create([
                                'status_berka_id' => 2,
                                'user_id' => $request->user()->id,
                            ]);

                            $newData = [
                                'action' => "updateStatus",
                                'berka_id' => $berkas->id,
                                'info' => "berkas",
                                'user_id' => $addRiwayat->user_id,
                                'data' => [
                                    'berka_id' => $addRiwayat->berka_id,
                                    'id' => $addRiwayat->id,
                                    'status_berka_id' => 2,
                                    'user_id' => $addRiwayat->user_id,
                                ]
                            ];

                            return back()->with([
                                'type' => 'success',
                                'message' => 'Status berkas berhasil diupdate',
                                'datas' => $newData,
                            ]);
                        }
                    } else { 

                        // update status berkas pada tabel berkas
                        $berkas->update(['status_berka_id' => 2]);
                        // tambahkan riwayat status baru pada tabel riwayat
                        $addRiwayat = $berkas->riwayatberkas()->create([
                            'status_berka_id' => 2,
                            'user_id' => $request->user()->id,
                        ]);

                        $newRiwayat = [
                            'berka_id' => $addRiwayat->berka_id,
                            'id' => $addRiwayat->id,
                            'status_berka_id' => 2,
                            'user_id' => $addRiwayat->user_id,
                        ];

                        $hariIni = Carbon::now();
                        $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

                        $newData = [
                            'action' => "updateStatus",
                            'berka_id' => $berkas->id,
                            'info' => "berkas",
                            'user_id' => $request->user()->id,
                            'data' => [
                                'id' => $berkas->id,
                                'hari' => $berkas->created_at->isoFormat('dddd'),
                                'hari_ke' => $berkas->tgl_spm->diffInDays($formatHariIni),
                                'jam' => $berkas->created_at->format('H:m:s'),
                                'jumlah_catatan' => $berkas->catatans_count,
                                'kegiatan' => $berkas->kegiatan,
                                'kode' => $berkas->kode,
                                'nama_instansi' => $berkas->nama_instansi,
                                'nama_jenis_berkas' => $berkas->nama_jenis_berkas,
                                'nama_sumber_dana' => $berkas->nama_sumber_dana,
                                'no_spm' => $berkas->no_spm,
                                'status_berka_id' => 2,
                                'tgl_registrasi' => $berkas->created_at->isoFormat('D MMMM Y'),
                                'tgl_spm' => $berkas->tgl_spm->isoFormat('D MMMM Y'),
                                'riwayats' => $berkas->riwayats
                            ]
                        ];

                        $newData['data']['riwayats']->push($newRiwayat);

                        broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

                        return back()->with([
                            'type' => 'success',
                            'message' => 'Status berkas berhasil diupdate',
                            'datas' => [
                                'berka_id' => $addRiwayat->berka_id,
                                'data' => [
                                    'id' => $addRiwayat->id,
                                    'status_berka_id' => 2,
                                    'user_id' => $addRiwayat->user_id,
                                ]
                            ],
                        ]);
                    }
                // jika berkas sudah penolakan atau sp2d
                } else {  
                    return back()->with([
                        'type' => 'error',
                        'message' => 'Berkas sudah penolakan atau sp2d.',
                    ]);
                }
            break;
            case 3:
                $berkas = Berka::select(['berkas.id', 'berkas.instansi_id', 'berkas.kode', 'berkas.no_spm', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'sumber_danas.nama_sumber_dana'])
                ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
                ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
                ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
                ->withCount('catatans')
                ->with(['riwayats' => function ($query) {
                    $query->orderBy('id', 'desc');
                }])->find($request->berkasid);

                // Cek apakah berkas sudah penolakan atau sp2d
                $containsSp2d = $berkas->riwayats->contains(function ($value, $key) use ($request) {
                    return $value['status_berka_id'] === 4 || $value['status_berka_id'] === 3 && $value['user_id'] !== $request->user()->id;
                });

                // cek apakah user sudah melakukan penolakan atau belum
                $filteredUsers = $berkas->riwayats->filter(function ($value) use ($request) {
                    return $value['status_berka_id'] === 3 && $value['user_id'] === $request->user()->id;
                });
                
                // ambil data riwayat sebelumnya
                $beforeLastCurrentStatus = $berkas->riwayats->skip(1)->first();

                // jika berkas belum penolakan atau sp2d
                if (!$containsSp2d) {
                    if ($filteredUsers->count() > 0) {

                        RiwayatBerka::destroy($filteredUsers->value('id'));

                        $berkas->update(['status_berka_id' => $beforeLastCurrentStatus->status_berka_id]);

                        $hariIni = Carbon::now();
                        $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

                        $newData = [
                            'action' => "updateStatus",
                            'berka_id' => $berkas->id,
                            'info' => "berkas",
                            'user_id' => $request->user()->id,
                            'data' => [
                                'id' => $berkas->id,
                                'hari' => $berkas->created_at->isoFormat('dddd'),
                                'hari_ke' => $berkas->tgl_spm->diffInDays($formatHariIni),
                                'jam' => $berkas->created_at->format('H:m:s'),
                                'jumlah_catatan' => $berkas->catatans_count,
                                'kegiatan' => $berkas->kegiatan,
                                'kode' => $berkas->kode,
                                'nama_instansi' => $berkas->nama_instansi,
                                'nama_jenis_berkas' => $berkas->nama_jenis_berkas,
                                'nama_sumber_dana' => $berkas->nama_sumber_dana,
                                'no_spm' => $berkas->no_spm,
                                'status_berka_id' => $beforeLastCurrentStatus->status_berka_id,
                                'tgl_registrasi' => $berkas->created_at->isoFormat('D MMMM Y'),
                                'tgl_spm' => $berkas->tgl_spm->isoFormat('D MMMM Y'),
                                'riwayats' => $berkas->riwayats
                            ]
                        ];

                        broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

                        return back()->with([
                            'type' => 'success',
                            'message' => 'Status berkas berhasil diupdate',
                            'datas' => [
                                'berka_id' => $berkas->id,
                                'data' => [
                                    'status_berka_id' => $beforeLastCurrentStatus->status_berka_id,
                                ]
                            ],
                        ]);
                    } else {
                        // update status berkas pada tabel berkas
                        $berkas->update(['status_berka_id' => 3]);
                        // tambahkan riwayat status baru pada tabel riwayat
                        $addRiwayat = $berkas->riwayatberkas()->create([
                            'status_berka_id' => 3,
                            'user_id' => $request->user()->id,
                        ]);

                        $newRiwayat = [
                            'berka_id' => $addRiwayat->berka_id,
                            'id' => $addRiwayat->id,
                            'status_berka_id' => 3,
                            'user_id' => $addRiwayat->user_id,
                        ];

                        $hariIni = Carbon::now();
                        $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

                        $newData = [
                            'action' => "updateStatus",
                            'berka_id' => $berkas->id,
                            'info' => "berkas",
                            'user_id' => $request->user()->id,
                            'data' => [
                                'id' => $berkas->id,
                                'hari' => $berkas->created_at->isoFormat('dddd'),
                                'hari_ke' => $berkas->tgl_spm->diffInDays($formatHariIni),
                                'jam' => $berkas->created_at->format('H:m:s'),
                                'jumlah_catatan' => $berkas->catatans_count,
                                'kegiatan' => $berkas->kegiatan,
                                'kode' => $berkas->kode,
                                'nama_instansi' => $berkas->nama_instansi,
                                'nama_jenis_berkas' => $berkas->nama_jenis_berkas,
                                'nama_sumber_dana' => $berkas->nama_sumber_dana,
                                'no_spm' => $berkas->no_spm,
                                'status_berka_id' => 3,
                                'tgl_registrasi' => $berkas->created_at->isoFormat('D MMMM Y'),
                                'tgl_spm' => $berkas->tgl_spm->isoFormat('D MMMM Y'),
                                'riwayats' => $berkas->riwayats
                            ]
                        ];

                        $newData['data']['riwayats']->push($newRiwayat);

                        broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

                        return back()->with([
                            'type' => 'success',
                            'message' => 'Status berkas berhasil diupdate',
                            'datas' => [
                                'berka_id' => $berkas->id,
                                'data' => $newRiwayat
                            ],
                        ]);
                    }
                // jika berkas sudah penolakan atau sp2d
                } else {  
                    return back()->with([
                        'type' => 'error',
                        'message' => 'Berkas sudah penolakan atau sp2d.',
                    ]);
                }
            break;
            case 4:
                $berkas = Berka::select(['berkas.id', 'berkas.instansi_id', 'berkas.kode', 'berkas.no_spm', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'sumber_danas.nama_sumber_dana'])
                ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
                ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
                ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
                ->withCount('catatans')
                ->with(['riwayats' => function ($query) {
                    $query->orderBy('id', 'desc');
                }])->find($request->berkasid);

                // Cek apakah berkas sudah penolakan atau sp2d
                $containsSp2d = $berkas->riwayats->contains(function ($value, $key) use ($request) {
                    return $value['status_berka_id'] === 3 || $value['status_berka_id'] === 4 && $value['user_id'] !== $request->user()->id;
                });

                // cek apakah user sudah melakukan penolakan atau belum
                $filteredUsers = $berkas->riwayats->filter(function ($value) use ($request) {
                    return $value['status_berka_id'] === 4 && $value['user_id'] === $request->user()->id;
                });
                
                // ambil data riwayat sebelumnya
                $beforeLastCurrentStatus = $berkas->riwayats->skip(1)->first();

                // jika berkas belum penolakan atau sp2d
                if (!$containsSp2d) {
                    if ($filteredUsers->count() > 0) {

                        RiwayatBerka::destroy($filteredUsers->value('id'));

                        $berkas->update(['status_berka_id' => $beforeLastCurrentStatus->status_berka_id]);

                        $hariIni = Carbon::now();
                        $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

                        $newData = [
                            'action' => "updateStatus",
                            'berka_id' => $berkas->id,
                            'info' => "berkas",
                            'user_id' => $request->user()->id,
                            'data' => [
                                'id' => $berkas->id,
                                'hari' => $berkas->created_at->isoFormat('dddd'),
                                'hari_ke' => $berkas->tgl_spm->diffInDays($formatHariIni),
                                'jam' => $berkas->created_at->format('H:m:s'),
                                'jumlah_catatan' => $berkas->catatans_count,
                                'kegiatan' => $berkas->kegiatan,
                                'kode' => $berkas->kode,
                                'nama_instansi' => $berkas->nama_instansi,
                                'nama_jenis_berkas' => $berkas->nama_jenis_berkas,
                                'nama_sumber_dana' => $berkas->nama_sumber_dana,
                                'no_spm' => $berkas->no_spm,
                                'status_berka_id' => $beforeLastCurrentStatus->status_berka_id,
                                'tgl_registrasi' => $berkas->created_at->isoFormat('D MMMM Y'),
                                'tgl_spm' => $berkas->tgl_spm->isoFormat('D MMMM Y'),
                                'riwayats' => $berkas->riwayats
                            ]
                        ];

                        broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

                        return back()->with([
                            'type' => 'success',
                            'message' => 'Status berkas berhasil diupdate',
                            'datas' => [
                                'berka_id' => $berkas->id,
                                'data' => [
                                    'status_berka_id' => $beforeLastCurrentStatus->status_berka_id,
                                ]
                            ],
                        ]);
                    } else {
                        // update status berkas pada tabel berkas
                        $berkas->update(['status_berka_id' => 4]);
                        // tambahkan riwayat status baru pada tabel riwayat
                        $addRiwayat = $berkas->riwayatberkas()->create([
                            'status_berka_id' => 4,
                            'user_id' => $request->user()->id,
                        ]);

                        $newRiwayat = [
                            'berka_id' => $addRiwayat->berka_id,
                            'id' => $addRiwayat->id,
                            'status_berka_id' => 4,
                            'user_id' => $addRiwayat->user_id,
                        ];

                        $hariIni = Carbon::now();
                        $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

                         $newData = [
                            'action' => "updateStatus",
                            'berka_id' => $berkas->id,
                            'info' => "berkas",
                            'user_id' => $request->user()->id,
                            'data' => [
                                'id' => $berkas->id,
                                'hari' => $berkas->created_at->isoFormat('dddd'),
                                'hari_ke' => $berkas->tgl_spm->diffInDays($formatHariIni),
                                'jam' => $berkas->created_at->format('H:m:s'),
                                'jumlah_catatan' => $berkas->catatans_count,
                                'kegiatan' => $berkas->kegiatan,
                                'kode' => $berkas->kode,
                                'nama_instansi' => $berkas->nama_instansi,
                                'nama_jenis_berkas' => $berkas->nama_jenis_berkas,
                                'nama_sumber_dana' => $berkas->nama_sumber_dana,
                                'no_spm' => $berkas->no_spm,
                                'status_berka_id' => 4,
                                'tgl_registrasi' => $berkas->created_at->isoFormat('D MMMM Y'),
                                'tgl_spm' => $berkas->tgl_spm->isoFormat('D MMMM Y'),
                                'riwayats' => $berkas->riwayats
                            ]
                        ];

                        $newData['data']['riwayats']->push($newRiwayat);

                        broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

                        return back()->with([
                            'type' => 'success',
                            'message' => 'Status berkas berhasil diupdate',
                            'datas' => [
                                'berka_id' => $berkas->id,
                                'data' => $newRiwayat
                            ],
                        ]);
                    }
                // jika berkas sudah penolakan atau sp2d
                } else {  
                    return back()->with([
                        'type' => 'error',
                        'message' => 'Berkas sudah penolakan atau sp2d.',
                    ]);
                }
            break;
            default: abort(404); break;
        }
    }

    public function getVerifikator(Berka $berka)
    {
        $getVerifikator = User::withCount(['riwayatberkas' => function ($query) use ($berka) {
            $query->where('berka_id', $berka->id);
        }])
        ->leftJoin('role_user', 'users.id', '=', 'role_user.user_id')
        ->whereIn('role_user.role_id', [1,3])
        ->get();

        return CekVerifikatorKonfirmasiResource::collection($getVerifikator);
    }

    public function getHistory(Berka $berka)
    {
        $histories = RiwayatBerka::select('riwayat_berkas.created_at', 'users.foto', 'users.name', 'status_berkas.slug')
        ->leftJoin('status_berkas', 'riwayat_berkas.status_berka_id', '=', 'status_berkas.id')
        ->leftJoin('users', 'riwayat_berkas.user_id', '=', 'users.id')
        ->where('riwayat_berkas.berka_id', $berka->id)
        ->orderBy('riwayat_berkas.created_at', 'asc')
        ->get();

        return RiwayatBerkasResource::collection($histories);
    }

    public function editBerkas(int $id)
    {
        $findberkas = Berka::select(['berkas.id', 'berkas.jenis_berka_id', 'berkas.kode', 'berkas.no_spm', 'berkas.nilai_spm', 'berkas.penerima_id', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'berkas.status_berka_id', 'berkas.sumber_dana_id', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'penerimas.norek', 'penerimas.npwp', 'sumber_danas.nama_sumber_dana'])
        ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
        ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
        ->leftJoin('penerimas', 'berkas.penerima_id', '=', 'penerimas.id')
        ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
        ->find($id);

        return new FindBerkasResource($findberkas);
    }

    public function detailBerkas(int $id)
    {
        $findberkas = Berka::select(['berkas.id', 'berkas.jenis_berka_id', 'berkas.kode', 'berkas.no_spm', 'berkas.nilai_spm', 'berkas.penerima_id', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'berkas.status_berka_id', 'berkas.sumber_dana_id', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'penerimas.norek', 'penerimas.npwp', 'sumber_danas.nama_sumber_dana'])
        ->with('detailberka')
        ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
        ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
        ->leftJoin('penerimas', 'berkas.penerima_id', '=', 'penerimas.id')
        ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
        ->find($id);

        return new DetailBerkasResource($findberkas);
    }

    public function findBerkas(int $id)
    {
        $findberkas = Berka::select(['berkas.id', 'berkas.jenis_berka_id', 'berkas.kode', 'berkas.no_spm', 'berkas.nilai_spm', 'berkas.penerima_id', 'berkas.tgl_spm', 'berkas.kegiatan', 'berkas.created_at', 'berkas.status_berka_id', 'berkas.sumber_dana_id', 'instansis.nama_instansi', 'jenis_berkas.nama_jenis_berkas', 'penerimas.norek', 'penerimas.npwp', 'sumber_danas.nama_sumber_dana'])
        ->leftJoin('instansis', 'berkas.instansi_id', '=', 'instansis.id')
        ->leftJoin('jenis_berkas', 'berkas.jenis_berka_id', '=', 'jenis_berkas.id')
        ->leftJoin('penerimas', 'berkas.penerima_id', '=', 'penerimas.id')
        ->leftJoin('sumber_danas', 'berkas.sumber_dana_id', '=', 'sumber_danas.id')
        ->find($id);

        return new FindBerkasResource($findberkas);
    }
}
