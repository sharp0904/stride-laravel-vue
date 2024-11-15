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
    Schema::create('attachments', function (Blueprint $table) {
      $table->id();
      $table->morphs('model');
      $table->string('file_name');
      $table->string('file_size')->nullable();
      $table->string('mime_type')->nullable();
      $table->string('url');
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
    Schema::dropIfExists('attachments');
  }
};
