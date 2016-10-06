@extends($layout)

@section('styles')

@endsection

@section('content')

<div>
    <h1>Backend Content</h1>
    <p>
        <a href="{{ route('dashboard') }}">Go to Frontend</a>
    </p>
    <p>
        <a href="{{ route('backend.user.index') }}">Go to Backend's Resource</a>
    </p>
</div>

@endsection

@section('scripts')

@endsection