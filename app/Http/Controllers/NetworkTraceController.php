<?php

namespace App\Http\Controllers;

use App\Actions\Network\TraceCustomerUpstream;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;

class NetworkTraceController extends Controller
{
    public function __invoke(Customer $customer, TraceCustomerUpstream $trace): JsonResponse
    {
        return response()->json([
            'path' => $trace->handle($customer),
        ]);
    }
}
