<?php

namespace App\Http\Requests;

use App\Rules\RequiredIfRoleHasPermission;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        'role' => 'required',
        'first_name' => 'required|min:3',
        'last_name' => 'required|min:3',
        'email' => 'required|email|unique:users',
        'office_id' => [
          new RequiredIfRoleHasPermission(request()->role, 'only-assigned-offices')
        ],
        'region_id' => [
          new RequiredIfRoleHasPermission(request()->role, 'only-assigned-regions')
        ]
      ],
      'PUT', 'PATCH' => [
        'role' => 'required',
        'first_name' => 'required|min:3',
        'last_name' => 'required|min:3',
        'email' => [
          'required',
          'email',
          Rule::unique('users')->ignore(request()->user)
        ],
        'office_id' => [
          new RequiredIfRoleHasPermission(request()->role, 'only-assigned-offices')
        ],
        'region_id' => [
          new RequiredIfRoleHasPermission(request()->role, 'only-assigned-regions')
        ]
      ],
      default => [],
    };
  }
}
