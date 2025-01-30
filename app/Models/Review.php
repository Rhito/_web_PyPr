<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'reviews';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'comment',
    ];

    /**
     * Relationships
     */

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relationship to Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
