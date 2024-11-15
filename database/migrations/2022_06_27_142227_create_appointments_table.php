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
  public function up()
  {
    Schema::create('appointments', function (Blueprint $table) {
      $table->id();
      $table->foreignId('property_id')->constrained('properties')
        ->restrictOnDelete()
        ->restrictOnUpdate();
      $table->string('uid')->nullable();
      $table->text('description')->nullable();
      $table->datetime('start');
      $table->datetime('end')->nullable();
      $table->string('summary')->nullable();
      $table->timestamp('completed_at')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('appointments');
  }
};
