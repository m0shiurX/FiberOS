<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manhole extends Model
{
    protected $fillable = ['code', 'name', 'type', 'duct_count', 'slack_length'];
}
