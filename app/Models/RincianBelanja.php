<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RincianBelanja extends Model
{
    protected $fillable = [
        'jenis_belanja_id',
        'kode_rincian_belanja',
        'nama_rincian_belanja',
        'slug',
    ];

    public function getRouteKeyName(): mixed
    {
        return 'slug';
    }
}
