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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->string('name', 255); // Tên sản phẩm
            $table->text('description')->nullable(); // Mô tả
            $table->decimal('price', 10, 2); // Giá
            $table->integer('stock'); // Số lượng tồn kho
            $table->unsignedBigInteger('category_id'); // Danh mục
            $table->string('image_url')->nullable(); // URL hình ảnh
            $table->timestamps();
        
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnDelete(); // Liên kết danh mục
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
