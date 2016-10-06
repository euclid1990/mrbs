<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $title or trans('common.title') }}{{ isset($no_subtitle) ? '' : ' | ' . (isset($subtitle) ? $subtitle : trans('common.subtitle')) }}</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="_token" content="{{ csrf_token() }}">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">

    <!-- CSS Stylesheet -->
    @include('backend.layouts.elements.styles')
    @yield('styles')
</head>

<body>
    <div class="wrapper">
        <!-- Main content -->
        @yield('content')
    </div>
    <!-- JavaScript -->
    @include('backend.layouts.elements.scripts')
    @yield('scripts')
</body>
</html>
