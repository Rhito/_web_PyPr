<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'order_details';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price',
    ];

    /**
     * Relationships
     */

    // Relationship to Order
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    // Relationship to Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
