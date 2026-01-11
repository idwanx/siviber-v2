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
        Schema::create('file_berkas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rincian_berka_id')->index()->constrained('rincian_berkas')->onDelete('cascade');
            $table->text('keterangan');
            $table->text('files');
            $table->string('nameoriginalfiles');
            $table->string('extentionfiles');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_berkas');
    }
};
