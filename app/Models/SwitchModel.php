<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SwitchModel extends Model
{
    protected $table = 'switches';

    protected $fillable = ['rack_id', 'code', 'name', 'vendor', 'model', 'layer', 'os', 'firmware', 'serial', 'management_ip', 'mac', 'vlan', 'status'];

    public function rack(): BelongsTo
    {
        return $this->belongsTo(Rack::class);
    }
}
