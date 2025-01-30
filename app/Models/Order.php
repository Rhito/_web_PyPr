<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
    ];

    /**
     * Relationships
     */

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relationship to Products (assuming a pivot table `order_product`)
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product', 'order_id', 'product_id')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }
}
