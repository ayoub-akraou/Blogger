<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user = new User();
            $user->register($validatedData);
            
            $blogs = [];
            if ($user->type === 'author') $blogs = Blog::where('author_id', $user->id)->with('tags', 'comments', 'author')->get();
            if ($user->type === 'admin') $blogs = Blog::with('tags', 'comments', 'author')->get();

            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'success' => true,
                'message' => 'Utilisateur inscrit avec succès',
                'user' => $user,
                'blogs' => $blogs,
                'token' => $token,
                'categories' => Category::all()->with('blogs.author')->get(),
                'tags' => Tag::all(),
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'inscription',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $user = new User();
            $result = $user->login($request->email, $request->password);

            if (!$result) {
                return response()->json([
                    'success' => false,
                    'message' => 'Identifiants incorrects'
                ], 401);
            }
            if($result['user']->type === 'author') $blogs = Blog::where('author_id', $result['user']->id)->with('tags', 'comments', 'author')->get();
            if($result['user']->type === 'admin') $blogs = Blog::with('tags', 'comments', 'author')->get();
            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
                'user' => $result['user'],
                'blogs' => $blogs,
                'token' => $result['token'],
                'categories' => Category::with('blogs.author')->get(),
                'tags' => Tag::all(),
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la connexion',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $success = User::logout($request->user());

        if (!$success) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la déconnexion',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie',
        ]);
    }
}
