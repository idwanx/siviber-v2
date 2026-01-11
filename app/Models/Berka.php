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
            'tgl_spm' => 'date',
        ];
    }

    public function jenisberka(): BelongsTo
    {
        return $this->belongsTo(JenisBerka::class);
    }

    public function riwayatberkas(): HasMany
    {
        return $this->hasMany(RiwayatBerka::class)
        // ->select(['riwayat_berkas.id', 'riwayat_berkas.berka_id', 'status_berkas.slug', 'riwayat_berkas.status_berka_id', 'riwayat_berkas.user_id'])
        // ->leftJoin('status_berkas', 'riwayat_berkas.status_berka_id', '=', 'status_berkas.id');
        ->select('riwayat_berkas.id', 'riwayat_berkas.berka_id', 'riwayat_berkas.status_berka_id', 'riwayat_berkas.created_at', 'riwayat_berkas.user_id', 'users.foto', 'users.name', 'status_berkas.slug')
        ->leftJoin('status_berkas', 'riwayat_berkas.status_berka_id', '=', 'status_berkas.id')
        ->leftJoin('users', 'riwayat_berkas.user_id', '=', 'users.id');
    }

    public function riwayats(): HasMany
    {
        return $this->hasMany(RiwayatBerka::class);
    }

    public function riwayat(): HasOne
    {
        return $this->hasOne(RiwayatBerka::class);
    }

    public function catatans(): HasMany
    {
        return $this->hasMany(CatatanBerka::class);
    }

    public function detailberka(): HasOneThrough
    {
        return $this->hasOneThrough(FileBerka::class, RincianBerka::class);
    }
}
