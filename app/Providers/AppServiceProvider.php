<?php

namespace App\Providers;

use App\Repositories\CategoryRepository;
use App\Repositories\CouponRepository;
use App\Repositories\LogRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CategoryRepository::class, function ($app) {
            return new CategoryRepository();
        });
    
        $this->app->bind(LogRepository::class, function ($app) {
            return new LogRepository();
        });

        $this->app->bind(CouponRepository::class, function ($app) {
            return new CouponRepository();
        });

        $this->app->bind(OrderRepository::class, function ($app) {
            return new OrderRepository();
        });

        $this->app->bind(UserRepository::class, function ($app) {
            return new UserRepository();
        });

        $this->app->bind(ProductRepository::class, function ($app) {
            return new ProductRepository();
        });

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
