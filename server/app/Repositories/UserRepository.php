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

    /**
     * Update status and active_token of confirmed user
     *
     * @param  int    $id
     * @param  string $activeToken
     * @return int
     */
    public function confirm($id, $activeToken)
    {
        return $this->model
            ->where('id', $id)
                ->where('active_token', $activeToken)
                    ->update([
                        'status' => config('common.user.status.active'),
                        'active_token' => null,
                    ]);
    }
}