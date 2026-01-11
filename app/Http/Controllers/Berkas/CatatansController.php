<?php

namespace App\Http\Controllers\Berkas;

use App\Events\StatusBerkasEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Berkas\CatatansStoreUpdateRequest;
use App\Http\Requests\Berkas\CatatansUpdateCheckRequest;
use App\Http\Resources\Berkas\CatatanResource;
use App\Models\Berka;
use App\Models\CatatanBerka;
use Carbon\Carbon;
use Exception;

class CatatansController extends Controller
{
    public function index(Berka $berka)
    {
        $catatans = CatatanBerka::select(['catatan_berkas.id', 'catatan_berkas.berka_id', 'catatan_berkas.catatan', 'catatan_berkas.created_at', 'catatan_berkas.is_okey', 'catatan_berkas.user_id', 'users.foto', 'users.name'])
        ->leftJoin('users', 'catatan_berkas.user_id', '=', 'users.id')
        ->where('berka_id', $berka->id)
        ->orderBy('id', 'asc')->get();

        return CatatanResource::collection($catatans);
    }

    public function store(CatatansStoreUpdateRequest $request)
    {
        try {
            $createcatatan = CatatanBerka::create([
                'berka_id' => $request->berka_id,
                'catatan' => $request->catatan,
                'user_id' => $request->user()->id
            ]);

            $berkas = Berka::find($request->berka_id);

            $count = $berkas->catatans->count();

            $newData = [
                'action' => "addcatatan",
                'berka_id' => $request->berka_id,
                'catatan' => $request->catatan,
                'created_at' => Carbon::parse($createcatatan->created_at)->diffForHumans(),
                'foto' => $request->user()->foto,
                'info' => "catatan",
                'id' => $createcatatan->id,
                'instansi_id' => $berkas->instansi_id,
                'is_okey' => $createcatatan->is_okey,
                'jumlah_catatan' => $count,
                'kegiatan' => $berkas->kegiatan,
                'name' => $request->user()->name,
                'no_spm' => $berkas->no_spm,
                'user_id' => $createcatatan->user_id,
            ];

            broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

            return back()->with([
                'type' => 'success',
                'message' => 'Catatan berhasil ditambahkan',
                'datas' => $newData
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal ditambahkan, hubungi admin',
            ]);
        }
    }

    public function update(CatatanBerka $catatanBerka, CatatansStoreUpdateRequest $request)
    {
        try {
            $berkas = Berka::find($catatanBerka->berka_id);

            $catatanBerka->update([
                'catatan' => $request->catatan,
            ]);

            $newData = [
                'id' => $catatanBerka->id,
                'info' => "catatan",
                'action' => "updatecatatan",
                'catatan' => $request->catatan,
                'created_at' => Carbon::parse($catatanBerka->updated_at)->diffForHumans(),
            ];

            broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

            return back()->with([
                'type' => 'success',
                'message' => 'Catatan berhasil diupdate',
                'datas' => $newData
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal diupdate, hubungi admin',
            ]);
        }
    }

    public function updateChecked(CatatansUpdateCheckRequest $request)
    {
        $itemsArray = $request->input('items_data');

        try {
            foreach ($itemsArray as $itemData) {
                $updateCatatans = CatatanBerka::where('id', $itemData['id'])->first();
                if ($updateCatatans) {
                    $updateCatatans->is_okey = $itemData['is_okey'];
                    $updateCatatans->save();
                }
            }

            $catatans = CatatanBerka::where('berka_id', $request->input('berka_id'))
            ->select(['catatan_berkas.id', 'catatan_berkas.berka_id', 'catatan_berkas.catatan', 'catatan_berkas.created_at', 'catatan_berkas.is_okey', 'users.name'])
            ->leftJoin('users', 'catatan_berkas.user_id', '=', 'users.id')
            ->orderBy('id', 'asc')->get();

            return back()->with([
                'type' => 'success',
                'message' => 'Catatan berhasil diupdate',
                'datas' => CatatanResource::collection($catatans)
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal diupdate, hubungi admin',
            ]);
        }
    }

    public function destroy(CatatanBerka $catatanBerka)
    {
        try {
            $catatanBerka->delete();

            $berkas = Berka::find($catatanBerka->berka_id);

            $count = $berkas->catatans->count();

            $newData = [
                'berka_id' => $catatanBerka->berka_id,
                'id' => $catatanBerka->id,
                'info' => "catatan",
                'action' => "destroycatatan",
                'jumlah_catatan' => $count
            ];

            broadcast(new StatusBerkasEvent($berkas->instansi_id, $newData))->toOthers();

            return back()->with([
                'type' => 'success',
                'message' => 'Catatan berhasil dihapus',
                'datas' => $newData
            ]);
            
        } catch (Exception) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal dihapus, hubungi admin',
            ]);
        }
    }
}
