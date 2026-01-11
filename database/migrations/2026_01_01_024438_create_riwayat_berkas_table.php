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
        Schema::create('riwayat_berkas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('berka_id')->index()->constrained('berkas')->onDelete('cascade');
            $table->foreignId('status_berka_id')->index()->constrained('status_berkas')->onDelete('restrict');
            $table->foreignId('user_id')->index()->constrained('users')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_berkas');
    }
};
