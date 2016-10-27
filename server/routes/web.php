<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::group([
    'namespace' => 'Backend',
    'prefix'=>'admin',
    'as' => 'backend.',
    'middleware' => ['web', /* 'auth' */]
], function () {
    Route::get('/', ['as' => 'dashboard', 'uses' => 'DashboardController@getIndex']);
    Route::resource('user', 'UserController');
});
