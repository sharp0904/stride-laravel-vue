<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Spatie\Permission\Models\Role;

class RequiredIfRoleHasPermission implements Rule
{
  protected $role;
  /**
   * Create a new rule instance.
   *
   * @return void
   */
  public function __construct(int $role_id, protected string $permission)
  {
    $this->role = Role::with('permissions')->find($role_id);
  }

  /**
   * Determine if the validation rule passes.
   *
   * @param string $attribute
   * @param mixed $value
   * @return bool
   */
  public function passes($attribute, $value): bool
  {
    $permissions = $this->role->permissions->pluck('name');
    return !(in_array($this->permission, $permissions->toArray()) === true && empty($value));
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message(): string
  {
    return 'The :attribute is required';
  }
}
