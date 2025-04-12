<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function newFromBuilder($attributes = [], $connection = null)
    {
        $class = static::class;

        if (!empty($attributes->type)) {
            $class = match ($attributes->type) {
                'admin' => Admin::class,
                'author' => Author::class,
                'regular' => Regular::class,
                default => static::class,
            };
        }

        $model = (new $class)->newInstance([], true);
        $model->setRawAttributes((array) $attributes, true);

        return $model;
    }

    public static function register(array $data)
    {
        return static::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    
    public static function login(string $email, string $password)
    {
        $user = static::where('email', $email)->first();
    
        if (!$user || !Hash::check($password, $user->password)) {
            return false;
        }
    
        // Delete existing tokens
        $user->tokens()->delete();
    
        return [
            'user' => $user,
            'token' => $user->createToken('authToken')->plainTextToken
        ];
    }
    public static function logout($user)
    {
        try {
            $user->currentAccessToken()->delete();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
