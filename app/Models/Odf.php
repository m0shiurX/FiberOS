<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Odf extends Model
{
    protected $fillable = ['rack_id', 'code', 'name', 'type', 'vendor', 'model', 'serial', 'port_count', 'connector_type', 'polish_type', 'status'];

    public function rack(): BelongsTo
    {
        return $this->belongsTo(Rack::class);
    }

    public function ports(): HasMany
    {
        return $this->hasMany(OdfPort::class);
    }
}
