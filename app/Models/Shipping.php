<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'shipping';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'shipping_address',
        'shipping_status',
        'shipping_date',
    ];

    /**
     * Relationships
     */

    // Relationship to Order
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
