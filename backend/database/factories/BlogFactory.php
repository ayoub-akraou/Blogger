<?php

namespace Database\Factories;

use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Blog;
use App\Models\Category;

class BlogFactory extends Factory
{
    protected $model = Blog::class;

    public function definition()
    {
        return [
            'author_id' => Author::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraphs(3, true),
            'image' => "/images/cover-" . mt_rand(1, 20) . ".avif",
            'status' => $this->faker->randomElement(['active', 'suspended']),
            'views' => $this->faker->numberBetween(0, 10000),
            'likes' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
