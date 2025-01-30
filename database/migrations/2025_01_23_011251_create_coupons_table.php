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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->string('code', 50)->unique(); // Mã giảm giá
            $table->decimal('discount', 5, 2); // Phần trăm giảm giá
            $table->date('expiration_date'); // Ngày hết hạn
            $table->integer('usage_limit')->default(1); // Số lần sử dụng
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
