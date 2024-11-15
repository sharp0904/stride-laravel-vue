<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf_token" content="{{ csrf_token() }}"/>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700&display=swap" rel="stylesheet">

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <!-- Scripts -->
    @routes
    <script src="{{ mix('/js/app.js') }}" defer></script>
    <script src="https://js.stripe.com/v3/"></script>
    @inertiaHead
  </head>
  <body class="font-sans antialiased bg-gray-50">
    @inertia
  </body>
</html>
