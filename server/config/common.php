<?php

return [
    'layouts' => [
        'frontend' => [
            'default' => 'frontend.layouts.default',
            'email' => 'email.frontend.layouts.default',
        ],
        'backend' => [
            'default' => 'backend.layouts.default',
        ],
    ],
    'route' => [
        'prefix' => [
            'frontend' => '/api/',
            'backend' => '/api/',
        ],
        'group' => [
            'frontend' => 'App\Http\Controllers\Frontend',
            'backend' => 'App\Http\Controllers\Backend',
        ],
        'filename' => [
            'frontend' => '../client/src/app/config/api.json',
        ],
    ],
    'cache' => [
        'expiration_time' => 120,
    ],
    'user' => [
        'status' => [
            'inactive' => 'I',
            'active' => 'A',
            'banned' => 'B',
        ],
        'name' => [
            'max' => 50,
        ],
        'username' => [
            'min' => 3,
            'max' => 30,
            'parttern' => '/^[a-z0-9][a-z0-9_\.]+$/i',
        ],
        'email' => [
            'max' => 60,
        ],
        'password' => [
            'min' => 6,
            'max' => 30,
            'reset_expire' => 1440,
        ],
        'phone' => [
            'pattern' => '/[0-9]{9,15}/',
        ],
        'gender' => [
            'female' => 'F',
            'male' => 'M',
            'unknown' => 'U',
        ],
    ],
];
