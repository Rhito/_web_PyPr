<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderDetailsRequest;
use App\Models\Log;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
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
        $products = Product::all();
        $orders = Order::query()->with('user')->get();
        return Inertia::render('AdminView/OrderDetails/create', ['products' => $products, 'orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderDetailsRequest $request)
    {
        $product = Product::findOrFail($request->product_id);
        if ($product->stock < $request->quantity) {
            return redirect()->route('order-details.create')->with(['error'=>'Product stock is not enough']);
        }

        $orderDetail = new OrderDetail();
        $orderDetail->order_id = $request->order_id;
        $orderDetail->product_id = $request->product_id;
        $orderDetail->quantity = $request->quantity;
        $orderDetail->unit_price = $product->price;
        $orderDetail->save();

        $product->stock = $product->stock - $request->quantity;
        $product->save();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Create order detail';
        $log->save();
        return redirect()->route('order-details.index')->with(['success' => 'Order Detail created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orderDetail = OrderDetail::with('product', 'order')->findOrFail($id);

        return Inertia::render('AdminView/OrderDetails/show', [
            'orderDetail' => $orderDetail
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $products = Product::all();
        $orderDetail = OrderDetail::findOrFail($id);
        $orders = Order::query()->with('user')->get();
        return Inertia::render('AdminView/OrderDetails/edit', ['orderDetail' => $orderDetail, 'products' => $products, 'orders' => $orders]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderDetailsRequest $request)
    {
        $products = Product::findOrFail($request->product_id);
        // Check if stock is enough
        if ($products->stock < $request->quantity) {
            // change stock
            $products->stock = $products->stock - $request->quantity;
            $products->save();
            return redirect()->route('order-details.edit')->with(['error'=>'Product stock is not enough']);
        }
      

        $orderDetail = OrderDetail::findOrFail($request->id);

        // Check if quantity is decreased
        if($request->quantity < $orderDetail->quantity){
            // icrease stock
            $products->stock = $products->stock + $orderDetail->quantity - $request->quantity;
            $products->save();
        }

        $orderDetail->id = $request->id;
        $orderDetail->order_id = $request->order_id;
        $orderDetail->product_id = $request->product_id;
        $orderDetail->quantity = $request->quantity;
        $orderDetail->unit_price = $request->unit_price;
        $orderDetail->updated_at = now();
        $orderDetail->save();

        // give a log 
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
        return redirect()->route('order-details.index')->with('success', 'Order Details deleted successfully');
    }
}
