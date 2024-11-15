<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->unsignedBigInteger('primary_cleaner_id')->nullable();
            $table->unsignedBigInteger('secondary_cleaner_id')->nullable();

            $table->foreign('primary_cleaner_id')->references('id')->on('cleaners');
            $table->foreign('secondary_cleaner_id')->references('id')->on('cleaners');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropForeign(['primary_cleaner_id']);
            $table->dropColumn('primary_cleaner_id');

            $table->dropForeign(['secondary_cleaner_id']);
            $table->dropColumn('secondary_cleaner_id');
        });
    }
};
