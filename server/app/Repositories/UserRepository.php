<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\User;

class UserRepository extends BaseRepository {

    /**
     * Create a new UserRepository instance.
     *
     * @param  \App\Models\User $user
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Find by email
     *
     * @param  string $email
     * @return object
     */
    public function findByEmail($email, $columns = ['*'])
    {
        return $this->model->where('email', $email)->first($columns);
    }
}