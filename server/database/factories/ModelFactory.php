<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'username' => $faker->userName,
        'email' => $faker->email,
        'about' => $faker->sentence,
        'birthday' => $faker->dateTimeThisCentury,
        'password' => str_random(10),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Models\Role::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
    ];
});

$factory->define(App\Models\UserRole::class, function (Faker\Generator $faker) {
    return [
        'user_id' => $faker->randomDigit,
        'role_id' => $faker->randomDigit,
    ];
});

$factory->define(App\Models\Permission::class, function (Faker\Generator $faker) {
    return [
        'resource' => $faker->word,
        'action' => $faker->word,
    ];
});

$factory->define(App\Models\RolePermission::class, function (Faker\Generator $faker) {
    return [
        'role_id' => $faker->randomDigit,
        'permission_id' => $faker->randomDigit,
    ];
});