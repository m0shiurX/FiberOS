<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('CREATE EXTENSION IF NOT EXISTS postgis');

        Schema::create('pops', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE pops ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('olts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pop_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('vendor');
            $table->string('model');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE olts ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('pons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('olt_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->timestamps();
        });

        Schema::create('fiber_cables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pon_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('type');
            $table->unsignedSmallInteger('core_capacity');
            $table->unsignedSmallInteger('used_cores');
            $table->unsignedInteger('length_meters');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE fiber_cables ADD COLUMN path geography(LineString, 4326) NOT NULL');

        Schema::create('closures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fiber_cable_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->timestamps();
        });
        DB::statement('ALTER TABLE closures ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('splitters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('closure_id')->constrained()->cascadeOnDelete();
            $table->foreignId('fiber_cable_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('type');
            $table->unsignedTinyInteger('port_count');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE splitters ADD COLUMN location geography(Point, 4326) NOT NULL');

        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('splitter_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('splitter_port');
            $table->string('code')->unique();
            $table->string('name');
            $table->string('status');
            $table->string('phone');
            $table->string('address');
            $table->string('onu_model');
            $table->string('onu_serial');
            $table->timestamps();
            $table->unique(['splitter_id', 'splitter_port']);
        });
        DB::statement('ALTER TABLE customers ADD COLUMN location geography(Point, 4326) NOT NULL');
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
        Schema::dropIfExists('splitters');
        Schema::dropIfExists('closures');
        Schema::dropIfExists('fiber_cables');
        Schema::dropIfExists('pons');
        Schema::dropIfExists('olts');
        Schema::dropIfExists('pops');
    }
};
