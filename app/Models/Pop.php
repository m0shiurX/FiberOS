<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pop extends Model
{
    protected $fillable = ['code', 'name'];

    public function olts(): HasMany
    {
        return $this->hasMany(Olt::class);
    }
}
