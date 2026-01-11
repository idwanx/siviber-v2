<?php

namespace App\Http\Requests\DataPendukung;

use Illuminate\Foundation\Http\FormRequest;

class JenisBerkasRequest extends FormRequest
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
            'nama_jenis_berkas' => ['required', 'string', 'max:100', 'unique:jenis_berkas,nama_jenis_berkas,' . optional($this->jenis_berka)->id,],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_jenis_berkas.required' => 'Nama jenis berkas harus diisi',
            'nama_jenis_berkas.max' => 'Nama jenis berkas maksimal 100 karakter',
            'nama_jenis_berkas.unique' => 'Nama jenis berkas sudah ada',
        ];
    }
}
