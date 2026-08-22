<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Seeds the fixed demo topology described in docs/context.md:
 * POP-BGR-01 -> OLT-BGR-01 -> {PON-01 -> FC-001 -> CL-001 -> SP-001, SP-002}
 *                              {PON-02 -> FC-002 -> CL-001 -> SP-003}
 *
 * Coordinates follow the real road (Uposhohor Sarak, Bogura) and real building footprints
 * pulled from OpenStreetMap/Overpass around 24.865490,89.362841 — not synthetic offsets — so
 * the fiber path, closure, splitters, and customers all sit where they physically would.
 */
class NetworkTopologySeeder extends Seeder
{
    public function run(): void
    {
        $point = fn (float $lng, float $lat) => DB::raw("ST_GeogFromText('SRID=4326;POINT({$lng} {$lat})')");

        $popId = DB::table('pops')->insertGetId([
            'code' => 'POP-BGR-01',
            'name' => 'Bogura Central POP',
            'location' => $point(89.359550, 24.864514),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $oltId = DB::table('olts')->insertGetId([
            'pop_id' => $popId,
            'code' => 'OLT-BGR-01',
            'name' => 'Bogura Central OLT',
            'vendor' => 'Huawei',
            'model' => 'MA5800-X7',
            'location' => $point(89.359909, 24.864630),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $pon1Id = DB::table('pons')->insertGetId([
            'olt_id' => $oltId,
            'code' => 'PON-01',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $pon2Id = DB::table('pons')->insertGetId([
            'olt_id' => $oltId,
            'code' => 'PON-02',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Runs along Uposhohor Sarak from the OLT northward to the closure — real road
        // vertices, not a straight line, so it hugs the street the way an aerial cable would.
        $fc1Id = DB::table('fiber_cables')->insertGetId([
            'pon_id' => $pon1Id,
            'code' => 'FC-001',
            'type' => 'Single-mode G.652D',
            'core_capacity' => 12,
            'used_cores' => 2,
            'length_meters' => 850,
            'path' => DB::raw("ST_GeogFromText('SRID=4326;LINESTRING(".
                '89.359909 24.864630, 89.359876 24.864711, 89.359758 24.864999, 89.359725 24.865080, '.
                '89.359290 24.865771, 89.359012 24.866215, 89.358869 24.866443, 89.358760 24.866622, '.
                '89.358654 24.866767, 89.358333 24.867207, 89.358004 24.867638, 89.357709 24.868024'.
                ")')"),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // A second cable on the same pole line to the closure (PON-02) — offset a few metres
        // from FC-001 rather than duplicating it, matching how multiple cables share one route.
        $fc2Id = DB::table('fiber_cables')->insertGetId([
            'pon_id' => $pon2Id,
            'code' => 'FC-002',
            'type' => 'Single-mode G.652D',
            'core_capacity' => 12,
            'used_cores' => 1,
            'length_meters' => 910,
            'path' => DB::raw("ST_GeogFromText('SRID=4326;LINESTRING(".
                '89.360029 24.864630, 89.359996 24.864711, 89.359878 24.864999, 89.359845 24.865080, '.
                '89.359410 24.865771, 89.359132 24.866215, 89.358989 24.866443, 89.358880 24.866622, '.
                '89.358774 24.866767, 89.358453 24.867207, 89.358124 24.867638, 89.357829 24.868024'.
                ")')"),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $closureId = DB::table('closures')->insertGetId([
            'fiber_cable_id' => $fc1Id,
            'code' => 'CL-001',
            'location' => $point(89.357709, 24.868024),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sp1Id = DB::table('splitters')->insertGetId([
            'closure_id' => $closureId,
            'fiber_cable_id' => $fc1Id,
            'code' => 'SP-001',
            'type' => '1:8',
            'port_count' => 8,
            'location' => $point(89.357824, 24.868545),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sp2Id = DB::table('splitters')->insertGetId([
            'closure_id' => $closureId,
            'fiber_cable_id' => $fc1Id,
            'code' => 'SP-002',
            'type' => '1:8',
            'port_count' => 8,
            'location' => $point(89.357610, 24.869437),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sp3Id = DB::table('splitters')->insertGetId([
            'closure_id' => $closureId,
            'fiber_cable_id' => $fc2Id,
            'code' => 'SP-003',
            'type' => '1:16',
            'port_count' => 16,
            'location' => $point(89.358211, 24.869311),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Every customer sits at a real building footprint near the closure (pulled from
        // OpenStreetMap), not an arbitrary offset — so drop cables land on actual houses.
        $customers = [
            ['code' => 'C-1001', 'splitter_id' => $sp1Id, 'port' => 1, 'lng' => 89.357602, 'lat' => 24.868852, 'onu_serial' => 'VSL23001901'],
            ['code' => 'C-1002', 'splitter_id' => $sp1Id, 'port' => 2, 'lng' => 89.356748, 'lat' => 24.868717, 'onu_serial' => 'VSL23001902'],
            ['code' => 'C-1003', 'splitter_id' => $sp1Id, 'port' => 3, 'lng' => 89.357498, 'lat' => 24.868616, 'onu_serial' => 'VSL23001903'],
            ['code' => 'C-1004', 'splitter_id' => $sp2Id, 'port' => 3, 'lng' => 89.357432, 'lat' => 24.869509, 'onu_serial' => 'VSL23001922'],
            ['code' => 'C-1005', 'splitter_id' => $sp2Id, 'port' => 5, 'lng' => 89.357528, 'lat' => 24.869620, 'onu_serial' => 'VSL23001905'],
            ['code' => 'C-1006', 'splitter_id' => $sp3Id, 'port' => 1, 'lng' => 89.358104, 'lat' => 24.869240, 'onu_serial' => 'VSL23001906'],
            ['code' => 'C-1007', 'splitter_id' => $sp3Id, 'port' => 2, 'lng' => 89.357905, 'lat' => 24.869604, 'onu_serial' => 'VSL23001907'],
            ['code' => 'C-1008', 'splitter_id' => $sp3Id, 'port' => 3, 'lng' => 89.357791, 'lat' => 24.869214, 'onu_serial' => 'VSL23001908'],
            ['code' => 'C-1009', 'splitter_id' => $sp3Id, 'port' => 4, 'lng' => 89.357748, 'lat' => 24.869570, 'onu_serial' => 'VSL23001909'],
            ['code' => 'C-1010', 'splitter_id' => $sp3Id, 'port' => 5, 'lng' => 89.357057, 'lat' => 24.869531, 'onu_serial' => 'VSL23001910', 'status' => 'Offline'],
        ];

        foreach ($customers as $i => $customer) {
            DB::table('customers')->insert([
                'splitter_id' => $customer['splitter_id'],
                'splitter_port' => $customer['port'],
                'code' => $customer['code'],
                'name' => 'Customer '.$customer['code'],
                'status' => $customer['status'] ?? 'Active',
                'phone' => sprintf('+880 17%02d-%06d', 10 + $i, 100000 + $i),
                'address' => 'House '.(1 + $i).', Uposhohor Sarak, Bogura',
                'onu_model' => 'VSOL-V2802RH',
                'onu_serial' => $customer['onu_serial'],
                'location' => $point($customer['lng'], $customer['lat']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
