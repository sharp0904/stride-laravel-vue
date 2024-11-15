<?php

namespace App\Models;

use App\Models\Property;
use App\Models\Attachment;
use App\Models\Checklist;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'property_id',
        'uid',
        'description',
        'start',
        'end',
        'summary',
        'started_at',
        'completed_at',
        'assigned_to'
    ];

    /**
    * @return BelongsTo
    */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    /**
    * @return MorphMany
    */
    public function attachments(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'model');
    }

    public function checklists(): MorphMany
    {
        return $this->MorphMany(Checklist::class, 'model');
    }
}
