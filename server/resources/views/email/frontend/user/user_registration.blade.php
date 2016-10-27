@extends($layout)

@section('content')

<h1 style="font-size:20px;color:rgb(40,40,40)">{{ trans('frontend/user/messages.registration_email_greeting') }}</h1>
<div>
    {{ trans('frontend/user/messages.registration_email_body') }}<br>
    <strong>
        <a href="{{ $confirm_url }}" target="_blank">{{ trans('frontend/user/messages.registration_email_confirm_url') }}</a>
    </strong>
</div>

@endsection