<?php

namespace App\Listeners;

use Mail;

class UserEventListener
{
    /**
     * Handle user register events.
     */
    public function onUserRegister($event) {
        $user = $event->user;
        $data = [
            'user' => $user,
            'confirm_url' => config('app.url') . "/confirm/{$user->id}/{$user->active_token}",
            'layout' => config('common.layouts.frontend.email'),
        ];
        Mail::send('email.frontend.user.user_registration', $data, function ($m) use ($user) {
            $m->from(config('mail.from.address'), config('mail.from.name'));
            $m->to($user->email, $user->name)
                ->subject(trans('frontend/user/messages.registration_email_title'));
        });
    }

    /**
     * Handle user login events.
     */
    public function onUserLogin($event) {
        $user = $event->user;
        $user->logged_in_at = $user->freshTimestamp();
        $user->save();
    }

    /**
     * Handle user logout events.
     */
    public function onUserLogout($event) {
        $user = $event->user;
        $user->logged_out_at = $user->freshTimestamp();
        $user->save();
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            'App\Events\UserRegistered',
            'App\Listeners\UserEventListener@onUserRegister'
        );

        $events->listen(
            'Illuminate\Auth\Events\Login',
            'App\Listeners\UserEventListener@onUserLogin'
        );

        $events->listen(
            'Illuminate\Auth\Events\Logout',
            'App\Listeners\UserEventListener@onUserLogout'
        );
    }
}