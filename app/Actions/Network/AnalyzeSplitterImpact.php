<?php

namespace App\Actions\Network;

use App\Models\Splitter;

class AnalyzeSplitterImpact
{
    /**
     * @return array{asset_type: string, code: string, type: string, occupied_ports: int, available_ports: int, affected_customers: int}
     */
    public function handle(Splitter $splitter): array
    {
        $occupied = $splitter->customers()->count();

        return [
            'asset_type' => 'splitter',
            'code' => $splitter->code,
            'type' => $splitter->type,
            'occupied_ports' => $occupied,
            'available_ports' => $splitter->port_count - $occupied,
            'affected_customers' => $occupied,
        ];
    }
}
