<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Chạy các seeder.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create(); // Tạo 10 người dùng mẫu
    }
}
