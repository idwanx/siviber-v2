<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

        Gate::define('isAdmin', function (User $user) {
            $user_role = $user->roleuser()->where('roles.slug', 'admin')->count();
            return $user_role > 0;
        });

        Gate::define('isAdminVerifikator', function (User $user) {
            $user_role = $user->roleuser()->whereIn('roles.slug', ['admin', 'verifikator'])->count();
            return $user_role > 0;
        });

        Gate::define('isCurrentUser', function (User $user, $variable) {
            return $user->id === $variable->user_id;
        });

        Gate::define('canAksesBerkas', function (User $user, $variable) {
            $user_role = $user->roleuser()->get();

            if ($user_role->value('instansi_id') === null) {
                return true;
            } else {
                return $user_role->value('instansi_id') === $variable->instansi_id;
            }
        });

        Gate::define('isBendahara', function (User $user) {
            $user_role = $user->roleuser()->where('roles.slug', 'bendahara')->count();
            return $user_role > 0;
        });
    }
}
