<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run(): void
  {
    app()['cache']->forget('spatie.permission.cache');
    $permissionsList = [
      'stats' => ['view'],
      'roles' => ['create', 'view', 'update', 'delete'],
      'offices' => ['create', 'view', 'update', 'delete', 'only-assigned'],
      'regions' => ['create', 'view', 'update', 'delete', 'only-assigned'],
      'hosts' => ['create', 'view', 'update', 'delete'],
      'properties' => ['create', 'view', 'update', 'delete'],
      'appointments' => ['create', 'view', 'update', 'delete'],
      'users' => ['create', 'view', 'update', 'delete'],
      'cleaners' => ['create', 'view', 'update', 'delete']
    ];

    foreach ($permissionsList as $key => $permissions) {
      foreach ($permissions as $permission) {
        Permission::create([
          'group' => $key,
          'name' => $permission . '-' . $key,
          'created_at' => Carbon::now(),
          'updated_at' => Carbon::now()
        ]);
      }
    }
  }
}
