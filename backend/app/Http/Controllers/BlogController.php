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
    public function index($limit = null)
    {
        try {
            if ($limit) {
                $blogs = Blog::with(['author', 'category'])->orderBy('created_at', 'desc')->limit($limit)->get();
            } else {
                $blogs = Blog::with(['author', 'category'])->orderBy('created_at', 'desc')->get();
            }

            return response()->json(['success' => true, 'blogs' => $blogs]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
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
                'author_id' => 'required|exists:users,id',
                'category_id' => 'nullable|exists:categories,id',
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'image' => 'required|string',
                // 'views' => 'required|numeric|min:0',
                // 'likes' => 'required|numeric|min:0',
                // 'dislikes' => 'required|numeric|min:0',
                // 'status' => 'required|in:active,suspended',
                'tags' => 'sometimes|required|array'
            ]);

            $blog = Blog::create($request->except('tags'));

            if (isset($request->tags)) {
                $blog->tags()->sync($request->tags);
            }

            return response()->json(['success' => true, 'message' => 'Blog created successfully', 'blog' => $blog]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
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
                'success' => false,
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
                // 'author_id' => 'sometimes|required|exists:users,id',
                'category_id' => 'sometimes|nullable|exists:categories,id',
                'title' => 'sometimes|required|string|max:255',
                'content' => 'sometimes|required|string',
                'image' => 'sometimes|required|string',
                'views' => 'sometimes|required|numeric|min:0',
                'likes' => 'sometimes|required|numeric|min:0',
                'dislikes' => 'sometimes|required|numeric|min:0',
                'status' => 'sometimes|required|in:active,suspended',
                'tags' => 'sometimes|required|array'
            ]);

            $blog->update($request->except('tags'));

            if (isset($request->tags)) {
                $blog->tags()->sync($request->tags);
            }
            $blog->tags;
            $blog->comments;
            return response()->json(['success' => true, 'message' => 'Blog updated successfully', 'blog' => $blog]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
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
            return response()->json([
                'success' => true,
                'message' => 'Blog deleted successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function search(Request $request)
    {
        $query = $request->query('query');

        if ($query) {
            $blogs = Blog::search($query);
        } else {
            $blogs = Blog::with(['author', 'category'])->get();
        }

        return response()->json([
            'success' => true,
            'query' => $query,
            'message' => 'Blogs fetched successfully',
            'blogs' => $blogs,
        ]);
    }

    public function addTag(Blog $blog, Tag $tag)
    {
        try {
            $blog->addTag($tag);
            return response()->json([
                'success' => true,
                'message' => 'Tag ajouté avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function removeTag(Blog $blog, Tag $tag)
    {
        try {
            $blog->removeTag($tag);
            return response()->json([
                'success' => true,
                'message' => 'Tag supprimé avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function publish(Blog $blog)
    {
        try {
            $blog->publish();
            return response()->json([
                'success' => true,
                'message' => 'Blog publié avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function unpublish(Blog $blog)
    {
        try {
            $blog->unpublish();
            return response()->json([
                'success' => true,
                'message' => 'Blog non publié'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
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
                'success' => true,
                'message' => 'l\'action terminéé avec succès',
                'likes' => $blog->likes,
                'dislikes' => $blog->dislikes,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
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
                'success' => true,
                'message' => 'l\'action terminéé avec succès',
                'likes' => $blog->likes,
                'dislikes' => $blog->dislikes
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function increamentViews(Blog $blog)
    {
        try {
            $blog->increamentViews();
            return response()->json([
                'success' => true,
                'message' => 'l\'action terminéé avec succès',
                'views' => $blog->views
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function popularBlogs($limit = null)
    {
        try {
            if ($limit) {
                $blogs = Blog::with(['author', 'category'])->orderBy('views', 'desc')->limit($limit)->get();
            } else {
                $blogs = Blog::with(['author', 'category'])->orderBy('views', 'desc')->get();
            }

            return response()->json(['status' => 'success', 'blogs' => $blogs]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
