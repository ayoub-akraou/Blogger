<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends User
{
    use HasFactory;
    protected $table = 'users';

    protected static function booted()
    {
        static::addGlobalScope('author', function (Builder $builder) {
            $builder->where('type', 'author');
        });
    }

}
