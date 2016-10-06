<?php

namespace App\Http\Controllers\Frontend;

use Exception;
use App\Http\Controllers\Controller;

class UserController extends Controller {

    /**
     * Instantiate a new instance.
     * @param DashboardService $dashboardService
     */
    public function __construct()
    {
        $layout = config('common.layouts.backend.default');
        parent::__construct($layout);
    }

    public function index()
    {
        $this->viewData['title'] = trans('frontend/user/titles.index');
        return view('frontend.user.index', $this->viewData);
    }

}