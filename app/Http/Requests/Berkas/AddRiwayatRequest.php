<?php

namespace App\Http\Requests\Berkas;

use Illuminate\Foundation\Http\FormRequest;

class AddRiwayatRequest extends FormRequest
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
            'berkasid' => ['required', 'numeric'],
            'statusberkas' => ['required', 'in:2,3,4'],
        ];
    }

    public function messages(): array
    {
        return [
            'berkasid.required' => 'Kode berkas tidak ada',
            'berkasid.numeric' => 'Kode berkas tidak valid',
            'statusberkas.required' => 'Status berkas tidak ada',
            'statusberkas.in' => 'Status berkas tidak valid',
        ];
    }
}
