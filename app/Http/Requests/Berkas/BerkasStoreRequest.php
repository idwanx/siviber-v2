<?php

namespace App\Http\Requests\Berkas;

use Illuminate\Foundation\Http\FormRequest;

class BerkasStoreRequest extends FormRequest
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
            'no_spm' => ['required', 'string', 'max:250', 'unique:berkas,no_spm,' . optional($this->berka)->id,],
            'tgl_spm' => ['required', 'date_format:Y-m-d'],
            'jenis_berka_id' => ['required', 'exists:jenis_berkas,id'],
            'jenis_spm_text' => ['required', 'string', 'max:250'],
            'nilai_spm' => ['required', 'regex:/^[0-9]+$/', 'numeric', 'min:0'],
            'sumber_dana_id' => ['required', 'exists:sumber_danas,id'],
            'penerima_id' => ['required', 'exists:penerimas,id'],
            'kegiatan' => ['required', 'string', 'max:250'],
        ];
    }

    public function messages(): array
    {
        return [
            'no_spm.required' => 'No. Spm wajib di isi',
            'no_spm.max' => 'No. Spm maksimal 250 karakter',
            'no_spm.unique' => 'No. Spm sudah ada',
            'tgl_spm.required' => 'Tanggal spm wajib di pilih',
            'tgl_spm.date_format' => 'Format tanggal spm harus yyyy-MM-dd',
            'jenis_spm.required' => 'Jenis spm wajib di pilih',
            'jenis_spm.exists' => 'Jenis spm tidak valid',
            'nilai_spm.required' => 'Nilai spm wajib di isi minimal 0 (nol)',
            'nilai_spm.regex' => 'Nilai spm wajib di isi angka',
            'nilai_spm.numeric' => 'Nilai spm harus di isi angka',
            'nilai_spm.min' => 'Nilai spm minimal 0',
            'sumber_dana.required' => 'Sumber dana wajib di pilih',
            'sumber_dana.exists' => 'Sumber dana tidak valid',
            'penerima.required' => 'Penerima wajib dipilih',
            'penerima.exists' => 'Penerima tidak valid',
            'kegiatan.required' => 'Kegiatan wajib diisi',
            'kegiatan.max' => 'Kegiatan maksimal 250 karakter',
        ];
    }
}
