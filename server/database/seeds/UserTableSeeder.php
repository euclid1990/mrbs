<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserTableSeeder extends Seeder {

    public function run()
    {
        factory(App\Models\User::class)->create([
            'username' => 'dummy1',
            'password' => '123456',
            'email' => 'dummy1@example.com'
        ]);
        factory(App\Models\User::class)->create([
            'username' => 'dummy2',
            'password' => '123456',
            'email' => 'dummy2@example.com'
        ]);
    }
}