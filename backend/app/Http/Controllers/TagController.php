<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tags = Tag::all();
            return response()->json([
                'success' => true,
                'message' => 'Tags retrieved successfully',
                'data' => $tags
            ]);
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
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:tags',
                'color' => 'required|string|max:255'
            ]);

            $tag = Tag::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tag created successfully',
                'data' => $tag
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()
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
    public function show(Tag $tag)
    {
        try {
            return response()->json([
                'success' => true,
                'tag' => $tag
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255|unique:tags',
                'color' => 'sometimes|required|string|max:255'
            ]);

            $tag->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tag updated successfully',
                'data' => $tag
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()
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
    public function destroy(Tag $tag)
    {
        try {
            $tag->delete();
            return response()->json([
                'success' => true,
                'message' => 'Tag deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function storeMultiple(Request $request)
    {
        try {
            $validated = $request->validate([
                'tags' => 'required|array',
                'tags.*.name' => 'required|string|max:255|unique:tags',
                'tags.*.color' => 'required|string|max:255'
            ]);

            $tags = Tag::createMultiple($validated['tags']);

            return response()->json([
                'success' => true,
                'message' => 'Tags created successfully',
                'data' => $tags
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
