<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'namespace' => 'Frontend',
], function() {
    Route::get('/', ['as' => 'dashboard', 'uses' => 'DashboardController@getIndex']);
    Route::get('generate_uri', ['uses' => 'DashboardController@getGenerateUri']);

    /* Routing for user */
    Route::resource('user', 'UserController');
    Route::post('user/login', ['as' => 'user.login', 'uses' => 'UserController@login']);
    Route::get('user/logout', ['as' => 'user.logout', 'uses' => 'UserController@logout']);
    Route::post('user/password', ['as' => 'user.password', 'uses' => 'UserController@password']);

    /* Routing for validation */
    Route::group([
        'prefix' => 'validate',
        'as' => 'validate.',
    ], function () {
        Route::post('unique_email', ['as' => 'unique_email', 'uses' => 'ValidateController@uniqueEmail']);
    });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
