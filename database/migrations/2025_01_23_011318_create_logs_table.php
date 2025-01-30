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
        Schema::create('logs', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->unsignedBigInteger('user_id'); // Người thao tác
            $table->string('action'); // Hành động
            $table->timestamp('timestamp'); // Thời gian
            $table->timestamps();
        
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete(); // Liên kết người dùng
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
