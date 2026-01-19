<?php

use App\Http\Controllers\Berkas\BerkasController;
use App\Http\Controllers\Berkas\CatatansController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataPendukung\DataPendukungController;
use App\Http\Controllers\DataPendukung\FetchDataController;
use App\Http\Controllers\DataPendukung\InstansiController;
use App\Http\Controllers\DataPendukung\JenisBelanjaController;
use App\Http\Controllers\DataPendukung\JenisBerkasController;
use App\Http\Controllers\DataPendukung\PenerimaController;
use App\Http\Controllers\DataPendukung\RincianBelanjaController;
use App\Http\Controllers\DataPendukung\SumberDanaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard/{tahun?}', DashboardController::class)->name('dashboard');
    Route::get('berkas/{tahun?}/{statusberkas}', [BerkasController::class, 'index'])->name('berkas.main');
    Route::post('add-riwayat/{berka}', [BerkasController::class, 'addRiwayat'])->name('berkas.addriwayat');
    Route::get('get-verifikator/{berka}', [BerkasController::class, 'getVerifikator'])->name('berkas.getverifikator');
    Route::get('get-history/{berka}', [BerkasController::class, 'getHistory'])->name('berkas.gethistory');
    Route::post('store-berkas', [BerkasController::class, 'storeBerkas'])->name('berkas.store');
    Route::put('update-berkas/{berka}', [BerkasController::class, 'updateBerkas'])->name('berkas.update');
    Route::delete('destroy-berkas/{berka}', [BerkasController::class, 'destroyBerkas'])->name('berkas.destroy');
    Route::get('edit-berkas/{berka}', [BerkasController::class, 'editBerkas'])->name('berkas.edit');
    Route::get('find-berkas/{berka}', [BerkasController::class, 'findBerkas'])->name('berkas.find');
    Route::get('detail-berkas/{berka}', [BerkasController::class, 'detailBerkas'])->name('berkas.detail');
    Route::get('fetch/data-pendukung-regis', [FetchDataController::class, 'getDataPendkungRegis'])->name('fetch.datapendukungregis');
    // Catatan berkas
    Route::get('catatan/{berka}', [CatatansController::class, 'index'])->name('catatan.index');
    Route::post('catatan/store', [CatatansController::class, 'store'])->name('catatan.store');
    Route::put('catatan/update/{catatan_berka}', [CatatansController::class, 'update'])->name('catatan.update');
    Route::post('catatan/update-checked', [CatatansController::class, 'updateChecked'])->name('catatan.updateChecked');
    Route::delete('catatan/destroy/{catatan_berka}', [CatatansController::class, 'destroy'])->name('catatan.destory');
    // For user verified
    Route::get('data-pendukung', DataPendukungController::class)->name('datapendukung');
    Route::resource('data-pendukung/penerima', PenerimaController::class)->except(['create', 'show', 'edit']);
    Route::get('fetch/jenis-belanja', [FetchDataController::class, 'getJenisBelanja'])->name('fetch.jenisbelanja');
});



Route::middleware(['auth', 'verified', 'can:isAdmin'])->group(function () {
    // Data Pendukung
    Route::resource('data-pendukung/instansi', InstansiController::class)->except(['create', 'show', 'edit']);
    Route::resource('data-pendukung/jenis-berkas', JenisBerkasController::class)->except(['create', 'show', 'edit']);
    Route::resource('data-pendukung/jenis-belanja', JenisBelanjaController::class)->except(['create', 'show', 'edit']);
    Route::resource('data-pendukung/rincian-belanja', RincianBelanjaController::class)->except(['create', 'show', 'edit']);
    Route::resource('data-pendukung/sumber-dana', SumberDanaController::class)->except(['create', 'show', 'edit']);
    
});

require __DIR__.'/settings.php';
