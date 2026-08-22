<?php

namespace App\Actions\Network;

use App\Models\Customer;

class TraceCustomerUpstream
{
    /**
     * @return array<int, array{type: string, id: int, code: string, label: string}>
     */
    public function handle(Customer $customer): array
    {
        $customer->loadMissing('splitter.closure.fiberCable.pon.olt.pop');
        $splitter = $customer->splitter;
        $closure = $splitter->closure;
        $fiberCable = $closure->fiberCable;
        $pon = $fiberCable->pon;
        $olt = $pon->olt;
        $pop = $olt->pop;

        return [
            ['type' => 'customer', 'id' => $customer->id, 'code' => $customer->code, 'label' => $customer->name],
            ['type' => 'onu', 'id' => $customer->id, 'code' => $customer->onu_serial, 'label' => $customer->onu_model],
            ['type' => 'splitter_port', 'id' => $customer->id, 'code' => sprintf('Port %02d', $customer->splitter_port), 'label' => 'Splitter port'],
            ['type' => 'splitter', 'id' => $splitter->id, 'code' => $splitter->code, 'label' => $splitter->type.' splitter'],
            ['type' => 'closure', 'id' => $closure->id, 'code' => $closure->code, 'label' => 'Splice closure'],
            ['type' => 'fiber', 'id' => $fiberCable->id, 'code' => $fiberCable->code, 'label' => $fiberCable->type],
            ['type' => 'pon', 'id' => $pon->id, 'code' => $pon->code, 'label' => 'PON'],
            ['type' => 'olt', 'id' => $olt->id, 'code' => $olt->code, 'label' => $olt->name],
            ['type' => 'pop', 'id' => $pop->id, 'code' => $pop->code, 'label' => $pop->name],
        ];
    }
}
