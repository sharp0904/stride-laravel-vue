<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OfficeRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize(): bool
  {
    return auth()->check();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules(): array
  {
    return match (request()->method) {
      'POST' => [
        'region_id' => 'required',
        'name' => 'required|min:3',
        'email' => 'required|email|unique:offices,email',
        'phone_number' => 'required|unique:offices,phone_number',
        'address_line_1' => 'required',
        'address_line_2' => 'nullable',
        'zip_code' => 'required',
        'city' => 'required',
        'state' => 'required',
        'country' => 'required'
      ],
      'PUT' => [
        'region_id' => 'required',
        'name' => 'required|min:3',
        'email' => [
          'required',
          'email',
          Rule::unique('offices')->ignore(request()->office)
        ],
        'phone_number' => [
          'required',
          Rule::unique('offices')->ignore(request()->office)
        ],
        'address_line_1' => 'required',
        'address_line_2' => 'nullable',
        'zip_code' => 'required',
        'city' => 'required',
        'state' => 'required',
        'country' => 'required'
      ],
      default => [],
    };
  }
}
