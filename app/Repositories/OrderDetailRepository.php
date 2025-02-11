<?php

namespace App\Repositories;

use App\Models\Log;
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

    public function create($data)
    {
        $product = Product::findOrFail($data['product_id']);

        if ($product->stock < $data['quantity']) {
            return ['error' => 'Product stock is not enough'];
        }

        $orderDetail = OrderDetail::create([
            'order_id' => $data['order_id'],
            'product_id' => $data['product_id'],
            'quantity' => $data['quantity'],
            'unit_price' => $product->price
        ]);

        $product->decrement('stock', $data['quantity']);
        $this->logAction('Create order detail', $orderDetail->id);

        return $orderDetail;
    }

    public function update($id, $data)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        $product = Product::findOrFail($data['product_id']);

        if ($data['quantity'] > $orderDetail->quantity) {
            $neededStock = $data['quantity'] - $orderDetail->quantity;
            if ($product->stock < $neededStock) {
                return ['error' => 'Product stock is not enough'];
            }
            $product->decrement('stock', $neededStock);
        } else {
            $product->increment('stock', $orderDetail->quantity - $data['quantity']);
        }

        $orderDetail->update([
            'order_id' => $data['order_id'],
            'product_id' => $data['product_id'],
            'quantity' => $data['quantity'],
            'unit_price' => $product->price
        ]);

        $this->logAction('Update order detail', $orderDetail->id);

        return $orderDetail;
    }

    public function delete($id)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        $orderDetail->delete();

        $this->logAction('Delete order detail', $id);
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
