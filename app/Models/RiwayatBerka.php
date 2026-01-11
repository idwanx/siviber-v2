<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RiwayatBerka extends Model
{
    protected $fillable = [
        'berka_id',
        'status_berka_id',
        'verifikator_id',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }

    public function berka(): BelongsTo
    {
        return $this->belongsTo(Berka::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
