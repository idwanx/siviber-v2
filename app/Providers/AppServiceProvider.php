<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Model;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verifikasi Email')
                ->line('Klik tombol di bawah ini untuk memverifikasi alamat email Anda.')
                ->action('Verifikasi Email', $url);
        });

        Model::preventLazyLoading(!app()->isProduction());
        JsonResource::withoutWrapping();
    }
}
