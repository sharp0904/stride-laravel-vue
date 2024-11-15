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
    Schema::create('offices', function (Blueprint $table) {
      $table->id();
      $table->foreignId('region_id')->constrained('regions')
        ->restrictOnDelete()
        ->restrictOnUpdate();
      $table->string('name');
      $table->string('email')->nullable();
      $table->string('phone_number')->nullable();
      $table->string('address_line_1');
      $table->string('address_line_2')->nullable();
      $table->string('zip_code');
      $table->string('city');
      $table->string('state');
      $table->string('country');
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
    Schema::dropIfExists('offices');
  }
};
