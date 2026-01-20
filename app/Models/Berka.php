<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Berka extends Model
{
    protected $fillable = [
        'user_id',
        'instansi_id',
        'kode',
        'jenis_berka_id',
        'penerima_id',
        'no_spm',
        'tgl_spm',
        'nilai_spm',
        'kegiatan',
        'status',
        'sumber_dana_id',
        'keterangan',
        'status_berka_id',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'tgl_spm' => 'date',
        ];
    }

    public function jenisberka(): BelongsTo
    {
        return $this->belongsTo(JenisBerka::class);
    }

    public function sumberdana(): BelongsTo
    {
        return $this->belongsTo(SumberDana::class);
    }

    public function statusberka(): BelongsTo
    {
        return $this->belongsTo(StatusBerka::class);
    }

    public function riwayats(): HasMany
    {
        return $this->hasMany(RiwayatBerka::class);
    }

    public function catatans(): HasMany
    {
        return $this->hasMany(CatatanBerka::class);
    }

    public function detailberkas(): HasOneThrough
    {
        return $this->hasOneThrough(FileBerka::class, RincianBerka::class);
    }
}
