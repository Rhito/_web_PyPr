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
        Schema::create('shipping', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->unsignedBigInteger('order_id'); // Đơn hàng
            $table->text('shipping_address'); // Địa chỉ giao hàng
            $table->enum('shipping_status', ['pending', 'shipped', 'delivered'])->default('pending'); // Trạng thái
            $table->timestamp('shipping_date')->nullable(); // Ngày giao hàng
            $table->timestamps();
        
            $table->foreign('order_id')->references('id')->on('orders')->cascadeOnDelete(); // Liên kết đơn hàng
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping');
    }
};
