<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Log;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::query();

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;

            // Check if search input is numeric (assumed to be ID), otherwise search by name
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where('status', 'like', '%' . $search . '%');
            }
        }

        $orders = $query->with('user')->orderBy('id', 'desc')->paginate(10);
        
        return Inertia::render('AdminView/Orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['search']), // Preserve filter value
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        return Inertia::render('AdminView/Orders/create', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $order = new Order();
        $order->user_id = $request->user_id;
        $order->total_amount = $request->total_amount;
        $order->status = $request->status;
        $order->save();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Create order';
        $log->save();
        return redirect()->route('orders.index')->with('success', 'Order created successfully');

    }

    /**
     * Display the specified resource.
     */
    // no neededw
    // public function show(string $id)
    // {
    //     $order = Order::findOrFail($id);
    //     return Inertia::render('AdminView/Orders/show', ['order' => $order]);
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $order = Order::findOrFail($id);
        $users = User::all();
        return Inertia::render('AdminView/Orders/edit', ['order' => $order, 'users' => $users]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request)
    {
        $order = Order::findOrFail($request->id);
        $order->user_id = $request->user_id;
        $order->total_amount = $request->total_amount;
        $order->status = $request->status;
        $order->updated_at = now();
        $order->update();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Update order - Id: ' . $request->id;
        $log->save();
        return redirect()->route('orders.index')->with('success', 'Order updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find order by ID and delete it
        $order = Order::findOrFail($id);
        $order->delete();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = 'Delete order - Id: ' . $id;
        $log->save();

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully');
    }
}
