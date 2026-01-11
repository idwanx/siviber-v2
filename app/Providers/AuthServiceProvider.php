<?php

namespace App\Providers;

use App\Models\User;
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
    }
}
