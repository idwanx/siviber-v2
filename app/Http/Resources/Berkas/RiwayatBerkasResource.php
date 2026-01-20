<?php

namespace App\Http\Resources\Berkas;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class RiwayatBerkasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'created_at' => $this->whenNotNull(Carbon::parse($this->created_at)->isoFormat('dddd, D MMMM YYYY')),
            'berka_id' => $this->berka_id ?? null,
            'foto' => $this->foto ?? null,
            'id' => $this->id ?? null,
            'jam' => $this->whenNotNull(Carbon::parse($this->created_at)->isoFormat('H:mm:ss')),
            'name' => $this->name ?? null,
            'status_berkas' => $this->slug ?? null,
            'status_berka_id' => $this->status_berka_id ?? null,
            'user_id' => $this->user_id ?? null,
        ];
    }
}