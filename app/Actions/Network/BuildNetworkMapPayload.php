<?php

namespace App\Actions\Network;

use App\Models\Alarm;
use App\Models\Customer;
use App\Models\Fdb;
use App\Models\FiberCable;
use App\Models\Incident;
use App\Models\Manhole;
use App\Models\Odf;
use App\Models\Olt;
use App\Models\Pole;
use App\Models\Pop;
use App\Models\Rack;
use App\Models\Router;
use App\Models\SpliceClosure;
use App\Models\Splitter;
use App\Models\SwitchModel;
use App\Models\Telemetry;
use Illuminate\Support\Collection;

class BuildNetworkMapPayload
{
    /**
     * Builds the GeoJSON layers and side-panel detail records the Network Map page needs.
     *
     * @return array{layers: array<string, array>, details: array<string, array>, incidents: array<int, array>, alarms: array<int, array>, activeIncident: array<string, mixed>|null}
     */
    public function handle(): array
    {
        $pops = Pop::query()
            ->select(['id', 'code', 'name'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $racks = Rack::query()
            ->with('pop:id,code')
            ->select(['id', 'pop_id', 'code', 'name', 'rack_units', 'occupied_units', 'vendor', 'model', 'power_capacity'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $olts = Olt::query()
            ->with('pop:id,code')
            ->select(['id', 'pop_id', 'code', 'name', 'vendor', 'model'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $odfs = Odf::query()
            ->with('rack:id,code')
            ->select(['id', 'rack_id', 'code', 'name', 'type', 'vendor', 'model', 'serial', 'port_count', 'connector_type', 'polish_type', 'status'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $routers = Router::query()
            ->with('rack:id,code')
            ->select(['id', 'rack_id', 'code', 'name', 'vendor', 'model', 'router_type', 'os', 'firmware', 'serial', 'management_ip', 'mac', 'status'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $switches = SwitchModel::query()
            ->with('rack:id,code')
            ->select(['id', 'rack_id', 'code', 'name', 'vendor', 'model', 'layer', 'os', 'firmware', 'serial', 'management_ip', 'mac', 'vlan', 'status'])
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

        $poles = Pole::query()
            ->select(['id', 'code', 'name', 'type', 'height', 'owner'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $manholes = Manhole::query()
            ->select(['id', 'code', 'name', 'type', 'duct_count', 'slack_length'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $fdbs = Fdb::query()
            ->with('pole:id,code')
            ->select(['id', 'pole_id', 'code', 'name', 'type', 'port_count', 'ports_used', 'fed_by_cable', 'fed_by_core', 'status'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $customers = Customer::query()
            ->with('splitter.closure.fiberCable.pon.olt.pop')
            ->select(['id', 'splitter_id', 'splitter_port', 'code', 'name', 'status', 'phone', 'address', 'onu_model', 'onu_serial'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $telemetries = Telemetry::query()
            ->where('asset_type', 'customer')
            ->get()
            ->keyBy('asset_id');

        $incidents = Incident::query()
            ->where('status', 'active')
            ->select(['id', 'fiber_cable_id', 'code', 'type', 'severity', 'affected_subscribers', 'first_detected', 'duration', 'status', 'description'])
            ->selectRaw('ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat')
            ->get();

        $alarms = Alarm::query()
            ->where('acknowledged', false)
            ->select(['id', 'code', 'severity', 'message', 'asset_type', 'asset_id'])
            ->get();

        $activeIncident = $incidents->first();

        return [
            'layers' => [
                'pops' => $this->pointCollection($pops, fn ($pop) => [
                    'id' => $pop->id, 'code' => $pop->code, 'name' => $pop->name,
                ]),
                'racks' => $this->pointCollection($racks, fn ($rack) => [
                    'id' => $rack->id, 'code' => $rack->code, 'name' => $rack->name,
                    'rack_units' => $rack->rack_units, 'occupied_units' => $rack->occupied_units,
                    'vendor' => $rack->vendor, 'model' => $rack->model, 'power_capacity' => $rack->power_capacity,
                    'pop_code' => $rack->pop->code,
                ]),
                'olts' => $this->pointCollection($olts, fn ($olt) => [
                    'id' => $olt->id, 'code' => $olt->code, 'name' => $olt->name,
                    'vendor' => $olt->vendor, 'model' => $olt->model, 'pop_code' => $olt->pop->code,
                ]),
                'odfs' => $this->pointCollection($odfs, fn ($odf) => [
                    'id' => $odf->id, 'code' => $odf->code, 'name' => $odf->name,
                    'type' => $odf->type, 'vendor' => $odf->vendor, 'model' => $odf->model,
                    'serial' => $odf->serial, 'port_count' => $odf->port_count,
                    'connector_type' => $odf->connector_type, 'polish_type' => $odf->polish_type,
                    'status' => $odf->status, 'rack_code' => $odf->rack->code,
                ]),
                'routers' => $this->pointCollection($routers, fn ($router) => [
                    'id' => $router->id, 'code' => $router->code, 'name' => $router->name,
                    'vendor' => $router->vendor, 'model' => $router->model,
                    'router_type' => $router->router_type, 'os' => $router->os,
                    'firmware' => $router->firmware, 'serial' => $router->serial,
                    'management_ip' => $router->management_ip, 'mac' => $router->mac,
                    'status' => $router->status, 'rack_code' => $router->rack->code,
                ]),
                'switches' => $this->pointCollection($switches, fn ($sw) => [
                    'id' => $sw->id, 'code' => $sw->code, 'name' => $sw->name,
                    'vendor' => $sw->vendor, 'model' => $sw->model,
                    'layer' => $sw->layer, 'os' => $sw->os,
                    'firmware' => $sw->firmware, 'serial' => $sw->serial,
                    'management_ip' => $sw->management_ip, 'mac' => $sw->mac,
                    'vlan' => $sw->vlan, 'status' => $sw->status, 'rack_code' => $sw->rack->code,
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
                'poles' => $this->pointCollection($poles, fn ($pole) => [
                    'id' => $pole->id, 'code' => $pole->code, 'name' => $pole->name,
                    'type' => $pole->type, 'height' => $pole->height, 'owner' => $pole->owner,
                ]),
                'manholes' => $this->pointCollection($manholes, fn ($mh) => [
                    'id' => $mh->id, 'code' => $mh->code, 'name' => $mh->name,
                    'type' => $mh->type, 'duct_count' => $mh->duct_count, 'slack_length' => $mh->slack_length,
                ]),
                'fdbs' => $this->pointCollection($fdbs, fn ($fdb) => [
                    'id' => $fdb->id, 'code' => $fdb->code, 'name' => $fdb->name,
                    'type' => $fdb->type, 'port_count' => $fdb->port_count, 'ports_used' => $fdb->ports_used,
                    'fed_by_cable' => $fdb->fed_by_cable, 'fed_by_core' => $fdb->fed_by_core,
                    'status' => $fdb->status,
                ]),
                'customers' => $this->pointCollection($customers, fn ($customer) => [
                    'id' => $customer->id, 'code' => $customer->code, 'name' => $customer->name,
                    'status' => $customer->status,
                ]),
                'incidents' => [
                    'type' => 'FeatureCollection',
                    'features' => $incidents->map(fn ($incident) => [
                        'type' => 'Feature',
                        'geometry' => ['type' => 'Point', 'coordinates' => [(float) $incident->lng, (float) $incident->lat]],
                        'properties' => [
                            'id' => $incident->id, 'code' => $incident->code, 'type' => $incident->type,
                            'severity' => $incident->severity, 'affected_subscribers' => $incident->affected_subscribers,
                            'first_detected' => $incident->first_detected, 'duration' => $incident->duration,
                            'status' => $incident->status, 'description' => $incident->description,
                        ],
                    ])->values(),
                ],
                'connectors' => $this->buildConnectors($pops, $olts, $closures, $splitters, $customers, $fdbs),
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
                    'telemetry' => $this->formatTelemetry($telemetries->get($customer->id)),
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
                'rack' => $racks->keyBy('id')->map(fn ($rack) => [
                    'code' => $rack->code,
                    'name' => $rack->name,
                    'rack_units' => $rack->rack_units,
                    'occupied_units' => $rack->occupied_units,
                    'vendor' => $rack->vendor,
                    'model' => $rack->model,
                    'power_capacity' => $rack->power_capacity,
                    'pop_code' => $rack->pop->code,
                ])->all(),
                'odf' => $odfs->keyBy('id')->map(fn ($odf) => [
                    'code' => $odf->code,
                    'name' => $odf->name,
                    'type' => $odf->type,
                    'vendor' => $odf->vendor,
                    'model' => $odf->model,
                    'serial' => $odf->serial,
                    'port_count' => $odf->port_count,
                    'connector_type' => $odf->connector_type,
                    'polish_type' => $odf->polish_type,
                    'status' => $odf->status,
                    'rack_code' => $odf->rack->code,
                ])->all(),
                'router' => $routers->keyBy('id')->map(fn ($router) => [
                    'code' => $router->code,
                    'name' => $router->name,
                    'vendor' => $router->vendor,
                    'model' => $router->model,
                    'router_type' => $router->router_type,
                    'os' => $router->os,
                    'firmware' => $router->firmware,
                    'serial' => $router->serial,
                    'management_ip' => $router->management_ip,
                    'mac' => $router->mac,
                    'status' => $router->status,
                    'rack_code' => $router->rack->code,
                ])->all(),
                'switch' => $switches->keyBy('id')->map(fn ($sw) => [
                    'code' => $sw->code,
                    'name' => $sw->name,
                    'vendor' => $sw->vendor,
                    'model' => $sw->model,
                    'layer' => $sw->layer,
                    'os' => $sw->os,
                    'firmware' => $sw->firmware,
                    'serial' => $sw->serial,
                    'management_ip' => $sw->management_ip,
                    'mac' => $sw->mac,
                    'vlan' => $sw->vlan,
                    'status' => $sw->status,
                    'rack_code' => $sw->rack->code,
                ])->all(),
                'fdb' => $fdbs->keyBy('id')->map(fn ($fdb) => [
                    'code' => $fdb->code,
                    'name' => $fdb->name,
                    'type' => $fdb->type,
                    'port_count' => $fdb->port_count,
                    'ports_used' => $fdb->ports_used,
                    'fed_by_cable' => $fdb->fed_by_cable,
                    'fed_by_core' => $fdb->fed_by_core,
                    'status' => $fdb->status,
                ])->all(),
                'pole' => $poles->keyBy('id')->map(fn ($pole) => [
                    'code' => $pole->code,
                    'name' => $pole->name,
                    'type' => $pole->type,
                    'height' => $pole->height,
                    'owner' => $pole->owner,
                ])->all(),
                'manhole' => $manholes->keyBy('id')->map(fn ($mh) => [
                    'code' => $mh->code,
                    'name' => $mh->name,
                    'type' => $mh->type,
                    'duct_count' => $mh->duct_count,
                    'slack_length' => $mh->slack_length,
                ])->all(),
                'incident' => $incidents->keyBy('id')->map(fn ($incident) => [
                    'code' => $incident->code,
                    'type' => $incident->type,
                    'severity' => $incident->severity,
                    'affected_subscribers' => $incident->affected_subscribers,
                    'first_detected' => $incident->first_detected,
                    'duration' => $incident->duration,
                    'status' => $incident->status,
                    'description' => $incident->description,
                ])->all(),
            ],
            'incidents' => $incidents->map(fn ($i) => [
                'id' => $i->id, 'code' => $i->code, 'type' => $i->type,
                'severity' => $i->severity, 'affected_subscribers' => $i->affected_subscribers,
                'first_detected' => $i->first_detected, 'duration' => $i->duration,
                'status' => $i->status, 'description' => $i->description,
                'lng' => (float) $i->lng, 'lat' => (float) $i->lat,
            ])->all(),
            'alarms' => $alarms->map(fn ($a) => [
                'id' => $a->id, 'code' => $a->code, 'severity' => $a->severity,
                'message' => $a->message, 'asset_type' => $a->asset_type, 'asset_id' => $a->asset_id,
            ])->all(),
            'activeIncident' => $activeIncident ? [
                'id' => $activeIncident->id, 'code' => $activeIncident->code,
                'type' => $activeIncident->type, 'severity' => $activeIncident->severity,
                'affected_subscribers' => $activeIncident->affected_subscribers,
                'first_detected' => $activeIncident->first_detected,
                'duration' => $activeIncident->duration,
                'status' => $activeIncident->status,
                'description' => $activeIncident->description,
                'lng' => (float) $activeIncident->lng, 'lat' => (float) $activeIncident->lat,
            ] : null,
        ];
    }

    private function formatTelemetry(?Telemetry $telemetry): ?array
    {
        if (! $telemetry) {
            return null;
        }

        return [
            'rx_power' => $telemetry->rx_power !== null ? (float) $telemetry->rx_power : null,
            'tx_power' => $telemetry->tx_power !== null ? (float) $telemetry->tx_power : null,
            'olt_rx' => $telemetry->olt_rx !== null ? (float) $telemetry->olt_rx : null,
            'distance' => $telemetry->distance !== null ? (float) $telemetry->distance : null,
            'temperature' => $telemetry->temperature !== null ? (float) $telemetry->temperature : null,
            'voltage' => $telemetry->voltage !== null ? (float) $telemetry->voltage : null,
            'last_seen' => $telemetry->last_seen,
        ];
    }

    /**
     * Builds the physical wiring the point layers alone don't show.
     *
     * @param  Collection<int, object>  $pops
     * @param  Collection<int, object>  $olts
     * @param  Collection<int, object>  $closures
     * @param  Collection<int, object>  $splitters
     * @param  Collection<int, object>  $customers
     * @param  Collection<int, object>  $fdbs
     */
    private function buildConnectors(Collection $pops, Collection $olts, Collection $closures, Collection $splitters, Collection $customers, Collection $fdbs): array
    {
        $popsById = $pops->keyBy('id');
        $closuresById = $closures->keyBy('id');
        $splittersById = $splitters->keyBy('id');
        $fdbsById = $fdbs->keyBy('id');

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

        $fdbLinks = $fdbs->map(function ($fdb) use ($splittersById) {
            // FDBs are fed by splitters via distribution cables — approximate the link
            $splitter = $splittersById->first();
            if (! $splitter) return null;

            return [
                'type' => 'Feature',
                'geometry' => ['type' => 'LineString', 'coordinates' => [
                    [(float) $splitter->lng, (float) $splitter->lat],
                    [(float) $fdb->lng, (float) $fdb->lat],
                ]],
                'properties' => ['fdb_id' => $fdb->id],
            ];
        })->filter();

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
            'features' => $oltLinks->concat($splitterLinks)->concat($fdbLinks)->concat($customerLinks)->values(),
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
