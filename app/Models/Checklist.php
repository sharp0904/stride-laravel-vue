<?php

namespace App\Models;

use App\Models\Appointment;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Checklist extends Model
{
  use HasFactory, Notifiable, SoftDeletes;

  /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
  protected $fillable = [
    'model_id',
    'model_type',
    'begin_check_damage',
    'begin_personal_belongings',
    'begin_temperature',
    'begin_washing_linen',
    'kitchen_dishwasher',
    'kitchen_leftover_food',
    'kitchen_trash',
    'kitchen_clean_disinfect',
    'kitchen_backsplashes',
    'kitchen_appliances',
    'kitchen_freezer',
    'kitchen_floor',
    'kitchen_towels',
    'bedrooms_sheets_pillowcases',
    'bedrooms_floor_beds',
    'bedrooms_trash',
    'bedrooms_mirrors',
    'livingroom_tv',
    'livingroom_floors',
    'livingroom_cushions_couches',
    'livingroom_pillows_blankets',
    'livingroom_games_movies',
    'livingroom_furniture',
    'bathrooms_backsplashes',
    'bathrooms_mirrors',
    'bathrooms_toilets',
    'bathrooms_trash',
    'bathrooms_soap',
    'bathrooms_toilet_paper',
    'bathrooms_drawers_cabinets',
    'bathrooms_floors',
    'end_walkthrough_check_in_ready',
    'end_walkthrough_submit_photos',
    'end_walkthrough_trash_doors',
    'inventory_kitchen_garbage',
    'inventory_kitchen_paper_towels',
    'inventory_kitchen_hand_soap',
    'inventory_kitchen_dishwasher_pods',
    'inventory_bathrooms_hand_soap',
    'inventory_bathrooms_toilet_paper',
    'inventory_bathrooms_shampoo',
    'inventory_bathrooms_body_wash',
    'inventory_misc_laundry',
    'photos_bathroom',
    'photos_bedroom',
    'photos_living_room',
    'photos_kitchen',
    'photos_fridge',
    'photos_microwave'
  ];

  public function appointment()
  {
    return $this->belongsTo(Appointment::class);
  }
}
