<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rack extends Model
{
    protected $fillable = ['pop_id', 'code', 'name', 'rack_units', 'occupied_units', 'vendor', 'model', 'power_capacity'];

    public function pop(): BelongsTo
    {
        return $this->belongsTo(Pop::class);
    }

    public function odfs(): HasMany
    {
        return $this->hasMany(Odf::class);
    }

    public function routers(): HasMany
    {
        return $this->hasMany(Router::class);
    }

    public function switches(): HasMany
    {
        return $this->hasMany(SwitchModel::class);
    }
}
