@extends($layout)

@section('styles')

@endsection

@section('content')

<div>
    <h1>Frontend Content</h1>
    <p>
        <a href="{{ route('backend.dashboard') }}">Go to Backend</a>
    </p>
    <p>
        <a href="{{ route('user.index') }}">Go to Frontend's Resource</a>
    </p>
</div>

@endsection

@section('scripts')

@endsection