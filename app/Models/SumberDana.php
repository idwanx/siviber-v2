<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
