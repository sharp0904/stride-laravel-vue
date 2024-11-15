<?php

namespace App\Models;

use App\Models\Property;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Host extends Model
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
}
