<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegionRequest extends FormRequest
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
        'region_name' => 'required|min:3|unique:regions'
      ],
      'PUT' => [
        'region_name' => [
          'required',
          Rule::unique('regions')->ignore(request()->region)
        ]
      ],
      default => [],
    };
  }
}
