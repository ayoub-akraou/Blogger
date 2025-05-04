<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Author;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Regular;
use App\Models\Tag;
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
            'image' => 'images/avatar-1.avif'
        ]);
        
        Author::create([
            'name' => 'Ahmed Fathy',
            'email' => 'author1@author.com',
            'password' => bcrypt('password'),
            'image' => 'images/avatar-2.avif'
        ]);
        
        Author::create([
            'name' => 'Osama Mohamed',
            'email' => 'author2@author.com',
            'password' => bcrypt('password'),
            'image' => 'images/avatar-3.avif'
        ]);
        
        Author::create([
            'name' => 'Islam Hesham',
            'email' => 'author3@author.com',
            'password' => bcrypt('password'),
            'image' => 'images/avatar-4.avif'
        ]);
        
        Author::create([
            'name' => 'Nour El-din',
            'email' => 'author4@author.com',
            'password' => bcrypt('password'),
            'image' => 'images/avatar-5.avif'
        ]);
        
        Regular::create([
            'name' => 'Regular1',
            'email' => 'regular1@regular.com',
            'password' => bcrypt('password'),
            'image' => 'images/avatar-6.avif'
        ]);
        Regular::create([
            'name' => 'Regular2',
            'email' => 'regular2@regular.com',
            'password' => bcrypt('password'),
            'image' => 'images/avatar-7.avif'
        ]);
        Regular::create([
            'name' => 'Regular3',
            'email' => 'regular3@regular.com',
            'password' => bcrypt('password'),
            'image' => 'images/avatar-8.avif'
        ]);
        
        // Catégories
        Category::create([
            'name' => 'Technologie',
            'description' => 'Actualités et innovations dans le domaine de la technologie',
            'image' => '/images/technology.avif',
            'color' => '#2196F3'
        ]);
        Category::create([
            'name' => 'Développement',
            'description' => 'Guides et tutoriels de programmation',
            'image' => '/images/development.avif',
            'color' => '#4CAF50'
        ]);
        Category::create([
            'name' => 'Design',
            'description' => 'UI/UX design et graphisme',
            'image' => '/images/design.avif',
            'color' => '#FF9800'
        ]);
        Category::create([
            'name' => 'Business',
            'description' => 'Stratégies et conseils pour les entrepreneurs',
            'image' => '/images/business.avif',
            'color' => '#9C27B0'
        ]);
        Category::create([
            'name' => 'Voyage',
            'description' => 'Destinations et aventures autour du monde',
            'image' => '/images/voyage.avif',
            'color' => '#FF5722'
        ]);
        Category::create([
            'name' => 'Lifestyle',
            'description' => 'Mode de vie et bien-être',
            'image' => '/images/lifestyle.avif',
            'color' => '#795548'
        ]);

        // Tags
        // Tags
        Tag::create(['name' => 'JavaScript', 'color' => '#F7DF1E']);
        Tag::create(['name' => 'PHP', 'color' => '#777BB4']);
        Tag::create(['name' => 'Python', 'color' => '#3776AB']);
        Tag::create(['name' => 'React', 'color' => '#61DAFB']);
        Tag::create(['name' => 'Vue.js', 'color' => '#42B883']);
        Tag::create(['name' => 'Node.js', 'color' => '#339933']);
        Tag::create(['name' => 'CSS', 'color' => '#264DE4']);
        Tag::create(['name' => 'HTML', 'color' => '#E34F26']);
        Tag::create(['name' => 'SQL', 'color' => '#CC6699']);
        Tag::create(['name' => 'Git', 'color' => '#F05032']);
        Tag::create(['name' => 'Docker', 'color' => '#2496ED']);
        Tag::create(['name' => 'Linux', 'color' => '#FCC624']);
        Tag::create(['name' => 'Design', 'color' => '#FF69B4']);
        Tag::create(['name' => 'SEO', 'color' => '#2E8B57']);
        Tag::create(['name' => 'Marketing', 'color' => '#FFA500']);

        //blogs
        Blog::factory(50)->create();
    }
}
