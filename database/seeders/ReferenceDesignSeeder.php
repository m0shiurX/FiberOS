<?php

namespace Database\Seeders;

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
use App\Models\Pon;
use App\Models\Rack;
use App\Models\Router;
use App\Models\Splice;
use App\Models\SpliceClosure;
use App\Models\Splitter;
use App\Models\SwitchModel;
use App\Models\Telemetry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Seeds the reference design dataset from docs/reference_design/:
 * Bogura region, 12 POPs, 9 OLTs, 5,214 subscribers.
 *
 * This replaces NetworkTopologySeeder for the investor demo.
 */
class ReferenceDesignSeeder extends Seeder
{
    public function run(): void
    {
        $point = fn (float $lng, float $lat) => DB::raw("ST_GeogFromText('SRID=4326;POINT({$lng} {$lat})')");
        $line = fn (array $coords) => DB::raw("ST_GeogFromText('SRID=4326;LINESTRING(".
            implode(', ', array_map(fn ($c) => "{$c[1]} {$c[0]}", $coords)).
            ")')");

        // --- POP ---
        $popId = DB::table('pops')->insertGetId([
            'code' => 'POP-BGR-01',
            'name' => 'Bogura Main',
            'location' => $point(89.37010, 24.85560),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Rack ---
        $rack1Id = DB::table('racks')->insertGetId([
            'pop_id' => $popId,
            'code' => 'RK-01',
            'name' => 'RK-01',
            'rack_units' => 42,
            'occupied_units' => 19,
            'vendor' => 'Netrack',
            'model' => 'Standard',
            'power_capacity' => '4.2 kW',
            'location' => $point(89.37040, 24.85580),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $rack2Id = DB::table('racks')->insertGetId([
            'pop_id' => $popId,
            'code' => 'RK-02',
            'name' => 'RK-02',
            'rack_units' => 42,
            'occupied_units' => 6,
            'vendor' => 'Netrack',
            'model' => 'Standard',
            'power_capacity' => '1.1 kW',
            'location' => $point(89.36980, 24.85530),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- OLT ---
        $oltId = DB::table('olts')->insertGetId([
            'pop_id' => $popId,
            'code' => 'OLT-BGR-01',
            'name' => 'OLT-BGR-01',
            'vendor' => 'Huawei',
            'model' => 'MA5800-X7',
            'location' => $point(89.37030, 24.85570),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- PONs ---
        $pon1Id = DB::table('pons')->insertGetId(['olt_id' => $oltId, 'code' => 'PON-01', 'created_at' => now(), 'updated_at' => now()]);
        $pon2Id = DB::table('pons')->insertGetId(['olt_id' => $oltId, 'code' => 'PON-02', 'created_at' => now(), 'updated_at' => now()]);
        $pon3Id = DB::table('pons')->insertGetId(['olt_id' => $oltId, 'code' => 'PON-03', 'created_at' => now(), 'updated_at' => now()]);

        // --- ODF ---
        $odfId = DB::table('odfs')->insertGetId([
            'rack_id' => $rack1Id,
            'code' => 'ODF-01',
            'name' => 'ODF-01',
            'type' => 'frame',
            'vendor' => 'Generic',
            'model' => '96-port',
            'serial' => 'ODF-SN-001',
            'port_count' => 96,
            'connector_type' => 'SC/APC',
            'polish_type' => 'APC',
            'status' => 'online',
            'location' => $point(89.37030, 24.85520),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Router ---
        $routerId = DB::table('routers')->insertGetId([
            'rack_id' => $rack1Id,
            'code' => 'RTR-BGR-01',
            'name' => 'RTR-BGR-01',
            'vendor' => 'Cisco',
            'model' => 'ASR 920',
            'router_type' => 'edge',
            'os' => 'IOS-XE',
            'firmware' => '17.6.3',
            'serial' => 'RTR-SN-001',
            'management_ip' => '10.20.4.1',
            'mac' => '00:1A:2B:3C:4D:01',
            'status' => 'online',
            'location' => $point(89.36990, 24.85590),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Switch ---
        $switchId = DB::table('switches')->insertGetId([
            'rack_id' => $rack1Id,
            'code' => 'SW-BGR-01',
            'name' => 'SW-BGR-01',
            'vendor' => 'Juniper',
            'model' => 'EX4400',
            'layer' => 'L3',
            'os' => 'Junos',
            'firmware' => '21.4R3',
            'serial' => 'SW-SN-001',
            'management_ip' => '10.20.4.4',
            'mac' => '00:1A:2B:3C:4D:02',
            'vlan' => '812',
            'status' => 'online',
            'location' => $point(89.37060, 24.85540),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Fiber Cables ---
        $fc1Id = DB::table('fiber_cables')->insertGetId([
            'pon_id' => $pon1Id,
            'code' => 'FC-002',
            'type' => 'Feeder',
            'core_capacity' => 48,
            'used_cores' => 12,
            'length_meters' => 3180,
            'path' => $line([
                [24.8552, 89.3703], [24.8531, 89.3713], [24.8512, 89.3718],
                [24.8492, 89.3730], [24.8471, 89.3739],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $fc2Id = DB::table('fiber_cables')->insertGetId([
            'pon_id' => $pon2Id,
            'code' => 'FC-005',
            'type' => 'Feeder',
            'core_capacity' => 24,
            'used_cores' => 8,
            'length_meters' => 2740,
            'path' => $line([
                [24.8552, 89.3703], [24.8528, 89.3735], [24.8510, 89.3760], [24.8498, 89.3776],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $dc1Id = DB::table('fiber_cables')->insertGetId([
            'pon_id' => $pon1Id,
            'code' => 'DC-019',
            'type' => 'Distribution',
            'core_capacity' => 24,
            'used_cores' => 4,
            'length_meters' => 410,
            'path' => $line([
                [24.8471, 89.3739], [24.8462, 89.3750], [24.8449, 89.3762],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $dc2Id = DB::table('fiber_cables')->insertGetId([
            'pon_id' => $pon3Id,
            'code' => 'DC-017',
            'type' => 'Distribution',
            'core_capacity' => 12,
            'used_cores' => 3,
            'length_meters' => 280,
            'path' => $line([
                [24.8498, 89.3776], [24.8494, 89.3786], [24.8492, 89.3792],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $dc3Id = DB::table('fiber_cables')->insertGetId([
            'pon_id' => $pon1Id,
            'code' => 'DC-022',
            'type' => 'Distribution',
            'core_capacity' => 24,
            'used_cores' => 6,
            'length_meters' => 620,
            'path' => $line([
                [24.8471, 89.3739], [24.8455, 89.3720], [24.8447, 89.3712], [24.8438, 89.3701],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Closures ---
        $cl1Id = DB::table('closures')->insertGetId([
            'fiber_cable_id' => $fc1Id,
            'code' => 'CL-011',
            'location' => $point(89.37180, 24.85120),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $cl2Id = DB::table('closures')->insertGetId([
            'fiber_cable_id' => $fc1Id,
            'code' => 'CL-012',
            'location' => $point(89.37390, 24.84710),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $cl3Id = DB::table('closures')->insertGetId([
            'fiber_cable_id' => $fc2Id,
            'code' => 'CL-013',
            'location' => $point(89.37760, 24.84980),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Poles ---
        $pl1Id = DB::table('poles')->insertGetId([
            'code' => 'PL-104',
            'name' => 'PL-104',
            'type' => 'Concrete 9 m',
            'height' => 9,
            'owner' => 'FiberOS',
            'location' => $point(89.37130, 24.85310),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $pl2Id = DB::table('poles')->insertGetId([
            'code' => 'PL-118',
            'name' => 'PL-118',
            'type' => 'Concrete 9 m',
            'height' => 9,
            'owner' => 'FiberOS',
            'location' => $point(89.37890, 24.84910),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $pl3Id = DB::table('poles')->insertGetId([
            'code' => 'PL-127',
            'name' => 'PL-127',
            'type' => 'Steel 8 m',
            'height' => 8,
            'owner' => 'Leased',
            'location' => $point(89.37580, 24.84510),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Manholes ---
        DB::table('manholes')->insertGetId([
            'code' => 'MH-07',
            'name' => 'MH-07',
            'type' => 'Handhole 600',
            'duct_count' => 2,
            'slack_length' => '18 m',
            'location' => $point(89.37220, 24.85220),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('manholes')->insertGetId([
            'code' => 'MH-09',
            'name' => 'MH-09',
            'type' => 'Handhole 600',
            'duct_count' => 2,
            'slack_length' => '22 m',
            'location' => $point(89.37450, 24.84800),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Splitters ---
        $sp1Id = DB::table('splitters')->insertGetId([
            'closure_id' => $cl2Id,
            'fiber_cable_id' => $fc1Id,
            'code' => 'SP-019',
            'type' => '1:32',
            'port_count' => 32,
            'location' => $point(89.37430, 24.84690),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sp2Id = DB::table('splitters')->insertGetId([
            'closure_id' => $cl3Id,
            'fiber_cable_id' => $fc2Id,
            'code' => 'SP-024',
            'type' => '1:16',
            'port_count' => 16,
            'location' => $point(89.37780, 24.85000),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sp3Id = DB::table('splitters')->insertGetId([
            'closure_id' => $cl2Id,
            'fiber_cable_id' => $fc1Id,
            'code' => 'SP-031',
            'type' => '1:16',
            'port_count' => 16,
            'location' => $point(89.37120, 24.84470),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- FDBs ---
        $fdb1Id = DB::table('fdbs')->insertGetId([
            'pole_id' => $pl3Id,
            'code' => 'FDB-018',
            'name' => 'FDB-018',
            'type' => 'Wall FAT',
            'port_count' => 8,
            'ports_used' => 8,
            'fed_by_cable' => 'DC-019',
            'fed_by_core' => '09',
            'status' => 'critical',
            'location' => $point(89.37620, 24.84490),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $fdb2Id = DB::table('fdbs')->insertGetId([
            'pole_id' => $pl2Id,
            'code' => 'FDB-023',
            'name' => 'FDB-023',
            'type' => 'Pole FAT',
            'port_count' => 8,
            'ports_used' => 7,
            'fed_by_cable' => 'DC-017',
            'fed_by_core' => '04',
            'status' => 'online',
            'location' => $point(89.37920, 24.84920),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $fdb3Id = DB::table('fdbs')->insertGetId([
            'pole_id' => null,
            'code' => 'FDB-031',
            'name' => 'FDB-031',
            'type' => 'Wall FAT',
            'port_count' => 8,
            'ports_used' => 3,
            'fed_by_cable' => 'DC-022',
            'fed_by_core' => '12',
            'status' => 'online',
            'location' => $point(89.37010, 24.84380),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Customers ---
        $customers = [
            ['code' => 'C-1001', 'fdb' => $fdb1Id, 'port' => 1, 'lng' => 89.37570, 'lat' => 24.84440, 'status' => 'offline', 'rx' => '-27.4', 'dist' => 4.61],
            ['code' => 'C-1002', 'fdb' => $fdb1Id, 'port' => 2, 'lng' => 89.37680, 'lat' => 24.84460, 'status' => 'offline', 'rx' => '-25.7', 'dist' => 4.82],
            ['code' => 'C-1003', 'fdb' => $fdb1Id, 'port' => 3, 'lng' => 89.37650, 'lat' => 24.84410, 'status' => 'offline', 'rx' => '-26.9', 'dist' => 4.88],
            ['code' => 'C-1004', 'fdb' => $fdb1Id, 'port' => 4, 'lng' => 89.37710, 'lat' => 24.84520, 'status' => 'offline', 'rx' => '-28.2', 'dist' => 4.74],
            ['code' => 'C-1005', 'fdb' => $fdb1Id, 'port' => 5, 'lng' => 89.37570, 'lat' => 24.84550, 'status' => 'offline', 'rx' => '-26.1', 'dist' => 4.55],
            ['code' => 'C-1006', 'fdb' => $fdb1Id, 'port' => 6, 'lng' => 89.37520, 'lat' => 24.84430, 'status' => 'offline', 'rx' => '-27.8', 'dist' => 4.63],
            ['code' => 'C-1007', 'fdb' => $fdb1Id, 'port' => 7, 'lng' => 89.37660, 'lat' => 24.84570, 'status' => 'offline', 'rx' => '-25.9', 'dist' => 4.91],
            ['code' => 'C-1008', 'fdb' => $fdb1Id, 'port' => 8, 'lng' => 89.37720, 'lat' => 24.84380, 'status' => 'offline', 'rx' => '-26.4', 'dist' => 4.97],
            ['code' => 'C-2001', 'fdb' => $fdb2Id, 'port' => 1, 'lng' => 89.37980, 'lat' => 24.84970, 'status' => 'online', 'rx' => '-21.8', 'dist' => 3.42],
            ['code' => 'C-2002', 'fdb' => $fdb2Id, 'port' => 2, 'lng' => 89.38010, 'lat' => 24.84880, 'status' => 'warning', 'rx' => '-25.4', 'dist' => 3.68],
            ['code' => 'C-2003', 'fdb' => $fdb2Id, 'port' => 4, 'lng' => 89.37880, 'lat' => 24.84850, 'status' => 'online', 'rx' => '-22.6', 'dist' => 3.51],
            ['code' => 'C-3001', 'fdb' => $fdb3Id, 'port' => 1, 'lng' => 89.36950, 'lat' => 24.84320, 'status' => 'online', 'rx' => '-20.9', 'dist' => 5.12],
            ['code' => 'C-3002', 'fdb' => $fdb3Id, 'port' => 2, 'lng' => 89.37080, 'lat' => 24.84340, 'status' => 'warning', 'rx' => '-25.1', 'dist' => 5.24],
            ['code' => 'C-3003', 'fdb' => $fdb3Id, 'port' => 3, 'lng' => 89.37030, 'lat' => 24.84280, 'status' => 'online', 'rx' => '-21.4', 'dist' => 5.31],
        ];

        foreach ($customers as $i => $c) {
            $custId = DB::table('customers')->insertGetId([
                'splitter_id' => match($c['fdb']) {
                    $fdb1Id => $sp1Id,
                    $fdb2Id => $sp2Id,
                    $fdb3Id => $sp3Id,
                },
                'splitter_port' => $c['port'],
                'code' => $c['code'],
                'name' => 'Customer '.$c['code'],
                'status' => $c['status'] === 'online' ? 'Active' : ($c['status'] === 'warning' ? 'Active' : 'Offline'),
                'phone' => sprintf('+880 17%02d-%06d', 10 + $i, 100000 + $i),
                'address' => 'House '.$c['port'].', Uposhohor Sarak, Bogura',
                'onu_model' => 'VSOL V2802RH',
                'onu_serial' => 'VSL2300'.(1900 + $c['port']),
                'location' => $point($c['lng'], $c['lat']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // --- Telemetry ---
            DB::table('telemetries')->insert([
                'asset_type' => 'customer',
                'asset_id' => $custId,
                'rx_power' => $c['rx'],
                'tx_power' => $c['status'] === 'offline' ? null : 2.4,
                'olt_rx' => $c['status'] === 'offline' ? null : $c['rx'] - 1.3,
                'distance' => $c['dist'],
                'temperature' => $c['status'] === 'offline' ? null : 49,
                'voltage' => $c['status'] === 'offline' ? null : 3.3,
                'last_seen' => $c['status'] === 'offline' ? now()->subMinutes(38) : now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // --- Incident ---
        DB::table('incidents')->insertGetId([
            'fiber_cable_id' => $dc1Id,
            'code' => 'INC-1045',
            'type' => 'Probable fiber fault',
            'severity' => 'critical',
            'affected_subscribers' => 8,
            'first_detected' => now()->subMinutes(38),
            'duration' => '38 Min',
            'status' => 'active',
            'description' => 'Eight ONUs on Distribution Cable DC-019 stopped responding within the same minute. All affected drops share FDB-018, which suggests a single fiber segment.',
            'location' => $point(89.37500, 24.84620),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Alarms ---
        DB::table('alarms')->insert([
            ['code' => 'ALM-001', 'severity' => 'critical', 'message' => '8 subscribers offline on FDB-018', 'asset_type' => 'fdb', 'asset_id' => $fdb1Id, 'acknowledged' => false, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'ALM-002', 'severity' => 'warning', 'message' => 'PON-07 capacity above 85%', 'asset_type' => 'pon', 'asset_id' => $pon1Id, 'acknowledged' => false, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'ALM-003', 'severity' => 'warning', 'message' => 'ONU C-2002 weak optical signal', 'asset_type' => 'customer', 'asset_id' => 10, 'acknowledged' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // --- Splices ---
        DB::table('splices')->insert([
            ['splice_closure_id' => $cl2Id, 'tray_number' => 2, 'splice_number' => 18, 'source_cable' => 'FC-002', 'source_core' => '11', 'dest_cable' => 'DC-019', 'dest_core' => '09', 'loss_db' => 1.9, 'technician' => 'Rahim', 'date' => '2024-08-14', 'notes' => 'Above expected loss', 'created_at' => now(), 'updated_at' => now()],
            ['splice_closure_id' => $cl3Id, 'tray_number' => 1, 'splice_number' => 6, 'source_cable' => 'FC-005', 'source_core' => '07', 'dest_cable' => 'DC-017', 'dest_core' => '04', 'loss_db' => 0.3, 'technician' => 'Karim', 'date' => '2024-08-12', 'notes' => null, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
