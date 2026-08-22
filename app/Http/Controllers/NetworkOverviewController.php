<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\FiberCable;
use App\Models\Splitter;
use Inertia\Inertia;
use Inertia\Response;

class NetworkOverviewController extends Controller
{
    public function index(): Response
    {
        $totalPorts = Splitter::sum('port_count');
        $occupiedPorts = Customer::count();

        return Inertia::render('NetworkOverview', [
            'metrics' => [
                'total_customers' => $occupiedPorts,
                'active_customers' => Customer::where('status', 'Active')->count(),
                'offline_customers' => Customer::where('status', '!=', 'Active')->count(),
                'total_splitters' => Splitter::count(),
                'port_utilization' => $totalPorts > 0 ? round(($occupiedPorts / $totalPorts) * 100) : 0,
                'total_fiber_length_meters' => FiberCable::sum('length_meters'),
            ],
        ]);
    }
}
