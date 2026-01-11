<?php

namespace App\Http\Resources\Berkas;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FindBerkasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'jenis_berka_id' => $this->jenis_berka_id,
            'kegiatan' => $this->kegiatan,
            'nama_jenis_berkas' => $this->nama_jenis_berkas,
            'nama_sumber_dana' => $this->nama_sumber_dana,
            'nilai_spm' => $this->nilai_spm,
            'no_spm' => $this->no_spm,
            'norek' => $this->norek,
            'npwp' => $this->npwp,
            'penerima_id' => $this->penerima_id,
            'sumber_dana_id' => $this->sumber_dana_id,
            'tgl_spm' => Carbon::parse($this->tgl_spm)->format('Y-m-d'),
        ];
    }
}
