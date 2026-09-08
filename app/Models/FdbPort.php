<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FdbPort extends Model
{
    protected $fillable = ['fdb_id', 'port_number', 'status', 'drop_cable_id', 'onu_id'];

    public function fdb(): BelongsTo
    {
        return $this->belongsTo(Fdb::class);
    }
}
