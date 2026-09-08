<?php

use App\Models\Customer;
use App\Models\Fdb;
use App\Models\FiberCable;
use App\Models\Incident;
use App\Models\Odf;
use App\Models\Pole;
use App\Models\Rack;
use App\Models\Router;
use App\Models\Splice;
use App\Models\SpliceClosure;
use App\Models\Splitter;
use App\Models\SwitchModel;
use App\Models\Telemetry;
use Database\Seeders\ReferenceDesignSeeder;

beforeEach(function () {
    $this->seed(ReferenceDesignSeeder::class);
});

it('renders the network overview with reference design metrics', function () {
    $this->get(route('network.overview'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('NetworkOverview')
            ->where('metrics.total_customers', 14)
        );
});

it('renders the network map with all new layers and detail records', function () {
    $splitter = Splitter::where('code', 'SP-019')->firstOrFail();
    $closure = SpliceClosure::where('code', 'CL-012')->firstOrFail();
    $fdb = Fdb::where('code', 'FDB-018')->firstOrFail();
    $odf = Odf::where('code', 'ODF-01')->firstOrFail();
    $rack = Rack::where('code', 'RK-01')->firstOrFail();
    $router = Router::where('code', 'RTR-BGR-01')->firstOrFail();
    $switch = SwitchModel::where('code', 'SW-BGR-01')->firstOrFail();
    $pole = Pole::where('code', 'PL-104')->firstOrFail();

    $this->get(route('network.map'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('NetworkMap')
            ->has('layers.customers.features', 14)
            ->has('layers.splitters.features', 3)
            ->has('layers.fibers.features', 5)
            ->has('layers.racks.features', 2)
            ->has('layers.odfs.features', 1)
            ->has('layers.routers.features', 1)
            ->has('layers.switches.features', 1)
            ->has('layers.poles.features', 3)
            ->has('layers.manholes.features', 2)
            ->has('layers.fdbs.features', 3)
            ->has('layers.incidents.features', 1)
            ->has('layers.connectors.features')
            ->has('details.customer')
            ->has('details.splitter')
            ->has('details.fiber')
            ->has('details.olt')
            ->has('details.closure')
            ->has('details.rack')
            ->has('details.odf')
            ->has('details.router')
            ->has('details.switch')
            ->has('details.fdb')
            ->has('details.pole')
            ->has('details.manhole')
            ->has('details.incident')
            ->has('incidents')
            ->has('alarms')
            ->has('activeIncident')
            ->where("details.splitter.{$splitter->id}.occupied_ports", 8)
            ->where("details.splitter.{$splitter->id}.available_ports", 24)
            ->where("details.closure.{$closure->id}.connected_splitters", 2)
            ->where("details.fdb.{$fdb->id}.ports_used", 8)
            ->where("details.odf.{$odf->id}.port_count", 96)
            ->where("details.rack.{$rack->id}.occupied_units", 19)
            ->where("details.router.{$router->id}.management_ip", '10.20.4.1')
            ->where("details.switch.{$switch->id}.management_ip", '10.20.4.4')
            ->where("details.pole.{$pole->id}.height", 9)
        );
});

it('includes telemetry data in customer details', function () {
    $customer = Customer::where('code', 'C-1001')->firstOrFail();

    $this->get(route('network.map'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has("details.customer.{$customer->id}.telemetry")
            ->where("details.customer.{$customer->id}.telemetry.rx_power", -27.4)
            ->where("details.customer.{$customer->id}.telemetry.distance", 4.61)
        );
});

it('includes active incident in the payload', function () {
    $this->get(route('network.map'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('activeIncident.code', 'INC-1045')
            ->where('activeIncident.affected_subscribers', 8)
            ->where('activeIncident.severity', 'critical')
        );
});

it('includes alarms in the payload', function () {
    $this->get(route('network.map'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('alarms', 3)
        );
});

it('traces a customer upstream to the POP', function () {
    $customer = Customer::where('code', 'C-1001')->firstOrFail();

    $response = $this->getJson(route('network.customers.trace', $customer))
        ->assertOk();

    $codes = collect($response->json('path'))->pluck('code');

    expect($codes->first())->toBe('C-1001')
        ->and($codes->last())->toBe('POP-BGR-01')
        ->and($codes)->toContain('SP-019', 'CL-012', 'FC-002', 'PON-01', 'OLT-BGR-01');
});

it('analyzes splitter impact using occupied ports', function () {
    $splitter = Splitter::where('code', 'SP-019')->firstOrFail();

    $this->getJson(route('network.splitters.impact', $splitter))
        ->assertOk()
        ->assertJson([
            'type' => '1:32',
            'occupied_ports' => 8,
            'available_ports' => 24,
            'affected_customers' => 8,
        ]);
});

it('analyzes fiber impact across its connected splitters', function () {
    $fiber = FiberCable::where('code', 'FC-002')->firstOrFail();

    $this->getJson(route('network.fibers.impact', $fiber))
        ->assertOk()
        ->assertJson([
            'connected_splitters' => 2,
            'connected_onus' => 11,
            'affected_customers' => 11,
        ]);
});

it('seeds all new entity types', function () {
    expect(Rack::count())->toBe(2)
        ->and(Odf::count())->toBe(1)
        ->and(Router::count())->toBe(1)
        ->and(SwitchModel::count())->toBe(1)
        ->and(Pole::count())->toBe(3)
        ->and(\App\Models\Manhole::count())->toBe(2)
        ->and(Fdb::count())->toBe(3)
        ->and(Incident::count())->toBe(1)
        ->and(\App\Models\Alarm::count())->toBe(3)
        ->and(Telemetry::count())->toBe(14)
        ->and(Splice::count())->toBe(2);
});

it('seeds telemetry for each customer', function () {
    $customers = Customer::all();

    foreach ($customers as $customer) {
        expect(Telemetry::where('asset_type', 'customer')->where('asset_id', $customer->id)->exists())->toBeTrue();
    }
});
