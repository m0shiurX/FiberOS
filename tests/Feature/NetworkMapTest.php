<?php

use App\Models\Customer;
use App\Models\FiberCable;
use App\Models\Splitter;
use Database\Seeders\NetworkTopologySeeder;

beforeEach(function () {
    $this->seed(NetworkTopologySeeder::class);
});

it('renders the network overview with topology metrics', function () {
    $this->get(route('network.overview'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('NetworkOverview')
            ->where('metrics.total_customers', 10)
        );
});

it('renders the network map with all layers and detail records', function () {
    $splitter = Splitter::where('code', 'SP-001')->firstOrFail();

    $this->get(route('network.map'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('NetworkMap')
            ->has('layers.customers.features', 10)
            ->has('layers.splitters.features', 3)
            ->has('layers.fibers.features', 2)
            ->has('layers.connectors.features', 14)
            ->where("details.splitter.{$splitter->id}.occupied_ports", 3)
            ->where("details.splitter.{$splitter->id}.available_ports", 5)
        );
});

it('traces a customer upstream to the POP', function () {
    $customer = Customer::where('code', 'C-1004')->firstOrFail();

    $response = $this->getJson(route('network.customers.trace', $customer))
        ->assertOk();

    $codes = collect($response->json('path'))->pluck('code');

    expect($codes->first())->toBe('C-1004')
        ->and($codes->last())->toBe('POP-BGR-01')
        ->and($codes)->toContain('SP-002', 'CL-001', 'FC-001', 'PON-01', 'OLT-BGR-01');
});

it('analyzes splitter impact using occupied ports', function () {
    $splitter = Splitter::where('code', 'SP-001')->firstOrFail();

    $this->getJson(route('network.splitters.impact', $splitter))
        ->assertOk()
        ->assertJson([
            'type' => '1:8',
            'occupied_ports' => 3,
            'available_ports' => 5,
            'affected_customers' => 3,
        ]);
});

it('analyzes fiber impact across its connected splitters', function () {
    $fiber = FiberCable::where('code', 'FC-001')->firstOrFail();

    $this->getJson(route('network.fibers.impact', $fiber))
        ->assertOk()
        ->assertJson([
            'connected_splitters' => 2,
            'connected_onus' => 5,
            'affected_customers' => 5,
        ]);
});

it('scopes fiber impact to only that fiber\'s spliced splitters', function () {
    $fiber = FiberCable::where('code', 'FC-002')->firstOrFail();

    $this->getJson(route('network.fibers.impact', $fiber))
        ->assertOk()
        ->assertJson([
            'connected_splitters' => 1,
            'connected_onus' => 5,
            'affected_customers' => 5,
        ]);
});
