<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MealPlannerController extends Controller
{
    // Fetch all ingredients
    public function getIngredients()
    {
        return response()->json(DB::table('ingredients')->get());
    }

    // Fetch all tags
    public function getTags()
    {
        return response()->json(DB::table('tags')->get());
    }

    // Generate a meal using AI (placeholder for now)
    public function generateMeal(Request $request)
    {
        // Get user-selected ingredients and tags
        $ingredients = $request->input('ingredients', []);
        $tags = $request->input('tags', []);

        // Placeholder AI response (replace with real AI logic later)
        return response()->json([
            'meal' => 'Grilled Chicken with Rice',
            'ingredients' => ['Chicken', 'Rice', 'Garlic'],
            'instructions' => '1. Cook the rice. 2. Grill the chicken. 3. Serve together.',
        ]);
    }

    // Fetch a specific recipe by ID (placeholder for now)
    public function getRecipe($id)
    {
        // Placeholder response (replace with real database query later)
        return response()->json([
            'id' => $id,
            'name' => 'Example Recipe',
            'ingredients' => ['Ingredient 1', 'Ingredient 2'],
            'instructions' => 'Step 1, Step 2, Step 3.',
        ]);
    }
}

