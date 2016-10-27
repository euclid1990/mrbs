<?php

namespace App\Events;

use App\Models\User;
use App\Events\Event;
use Illuminate\Queue\SerializesModels;

class UserRegistered extends Event
{
    use SerializesModels;

    public $user;

    /**
     * Create a new event instance.
     *
     * @param  User $user
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}