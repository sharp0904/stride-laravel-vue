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
        Schema::create('checklists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')
                ->constrained('appointments')
                ->restrictOnDelete()
                ->restrictOnUpdate();
            $table->boolean('begin_check_damage');
            $table->boolean('begin_personal_belongings');
            $table->boolean('begin_temperature');
            $table->boolean('begin_washing_linen');
            $table->boolean('kitchen_dishwasher');
            $table->boolean('kitchen_leftover_food');
            $table->boolean('kitchen_trash');
            $table->boolean('kitchen_clean_disinfect');
            $table->boolean('kitchen_backsplashes');
            $table->boolean('kitchen_appliances');
            $table->boolean('kitchen_freezer');
            $table->boolean('kitchen_floor');
            $table->boolean('kitchen_towels');
            $table->boolean('bedrooms_sheets_pillowcases');
            $table->boolean('bedrooms_floor_beds');
            $table->boolean('bedrooms_trash');
            $table->boolean('bedrooms_mirrors');
            $table->boolean('livingroom_tv');
            $table->boolean('livingroom_floors');
            $table->boolean('livingroom_cushions_couches');
            $table->boolean('livingroom_pillows_blankets');
            $table->boolean('livingroom_games_movies');
            $table->boolean('livingroom_furniture');
            $table->boolean('bathrooms_backsplashes');
            $table->boolean('bathrooms_mirrors');
            $table->boolean('bathrooms_toilets');
            $table->boolean('bathrooms_trash');
            $table->boolean('bathrooms_soap');
            $table->boolean('bathrooms_toilet_paper');
            $table->boolean('bathrooms_drawers_cabinets');
            $table->boolean('bathrooms_floors');
            $table->boolean('end_walkthrough_check_in_ready');
            $table->boolean('end_walkthrough_submit_photos');
            $table->boolean('end_walkthrough_trash_doors');
            $table->boolean('inventory_kitchen_garbage');
            $table->boolean('inventory_kitchen_paper_towels');
            $table->boolean('inventory_kitchen_hand_soap');
            $table->boolean('inventory_kitchen_dishwasher_pods');
            $table->boolean('inventory_bathrooms_hand_soap');
            $table->boolean('inventory_bathrooms_toilet_paper');
            $table->boolean('inventory_bathrooms_shampoo');
            $table->boolean('inventory_bathrooms_body_wash');
            $table->boolean('inventory_misc_laundry');
            $table->boolean('photos_bathroom');
            $table->boolean('photos_bedroom');
            $table->boolean('photos_living_room');
            $table->boolean('photos_kitchen');
            $table->boolean('photos_fridge');
            $table->boolean('photos_microwave');
            $table->softDeletes();
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
        Schema::dropIfExists('checklists');
    }
};
