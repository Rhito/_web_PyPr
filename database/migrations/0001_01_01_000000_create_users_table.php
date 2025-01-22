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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary key, auto-incrementing BIGINT
            $table->string('name', 255); // User's full name
            $table->string('email')->unique(); // Email, must be unique
            $table->string('password'); // Hashed password
            $table->string('phone', 15)->nullable(); // Optional phone number
            $table->text('address')->nullable(); // Optional address
            $table->string('avatar', 255)->nullable(); // Profile image URL
            $table->enum('role', ['customer', 'admin'])->default('customer'); // User roles
            $table->timestamp('email_verified_at')->nullable(); // Email verification timestamp
            $table->rememberToken(); // Token for "remember me" functionality
            $table->timestamps(); // Created_at and Updated_at timestamps
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
