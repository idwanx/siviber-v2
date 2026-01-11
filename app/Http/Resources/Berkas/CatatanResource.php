<?php

namespace App\Http\Resources\Berkas;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatatanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'berka_id' => $this->berka_id,
            'catatan' => $this->catatan,
            'created_at' => $this->whenNotNull(Carbon::parse($this->created_at)->diffForHumans()),
            'foto' => $this->foto,
            'id' => $this->id,
            'is_okey' => $this->is_okey,
            'name' => $this->name,
            'user_id' => $this->user_id,
        ];
    }
}
