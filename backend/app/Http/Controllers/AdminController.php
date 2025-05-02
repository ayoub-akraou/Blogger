<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Blog;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }

    public function approveAuthor(User $user)
    {
        try {
            $user = Admin::approveAuthor($user);

            return response()->json([
                'status' => 'success',
                'message' => 'Author approved successfully',
                'data' => $user
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

    public function rejectAuthor(User $user)
    {
        try {
            $user = Admin::rejectAuthor($user);
            return response()->json([
                'status' => 'success',
                'message' => 'Author rejected successfully',
                'data' => $user
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
    public function activateUser(User $user)
    {
        try {
            $user = Admin::activateUser($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User activated successfully',
                'data' => $user
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
                'status' => 'success',
                'message' => 'User suspended successfully',
                'data' => $user
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

    public function activateBlog(Blog $blog)
    {
        try {
            $blog = Admin::activateBlog($blog);
            return response()->json([
                'status' => 'success',
                'message' => 'Blog activated successfully',
                'data' => $blog
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

    public function suspendBlog(Blog $blog)
    {
        try {
            $blog = Admin::suspendBlog($blog);
            return response()->json([
                'status' => 'success',
                'message' => 'Blog suspended successfully',
                'data' => $blog
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
                'status' => 'success',
                'data' => Admin::getGlobalStatistics()
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteUser(User $user)
    {
        try {
            $user = Admin::deleteUser($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully',
                'data' => $user
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

    public function deleteBlog(Blog $blog)
    {
        try {
            $blog = Admin::deleteBlog($blog);
            return response()->json([
                'status' => 'success',
                'message' => 'Blog deleted successfully',
                'data' => $blog
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
}
