<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Models\Payment;
use App\Repositories\PaymentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $paymentRepository;

    private function pathToView(string $str) {
        return "AdminView/Payment/$str";
    }

    public function __construct(PaymentRepository $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payments = $this->paymentRepository->getAllPayments($request->search);
        return Inertia::render($this->pathToView('index'), ['payments' => $payments, 'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $orders = $this->paymentRepository->getOrderStatus();

        return Inertia::render($this->pathToView('create'), ['orders'=>$orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentRequest $request)
    {
        $result = $this->paymentRepository->create($request->validated());

        if (isset($result['error'])) {
            return redirect()->back()->withInput()->withErrors(['error' => $result['error']]);
        }

        return redirect()->route('payments.index')->with(['success'=>'Payment created succesfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $payment = $this->paymentRepository->findById($id);

        return inertia($this->pathToView('show'), ['payment'=>$payment]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $payment = $this->paymentRepository->findById($id);
        $orders = $this->paymentRepository->getOrderStatus();
        return inertia($this->pathToView('edit'), ['payment'=>$payment, 'orders'=>$orders]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentRequest $request, $id)
    {
        $result = $this->paymentRepository->update($request->validated(), $id);

        if (isset($result['error'])) {
            return redirect()->back()->withInput()->withErrors(['error' => $result['error']]);
        }

        return redirect()->route('payments.index')->with(['success'=>'Payment created succesfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->paymentRepository->delete($id);
        return redirect()->route('payments.index')->with(['success'=>'Delete payment succesfully']);
    }
}
