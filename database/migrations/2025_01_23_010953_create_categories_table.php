<?php

use App\Models\Category;
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
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Khóa chính
            $table->string('name', 255); // Tên danh mục
            $table->text('description')->nullable(); // Mô tả
            $table->unsignedBigInteger('parent_id')->nullable(); // Danh mục cha
            $table->timestamps();
        
            $table->foreign('parent_id')->references('id')->on('categories')->nullOnDelete(); // Liên kết danh mục cha
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
