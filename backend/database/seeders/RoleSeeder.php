<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
public function run()
{
// Création des permissions
$permissions = [
// Gestion des utilisateurs
'view_users', 'edit_users', 'delete_users', 'approve_authors', 'suspend_users',

// Gestion des articles
'view_articles', 'approve_articles', 'archive_articles',

// Gestion des catégories
'create_categories', 'edit_categories', 'delete_categories', 'view_categories_statistics',

// Gestion des tags
'create_tags', 'edit_tags', 'delete_tags', 'view_tags_statistics',

// Statistiques et tableau de bord
'view_dashboard_statistics',

// Pages détail
'view_article_details', 'view_user_profile_details',

'view_articles_homepage', 'view_categories_homepage', 'view_single_article', 'receive_notifications',
'create_article', 'edit_article', 'delete_article', 'assign_category_to_article', 'assign_tags_to_article',
'view_published_articles',
];

// Création des permissions
foreach ($permissions as $permission) {
Permission::create(['name' => $permission]);
}

// Création des rôles
$admin = Role::create(['name' => 'admin']);
$author = Role::create(['name' => 'author']);
$regular = Role::create(['name' => 'regular']);

// Assigner les permissions aux rôles
$admin->givePermissionTo(Permission::all());
$author->givePermissionTo(['create_article', 'edit_article', 'delete_article', 'view_published_articles', 'view_articles']);
$regular->givePermissionTo(['like_article', 'unlike_article', 'view_articles', 'comment_article']);

}
}