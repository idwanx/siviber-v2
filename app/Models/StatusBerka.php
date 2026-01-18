<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusBerka extends Model
{
    protected $fillable = [
        'nama_status_berkas',
        'slug',
    ];

    public function getRouteKeyName(): mixed
    {
        return 'slug';
    }

    public function berkas(): HasMany
    {
        return $this->hasMany(Berka::class);
    }
}
