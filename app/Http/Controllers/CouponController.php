<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Coupon::query();
        if (request()->has('search') && request()->search !== '') {
            $search = request()->search;
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', '%' . $search . '%')
                    ->orWhere('discount', 'like', '%' . $search . '%')
                    ->orWhere('id', 'like', '%' . $search . '%')
                    ->orWhere('code', 'like', '%' . $search . '%');
            });
        }
        $coupons = $query->orderBy('id', 'desc')->paginate(10);
        return Inertia::render('AdminView/Coupons/index', [
            'coupons' => $coupons,
            'filters' => request()->only(['search']), // Preserve filter value
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AdminView/Coupons/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CouponRequest $request)
    {
        $coupon = new Coupon();
        $coupon->code = $request->code;
        $coupon->expiration_date = $request->expiration_date;
        $coupon->usage_limit = $request->usage_limit;
        $coupon->discount = $request->discount;
        $coupon->save();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Created a coupon';
        $log->save();

        return redirect()->route('coupon.index')->with('success', 'Coupon created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $coupon = Coupon::findOrFail($id);
        return Inertia::render('AdminView/Coupons/show', [
            'coupon' => $coupon,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $coupon = Coupon::findOrFail($id);
        return Inertia::render('AdminView/Coupons/edit', [
            'coupon' => $coupon,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->code = $request->code;
        $coupon->expiration_date = $request->expiration_date;
        $coupon->usage_limit = $request->usage_limit;
        $coupon->discount = $request->discount;
        $coupon->update();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Updated a coupon with id ' . $id;
        $log->save();

        return redirect()->route('coupon.index')->with('success', 'Coupon updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Deleted a coupon with id ' . $id;
        $log->save();

        return redirect()->route('coupon.index')->with('success', 'Coupon deleted successfully');
    }
}
