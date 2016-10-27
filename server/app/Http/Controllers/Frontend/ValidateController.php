<?php

namespace App\Http\Controllers\Frontend;

use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\ValidateUniqueEmailRequest;

class ValidateController extends Controller {

    /**
     * Instantiate a new instance.
     * @param DashboardService $dashboardService
     */
    public function __construct()
    {
        $layout = config('common.layouts.frontend.default');
        parent::__construct($layout);
    }

    public function uniqueEmail(ValidateUniqueEmailRequest $request)
    {
        return response()->json([
            'status' => 200,
            'data' => [],
        ]);
    }

}