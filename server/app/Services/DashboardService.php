<?php

namespace App\Services;

use DB;
use File;
use Route;
use Cache;
use Exception;
use Carbon\Carbon;
use App\Repositories\UserRepository;

class DashboardService extends BaseService {

    /**
     * @var \App\Repositories\UserRepository
     */
    protected  $userRepository;

    /**
     * Instantiate a new instance.
     *
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
    }

    public function generateUri($prefix = '/', $group)
    {
        $routes = [];
        $routeCollection = Route::getRoutes();
        foreach ($routeCollection as $route) {
            $name = $route->getName();
            $action = $route->getAction();
            $methods = $route->getMethods();
            if (isset($action['namespace']) && ($action['namespace'] == $group) && $name) {
                $res = explode('.', $name);
                $resKeys = array_keys($res);
                $lastResKey = array_pop($resKeys);
                $t = &$routes;
                foreach ($res as $k => $r) {
                    if (empty($t[$r])) {
                        $t[$r] = [];
                    }
                    $t = &$t[$r];
                    if ($k === $lastResKey) {
                        $t = $prefix . ltrim($route->getPath(), '/');
                    }
                }
                unset($t);
            }
        }
        return $routes;
    }

    public function generateUriFile($filename, $data)
    {
        $path = base_path($filename);
        $data = json_encode($data, JSON_PRETTY_PRINT);
        File::put($path, $data);
    }
}