<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
            'foto' => [
                'nullable',
                'mimes:jpg,jpeg,png,bmp,gif,avif,heic,heif',
                'image', 
                'max:5120',
            ],
        ];

        // $rules = [
        //     'name' => ['required', 'string', 'max:255'],
        //     'nip' => ['required', 'string', 'max:18', 'min:18',Rule::unique(User::class)->ignore($this->user()->id),],
        //     'no_hp' => ['required','regex:/^[0-9]+$/','min:11','max:12',Rule::unique(User::class)->ignore($this->user()->id),],
        //     'email' => [
        //         'required',
        //         'string',
        //         'lowercase',
        //         'email',
        //         'max:255',
        //         Rule::unique(User::class)->ignore($this->user()->id),
        //     ],
        // ];

        // if($this->hasFile('foto')) {
        //     $rules['foto'] = 'mimes:jpg,jpeg,png,bmp,gif,avif,heic,heif|image|max:2048';
        // }

        // return $rules;
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
            'foto.mimes' => 'Format foto tidak valid',
            'foto.image' => 'Foto tidak valid',
            'foto.max' => 'Foto maksimal 5 Mb',
        ];
    }
}
