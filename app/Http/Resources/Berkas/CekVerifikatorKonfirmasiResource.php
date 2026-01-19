<?php

namespace App\Http\Resources\Berkas;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CekVerifikatorKonfirmasiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'foto' => $this->foto,
            'id' => $this->id,
            'name' => $this->name,
            'jumlah_riwayat' => $this->riwayats_count,
        ];
    }
}
