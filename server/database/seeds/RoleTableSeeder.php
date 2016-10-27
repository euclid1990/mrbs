<?php

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class RoleTableSeeder extends Seeder
{

    public function run()
    {
        $roleNames = config('role.name');
        foreach ($roleNames as $name) {
            factory(App\Models\Role::class)->create([
                'name' => $name,
            ]);
        }
    }

}