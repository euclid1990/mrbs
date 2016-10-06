<?php

namespace App\Http\Controllers\Backend;

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
        $this->viewData['title'] = trans('backend/user/titles.index');
        return view('backend.user.index', $this->viewData);
    }
}