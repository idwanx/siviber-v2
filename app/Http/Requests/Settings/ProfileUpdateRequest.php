<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'nip' => ['required', 'string', 'max:18', 'min:18',Rule::unique(User::class)->ignore($this->user()->id),],
            'no_hp' => ['required','regex:/^[0-9]+$/','min:11','max:12',Rule::unique(User::class)->ignore($this->user()->id),],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
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
        ];
    }
}
