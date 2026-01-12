<?php

namespace App\Http\Controllers\DataPendukung;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DataPendukungController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public $roleuser;

    public function __construct()
    {
        $this->roleuser = Auth::user()->roleuser()->firstOrFail();
    }

    public function __invoke(Request $request)
    {
        if ($this->roleuser->slug === "admin") {
            return redirect()->route('instansi.index');
        } else {
            return redirect()->route('penerima.index');
        }
    }
}
