<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShippingRequest;
use App\Models\Shipping;
use App\Repositories\LogRepository;
use App\Repositories\ShippingRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShippingController extends Controller
{

    protected $shippingRepository;
    protected $logRepository;
    private function pathToView(string $str){
        return "AdminView/Shipping/$str";
    }

    public function __construct(ShippingRepository $shippingRepository, LogRepository $logRepository)
    {
        $this->shippingRepository = $shippingRepository;
        $this->logRepository = $logRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $shipping = $this->shippingRepository->getAllShipping($request->search);
        return Inertia::render($this->pathToView('index'), ['shipping'=>$shipping]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $orders = $this->shippingRepository->getOrderStatus();
        return Inertia::render($this->pathToView('create'), ['orders'=>$orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ShippingRequest $request)
    {  
        // if (!Auth::user()->address || !Auth::user()->contact_phone) {
        //     return redirect()->route('profile.edit')->with(['error' => 'Missing phone or address! Please, update your profile for shipping']);
        // }
        $result = $this->shippingRepository->create($request->validated());
        $this->logRepository->createLog('Created shipping Id: ' .$result->id , $result->id);
        if (isset($result['error'])) {
            return redirect()->back()->withInput()->withErrors(['error' => $result['error']]);
        }

        return  redirect()->route('shipping.index')->with(['success'=>'Payment created succesfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shipp = $this->shippingRepository->getById($id);
        return inertia($this->pathToView('show'), ['shipp'=>$shipp]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $shipp = $this->shippingRepository->getById($id);
        $orders = $this->shippingRepository->getOrderStatus();
        return inertia($this->pathToView('edit'), ['shipp'=>$shipp, 'orders'=>$orders]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ShippingRequest $request, string $id)
    {
        $result = $this->shippingRepository->update($request->validated(), $id);
        $this->logRepository->createLog('Edited log Id: ' .$result->id , $result->id);
        if (isset($result['error'])) {
            return redirect()->back()->withInput()->withErrors(['error' => $result['error']]);
        }
        return redirect()->route('shipping.index')->with(['success'=>'Shipping created succesfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->shippingRepository->delete($id);
        $this->logRepository->createLog('Deleted log Id: ' .$id ,$id);
        return redirect()->route('shipping.index')->with(['success'=>'Shipping deleted succesfully']);
    }
}
