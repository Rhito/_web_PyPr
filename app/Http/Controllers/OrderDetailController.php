<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderDetailsRequest;
use App\Models\Log;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
//id order_id product_id quantity unit_price created_at	updated_at	

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = OrderDetail::query();

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;

            // Check if search input is numeric (assumed to be ID), otherwise search by name
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where(function ($q) use ($search) {
                    $q->where('order_id', 'like', '%' . $search . '%')
                    ->orWhere('id', 'like', '%' . $search . '%')
                    ->orWhere('product_id', 'like', '%' . $search . '%');
                });
            }
        }

        $orderDetails = $query->orderBy('id', 'desc')->paginate(10);
        return Inertia::render('AdminView/OrderDetails/index', [
            'orderDetails' => $orderDetails,
            'filters' => $request->only(['search']), // Preserve filter value
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $orders = Order::all();
        return Inertia::render('AdminView/OrderDetails/create', ['users' => $users, 'orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderDetailsRequest $request)
    {
        $orderDetail = new OrderDetail();
        $orderDetail->order_id = $request->order_id;
        $orderDetail->product_id = $request->product_id;
        $orderDetail->quantity = $request->quantity;
        $orderDetail->unit_price = $request->unit_price;
        $orderDetail->save();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Create order detail';
        $log->save();
        return redirect()->route('order-details.index')->with('success', 'Order Detail created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        return Inertia::render('AdminView/OrderDetail/details', ['orderDetail' => $orderDetail]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $users = User::all();
        $orders = Order::all();
        $orderDetail = OrderDetail::findOrFail($id);
        return Inertia::render('AdminView/OrderDetail/edit', ['orderDetail' => $orderDetail, 'users' => $users, 'orders' => $orders]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderDetailsRequest $request)
    {
        $orderDetail = OrderDetail::findOrFail($request->id);
        $orderDetail->id = $request->id;
        $orderDetail->order_id = $request->order_id;
        $orderDetail->product_id = $request->product_id;
        $orderDetail->quantity = $request->quantity;
        $orderDetail->unit_price = $request->unit_price;
        $orderDetail->updated_at = now();
        $orderDetail->save();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Update order detail ' . $request->id;
        $log->save();
        return redirect()->route('order-details.index')->with('success', 'Order Detail updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $orderDetail = OrderDetail::findOrFail($id);
        $orderDetail->delete();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Delete order detail ' . $id;
        $log->save();
        return redirect()->route('order-details.index')->with('success', 'Order Detail deleted successfully');
    }
}
