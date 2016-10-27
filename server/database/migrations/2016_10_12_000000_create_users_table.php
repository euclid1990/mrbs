<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
            $table->string('username', 30)->unique()->nullable();
            $table->string('avatar', 255)->nullable();
            $table->string('email')->unique();
            $table->string('password', 60)->nullable();
            $table->date('birthday')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('gender', 1)->default(config('common.user.gender.unknown'));
            $table->string('status', 2)->default(config('common.user.status.inactive'));
            $table->text('about')->nullable();
            $table->string('active_token')->nullable()->index();
            $table->rememberToken();
            $table->text('auth_token')->nullable();
            $table->dateTime('password_changed_at')->nullable();
            $table->dateTime('logged_in_at')->nullable();
            $table->dateTime('logged_out_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
