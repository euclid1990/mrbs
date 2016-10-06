<?php

namespace App\Http\Controllers\Backend;

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
        $layout = config('common.layouts.backend.default');
        parent::__construct($layout);
        $this->dashboardService = $dashboardService;
    }

    public function getIndex()
    {
        $this->viewData['title'] = trans('backend/dashboard/titles.index');
        return view('backend.dashboard.index', $this->viewData);
    }
}