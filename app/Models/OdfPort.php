<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OdfPort extends Model
{
    protected $fillable = ['odf_id', 'port_number', 'front_connection', 'back_connection', 'status'];

    public function odf(): BelongsTo
    {
        return $this->belongsTo(Odf::class);
    }
}
