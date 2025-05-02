<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Blog;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function approveAuthor(User $user)
    {
        try {
            $user = Admin::approveAuthor($user);

            return response()->json([
                'success' => true,
                'message' => 'Author approved successfully',
                'user' => $user
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function rejectAuthor(User $user)
    {
        try {
            $user = Admin::rejectAuthor($user);
            return response()->json([
                'success' => true,
                'message' => 'Author rejected successfully',
                'user' => $user
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function activateUser(User $user)
    {
        try {
            $user = Admin::activateUser($user);
            return response()->json([
                'success' => true,
                'message' => 'User activated successfully',
                'user' => $user
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function suspendUser(User $user)
    {
        try {
            $user = Admin::suspendUser($user);
            return response()->json([
                'success' => true,
                'message' => 'User suspended successfully',
                'user' => $user
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function activateBlog(Blog $blog)
    {
        try {
            $blog = Admin::activateBlog($blog);
            return response()->json([
                'success' => true,
                'message' => 'Blog activated successfully',
                'blog' => $blog
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function suspendBlog(Blog $blog)
    {
        try {
            $blog = Admin::suspendBlog($blog);
            return response()->json([
                'success' => true,
                'message' => 'Blog suspended successfully',
                'blog' => $blog
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function getGlobalStatistics()
    {
        try {
            return response()->json([
                'success' => true,
                'data' => Admin::getGlobalStatistics()
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteUser(User $user)
    {
        try {
            $user = Admin::deleteUser($user);
            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully',
                'user' => $user
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteBlog(Blog $blog)
    {
        try {
            $blog = Admin::deleteBlog($blog);
            return response()->json([
                'success' => true,
                'message' => 'Blog deleted successfully',
                'blog' => $blog
            ]);
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
