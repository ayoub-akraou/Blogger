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

    public function users() {
        return $this->belongsToMany(User::class, 'user_favorite_blog', 'blog_id', 'user_id');
    }
}
