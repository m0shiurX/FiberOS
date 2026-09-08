<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Router extends Model
{
    protected $fillable = ['rack_id', 'code', 'name', 'vendor', 'model', 'router_type', 'os', 'firmware', 'serial', 'management_ip', 'mac', 'status'];

    public function rack(): BelongsTo
    {
        return $this->belongsTo(Rack::class);
    }
}
