<?php

namespace App\Services;

use DB;
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
}