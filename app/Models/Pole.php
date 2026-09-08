<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pole extends Model
{
    protected $fillable = ['code', 'name', 'type', 'height', 'owner'];

    public function fdbs(): HasMany
    {
        return $this->hasMany(Fdb::class);
    }
}
