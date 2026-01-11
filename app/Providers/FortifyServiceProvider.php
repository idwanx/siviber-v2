<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Models\Instansi;
use App\Models\Role;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Contracts\RegisterResponse;
use Illuminate\Support\Facades\Hash;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->instance(RegisterResponse::class, new class implements RegisterResponse {
            
            public function toResponse($request)
            {
                if ($request->hasSession()) {
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                }

                return redirect('/login')->with('status', 'Akun anda berhasil dibuat. Silakan verifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirimkan ke email Anda, lalu hubungi admin untuk mengaktifkan akun anda.');
            }
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
        $this->loginActions();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        // Fortify::registerView(fn () => Inertia::render('auth/register'));
        Fortify::registerView(fn () => Inertia::render('auth/register', [
            'instansis' => Instansi::select('id', 'nama_instansi', 'slug')->orderBy('id', 'asc')->get(),
            'perans' => Role::select('id', 'nama_role', 'slug')->whereNotIn('id', [1,3,6])->orderBy('id', 'asc')->get()
        ]));

        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }

    private function loginActions(): void
    {
        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where([
                ['email', '=', $request->email],
                ['active_at', '<>', null],
            ])->first();
    
            if ($user &&
                Hash::check($request->password, $user->password)) {
                return $user;
            }
        });
    }
}
