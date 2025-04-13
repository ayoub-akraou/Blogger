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
}




