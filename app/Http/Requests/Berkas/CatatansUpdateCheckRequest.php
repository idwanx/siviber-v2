<?php

namespace App\Http\Requests\Berkas;

use Illuminate\Foundation\Http\FormRequest;

class CatatansUpdateCheckRequest extends FormRequest
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
            'berka_id' => ['required', 'exists:berkas,id'],
            'items_data' => ['required', 'array'],
            'items_data.*.id' => ['required', 'exists:catatan_berkas,id'],
            'items_data.*.is_okey' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'berka_id.required' => 'Data berkas id harus diisi',
            'berka_id.exists' => 'Data berkas tidak valid',
            'items_data.required' => 'Data tidak ada',
            'items_data.array' => 'Data harus array',
            'items_data.*.id.required' => 'id catatan tidak diisi',
            'items_data.*.id.exists' => 'id catatan tidak valid',
            'items_data.*.is_okey.required' => 'Data is_okey kosong',
            'items_data.*.is_okey.boolean' => 'Data is_okey harus boolean',
        ];
    }
}
