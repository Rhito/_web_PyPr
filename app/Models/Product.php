<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category_id',
        'image_url',
        'is_active',
    ];

    /**
     * Relationships
     */

    // Relationship to Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
