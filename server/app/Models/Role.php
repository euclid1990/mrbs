<?php

namespace App\Models;

class Role extends BaseModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'roles';

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtolower($value);
    }

    public function getNameAttribute()
    {
        return ucfirst($this->attributes['name']);
    }
}