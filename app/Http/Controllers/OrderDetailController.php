<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderDetailsRequest;
use App\Repositories\OrderDetailRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderDetailController extends Controller
{
    protected $orderDetailRepository;

    public function __construct(OrderDetailRepository $orderDetailRepository)
    {
        $this->orderDetailRepository = $orderDetailRepository;
    }

    public function index(Request $request)
    {
        $orderDetails = $this->orderDetailRepository->getAll($request->search);
        return Inertia::render('AdminView/OrderDetails/index', [
            'orderDetails' => $orderDetails,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $products = $this->orderDetailRepository->getProductNameAndPrice();
        $orders = $this->orderDetailRepository->getOrderStatus();
        $validCoupons = $this->orderDetailRepository->getCouponValid();

        return Inertia::render('AdminView/OrderDetails/create', [
            'products' => $products,
            'orders' => $orders,
            'coupons' => $validCoupons,
        ]);
    }

    public function store(OrderDetailsRequest $request)
    {
        $result = $this->orderDetailRepository->create($request);
        if (isset($result['error'])) {
            return redirect()->back()->withInput()->withErrors(['error' => $result['error']]);
        }
        return redirect()->route('order-details.index')->with('success', 'Order Detail created successfully');
    }

    public function show($id)
    {
        $orderDetail = $this->orderDetailRepository->findById($id);
        return Inertia::render('AdminView/OrderDetails/show', [
            'orderDetail' => $orderDetail
        ]);
    }

    public function edit($id)
    {
        $products = $this->orderDetailRepository->getProductNameAndPrice();
        $orders = $this->orderDetailRepository->getOrderStatus();
        $validCoupons = $this->orderDetailRepository->getCouponValid();

        return Inertia::render('AdminView/OrderDetails/edit', [
            'orderDetail' => $this->orderDetailRepository->findById($id),
            'products' => $products,
            'orders' => $orders,
            'coupons' => $validCoupons,
        ]);
    }

    public function update(OrderDetailsRequest $request, $id)
    {
        $result = $this->orderDetailRepository->update($id, $request->validated());
        if (isset($result['error'])) {
            return redirect()->back()->withErrors(['error' => $result['error']]);
        }
        return redirect()->route('order-details.index')->with('success', 'Order Detail updated successfully');
    }

    public function destroy($id)
    {
        $this->orderDetailRepository->delete($id);
        return redirect()->route('order-details.index')->with('success', 'Order Details deleted successfully');
    }
}
