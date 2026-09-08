<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Splice extends Model
{
    protected $fillable = ['splice_closure_id', 'tray_number', 'splice_number', 'source_cable', 'source_core', 'dest_cable', 'dest_core', 'loss_db', 'technician', 'date', 'notes'];

    public function spliceClosure(): BelongsTo
    {
        return $this->belongsTo(SpliceClosure::class, 'splice_closure_id');
    }
}
