<?php

namespace App\Http\Resources\Berkas;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RiwayatBerkasResource extends JsonResource
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
            'created_at' => $this->whenNotNull($this->created_at?->isoFormat('dddd, D MMMM YYYY')),
            'berka_id' => $this->berka_id,
            'foto' => $this->whenNotNull($this->foto),
            'id' => $this->whenNotNull($this->id),
            'jam' => $this->whenNotNull($this->created_at?->isoFormat('H:m:s')),
            'name' => $this->whenNotNull($this->name),
            'status_berkas' => $this->whenNotNull($this->slug),
            'status_berka_id' => $this->whenNotNull($this->status_berka_id),
            'user_id' => $this->user_id,
        ];
    }
}