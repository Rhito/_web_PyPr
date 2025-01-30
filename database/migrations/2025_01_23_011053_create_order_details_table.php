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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->unsignedBigInteger('order_id'); // Đơn hàng
            $table->unsignedBigInteger('product_id'); // Sản phẩm
            $table->integer('quantity'); // Số lượng
            $table->decimal('unit_price', 10, 2); // Giá sản phẩm
            $table->timestamps();
        
            $table->foreign('order_id')->references('id')->on('orders')->cascadeOnDelete(); // Liên kết đơn hàng
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete(); // Liên kết sản phẩm
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
