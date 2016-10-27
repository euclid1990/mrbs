<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'active_token', 'remember_token', 'auth_token', 'password_changed_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'username', 'email', 'password', 'phone', 'active_token', 'auth_token', 'avatar'];

    /**
     * Set the user's password.
     *
     * @param  string  $value
     * @return string
     */
    public function setPasswordAttribute($value)
    {
        if (empty($value)) {
            // Check for empty string, null values
            $this->attributes['password'] = null;
        } else {
            $this->attributes['password'] = bcrypt($value);
        }
    }

    /**
     * Set the user's username.
     *
     * @param  string  $value
     * @return string
     */
    public function setUsernameAttribute($value)
    {
        if (empty($value)) {
            // Check for empty string, null values
            $this->attributes['username'] = null;
        } else {
            $this->attributes['username'] = $value;
        }
    }

    public function userOauth()
    {
        return $this->hasOne(App\Models\UserOauth::class);
    }

    public function userRole()
    {
        return $this->hasOne(App\Models\UserRole::class);
    }

    public function role()
    {
        return $this->belongsToMany(App\Models\Role::class, 'user_roles', 'user_id', 'role_id');
    }
}
