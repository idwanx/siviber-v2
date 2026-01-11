<?php

namespace App\Http\Resources\Berkas;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DaftarVerifikatorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'riwayatberkas' => RiwayatBerkasResource::collection($this->whenLoaded('riwayatberkas')),
        ];
    }
}
