<?php

namespace App\Models;

use DomainException;
use Exception;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends User
{
    use HasFactory;
    protected $table = 'users';
    protected static function booted()
    {
        static::addGlobalScope('admin', function (Builder $builder) {
            $builder->where('type', 'admin');
        });
        static::creating(function ($admin) {
            $admin->type = 'admin';
        });
    }

    public function getBlogs()
    {
        try {
            $blogs = Blog::all();
            return response()->json([
                'status' => 'success',
                'data' => $blogs
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // les methodes All() et Count() sont deja herite de class Model de Laravel

    public static function approveAuthor(User $user)
    {
        if ($user->author_request !== 'pending') {
            throw new DomainException('User is not pending');
        }

        $user->author_request = 'accepted';
        $user->type = 'author';
        $user->save();

        return $user;
    }

    public static function rejectAuthor(User $user)
    {
        if ($user->author_request !== 'pending') {
            throw new DomainException('User is not pending');
        }

        $user->author_request = 'rejected';
        $user->save();
        return $user;
    }

    public static function activateUser(User $user)
    {
        if ($user->status === 'active') {
            throw new DomainException('User is already active');
        }
        $user->status = 'active';
        $user->save();
        return $user;
    }

    public static function suspendUser(User $user)
    {
        if ($user->status === 'suspended') {
            throw new DomainException('User is already suspended');
        }
        $user->status = 'suspended';
        $user->save();
        return $user;
    }

    public static function deleteUser(User $user)
    {
        $user->delete();
        return $user;
    }

    public static function activateBlog(Blog $blog)
    {
        if ($blog->status === 'active') {
            throw new DomainException('Blog is already active');
        }
        $blog->status = 'active';
        $blog->save();
        return $blog;
    }

    public static function suspendBlog(Blog $blog)
    {
        if ($blog->status === 'suspended') {
            throw new DomainException('Blog is already suspended');
        }
        $blog->status = 'suspended';
        $blog->save();
        return $blog;
    }

    public static function getGlobalStatistics()
    {
        $stats = [
            'total_users' => User::count(),
            'total_authors' => Author::count(),
            'total_blogs' => Blog::count(),
            'total_views' => Blog::sum('views'),
            'top_three_authors' => Author::withCount('blogs')
                ->orderBy('blogs_count', 'desc')
                ->take(3)
                ->get(),
            'top_three_blogs' => Blog::orderBy('likes', 'desc')->take(3)->get(),
            'category_stats' => Blog::with('category')
                ->get()
                ->groupBy('category_id')
                ->map(function ($blogs) {
                    $category = $blogs->first()->category;
                    return [
                        'category_name' => $category->name,
                        'total_blogs' => count($blogs),
                        'percentage' => round((count($blogs) / Blog::count()) * 100, 2)
                    ];
                })->values(),
        ];
        return $stats;
    }
}
