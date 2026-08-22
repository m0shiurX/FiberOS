<?php

namespace App\Http\Controllers;

use App\Actions\Network\BuildNetworkMapPayload;
use Inertia\Inertia;
use Inertia\Response;

class NetworkMapController extends Controller
{
    public function index(BuildNetworkMapPayload $payload): Response
    {
        return Inertia::render('NetworkMap', $payload->handle());
    }
}
