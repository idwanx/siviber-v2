<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
