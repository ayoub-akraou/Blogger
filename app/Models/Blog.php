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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function users() {
        return $this->belongsToMany(User::class, 'user_favorite_blog', 'blog_id', 'user_id');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'blog_tag', 'blog_id', 'tag_id');
    }

    public static function search($query)
    {
        return self::where('title', 'like', "%{$query}%")
            ->orWhere('content', 'like', "%{$query}%")
            ->orWhereHas('author', fn($q) => $q->where('name', 'like', "%{$query}%"))
            ->get();
    }

    public function addTag(Tag $tag) {
        $this->tags()->attach($tag);
    }

    public function removeTag(Tag $tag) {
        $this->tags()->detach($tag);
    }

    public function publish() {
        $this->status = 'active';
        $this->save();
    }
}
