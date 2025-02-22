<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Log;
use App\Models\User;
use App\Repositories\LogRepository;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $orderRepository;
    protected $logRepository;


    public function __construct(OrderRepository $orderRepository, LogRepository $logRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->logRepository = $logRepository;
    }

    public function index(Request $request)
    {
        $orders = $this->orderRepository->getAllOrders($request->search);

        return Inertia::render('AdminView/Orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $users = User::all();
        return Inertia::render('AdminView/Orders/create', ['users' => $users]);
    }

    public function store(OrderRequest $request)
    {
        $order = $this->orderRepository->createOrder($request->only(['user_id', 'total_amount', 'status']));
        $this->logRepository->createLog("Created Order Id: ".$order->id, $order->id);
        
        return redirect()->route('orders.index')->with('success', 'Order created successfully');
    }

    public function edit(string $id)
    {
        $order = $this->orderRepository->getOrderById($id);
        $users = User::all();
        return Inertia::render('AdminView/Orders/edit', ['order' => $order, 'users' => $users]);
    }

    public function update(OrderRequest $request)
    {
        $order = $this->orderRepository->updateOrder($request->id, $request->only(['user_id', 'total_amount', 'status']));

        $this->logRepository->createLog("Created Order Id: ".$order->id, $order->id);

        return redirect()->route('orders.index')->with('success', 'Order updated successfully');
    }

    public function destroy(string $id)
    {
        
        $result = $this->orderRepository->deleteOrder($id);
        dd($result);

        $this->logRepository->createLog("Deleted Order - Id: " . $id, $id);

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully');
    }

}
