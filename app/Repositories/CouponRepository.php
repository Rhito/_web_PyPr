<?php

namespace App\Repositories;

use App\Models\Coupon;

class CouponRepository
{
    public function getAllCoupons($search = null)
    {
        $query = Coupon::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('discount', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('id', 'desc')->paginate(10)->withQueryString();
    }

    public function createCoupon(array $data)
    {
        return Coupon::create($data);
    }

    public function getCouponById($id)
    {
        return Coupon::findOrFail($id);
    }

    public function updateCoupon($id, array $data)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->update($data);
        return $coupon;
    }

    public function deleteCoupon($id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();
    }
}
