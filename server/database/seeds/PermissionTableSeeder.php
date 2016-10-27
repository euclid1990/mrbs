<?php

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class PermissionTableSeeder extends Seeder
{

    public function run()
    {
        $resources = config('role.resource');
        $actions = config('role.action');
        foreach ($resources as $resource) {
            foreach ($actions as $action) {
                factory(App\Models\Permission::class)->create([
                    'resource' => $resource,
                    'action' => $action,
                ]);
            }
        }
    }

}