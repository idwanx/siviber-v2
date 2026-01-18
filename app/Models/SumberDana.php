<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SumberDana extends Model
{
    protected $fillable = [
        'nama_sumber_dana',
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
