<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up(): void
  {
    Schema::create('properties', function (Blueprint $table) {
      $table->id();
      $table->foreignId('office_id')->constrained('offices')
        ->restrictOnDelete()
        ->restrictOnUpdate();
      $table->foreignId('host_id')->constrained('hosts')
        ->restrictOnDelete()
        ->restrictOnUpdate();
      $table->string('name');
      $table->decimal('price', 10, 2);
      $table->string('size');
      $table->string('accommodation_size');
      $table->string('entrance_code');
      $table->datetime('check_in_time');
      $table->datetime('check_out_time');
      $table->string('ical_link');
      $table->string('address_line_1');
      $table->string('address_line_2')->nullable();
      $table->string('zip_code');
      $table->string('city');
      $table->string('state');
      $table->string('country');
      $table->boolean('pets_allowed');
      $table->decimal('price_paying_cleaning');
      $table->boolean('laundry_needed');
      $table->boolean('washer_dryer_on_site');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down(): void
  {
    Schema::dropIfExists('properties');
  }
};
