<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Author;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Regular;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Admin::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ]);

        Author::create([
            'name' => 'Author1',
            'email' => 'author1@author.com',
            'password' => bcrypt('password'),
        ]);
    
        Author::create([
            'name' => 'Author2',
            'email' => 'author2@author.com',
            'password' => bcrypt('password'),
        ]);
        
        Regular::create([
            'name' => 'Regular1',
            'email' => 'regular1@regular.com',
            'password' => bcrypt('password'),
        ]);
        Regular::create([
            'name' => 'Regular2',
            'email' => 'regular2@regular.com',
            'password' => bcrypt('password'),
        ]);
        Regular::create([
            'name' => 'Regular3',
            'email' => 'regular3@regular.com',
            'password' => bcrypt('password'),
        ]);

        Category::create([
            'name' => 'Category1',
            'description' => 'Description1',
            'image' => 'image1.jpg',
        ]);
        Category::create([
            'name' => 'Category2',
            'description' => 'Description2',
            'image' => 'image2.jpg',
        ]);
        Category::create([
            'name' => 'Category3',
            'description' => 'Description3',
            'image' => 'image3.jpg',
        ]);
        Category::create([
            'name' => 'Category4',
            'description' => 'Description4',
            'image' => 'image4.jpg',
        ]);
        Category::create([
            'name' => 'Category5',
            'description' => 'Description5',
            'image' => 'image5.jpg',
        ]);
        Category::create([
            'name' => 'Category6',
            'description' => 'Description6',
            'image' => 'image6.jpg',
        ]);

        Blog::factory(100)->create();
    }
}
