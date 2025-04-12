<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'content',
        'image',
        'views',
        'likes',
        'status'
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
