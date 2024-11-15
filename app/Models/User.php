<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
  use HasFactory, Notifiable, HasRoles, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'region_id',
    'office_id',
    'first_name',
    'last_name',
    'email',
    'password',
    'host_id',
    'phone',
    'monthly_base_rate',
    'acct',
    'register_date',
    'cancel_date',
    'last_login_date'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
    'created_at'
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  protected function password(): Attribute
  {
    return Attribute::make(
      set: fn($value) => Hash::make($value),
    );
  }

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
  public function region(): BelongsTo
  {
    return $this->belongsTo(Region::class);
  }
}
