<?php

namespace App\Http\Requests\DataPendukung;

use Illuminate\Foundation\Http\FormRequest;

class PenerimaRequest extends FormRequest
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
            'nama_penerima' => ['required', 'string', 'max:100', 'unique:penerimas,nama_penerima,' . optional($this->penerima)->id,],
            'norek' => ['required','string','max:50'],
            'npwp' => ['required','string','max:20'],
            'alamat' => ['required','string','max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_penerima.required' => 'Nama penerima harus diisi',
            'nama_penerima.max' => 'Nama penerima maksimal 100 karakter',
            'nama_penerima.unique' => 'Nama penerima sudah ada',
            'norek.required' => 'Nomor rekekning harus diisi',
            'norek.max' => 'Nomor rekekning maksimal 50 karakter',
            'npwp.required' => 'Npwp harus diisi',
            'npwp.max' => 'Npwp maksimal 20 karakter',
            'alamat.required' => 'Npwp harus diisi',
            'alamat.max' => 'Npwp maksimal 255 karakter',
        ];
    }
}
