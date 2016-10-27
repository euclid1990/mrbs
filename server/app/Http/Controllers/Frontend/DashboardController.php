<?php

namespace App\Http\Controllers\Frontend;

use Exception;
use App\Http\Controllers\Controller;
use App\Services\DashboardService;

class DashboardController extends Controller {

    protected $dashboardService;

    /**
     * Instantiate a new instance.
     * @param DashboardService $dashboardService
     */
    public function __construct(DashboardService $dashboardService)
    {
        $layout = config('common.layouts.frontend.default');
        parent::__construct($layout);
        $this->dashboardService = $dashboardService;
    }

    public function getIndex()
    {
        $this->viewData['title'] = trans('frontend/dashboard/titles.index');
        return view('frontend.dashboard.index', $this->viewData);
    }

    public function getGenerateUri()
    {
        $prefix = config('common.route.prefix.frontend');
        $group = config('common.route.group.frontend');
        $filename = config('common.route.filename.frontend');
        $routes = $this->dashboardService->generateUri($prefix, $group);
        $this->dashboardService->generateUriFile($filename, $routes);
        return response()->json($routes);
    }
}