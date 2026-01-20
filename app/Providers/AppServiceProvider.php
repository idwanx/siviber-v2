<?php

namespace App\Providers;

use App\Models\Berka;
use App\Models\Instansi;
use App\Models\JenisBerka;
use App\Models\SumberDana;
use App\Observers\BerkaObserver;
use App\Observers\InstansiObserver;
use App\Observers\JenisBerkaObserver;
use App\Observers\SumberDanaObserver;
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
        Instansi::observe(InstansiObserver::class);
        JenisBerka::observe(JenisBerkaObserver::class);
        SumberDana::observe(SumberDanaObserver::class);
        Berka::observe(BerkaObserver::class);

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
