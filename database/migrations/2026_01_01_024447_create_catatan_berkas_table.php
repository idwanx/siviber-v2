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
        Schema::create('catatan_berkas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('berka_id')->index()->constrained('berkas')->onDelete('cascade');
            $table->text('catatan');
            $table->boolean('is_okey')->default(false);
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_berkas');
    }
};
