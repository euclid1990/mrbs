<?php

namespace App\Models;

class Permission extends BaseModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'permissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['resource', 'action'];

    public function setResourceAttribute($value)
    {
        $this->attributes['resource'] = strtolower($value);
    }

    public function getResourceAttribute()
    {
        return ucfirst($this->attributes['resource']);
    }

    public function setActionAttribute($value)
    {
        $this->attributes['action'] = strtolower($value);
    }

    public function getActionAttribute()
    {
        return ucfirst($this->attributes['action']);
    }
}