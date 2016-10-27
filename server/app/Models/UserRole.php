<?php

namespace App\Models;

class UserRole extends BaseModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user_roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'role_id'];

    public function role()
    {
        return $this->belongsTo(App\Models\Role::class);
    }
}