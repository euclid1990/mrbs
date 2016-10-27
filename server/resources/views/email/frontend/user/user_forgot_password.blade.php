@extends($layout)

@section('content')

<h1 style="font-size:20px;color:rgb(40,40,40)">{{ trans('frontend/user/messages.forgot_password_email_greeting', ['name' => $user->name]) }}</h1>
<div>
    {{ trans('frontend/user/messages.forgot_password_email_body') }}<br>
    <strong>
        <a href="{{ $reset_url }}" target="_blank">{{ trans('frontend/user/messages.forgot_password_email_reset_url') }}</a>
    </strong>
    <br>
    <i>{{ trans('frontend/user/messages.forgot_password_email_note', ['time' => config('common.user.password.reset_expire')/60]) }}</i>
</div>

@endsection