<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'instansi' => ['required','exists:instansis,id'],
            'peran' => ['required','exists:roles,id'],
            'name' => ['required','string','max:100'],
            'nip' => ['required', 'string', 'max:18', 'min:18',Rule::unique(User::class),],
            'email' => [
                'required',
                'string',
                'email',
                'max:100',
                Rule::unique(User::class),
            ],
            'no_hp' => ['required','regex:/^[0-9]+$/','min:11','max:12',Rule::unique(User::class),],
            'password' => $this->passwordRules(),
        ], 
        [
            'instansi.required' => 'Instansi wajib dipilih',
            'instansi.exists' => 'Instansi tidak valid',
            'peran.required' => 'Peran wajib dipilih',
            'peran.exists' => 'Peran tidak valid',
            'name.required' => 'Nama wajib diisi',
            'name.max' => 'Nama maksimal 100 karakter',
            'nip.unique' => 'Nip sudah terdaftar',
            'nip.required' => 'Nip wajib diisi',
            'nip.regex' => 'Nip tidak valid',
            'nip.min' => 'Nip kurang dari 18 angka',
            'nip.max' => 'Nip lebih dari 18 angka',
            'email.unique' => 'Email sudah terdaftar',
            'email.required' => 'Email wajib diisi',
            'email.max' => 'Email maksimal 100 karakter',
            'email.email' => 'Email tidak valid',
            'no_hp.unique' => 'No hp sudah terdaftar',
            'no_hp.required' => 'No Hp wajib diisi',
            'no_hp.regex' => 'No Hp tidak valid',
            'no_hp.min' => 'No Hp minimal 11 angka',
            'no_hp.max' => 'No Hp maksimal 12 angka',
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'nip' => $input['nip'],
            'email' => $input['email'],
            'no_hp' => $input['no_hp'],
            'password' => $input['password'],
        ]);

        $user->roles()->syncWithPivotValues(
            $input['peran'], ['instansi_id' => $input['instansi']]
        );

        return $user;
    }
}
