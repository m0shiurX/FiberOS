<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FiberCable extends Model
{
    protected $fillable = ['pon_id', 'code', 'type', 'core_capacity', 'used_cores', 'length_meters'];

    public function pon(): BelongsTo
    {
        return $this->belongsTo(Pon::class);
    }

    public function spliceClosures(): HasMany
    {
        return $this->hasMany(SpliceClosure::class);
    }

    public function splitters(): HasMany
    {
        return $this->hasMany(Splitter::class);
    }
}
