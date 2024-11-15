<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run(): void
  {
    $role = Role::create(['name' => 'admin']);
    $role->permissions()->sync(Permission::whereNotIn('name', ['only-assigned-offices', 'only-assigned-regions'])->pluck('id')->all());
  }
}
