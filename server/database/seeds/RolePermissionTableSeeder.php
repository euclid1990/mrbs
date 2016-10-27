<?php

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class RolePermissionTableSeeder extends Seeder
{

    public function run()
    {
        $roles = Role::all();

        $permissions = Permission::all();

        foreach ($roles as $role) {
            foreach ($permissions as $permission) {
                factory(App\Models\RolePermission::class)->create([
                    'role_id' => $role->id,
                    'permission_id' => $permission->id,
                ]);
            }
        }
    }

}