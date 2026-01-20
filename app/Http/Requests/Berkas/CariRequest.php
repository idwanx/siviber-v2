<?php

namespace App\Http\Requests\Berkas;

use Illuminate\Foundation\Http\FormRequest;

class CariRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cari' => ['nullable', 'string', 'regex:/^[a-zA-Z0-9 ]+$/'],
            'jenisspm' => ['nullable', 'exists:jenis_berkas,slug'],
            'instansi' => ['nullable', 'exists:instansis,slug'],
            'load' => ['nullable', 'in:15,30,60,100'],
            'sumberdana' => ['nullable', 'exists:sumber_danas,slug'],
        ];
    }

    public function messages(): array
    {
        return [
            'cari.regex' => 'Isian tidak valid',
            'jenisspm.exists' => 'Jenis spm tidak valid',
            'instansi.exists' => 'Instansi tidak valid',
            'sumberdana.exists' => 'Sumber dana tidak valid',
            'load.in' => 'Load tidak valid',
        ];
    }
}
