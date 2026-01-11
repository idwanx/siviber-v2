<?php

namespace App\Http\Requests\DataPendukung;

use Illuminate\Foundation\Http\FormRequest;

class JenisBelanjaRequest extends FormRequest
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
            'kode_jenis_belanja' => ['required', 'string', 'max:10', 'unique:jenis_belanjas,kode_jenis_belanja,' . optional($this->jenis_belanja)->id,],
            'nama_jenis_belanja' => ['required', 'string', 'max:100', 'unique:jenis_belanjas,nama_jenis_belanja,' . optional($this->jenis_belanja)->id,],
        ];
    }

    public function messages(): array
    {
        return [
            'kode_jenis_belanja_berkas.required' => 'Kode jenis belanja harus diisi',
            'kode_jenis_belanja_berkas.max' => 'Kode jenis belanja maksimal 100 karakter',
            'kode_jenis_belanja_berkas.unique' => 'Kode jenis belanja sudah ada',
            'nama_jenis_belanja_berkas.required' => 'Nama jenis belanja harus diisi',
            'nama_jenis_belanja_berkas.max' => 'Nama jenis belanja maksimal 100 karakter',
            'nama_jenis_belanja_berkas.unique' => 'Nama jenis belanja sudah ada',
        ];
    }
}
