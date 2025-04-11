<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Regular extends User
{
    use HasFactory;

    protected $table = 'users';
    protected static function booted()
    {
        static::creating(function ($model) {
            $model->type = 'regular';
        });
    }
}
