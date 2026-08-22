<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SpliceClosure extends Model
{
    protected $table = 'closures';

    protected $fillable = ['fiber_cable_id', 'code'];

    public function fiberCable(): BelongsTo
    {
        return $this->belongsTo(FiberCable::class);
    }

    public function splitters(): HasMany
    {
        return $this->hasMany(Splitter::class, 'closure_id');
    }
}
