<?php

namespace App\Http\Requests\DataPendukung;

use Illuminate\Foundation\Http\FormRequest;

class RincianBelanjaRequest extends FormRequest
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
            'jenis_belanja_id' => ['required', 'exists:jenis_belanjas,id'],
            'kode_rincian_belanja' => ['required', 'string', 'max:20', 'unique:rincian_belanjas,kode_rincian_belanja,' . optional($this->rincian_belanja)->id,],
            'nama_rincian_belanja' => ['required', 'string', 'max:255', 'unique:rincian_belanjas,nama_rincian_belanja,' . optional($this->rincian_belanja)->id,],
        ];
    }

    public function messages(): array
    {
        return [
            'jenis_belanja_id.required' => 'Jenis belanja harus di pilih',
            'jenis_belanja_id.exists' => 'Jenis belanja tidak valid',
            'kode_rincian_belanja.required' => 'Kode rincian belanja harus diisi',
            'kode_rincian_belanja.max' => 'Kode rincian belanja maksimal 10 karakter',
            'kode_rincian_belanja.unique' => 'Kode rincian belanja sudah ada',
            'nama_rincian_belanja.required' => 'Nama rincian belanja harus diisi',
            'nama_rincian_belanja.max' => 'Nama rincian belanja maksimal 255 karakter',
            'nama_rincian_belanja.unique' => 'Nama rincian belanja sudah ada',
        ];
    }
}
