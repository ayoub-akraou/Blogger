<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Regular extends User
{
    use HasFactory;

    protected $table = 'users';
    protected static function booted()
    {
        static::addGlobalScope('regular', function (Builder $builder) {
            $builder->where('type', 'regular');
        });
    }
}
