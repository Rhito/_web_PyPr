<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'is_active',
    ];

    /**
     * Relationships
     */

    // Quan hệ tự tham chiếu (Category - Subcategory)
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    // Quan hệ với sản phẩm (nếu cần)
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    /**
     * Scopes
     */

    // Phạm vi kích hoạt
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Phạm vi tìm kiếm theo tên
    public function scopeSearch($query, $keyword)
    {
        return $query->where('name', 'like', '%' . $keyword . '%');
    }
}
