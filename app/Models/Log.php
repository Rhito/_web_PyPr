<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'logs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'action',
        'timestamp',
    ];

    /**
     * Relationships
     */

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the timestamp in a human-readable format
     *
     * @return string
     */
    public function formattedTimestamp()
    {
        return $this->timestamp->format('Y-m-d H:i:s');
    }
}
