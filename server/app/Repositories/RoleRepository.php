<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\Role;

class RoleRepository extends BaseRepository {

    /**
     * Create a new RoleRepository instance.
     *
     * @param  \App\Models\Role $role
     */
    public function __construct(Role $role)
    {
        $this->model = $role;
    }

    /**
     * Get role by name
     *
     * @param  string $name
     * @param  array  $columns
     * @return object
     */
    public function getByName($name, $columns = ['*'])
    {
        return $this->model->where('name', $name)->first($columns);
    }
}