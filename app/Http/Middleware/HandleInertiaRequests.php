<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userRole = $request->user() ? $request->user()->load('roleuser') : null;

        $tahun = $request->tahun === null ? now()->year : (int)$request->tahun;

        if ($userRole) {
            if ($userRole->roleuser->instansi_id === null) {
                $cacheKey = 'total_'.$tahun;

                Cache::remember($cacheKey, 1440, function () use ($tahun) {
                    return DB::table('berkas')
                        ->selectRaw("count(case when status_berka_id = 1 then 1 end) as registrasi")
                        ->selectRaw("count(case when status_berka_id = 2 then 1 end) as verifikasi")
                        ->selectRaw("count(case when status_berka_id = 3 then 1 end) as penolakan")
                        ->selectRaw("count(case when status_berka_id = 4 then 1 end) as sp2d")
                        ->whereYear('berkas.tgl_spm', $tahun)
                        ->first();
                });

            } else {
                $cacheKey = 'total_'.$userRole->roleuser->instansi_id.'_'.$tahun;

                Cache::remember($cacheKey, 1440, function () use ($userRole, $tahun) {
                    return DB::table('berkas')
                        ->selectRaw("count(case when status_berka_id = 1 then 1 end) as registrasi")
                        ->selectRaw("count(case when status_berka_id = 2 then 1 end) as verifikasi")
                        ->selectRaw("count(case when status_berka_id = 3 then 1 end) as penolakan")
                        ->selectRaw("count(case when status_berka_id = 4 then 1 end) as sp2d")
                        ->whereYear('berkas.tgl_spm', $tahun)
                        ->where('instansi_id', $userRole->roleuser->instansi_id)
                        ->first();
                });
            }

            $cacheTotal = $userRole->roleuser->instansi_id === null ? Cache::get('total_'.$tahun) : Cache::get('total_'.$userRole->roleuser->instansi_id.'_'.$tahun);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $userRole ? new UserResource($userRole) : null,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'type' => fn () => $request->session()->get('type'),
                'message' => fn () => $request->session()->get('message')
            ],
            'newdata' => [
                'datas' => fn () => $request->session()->get('datas'),
            ],
            'tahun' => $tahun,
            'totals' => $userRole ? $cacheTotal : null,
        ];
    }
}
