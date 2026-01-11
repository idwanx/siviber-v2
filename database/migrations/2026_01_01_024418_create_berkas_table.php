<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('berkas', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->index()->unique();
            $table->foreignId('instansi_id')->index()->constrained('instansis')->onDelete('restrict');
            $table->foreignId('jenis_berka_id')->index()->constrained('jenis_berkas')->onDelete('restrict');
            $table->foreignId('sumber_dana_id')->index()->constrained('sumber_danas')->onDelete('restrict');
            $table->foreignId('penerima_id')->index()->constrained('penerimas')->onDelete('restrict');
            $table->foreignId('status_berka_id')->index()->constrained('status_berkas')->onDelete('restrict');
            $table->string('no_spm');
            $table->date('tgl_spm');
            $table->double('nilai_spm');
            $table->string('kegiatan')->index();
            $table->enum('status', ['true', 'false'])->default('true');
            $table->text('keterangan')->nullable();
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berkas');
    }
};
