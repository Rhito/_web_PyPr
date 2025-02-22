<?php 
 namespace App\Repositories;

use App\Models\Order;
use App\Models\Shipping;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

 class ShippingRepository {
    public function getAllShipping($search = null) {
        $query = Shipping::with(['order:id,status']);
        if($search) {
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%$search%")
                ->orWhere('order_id', 'like',"%$search%")
                ->orWhere('shipping_address', 'like',"%$search%")
                ->orWhere('shipping_status', 'like',"%$search%");
            });
        }
        return $query->orderBy('id', 'desc')->paginate(10);
    }

    public function getById($id) {
        return Shipping::with(['order:id,status'])->where('id', '=', $id)->first();
    }

    public function getOrderStatus(){
        return Order::select('id','status')->get();
    }

    public function create($data) {
        return Shipping::create($data);
    }

    public function update($data, $id) {
        $shipp = $this ->getById($id);
        $data[`updated_at`] = now();
        $shipp->update($data);

        return $shipp;
    }

    public function delete($id) {
        $shipp = $this->getById($id);
        return $shipp->delete();
    }

 }
?>