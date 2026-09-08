<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Alarm extends Model
{
    protected $fillable = ['code', 'severity', 'message', 'asset_type', 'asset_id', 'acknowledged'];

    public function asset(): MorphTo
    {
        return $this->morphTo();
    }
}
