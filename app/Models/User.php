<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Exception;
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
        'type',
        'author_request',
        'status',
        'bio',
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

    public function getBlogs()
    {
        return $this->belongsToMany(Blog::class, 'user_favorite_blog', 'user_id', 'blog_id');
    }
    

    public function register(array $data)
    {
        $this->name = $data['name'];
        $this->email = $data['email'];
        $this->password = Hash::make($data['password']);
        $this->save();
        return $this;
    }

    public function login(string $email, string $password)
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

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function following()
    {
        return $this->belongsToMany(Author::class, 'follows', 'user_id', 'following_id');
    }
    
    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'user_id');
    }

    public static function isFollowing(Author $author)
    {
        $authUser = Auth::user();
        return Follow::where('user_id', $authUser->id)
            ->where('following_id', $author->id)
            ->exists();
    }
    
    public static function follow(Author $author)
    {
        $authUser = Auth::user();
        if ($authUser->id === $author->id) {
            throw new \Exception('Cannot follow yourself');
        }

        return Follow::create([
            'user_id' => $authUser->id,
            'following_id' => $author->id
        ]);
    }

}
