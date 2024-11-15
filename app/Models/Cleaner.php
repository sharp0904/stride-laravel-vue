<?php

namespace App\Models;

use App\Models\Property;
use App\Models\Attachment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cleaner extends Model
{
  use HasFactory, Notifiable, SoftDeletes;

  /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
  protected $fillable = [
    'first_name',
    'last_name',
    'office_id',
    'email',
    'phone_number',
    'company_owner_id'
  ];

  /**
  * @return HasMany
  */
  public function properties(): HasMany
  {
    return $this->hasMany(Property::class);
  }

  public function primaryProperties()
  {
    return $this->hasMany('App\Models\Property', 'primary_cleaner_id');
  }

  public function secondaryProperties()
  {
    return $this->hasMany('App\Models\Property', 'secondary_cleaner_id');
  }

  public function office()
  {
    return $this->belongsTo(Office::class);
  }

  public function agreements()
  {
      return $this->morphMany(Attachment::class, 'model')->where('sub_type', 'cleaner_agreement');
  }

  public function insurances()
  {
      return $this->morphMany(Attachment::class, 'model')->where('sub_type', 'cleaner_insurance');
  }

  public function others()
  {
      return $this->morphMany(Attachment::class, 'model')->where('sub_type', 'cleaner_other');
  }

}
