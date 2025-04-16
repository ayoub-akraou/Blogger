<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color'
    ];

    public function blogs()
    {
        return $this->belongsToMany(Blog::class, 'blog_tag', 'tag_id', 'blog_id');
    }

    public static function createMultiple(array $tags)
    {
        $existingNames = Tag::pluck('name')->toArray();

        $insertData = [];

        foreach ($tags as $tag) {
            if (!in_array($tag['name'], $existingNames)) {
                $insertData[] = [
                    'name' => $tag['name'],
                    'color' => $tag['color'],
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
        }

        if (empty($insertData)) {
            return [];
        }

        DB::table('tags')->insert($insertData);

        return Tag::whereIn('name', array_column($insertData, 'name'))->get();
    }
}
