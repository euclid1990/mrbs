<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $layout;
    protected $viewData = [];

    public function __construct($layout = null)
    {
        if (is_null($layout)) {
            $layout = config('common.layouts.frontend.default');
        }
        set_carbon_locale();
        $this->layout = $layout;
        view()->share([
            'layout' => $this->layout,
        ]);
    }
}
