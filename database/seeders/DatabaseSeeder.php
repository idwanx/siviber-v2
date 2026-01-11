<?php

namespace Database\Seeders;

use App\Models\Instansi;
use App\Models\Role;
use App\Models\StatusBerka;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $statusberkas = [
            [
                'nama_status_berkas' => 'Registrasi',
                'slug' => Str::slug('registrasi'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_status_berkas' => 'Verifikasi',
                'slug' => Str::slug('verifikasi'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_status_berkas' => 'Penolakan',
                'slug' => Str::slug('penolakan'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_status_berkas' => 'Sp2d',
                'slug' => Str::slug('sp2d'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        StatusBerka::insert($statusberkas);

        $roles = [
            [
                'nama_role' => 'Admin',
                'slug' => Str::slug('admin'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_role' => 'Pengguna Anggaran',
                'slug' => Str::slug('pengguna-anggaran'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_role' => 'Verifikator',
                'slug' => Str::slug('verifikator'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_role' => 'Ppkeu',
                'slug' => Str::slug('ppkeu'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_role' => 'Bendahara',
                'slug' => Str::slug('bendahara'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_role' => 'Admin BMD',
                'slug' => Str::slug('admin-bmd'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_role' => 'Tim BMD',
                'slug' => Str::slug('tim-bmd'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_role' => 'Tim Apip',
                'slug' => Str::slug('tim-apip'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Role::insert($roles);

        $instansi = [
            [
                'nama_instansi' => 'Dinas Pendidikan dan Kebudayaan',
                'slug' => Str::slug('dinas-pendidikan-dan-kebudayaan'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_instansi' => 'Dinas Pariwisata',
                'slug' => Str::slug('dinas-pariwisata'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        Instansi::insert($instansi);

        $userAdmin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'admin',
                'password' => 'jangan123',
                'email_verified_at' => now(),
                'active_at' => now(),
            ]
        );

        $userAdmin->roles()->syncWithPivotValues(
            1, ['instansi_id' => null]
        );

        $userVerifikator = User::firstOrCreate(
            ['email' => 'ainun@gmail.com'],
            [
                'name' => 'Ainun',
                'password' => 'jangan123',
                'email_verified_at' => now(),
                'active_at' => now(),
            ]
        );

        $userVerifikator->roles()->syncWithPivotValues(
            3, ['instansi_id' => null]
        );


        $userBendahara1 = User::firstOrCreate(
            ['email' => 'cily@gmail.com'],
            [
                'name' => 'Cily Gobel',
                'password' => 'jangan123',
                'email_verified_at' => now(),
                'active_at' => now(),
            ]
        );

        $userBendahara1->roles()->syncWithPivotValues(
            5, ['instansi_id' => 1]
        );

        $userBendahara2 = User::firstOrCreate(
            ['email' => 'faisal@gmail.com'],
            [
                'name' => 'Faisal Tongkad',
                'password' => 'jangan123',
                'email_verified_at' => now(),
                'active_at' => now(),
            ]
        );

        $userBendahara2->roles()->syncWithPivotValues(
            5, ['instansi_id' => 2]
        );
    }
}
