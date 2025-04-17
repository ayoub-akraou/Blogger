<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_id',
        'user_id',
        'content',
        'status'
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
