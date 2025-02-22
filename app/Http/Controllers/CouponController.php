<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use App\Repositories\CouponRepository;
use App\Models\Log;
use App\Repositories\LogRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CouponController extends Controller
{
    protected $couponRepository;
    protected $logRepository;

    public function __construct(CouponRepository $couponRepository,LogRepository $logRepository)
    {
        $this->couponRepository = $couponRepository;
        $this->logRepository = $logRepository;
        
    }

    public function index(Request $request)
    {
        $coupons = $this->couponRepository->getAllCoupons($request->search);

        return Inertia::render('AdminView/Coupons/index', [
            'coupons' => $coupons,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('AdminView/Coupons/create');
    }

    public function store(CouponRequest $request)
    {
        $coupon = $this->couponRepository->createCoupon($request->validated());
        $this->logRepository->createLog("Created Coupon Id: ". $coupon->id, $coupon->id);

        return redirect()->route('coupon.index')->with('success', 'Coupon created successfully');
    }

    public function show($id)
    {
        $coupon = $this->couponRepository->getCouponById($id);

        return Inertia::render('AdminView/Coupons/show', [
            'coupon' => $coupon,
        ]);
    }

    public function edit($id)
    {
        $coupon = $this->couponRepository->getCouponById($id);

        return Inertia::render('AdminView/Coupons/edit', [
            'coupon' => $coupon,
        ]);
    }

    public function update(CouponRequest $request, $id)
    {
        $this->couponRepository->updateCoupon($id, $request->validated());
        $this->logRepository->createLog("Updated Coupon - Id: ". $request->id  , $request->id);
        return redirect()->route('coupon.index')->with('success', 'Coupon updated successfully');
    }

    public function destroy($id)
    {
        $this->couponRepository->deleteCoupon($id);

        $this->logRepository->createLog("Deleted Coupon - Id: " . $id, $id);

        return redirect()->route('coupon.index')->with('success', 'Coupon deleted successfully');
    }
}
