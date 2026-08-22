<?php

namespace App\Http\Controllers;

use App\Actions\Network\AnalyzeSplitterImpact;
use App\Models\Splitter;
use Illuminate\Http\JsonResponse;

class SplitterImpactController extends Controller
{
    public function __invoke(Splitter $splitter, AnalyzeSplitterImpact $impact): JsonResponse
    {
        return response()->json($impact->handle($splitter));
    }
}
