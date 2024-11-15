<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CleanerRequest extends FormRequest
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
                    'region_id' => 'required',
                    'office_id' => 'required',
                    'first_name' => 'required|min:3',
                    'last_name' => 'required|min:3',
                    'email' => 'required|email|unique:cleaners,email',
                    'phone_number' => 'required'
                ];
            case 'PUT':
                return [
                    'region_id' => 'required',
                    'office_id' => 'required',
                    'first_name' => 'required|min:3',
                    'last_name' => 'required|min:3',
                    'email' => [
                        'required',
                        'email',
                        Rule::unique('cleaners')->ignore(request()->cleaner)
                    ],
                    'phone_number' => 'required'
                ];
            default:
                return [];
        }
    }
}
