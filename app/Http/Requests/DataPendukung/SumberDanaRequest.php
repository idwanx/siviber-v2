<?php

namespace App\Http\Requests\DataPendukung;

use Illuminate\Foundation\Http\FormRequest;

class SumberDanaRequest extends FormRequest
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
            'nama_sumber_dana' => ['required', 'string', 'max:100', 'unique:sumber_danas,nama_sumber_dana,' . optional($this->sumber_dana)->id,],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_sumber_dana.required' => 'Nama sumber dana harus diisi',
            'nama_sumber_dana.max' => 'Nama sumber dana maksimal 100 karakter',
            'nama_sumber_dana.unique' => 'Nama sumber dana sudah ada',
        ];
    }
}
