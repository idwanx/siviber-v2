<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penerima extends Model
{
    protected $fillable = [
        'nama_penerima',
        'norek',
        'npwp',
        'alamat',
        'instansi_id',
        'user_id'
    ];
}
