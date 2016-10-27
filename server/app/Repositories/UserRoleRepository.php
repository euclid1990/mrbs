<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\UserRole;

class UserRoleRepository extends BaseRepository {

    /**
     * Create a new UserRoleRepository instance.
     *
     * @param  \App\Models\UserRole $userRole
     */
    public function __construct(UserRole $userRole)
    {
        $this->model = $userRole;
    }
}