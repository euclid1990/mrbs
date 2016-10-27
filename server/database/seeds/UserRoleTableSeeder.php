<?php

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserRoleTableSeeder extends Seeder
{

    public function run()
    {
        $users = User::all();
        $member = Role::where('name', config('role.name.member'))->first();
        foreach ($users as $user) {
            factory(App\Models\UserRole::class)->create([
                'user_id' => $user->id,
                'role_id' => $member->id,
            ]);
        }
    }

}