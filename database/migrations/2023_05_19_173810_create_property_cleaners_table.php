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
    Schema::create('property_cleaners', function (Blueprint $table) {
      $table->id();
      $table->foreignId('property_id')
        ->constrained('properties')
        ->restrictOnDelete()
        ->restrictOnUpdate();
      $table->string('name')->nullable();
      $table->string('phone')->nullable();
      $table->string('type');
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
    Schema::dropIfExists('property_cleaners');
  }
};
