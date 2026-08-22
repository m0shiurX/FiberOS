<?php

namespace App\Actions\Network;

use App\Models\Customer;
use App\Models\FiberCable;
use App\Models\Olt;
use App\Models\Pop;
use App\Models\SpliceClosure;
use App\Models\Splitter;
use Illuminate\Support\Collection;

class BuildNetworkMapPayload
{
    /**
     * Builds the GeoJSON layers and side-panel detail records the Network Map page needs.
     *
     * @return array{layers: array<string, array>, details: array<string, array>}
     */
    public function handle(): array
    {
        $pops = Pop::query()
            ->select(['id', 'code', 'name'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $olts = Olt::query()
            ->with('pop:id,code')
            ->select(['id', 'pop_id', 'code', 'name', 'vendor', 'model'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $fibers = FiberCable::query()
            ->with('pon.olt:id,code')
            ->select(['id', 'pon_id', 'code', 'type', 'core_capacity', 'used_cores', 'length_meters'])
            ->selectRaw('ST_AsGeoJSON(path)::json as path_geojson')
            ->get();

        $closures = SpliceClosure::query()
            ->with('fiberCable:id,code')
            ->select(['id', 'fiber_cable_id', 'code'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $splitters = Splitter::query()
            ->with(['closure:id,code', 'fiberCable:id,code'])
            ->select(['id', 'closure_id', 'fiber_cable_id', 'code', 'type', 'port_count'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->withCount('customers')
            ->get();

        $customers = Customer::query()
            ->with('splitter.closure.fiberCable.pon.olt.pop')
            ->select(['id', 'splitter_id', 'splitter_port', 'code', 'name', 'status', 'phone', 'address', 'onu_model', 'onu_serial'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        return [
            'layers' => [
                'pops' => $this->pointCollection($pops, fn ($pop) => [
                    'id' => $pop->id, 'code' => $pop->code, 'name' => $pop->name,
                ]),
                'olts' => $this->pointCollection($olts, fn ($olt) => [
                    'id' => $olt->id, 'code' => $olt->code, 'name' => $olt->name,
                    'vendor' => $olt->vendor, 'model' => $olt->model, 'pop_code' => $olt->pop->code,
                ]),
                'fibers' => [
                    'type' => 'FeatureCollection',
                    'features' => $fibers->map(fn ($fiber) => [
                        'type' => 'Feature',
                        'geometry' => json_decode($fiber->path_geojson, true),
                        'properties' => [
                            'id' => $fiber->id, 'code' => $fiber->code, 'type' => $fiber->type,
                            'used_cores' => $fiber->used_cores, 'core_capacity' => $fiber->core_capacity,
                            'olt_code' => $fiber->pon->olt->code,
                        ],
                    ])->values(),
                ],
                'closures' => $this->pointCollection($closures, fn ($closure) => [
                    'id' => $closure->id, 'code' => $closure->code, 'fiber_code' => $closure->fiberCable->code,
                ]),
                'splitters' => $this->pointCollection($splitters, fn ($splitter) => [
                    'id' => $splitter->id, 'code' => $splitter->code, 'type' => $splitter->type,
                    'occupied_ports' => $splitter->customers_count, 'port_count' => $splitter->port_count,
                ]),
                'customers' => $this->pointCollection($customers, fn ($customer) => [
                    'id' => $customer->id, 'code' => $customer->code, 'name' => $customer->name,
                    'status' => $customer->status,
                ]),
                'connectors' => $this->buildConnectors($pops, $olts, $closures, $splitters, $customers),
            ],
            'details' => [
                'customer' => $customers->keyBy('id')->map(fn ($customer) => [
                    'code' => $customer->code,
                    'name' => $customer->name,
                    'status' => $customer->status,
                    'phone' => $customer->phone,
                    'address' => $customer->address,
                    'onu_model' => $customer->onu_model,
                    'onu_serial' => $customer->onu_serial,
                    'splitter_code' => $customer->splitter->code,
                    'splitter_port' => sprintf('%02d', $customer->splitter_port),
                    'pon_code' => $customer->splitter->closure->fiberCable->pon->code,
                    'olt_code' => $customer->splitter->closure->fiberCable->pon->olt->code,
                    'pop_code' => $customer->splitter->closure->fiberCable->pon->olt->pop->code,
                ])->all(),
                'splitter' => $splitters->keyBy('id')->map(fn ($splitter) => [
                    'code' => $splitter->code,
                    'type' => $splitter->type,
                    'closure_code' => $splitter->closure->code,
                    'input_fiber_code' => $splitter->fiberCable->code,
                    'occupied_ports' => $splitter->customers_count,
                    'available_ports' => $splitter->port_count - $splitter->customers_count,
                ])->all(),
                'fiber' => $fibers->keyBy('id')->map(fn ($fiber) => [
                    'code' => $fiber->code,
                    'type' => $fiber->type,
                    'core_capacity' => $fiber->core_capacity,
                    'used_cores' => $fiber->used_cores,
                    'source' => $fiber->pon->olt->code,
                ])->all(),
                'olt' => $olts->keyBy('id')->map(fn ($olt) => [
                    'code' => $olt->code,
                    'name' => $olt->name,
                    'vendor' => $olt->vendor,
                    'model' => $olt->model,
                    'pop_code' => $olt->pop->code,
                ])->all(),
                'closure' => $closures->keyBy('id')->map(function ($closure) use ($splitters) {
                    $servedSplitters = $splitters->where('closure_id', $closure->id);

                    return [
                        'code' => $closure->code,
                        'fiber_code' => $closure->fiberCable->code,
                        'connected_splitters' => $servedSplitters->count(),
                        'connected_customers' => $servedSplitters->sum('customers_count'),
                    ];
                })->all(),
            ],
        ];
    }

    /**
     * Builds the physical wiring the point layers alone don't show: POP-to-OLT, closure-to-splitter,
     * and splitter-to-customer runs. Fiber-cable (OLT-to-closure) geometry already exists on
     * fiber_cables.path, so it isn't duplicated here.
     *
     * @param  Collection<int, object>  $pops
     * @param  Collection<int, object>  $olts
     * @param  Collection<int, object>  $closures
     * @param  Collection<int, object>  $splitters
     * @param  Collection<int, object>  $customers
     */
    private function buildConnectors(Collection $pops, Collection $olts, Collection $closures, Collection $splitters, Collection $customers): array
    {
        $popsById = $pops->keyBy('id');
        $closuresById = $closures->keyBy('id');
        $splittersById = $splitters->keyBy('id');

        $oltLinks = $olts->map(function ($olt) use ($popsById) {
            $pop = $popsById->get($olt->pop_id);

            return [
                'type' => 'Feature',
                'geometry' => ['type' => 'LineString', 'coordinates' => [
                    [(float) $pop->lng, (float) $pop->lat],
                    [(float) $olt->lng, (float) $olt->lat],
                ]],
                'properties' => ['olt_id' => $olt->id],
            ];
        });

        $splitterLinks = $splitters->map(function ($splitter) use ($closuresById) {
            $closure = $closuresById->get($splitter->closure_id);

            return [
                'type' => 'Feature',
                'geometry' => ['type' => 'LineString', 'coordinates' => [
                    [(float) $closure->lng, (float) $closure->lat],
                    [(float) $splitter->lng, (float) $splitter->lat],
                ]],
                'properties' => ['splitter_id' => $splitter->id],
            ];
        });

        $customerLinks = $customers->map(function ($customer) use ($splittersById) {
            $splitter = $splittersById->get($customer->splitter_id);

            return [
                'type' => 'Feature',
                'geometry' => ['type' => 'LineString', 'coordinates' => [
                    [(float) $splitter->lng, (float) $splitter->lat],
                    [(float) $customer->lng, (float) $customer->lat],
                ]],
                'properties' => ['customer_id' => $customer->id],
            ];
        });

        return [
            'type' => 'FeatureCollection',
            'features' => $oltLinks->concat($splitterLinks)->concat($customerLinks)->values(),
        ];
    }

    /**
     * @param  Collection<int, object>  $items
     * @param  callable(object): array  $properties
     */
    private function pointCollection($items, callable $properties): array
    {
        return [
            'type' => 'FeatureCollection',
            'features' => $items->map(fn ($item) => [
                'type' => 'Feature',
                'geometry' => ['type' => 'Point', 'coordinates' => [(float) $item->lng, (float) $item->lat]],
                'properties' => $properties($item),
            ])->values(),
        ];
    }
}
