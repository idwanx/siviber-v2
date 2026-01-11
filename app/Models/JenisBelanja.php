<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisBelanja extends Model
{
    protected $fillable = [
        'kode_jenis_belanja',
        'nama_jenis_belanja',
        'slug',
    ];

    public function getRouteKeyName(): mixed
    {
        return 'slug';
    }
}
