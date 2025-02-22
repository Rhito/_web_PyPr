<?php
namespace App\Repositories;

use App\Models\Log;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;

class PaymentRepository{
    private function logAction($action, $targetId)
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'target_id' => $targetId
        ]);
    }

    public function getAllPayments($search = null)
    {
        $query = Payment::select(['id', 'order_id', 'payment_method', 'payment_date', 'payment_status'])
        ->with(['order:id,status']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('order_id', 'like', "%$search%")
                    ->orWhere('id', 'like', "%$search%")
                    ->orWhere('payment_method', 'like', "%$search%")
                    ->orWhere('payment_date', 'like', "%$search%")
                    ->orWhere('payment_status', 'like', "%$search%");
            });
        }

        return $query->orderBy('id', 'desc')->paginate(10);
    }


    public function findById($id)
    {
        return Payment::with('order')->findOrFail($id);
    }

    public function getOrderStatus(){
        return Order::select('id','status')->get();
    }


    public function create($data) {

        $payment = Payment::create($data);

        $this->logAction('Created payment Id: ' .$payment->id , $payment->id);
        return $payment;
    }

    
    public function update($data , $id){
        $payment = Payment::findOrFail($id);
        $payment->updated_at = now();

        $payment->update($data);

        $this->logAction('Update payment Id: ' .$payment->id, $payment->id);
        return $payment;
    }

    public function delete($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        $this->logAction('Delete order detailid: ' .$id, $id);
        return true;
    }


   
}

?> 