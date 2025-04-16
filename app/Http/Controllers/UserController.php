<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return response()->json(User::all());
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            return response()->json([
                'status' => 'success',
                'data' => $user
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
                'password' => 'sometimes|required|string|min:8|confirmed',
                'bio' => 'sometimes|required|string',
                'status' => 'sometimes|required|in:active,suspended',
                'author_request' => 'sometimes|required|in:pending,accepted,rejected',
                'type' => 'sometimes|required|in:regular,author',
            ]);

            $user = User::findOrFail($id);
            // Préparer les données à mettre à jour
            $data = $request->only(['name', 'email', 'bio', 'status', 'author_request', 'type']);

            // Si un nouveau mot de passe est fourni, on le hash
            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->password);
            }

            $user->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully',
                'data' => $user
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Count the number of users.
     */
    public function count()
    {
        try {
            return response()->json([
                'status' => 'success',
                'data' => User::count()
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Count the number of authors.
     */
    public function countAuthors()
    {
        try {
            $count = User::whereHas('roles', function ($query) {
                $query->where('name', 'author');
            })->count();

            return response()->json([
                'status' => 'success',
                'data' => $count
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function follow(Author $author)
    {
        try {
            $authUser = Auth::user();

            if ($authUser->id === $author->id) {
                throw new \Exception('Cannot follow yourself');
            }

            if ($authUser->isFollowing($author)) {
                throw new \Exception('Already following this Author');
            }

            $authUser->follow($author);
            return response()->json([
                'status' => 'success',
                'message' => 'Author followed successfully',
                'following_count' => $authUser->following()->count(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

}
