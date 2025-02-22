<?php

namespace App\Repositories;

use App\Models\Coupon;
use App\Models\Log;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;


class OrderDetailRepository
{
    public function getAll($search = null)
    {
        $query = OrderDetail::with('product', 'order');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('order_id', 'like', "%$search%")
                    ->orWhere('id', 'like', "%$search%")
                    ->orWhere('product_id', 'like', "%$search%");
            });
        }

        return $query->orderBy('id', 'desc')->paginate(10);
    }

    public function findById($id)
    {
        return OrderDetail::with('product', 'order')->findOrFail($id);
    }

    public function getProductNameAndPrice(){
        return Product::select('id','name', 'price')->get();
    }

    public function getOrderStatus(){
        return Order::select('id','status')->get();
    }

    public function getCouponValid(){

        $allCoupons = Coupon::all();
        $validCoupons = [];

        foreach ($allCoupons as $coupon) {
            if ($coupon->isValid()) {
                $validCoupons[] = $coupon;
            }
        }
        return $validCoupons;
    }


    public function create($data)
    {
        $product = Product::find($data['product_id']);
        $coupon = Coupon::find($data['coupon_id']);

        if (!$product) {
            return ['error' => 'Product not found'];
        }

        if (!$coupon || !$coupon->isValid()) {
            return ['error' => 'Coupon is not valid or expired'];
        }

        if ($product->stock < $data['quantity']) {
            return ['error' => 'Product stock is not enough'];
        }

        $subtotal = $product->price * $data['quantity'];
        $total_pay = max(0, $subtotal - $coupon->discount); 

        
        $orderDetail = OrderDetail::create([
            'order_id' => $data['order_id'],
            'product_id' => $data['product_id'],
            'quantity' => $data['quantity'],
            'unit_price' => $product->price,
            'coupon_id' => $data['coupon_id'],
            'total_pay' => $total_pay,
        ]);

        $product->decrement('stock', $data['quantity']);
        if ($coupon->usage_limit > 0) {
            $coupon->decrement('usage_limit', 1);
        }

        $this->logAction('Created order detail Id: '.$orderDetail->id, $orderDetail->id);
        return $orderDetail;
    }


    public function update($id, $data)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        $product = Product::find($data['product_id']);
        $newCoupon = Coupon::find($data['coupon_id']);
        $oldCoupon = Coupon::find($orderDetail->coupon_id);
    
        if (!$newCoupon || !$newCoupon->isValid()) {
            return ['error' => 'New coupon is not valid or expired'];
        }
    
        if ($data['quantity'] > $orderDetail->quantity) {
            $neededStock = $data['quantity'] - $orderDetail->quantity;
            if ($product->stock < $neededStock) {
                return ['error' => 'Product stock is not enough'];
            }
            $product->decrement('stock', $neededStock);
        } else {
            $product->increment('stock', $orderDetail->quantity - $data['quantity']);
        }

        $subtotal = $product->price * $data['quantity'];
        $total_pay = max(0, $subtotal - $newCoupon->discount);  
    
        $orderDetail->updated_at = now();
        $orderDetail->update([
            'order_id' => $data['order_id'],
            'product_id' => $data['product_id'],
            'quantity' => $data['quantity'],
            'unit_price' => $product->price,
            'coupon_id' => $data['coupon_id'],
            'total_pay' => $total_pay,
        ]);
    
        if ($oldCoupon && $oldCoupon->id !== $newCoupon->id) {
            $oldCoupon->increment('usage_limit', 1);
        }
    
        if ($newCoupon->usage_limit > 0) {
            $newCoupon->decrement('usage_limit', 1);
        }
    
        $this->logAction('Update order detail id: ' . $orderDetail->id, $orderDetail->id);
    
        return $orderDetail;
    }
    

    public function delete($id)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        $orderDetail->delete();

        $this->logAction('Delete order detailid: ' .$id, $id);
        return true;
    }

    private function logAction($action, $targetId)
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'target_id' => $targetId
        ]);
    }
}
