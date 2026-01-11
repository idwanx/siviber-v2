<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Auth;

Broadcast::channel('instansi.{instansi}', function ($instansi) {
    return Auth::check();
});

Broadcast::channel('admin-verifikator', function () {
    return Auth::check();
});
