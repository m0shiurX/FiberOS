<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Olt extends Model
{
    protected $fillable = ['pop_id', 'code', 'name', 'vendor', 'model'];

    public function pop(): BelongsTo
    {
        return $this->belongsTo(Pop::class);
    }

    public function pons(): HasMany
    {
        return $this->hasMany(Pon::class);
    }
}
