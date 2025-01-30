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
        Schema::create('payments', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->unsignedBigInteger('order_id'); // Đơn hàng
            $table->enum('payment_method', ['credit_card', 'paypal', 'bank_transfer'])->default('credit_card'); // Phương thức
            $table->enum('payment_status', ['success', 'failed', 'pending'])->default('pending'); // Trạng thái
            $table->timestamp('payment_date')->nullable(); // Ngày thanh toán
            $table->timestamps();
        
            $table->foreign('order_id')->references('id')->on('orders')->cascadeOnDelete(); // Liên kết đơn hàng
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
