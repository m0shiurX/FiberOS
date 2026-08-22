<?php

namespace App\Http\Controllers;

use App\Actions\Network\AnalyzeFiberImpact;
use App\Models\FiberCable;
use Illuminate\Http\JsonResponse;

class FiberImpactController extends Controller
{
    public function __invoke(FiberCable $fiber, AnalyzeFiberImpact $impact): JsonResponse
    {
        return response()->json($impact->handle($fiber));
    }
}
