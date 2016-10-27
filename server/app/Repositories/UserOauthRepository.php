<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\UserOauth;

class UserOauthRepository extends BaseRepository {

    /**
     * Create a new UserOauthRepository instance.
     *
     * @param  \App\Models\UserOauth $userOauth
     */
    public function __construct(UserOauth $userOauth)
    {
        $this->model = $userOauth;
    }

    /**
     * Find existing user social authenticated account
     *
     * @param  string $type
     * @param  string $key
     * @return object
     */
    public function findExisting($type, $key, $columns = ['*'])
    {
        return $this->model
            ->where('type', $type)
                ->where('key', $key)
                    ->whereNull('connect_token')
                        ->first($columns);
    }

    /**
     * Get valid user oauth account by id and connect_token
     *
     * @param  int    $id
     * @param  string $connectToken
     * @return object
     */
    public function getConnectToken($id, $connectToken)
    {
        $validTime = Carbon::now()->subMinutes(config('common.oauth.connect_expire'));
        return $this->model
            ->where('id', $id)
                ->where('connect_token', $connectToken)
                    ->where('updated_at', '>=', $validTime)
                        ->orderBy('id', 'desc')
                            ->first();
    }

}