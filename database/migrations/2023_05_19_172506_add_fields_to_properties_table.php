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
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->integer('beds')->nullable()->after('size');
            $table->integer('baths')->nullable()->after('beds');
            $table->string('supply_closet_location')->nullable()->after('entrance_code');
            $table->string('supply_closet_code')->nullable()->after('supply_closet_location');
            $table->string('preferred_calendar')->nullable()->after('supply_closet_code');
            $table->string('preferred_payment_method')->nullable()->after('preferred_calendar');
            $table->date('start_date')->nullable()->after('preferred_payment_method');
            $table->date('end_date')->nullable()->after('start_date');
            $table->text('notes')->nullable()->after('washer_dryer_on_site');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn([
              'beds',
              'baths',
              'supply_closet_location',
              'supply_closet_code',
              'preferred_calendar',
              'preferred_payment_method',
              'start_date',
              'end_date',
              'notes'
            ]);
        });
    }
};
