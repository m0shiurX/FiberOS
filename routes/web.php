<?php

use App\Http\Controllers\FiberImpactController;
use App\Http\Controllers\NetworkMapController;
use App\Http\Controllers\NetworkOverviewController;
use App\Http\Controllers\NetworkTraceController;
use App\Http\Controllers\SplitterImpactController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
});

Route::get('network', [NetworkOverviewController::class, 'index'])->name('network.overview');
Route::get('network/map', [NetworkMapController::class, 'index'])->name('network.map');
Route::get('network/customers/{customer}/trace', NetworkTraceController::class)->name('network.customers.trace');
Route::get('network/splitters/{splitter}/impact', SplitterImpactController::class)->name('network.splitters.impact');
Route::get('network/fibers/{fiber}/impact', FiberImpactController::class)->name('network.fibers.impact');

require __DIR__.'/settings.php';
