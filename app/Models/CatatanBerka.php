<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CatatanBerka extends Model
{
    protected $fillable = [
        'berka_id',
        'catatan',
        'is_okey',
        'user_id',
    ];

    protected $casts = [
        'is_okey' => 'boolean',
        'items_data' => 'array',
    ];

    public function berka(): BelongsTo
    {
        return $this->belongsTo(Berka::class);
    }
}
