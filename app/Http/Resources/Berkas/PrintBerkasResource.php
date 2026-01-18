<?php

namespace App\Http\Resources\Berkas;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrintBerkasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'created_at' => $this->created_at->isoFormat('D MMMM Y'),
            'id' => $this->id,
            'kegiatan' => $this->kegiatan,
            'kode' => $this->kode,
            'nama_instansi' => $this->nama_instansi,
            'nama_jenis_berkas' => $this->nama_jenis_berkas,
            'nama_penerima' => $this->nama_penerima,
            'nama_sumber_dana' => $this->nama_sumber_dana,
            'nilai_spm' => $this->nilai_spm,
            'no_spm' => $this->no_spm,
            'norek' => $this->norek,
            'npwp' => $this->npwp,
            'tgl_spm' => $this->tgl_spm->isoFormat('D MMMM Y'),
        ];
    }
}
