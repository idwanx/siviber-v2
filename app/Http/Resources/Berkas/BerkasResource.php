<?php

namespace App\Http\Resources\Berkas;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BerkasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $hariIni = Carbon::now();
        $formatHariIni = Carbon::parse($hariIni)->format('Y-m-d');

        return[
            'id' => $this->id,
            'hari' => $this->created_at->isoFormat('dddd'),
            'hari_ke' => $this->tgl_spm->diffInDays($formatHariIni),
            'jam' => $this->created_at->format('H:m:s'),
            'jumlah_catatan' => $this->catatans_count,
            'kegiatan' => $this->kegiatan,
            'kode' => $this->kode,
            'nama_instansi' => $this->nama_instansi,
            'nama_jenis_berkas' => $this->nama_jenis_berkas,
            'nama_sumber_dana' => $this->nama_sumber_dana,
            'no_spm' => $this->no_spm,
            'status_berka_id' => $this->status_berka_id,
            'tgl_registrasi' => $this->created_at->isoFormat('D MMMM Y'),
            'tgl_spm' => $this->tgl_spm->isoFormat('D MMMM Y'),
            'riwayats' => RiwayatBerkasResource::collection($this->whenLoaded('riwayats')),
        ];
    }
}
