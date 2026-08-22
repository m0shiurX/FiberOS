<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pon extends Model
{
    protected $fillable = ['olt_id', 'code'];

    public function olt(): BelongsTo
    {
        return $this->belongsTo(Olt::class);
    }

    public function fiberCables(): HasMany
    {
        return $this->hasMany(FiberCable::class);
    }
}
