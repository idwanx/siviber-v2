<?php

namespace App\Http\Requests\Berkas;

use Illuminate\Foundation\Http\FormRequest;

class CatatansStoreUpdateRequest extends FormRequest
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
            'catatan' => ['required', 'string', 'max:250'],
        ];
    }

    public function messages(): array
    {
        return [
            'berka_id.required' => 'Data berkas tidak valid',
            'berka_id.exists' => 'Data berkas tidak valid',
            'catatan.required' => 'Catatan harus di isi',
            'catatan.max' => 'Catatan maksimal 250 karakter',
        ];
    }
}
