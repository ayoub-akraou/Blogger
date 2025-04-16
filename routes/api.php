<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// l'authentification
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    // les utilisateurs
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/count', [UserController::class, 'count']);
    Route::get('users/authors/count', [UserController::class, 'countAuthors']);
    Route::get('users/{user}', [UserController::class, 'show']);
    Route::put('users/{user}', [UserController::class, 'update']);
    Route::delete('users/{user}', [UserController::class, 'destroy']);
    // follow
    Route::post('users/{user}/follow', [UserController::class, 'follow']);
    // les categories
    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('categories', [CategoryController::class, 'store']);
    Route::get('categories/{category}', [CategoryController::class, 'show']);
    Route::put('categories/{category}', [CategoryController::class, 'update']);
    Route::delete('categories/{category}', [CategoryController::class, 'destroy']);
    // les tags
    Route::get('tags', [TagController::class, 'index']);
    Route::post('tags', [TagController::class, 'store']);
    Route::post('tags/multiple', [TagController::class, 'storeMultiple']);
    Route::get('tags/{tag}', [TagController::class, 'show']);
    Route::put('tags/{tag}', [TagController::class, 'update']);
    Route::delete('tags/{tag}', [TagController::class, 'destroy']);
    // les blogs
    Route::get('blogs', [BlogController::class, 'index']);
    Route::post('blogs', [BlogController::class, 'store']);
    Route::get('blogs/search', [BlogController::class, 'search']);
    Route::post('blogs/{blog}/like', [BlogController::class, 'toggleLike']);
    Route::post('blogs/{blog}/dislike', [BlogController::class, 'toggleDislike']);
    Route::patch('blogs/{blog}/increment-views', [BlogController::class, 'increamentViews']);
    Route::post('blogs/{blog}/{tag}', [BlogController::class, 'addTag']);
    Route::delete('blogs/{blog}/{tag}', [BlogController::class, 'removeTag']);
    Route::get('blogs/{blog}', [BlogController::class, 'show']);
    Route::put('blogs/{blog}', [BlogController::class, 'update']);
    Route::delete('blogs/{blog}', [BlogController::class, 'destroy']);
    Route::patch('blogs/{blog}/publish', [BlogController::class, 'publish']);
    Route::patch('blogs/{blog}/unpublish', [BlogController::class, 'unpublish']);
    // les commentaires
    Route::get('comments', [CommentController::class, 'index']);
    Route::post('comments', [CommentController::class, 'store']);
    Route::get('comments/{comment}', [CommentController::class, 'show']);
    Route::put('comments/{comment}', [CommentController::class, 'update']);
    Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
    // Admin resources
    //   authors
    Route::patch('admin/approve-author/{user}', [AdminController::class, 'approveAuthor']);
    Route::patch('admin/reject-author/{user}', [AdminController::class, 'rejectAuthor']);
    //   users
    Route::patch('admin/activate-user/{user}', [AdminController::class, 'activateUser']);
    Route::patch('admin/suspend-user/{user}', [AdminController::class, 'suspendUser']);
    Route::delete('admin/delete-user/{user}', [AdminController::class, 'deleteUser']);
    //   blogs
    Route::patch('admin/activate-blog/{blog}', [AdminController::class, 'activateBlog']);
    Route::patch('admin/suspend-blog/{blog}', [AdminController::class, 'suspendBlog']);
    Route::delete('admin/delete-blog/{blog}', [AdminController::class, 'deleteBlog']);
    //   statistics
    Route::get('admin/statistics', [AdminController::class, 'getGlobalStatistics']);
});
