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
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->unsignedBigInteger('user_id'); // Người dùng
            $table->decimal('total_amount', 10, 2); // Tổng tiền
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending'); // Trạng thái
            $table->timestamps();
        
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete(); // Liên kết người dùng
        });        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
