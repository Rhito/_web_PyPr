<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra nếu người dùng đã đăng nhập
        if (Auth::check()) {
            // Kiểm tra vai trò người dùng
            if (Auth::user()->role === 'admin') {
                return $next($request); // Cho phép truy cập
            }

            // Nếu không phải admin, chuyển hướng về home
            return redirect()->route('home');
        }

        // Nếu chưa đăng nhập, chuyển hướng về trang login
        return redirect()->route('login');
    }
}
