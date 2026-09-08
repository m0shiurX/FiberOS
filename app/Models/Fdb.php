<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Fdb extends Model
{
    protected $fillable = ['pole_id', 'code', 'name', 'type', 'port_count', 'ports_used', 'fed_by_cable', 'fed_by_core', 'status'];

    public function pole(): BelongsTo
    {
        return $this->belongsTo(Pole::class);
    }

    public function ports(): HasMany
    {
        return $this->hasMany(FdbPort::class);
    }
}
