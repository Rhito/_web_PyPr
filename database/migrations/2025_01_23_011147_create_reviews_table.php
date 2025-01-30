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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->unsignedBigInteger('user_id'); // Người dùng
            $table->unsignedBigInteger('product_id'); // Sản phẩm
            $table->integer('rating')->default(5); // Số sao
            $table->text('comment')->nullable(); // Nhận xét
            $table->timestamps();
        
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete(); // Liên kết người dùng
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete(); // Liên kết sản phẩm
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
