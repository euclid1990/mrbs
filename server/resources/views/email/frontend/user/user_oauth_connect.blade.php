@extends($layout)

@section('content')

<h1 style="font-size:20px;color:rgb(40,40,40)">{{ trans('frontend/user/messages.oauth_connect_email_greeting', ['name' => $user->name]) }}</h1>
<div>
    {!! trans('frontend/user/messages.oauth_connect_email_body', ['email' => $user->email, 'sns' => ucfirst($type)]) !!}<br>
    <strong>
        <a href="{{ $connect_url }}" target="_blank">{{ trans('frontend/user/messages.oauth_connect_email_connect_url') }}</a>
    </strong>
    <br>
    <i>{{ trans('frontend/user/messages.oauth_connect_email_note', ['time' => config('common.oauth.connect_expire')/60]) }}</i>
</div>

@endsection