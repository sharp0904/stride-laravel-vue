<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Property extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'office_id',
    'host_id',
    'property_number',
    'name',
    'address_line_1',
    'address_line_2',
    'zip_code',
    'city',
    'state',
    'country',
    'size',
    'beds',
    'baths',
    'accommodation_size',
    'price',
    'entrance_code',
    'supply_closet_location',
    'supply_closet_code',
    'check_in_time',
    'check_out_time',
    'preferred_calendar',
    'preferred_payment_method',
    'start_date',
    'end_date',
    'ical_link',
    'pets_allowed',
    'price_paying_cleaning',
    'laundry_needed',
    'washer_dryer_on_site',
    'notes',
    'primary_cleaner_id',
    'secondary_cleaner_id',
    'square_feet',
    'company_owner_id'
  ];

  protected $casts = [
    'pets_allowed' => 'boolean',
    'laundry_needed' => 'boolean',
    'washer_dryer_on_site' => 'boolean'
  ];

  /**
   * @return BelongsTo
   */
  public function office(): BelongsTo
  {
    return $this->belongsTo(Office::class);
  }

  /**
   * @return BelongsTo
   */
  public function host(): BelongsTo
  {
    return $this->belongsTo(Host::class);
  }

  /**
   * @return HasMany
   */
  public function appointments(): HasMany
  {
    return $this->hasMany(Appointment::class);
  }

  public function primaryCleaner()
  {
      return $this->belongsTo(Cleaner::class, 'primary_cleaner_id');
  }

  public function secondaryCleaner()
  {
      return $this->belongsTo(Cleaner::class, 'secondary_cleaner_id');
  }

  /**
  * @return MorphMany
  */
  public function attachments(): MorphMany
  {
      return $this->morphMany(Attachment::class, 'model');
  }
}
