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
        Schema::create('rincian_berkas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('berka_id')->index()->constrained('berkas')->onDelete('cascade');
            $table->foreignId('sumber_dana_id')->index()->constrained('sumber_danas')->onDelete('restrict');
            $table->foreignId('rincian_belanja_id')->index()->constrained('rincian_belanjas')->onDelete('restrict');
            $table->string('uraian')->index();
            $table->double('nilai');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rincian_berkas');
    }
};
