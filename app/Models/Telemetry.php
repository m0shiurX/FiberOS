<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Telemetry extends Model
{
    protected $fillable = ['asset_type', 'asset_id', 'rx_power', 'tx_power', 'olt_rx', 'distance', 'temperature', 'voltage', 'last_seen'];

    public function asset(): MorphTo
    {
        return $this->morphTo();
    }
}
