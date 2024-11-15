<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        switch (request()->method) {
            case 'POST':
                return [
                    'property_id' => 'required',
                    'cleaner_id' => 'required',
                ];
            case 'PUT':
                return [
                    'property_id' => 'required',
                    'cleaner_id' => 'required',
                ];
            default:
                return [];
        }
    }
}
