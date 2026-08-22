<?php

namespace App\Actions\Network;

use App\Models\Customer;
use App\Models\FiberCable;

class AnalyzeFiberImpact
{
    /**
     * @return array{asset_type: string, code: string, connected_splitters: int, connected_onus: int, affected_customers: int}
     */
    public function handle(FiberCable $fiberCable): array
    {
        $splitterIds = $fiberCable->splitters()->pluck('id');
        $affectedCustomers = Customer::whereIn('splitter_id', $splitterIds)->count();

        return [
            'asset_type' => 'fiber',
            'code' => $fiberCable->code,
            'connected_splitters' => $splitterIds->count(),
            'connected_onus' => $affectedCustomers,
            'affected_customers' => $affectedCustomers,
        ];
    }
}
