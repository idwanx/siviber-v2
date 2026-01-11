<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instansi extends Model
{
    protected $fillable = [
        'nama_instansi',
        'slug',
        'parent_id',
    ];

    public function getRouteKeyName(): mixed
    {
        return 'slug';
    }

    public function parent()
    {
        return $this->belongsTo(static::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(static::class, 'parent_id');
    }
}
