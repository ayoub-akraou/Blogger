<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Author;
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
            'name' => 'Author',
            'email' => 'author@author.com',
            'password' => bcrypt('password'),
        ]);
        
        Regular::create([
            'name' => 'Regular',
            'email' => 'regular@regular.com',
            'password' => bcrypt('password'),
        ]);

    }
}
