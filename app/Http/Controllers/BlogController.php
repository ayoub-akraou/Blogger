<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $blogs = Blog::all();
            return response()->json(['status' => 'success', 'data' => $blogs]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'category_id' => 'nullable|exists:categories,id',
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'image' => 'required|string|max:255',
                'views' => 'required|numeric|min:0',
                'likes' => 'required|numeric|min:0',
                'status' => 'required|in:pending,published,archived'
            ]);

            $blog = Blog::create($request->all());
            return response()->json(['status' => 'success', 'message' => 'Blog created successfully', 'data' => $blog]);
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
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        try {
            return response()->json(['status' => 'success', 'data' => $blog]);
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
    public function update(Request $request, Blog $blog)
    {
        try {
            $request->validate([
                'user_id' => 'sometimes|required|exists:users,id',
                'category_id' => 'sometimes|nullable|exists:categories,id',
                'title' => 'sometimes|required|string|max:255',
                'content' => 'sometimes|required|string',
                'image' => 'sometimes|required|string|max:255',
                'views' => 'sometimes|required|numeric|min:0',
                'likes' => 'sometimes|required|numeric|min:0',
                'status' => 'sometimes|required|in:pending,published,archived'
            ]);

            $blog->update($request->all());
            return response()->json(['status' => 'success', 'message' => 'Blog updated successfully', 'data' => $blog]);
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
    public function destroy(Blog $blog)
    {
        try {
            $blog->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json([
                'message' => 'Paramètre "query" manquant.',
            ], 400);
        }

        $blogs = Blog::search($query);

        return response()->json([
            'status' => 'success',
            'request' => $request->all(),
            'data' => $blogs,
        ]);
    }

    public function addTag(Blog $blog, Tag $tag)
    {
        try {
            $blog->addTag($tag);
            return response()->json([
                'status' => 'success',
                'message' => 'Tag ajouté avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function removeTag(Blog $blog, Tag $tag)
    {
        try {
            $blog->removeTag($tag);
            return response()->json([
                'status' => 'success',
                'message' => 'Tag supprimé avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function publish(Blog $blog)
    {
        try {
            $blog->publish();
            return response()->json([
                'status' => 'success',
                'message' => 'Blog publié avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function unpublish(Blog $blog)
    {
        try {
            $blog->unpublish();
            return response()->json([
                'status' => 'success',
                'message' => 'Blog non publié'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleLike(Blog $blog)
    {
        $user = Auth::user();
        try {
            $blog->toggleLike($user);
            return response()->json([
                'status' => 'success',
                'likes' => $blog->likes,
                'message' => 'l\'action terminéé avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleDislike(Blog $blog)
    {
        $user = Auth::user();
        try {
            $blog->toggleDislike($user);
            return response()->json([
                'status' => 'success',
                'message' => 'l\'action terminéé avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
