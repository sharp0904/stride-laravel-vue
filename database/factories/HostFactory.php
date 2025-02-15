<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Host>
 */
class HostFactory extends Factory
{
  /**
    * Define the model's default state.
    *
    * @return array<string, mixed>
    */
  public function definition()
  {
    return [
      'first_name' => $this->faker->firstName(),
      'last_name' => $this->faker->lastName(),
      'email' => $this->faker->unique()->safeEmail(),
      'phone_number' => $this->faker->phoneNumber()
    ];
  }
}

