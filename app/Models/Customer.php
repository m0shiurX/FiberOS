<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    protected $fillable = [
        'splitter_id',
        'splitter_port',
        'code',
        'name',
        'status',
        'phone',
        'address',
        'onu_model',
        'onu_serial',
    ];

    public function splitter(): BelongsTo
    {
        return $this->belongsTo(Splitter::class);
    }
}
