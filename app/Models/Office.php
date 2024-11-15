<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Office extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'region_id',
    'name',
    'email',
    'phone_number',
    'address_line_1',
    'address_line_2',
    'zip_code',
    'city',
    'state',
    'country',
    'company_owner_id'
  ];

  /**
   * @return BelongsTo
   */
  public function region(): BelongsTo
  {
    return $this->belongsTo(Region::class);
  }
}
