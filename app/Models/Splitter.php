<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Splitter extends Model
{
    protected $fillable = ['closure_id', 'fiber_cable_id', 'code', 'type', 'port_count'];

    public function closure(): BelongsTo
    {
        return $this->belongsTo(SpliceClosure::class, 'closure_id');
    }

    public function fiberCable(): BelongsTo
    {
        return $this->belongsTo(FiberCable::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }
}
