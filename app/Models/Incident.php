<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Incident extends Model
{
    protected $fillable = ['fiber_cable_id', 'code', 'type', 'severity', 'affected_subscribers', 'first_detected', 'duration', 'status', 'description'];

    public function fiberCable(): BelongsTo
    {
        return $this->belongsTo(FiberCable::class);
    }
}
