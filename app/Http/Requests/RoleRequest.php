<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
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
                    'name' => 'required|min:3|unique:roles,name',
                    'permissions' => 'required'
                ];
            case 'PUT':
                return [
                    'name' => [
                        'required',
                        'min:3',
                        Rule::unique('roles')->ignore(request()->role)
                    ],
                    'permissions' => 'required'
                ];
            default: 
                return [];
        }
    }
}
