<?php

use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/home', function (){
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware('check_role')->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('AdminView/Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::prefix('products')->controller(ProductController::class)->group(function(){
        Route::get('', 'index')->name('product');
        Route::get('create',  'create')->name('product.create');
        Route::post('create', 'store');
    });
 
    Route::prefix('category')->controller(CategoryController::class)->group(function(){
        Route::get('', [CategoryController::class, 'index'])->name('category');
        Route::get('create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('create', [CategoryController::class, 'store']);
    });
   
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
