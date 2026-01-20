<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        if($request->hasFile('foto')) {
            $fotoBefore = $request->user()->foto;
            $manager = new ImageManager(Driver::class);
            $imgname = hexdec(uniqid()).'.'.$request->file('foto')->getClientOriginalExtension();
            $image = $manager->read($request->file('foto'));
            $imageSmall = $image->scaleDown(height: 100);
            $imageSmall->toJpeg()->save(base_path('public/storage/foto/small/'.$imgname));
            $imageThumbnail = $image->scaleDown(height: 500);
            $imageThumbnail->save(base_path('public/storage/foto/thumbnail/'.$imgname));

            $request->user()->fill([
                'name' => $request->name,
                'email' => $request->email,
                'no_hp' => $request->no_hp,
                'nip' => $request->nip,
                'foto' => $imgname
            ]);

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();

            $filefotosmall = storage_path("app/public/foto/small/{$fotoBefore}");

            if (file_exists($filefotosmall)) {
                Storage::delete('foto/small/'.$fotoBefore);
            }

            $filefotothumbnail = storage_path("app/public/foto/thumbnail/{$fotoBefore}");
            
            if (file_exists($filefotothumbnail)) {
                Storage::delete('foto/thumbnail/'.$fotoBefore);
            }

        } else {
            $request->user()->fill([
                'name' => $request->name,
                'email' => $request->email,
                'no_hp' => $request->no_hp,
                'nip' => $request->nip,
            ]);

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();
        }

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
