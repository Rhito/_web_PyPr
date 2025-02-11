<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function getAllOrders($search = null)
    {
        $query = Order::with('user');

        if ($search) {
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where('status', 'like', "%{$search}%");
            }
        }

        return $query->orderBy('id', 'desc')->paginate(10)->withQueryString();
    }

    public function createOrder($data)
    {
        return Order::create($data);
    }

    public function getOrderById($id)
    {
        return Order::findOrFail($id);
    }

    public function updateOrder($id, $data)
    {
        $order = Order::findOrFail($id);
        $order->update($data);
        return $order;
    }

    public function deleteOrder($id)
    {
        $order = Order::findOrFail($id);
        return $order->delete();
    }
}
