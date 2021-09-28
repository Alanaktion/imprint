<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>

    <link rel="icon" href="/img/logo/16px.png" type="image/png" sizes="16x16">
    <link rel="icon" href="/img/logo/32px.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/img/logo/32px.svg" type="image/svg+xml">
    <link rel="icon" href="/img/logo/256px.svg" type="image/svg+xml" sizes="128x128">

    <link href="https://rsms.me/inter/inter.css" rel="stylesheet">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body class="antialiased">
    <noscript>
        <strong>{{ config('app.name') }} doesn't work properly without JavaScript enabled, as it needs to encrypt content locally in your browser. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
</body>
