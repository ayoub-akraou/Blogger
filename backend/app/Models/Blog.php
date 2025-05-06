<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'category_id',
        'title',
        'content',
        'image',
        'views',
        'likes',
        'status'
    ];

    protected static function booted()
    {
        static::addGlobalScope('active', function (Builder $builder) {
            $builder->where('status', 'active');
        });
    }

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

    public function likes()
    {
        return $this->hasMany(Like::class)
            ->where('type', 'like');
    }

    public function dislikes()
    {
        return $this->hasMany(Like::class)
            ->where('type', 'dislike');
    }

    public static function search($query)
    {
        return self::with(['author'])->where('title', 'like', "%{$query}%")
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

    public function unpublish() {
        $this->status = 'suspended';
        $this->save();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function increamentViews()
    {
        $this->views++;
        $this->save();
    }

    public function toggleLike(User $user)
    {
        $like = Like::where('blog_id', $this->id)->where('user_id', $user->id)->first();
        if ($like) {
            $like->type == 'dislike' ? $this->dislikes-- : $this->likes--;
            $like->delete();
            $this->save();
            if($like->type == 'like') return;
        }
        $this->likes++;
        $this->save();
        Like::create([
            'blog_id' => $this->id,
            'user_id' => $user->id,
            'type' => 'like'
        ]);
    }

    public function toggleDislike(User $user)
    {
        $like = Like::where('blog_id', $this->id)->where('user_id', $user->id)->first();
        if ($like) {
            $like->type == 'dislike' ? $this->dislikes-- : $this->likes--;
            $like->delete();
            $this->save();
            if ($like->type == 'dislike') return;
        }
        $this->dislikes++;
        $this->save();
        Like::create([
            'blog_id' => $this->id,
            'user_id' => $user->id,
            'type' => 'dislike'
        ]);
    }
}
