<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'coupons';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'discount',
        'expiration_date',
        'usage_limit',
    ];

    /**
     * Check if the coupon is valid
     *
     * @return bool
     */
    public function isValid(): bool
    {
        return $this->expiration_date >= now() && $this->usage_limit > 0;
    }

    
}
