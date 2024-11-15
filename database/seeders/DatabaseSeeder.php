<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{

  private $tables = [
    'permissions',
    'roles',
    'users',
    'countries'
  ];


  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    $this->truncateTables();
    $this->call(CountriesTableSeeder::class);
    $this->call(PermissionsTableSeeder::class);
    $this->call(RolesTableSeeder::class);

    $user = User::factory()->create([
      'first_name' => 'super',
      'last_name' => 'admin',
      'email' => 'admin@vacationcleaning.co',
    ]);
    $user->assignRole(Role::where('name', 'admin')->first());
  }

  private function truncateTables()
  {

    DB::statement("SET FOREIGN_KEY_CHECKS=0");
    foreach ($this->tables as $table) {
      DB::table($table)->truncate();
    }
    DB::statement("SET FOREIGN_KEY_CHECKS=1");
  }
}
