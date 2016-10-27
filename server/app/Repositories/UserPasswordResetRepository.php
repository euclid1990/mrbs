<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\UserPasswordReset;

class UserPasswordResetRepository extends BaseRepository {

    /**
     * Create a new UserPasswordResetRepository instance.
     *
     * @param  \App\Models\UserPasswordReset $userPasswordReset
     */
    public function __construct(UserPasswordReset $userPasswordReset)
    {
        $this->model = $userPasswordReset;
    }

    /**
     * Find by email
     *
     * @param  string $email
     * @return object
     */
    public function getValidToken($id, $token)
    {
        $validTime = Carbon::now()->subMinutes(config('common.user.password.reset_expire'));
        return $this->model
            ->where('id', $id)
                ->where('token', $token)
                    ->where('created_at', '>=', $validTime)
                        ->orderBy('id', 'desc')
                            ->first();
    }

    /**
     * Delete all generated token by user_id
     *
     * @param  int $email
     * @return int
     */
    public function deleteByUserId($userId)
    {
        return $this->model
            ->where('user_id', $userId)
                ->delete();
    }
}