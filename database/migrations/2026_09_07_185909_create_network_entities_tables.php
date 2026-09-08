<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('racks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pop_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->unsignedTinyInteger('rack_units')->default(42);
            $table->unsignedTinyInteger('occupied_units')->default(0);
            $table->string('vendor')->nullable();
            $table->string('model')->nullable();
            $table->string('power_capacity')->nullable();
            $table->timestamps();
        });
        DB::statement('ALTER TABLE racks ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('odfs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rack_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('type')->default('frame');
            $table->string('vendor')->nullable();
            $table->string('model')->nullable();
            $table->string('serial')->nullable();
            $table->unsignedSmallInteger('port_count')->default(96);
            $table->string('connector_type')->default('SC/APC');
            $table->string('polish_type')->default('APC');
            $table->string('status')->default('online');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE odfs ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('odf_ports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('odf_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('port_number');
            $table->string('front_connection')->nullable();
            $table->string('back_connection')->nullable();
            $table->string('status')->default('available');
            $table->timestamps();
        });

        Schema::create('routers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rack_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('vendor');
            $table->string('model');
            $table->string('router_type')->default('edge');
            $table->string('os')->nullable();
            $table->string('firmware')->nullable();
            $table->string('serial')->nullable();
            $table->string('management_ip')->nullable();
            $table->string('mac')->nullable();
            $table->string('status')->default('online');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE routers ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('switches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rack_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('vendor');
            $table->string('model');
            $table->string('layer')->default('L3');
            $table->string('os')->nullable();
            $table->string('firmware')->nullable();
            $table->string('serial')->nullable();
            $table->string('management_ip')->nullable();
            $table->string('mac')->nullable();
            $table->string('vlan')->nullable();
            $table->string('status')->default('online');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE switches ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('poles', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('type')->default('Concrete 9 m');
            $table->unsignedTinyInteger('height')->default(9);
            $table->string('owner')->default('FiberOS');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE poles ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('manholes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('type')->default('Handhole 600');
            $table->unsignedTinyInteger('duct_count')->default(2);
            $table->string('slack_length')->nullable();
            $table->timestamps();
        });
        DB::statement('ALTER TABLE manholes ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('fdbs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pole_id')->nullable()->constrained()->nullOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('type')->default('Wall FAT');
            $table->unsignedTinyInteger('port_count')->default(8);
            $table->unsignedTinyInteger('ports_used')->default(0);
            $table->string('fed_by_cable')->nullable();
            $table->string('fed_by_core')->nullable();
            $table->string('status')->default('online');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE fdbs ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('fdb_ports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fdb_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('port_number');
            $table->string('status')->default('available');
            $table->string('drop_cable_id')->nullable();
            $table->string('onu_id')->nullable();
            $table->timestamps();
        });

        Schema::create('splices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('splice_closure_id')->constrained('closures')->cascadeOnDelete();
            $table->unsignedTinyInteger('tray_number');
            $table->unsignedTinyInteger('splice_number');
            $table->string('source_cable')->nullable();
            $table->string('source_core')->nullable();
            $table->string('dest_cable')->nullable();
            $table->string('dest_core')->nullable();
            $table->decimal('loss_db', 5, 2)->nullable();
            $table->string('technician')->nullable();
            $table->date('date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fiber_cable_id')->nullable()->constrained()->nullOnDelete();
            $table->string('code')->unique();
            $table->string('type')->default('fault');
            $table->string('severity')->default('critical');
            $table->unsignedInteger('affected_subscribers')->default(0);
            $table->timestamp('first_detected')->nullable();
            $table->string('duration')->nullable();
            $table->string('status')->default('active');
            $table->text('description')->nullable();
            $table->timestamps();
        });
        DB::statement('ALTER TABLE incidents ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('alarms', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable();
            $table->string('severity')->default('warning');
            $table->string('message')->nullable();
            $table->nullableMorphs('asset');
            $table->boolean('acknowledged')->default(false);
            $table->timestamps();
        });

        Schema::create('telemetries', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('asset');
            $table->decimal('rx_power', 6, 2)->nullable();
            $table->decimal('tx_power', 6, 2)->nullable();
            $table->decimal('olt_rx', 6, 2)->nullable();
            $table->decimal('distance', 8, 2)->nullable();
            $table->decimal('temperature', 5, 2)->nullable();
            $table->decimal('voltage', 5, 2)->nullable();
            $table->timestamp('last_seen')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('telemetries');
        Schema::dropIfExists('alarms');
        Schema::dropIfExists('incidents');
        Schema::dropIfExists('splices');
        Schema::dropIfExists('manholes');
        Schema::dropIfExists('poles');
        Schema::dropIfExists('fdb_ports');
        Schema::dropIfExists('fdbs');
        Schema::dropIfExists('switches');
        Schema::dropIfExists('routers');
        Schema::dropIfExists('odf_ports');
        Schema::dropIfExists('odfs');
        Schema::dropIfExists('racks');
    }
};
