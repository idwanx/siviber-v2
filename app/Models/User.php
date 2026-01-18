<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'nip',
        'no_hp',
        'password',
        'active_at',
        'foto',
        'nameoriginalfiles',
        'extentionfiles'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)
            ->withPivot('instansi_id')
            ->withTimestamps();
    }

    public function riwayatberkas(): HasMany
    {
        return $this->hasMany(RiwayatBerka::class);
    }

    public function roleuser(): HasOne
    {
        return $this->hasOne(RoleUser::class)
        ->select(['role_user.id', 'roles.nama_role', 'roles.slug', 'role_user.user_id', 'role_user.role_id', 'role_user.instansi_id', 'instansis.nama_instansi' ])
        ->leftJoin('roles', 'role_user.role_id', '=', 'roles.id')
        ->leftJoin('instansis', 'role_user.instansi_id', '=', 'instansis.id');
    }
}
