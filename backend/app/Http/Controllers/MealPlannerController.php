<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Services\OllamaService;

class MealPlannerController extends Controller
{
    protected $ollamaService;

    public function __construct(OllamaService $ollamaService)
    {
        $this->ollamaService = $ollamaService;
    }

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

    // Generate a meal using Phi-3 AI
    public function generateMeal(Request $request)
    {
        try {
            $ingredients = $request->input('ingredients', []);
            $preferences = $request->input('preferences', []);

            // Format ingredients and preferences for the prompt
            $ingredientsList = implode(', ', $ingredients);
            $preferencesList = implode(', ', $preferences);

            // Build the prompt
            $prompt = "Generate a recipe using these ingredients: $ingredientsList\n\n";
            if (!empty($preferences)) {
                $prompt .= "Consider these dietary preferences: $preferencesList\n\n";
            }
            $prompt .= "Please provide the recipe in this format:\n";
            $prompt .= "Recipe: [Recipe Name]\n";
            $prompt .= "Ingredients: [List all required ingredients with quantities]\n";
            $prompt .= "Instructions: [Step by step cooking instructions]\n";
            $prompt .= "\nMake sure to use the available ingredients: $ingredientsList";

            $response = $this->ollamaService->generateResponse($prompt);
            
            return response()->json($response)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        } catch (\Exception $e) {
            Log::error('Meal generation error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate meal suggestion. Please try again.',
                'details' => $e->getMessage()
            ], 500)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }
    }

    public function getRecipe(Request $request)
    {
        $meal = $request->input('meal');

        if (!$meal) {
            return response()->json(['error' => 'No meal selected.'], 400);
        }

        // Format the meal name by converting from snake_case to Title Case
        $formattedMeal = str_replace('_', ' ', $meal);
        $formattedMeal = ucwords($formattedMeal);

        try {
            $prompt = "Generate a detailed recipe for $formattedMeal with the following format:\n\n";
            $prompt .= "Recipe: $formattedMeal\n\n";
            $prompt .= "Ingredients:\n[List of ingredients with quantities]\n\n";
            $prompt .= "Instructions:\n[Step by step cooking instructions]\n\n";
            $prompt .= "Please provide the recipe in a clear, easy to follow format.";
            
            $response = $this->ollamaService->generateResponse($prompt);
            
            return response()->json($response)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } catch (\Exception $e) {
            Log::error('Recipe generation error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate recipe. Please try again.',
                'details' => $e->getMessage()
            ], 500)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }
    }

    public function refineRecipe(Request $request)
    {
        try {
            $meal = $request->input('meal');
            $issue = $request->input('issue');

            if (!$meal || !$issue) {
                return response()->json(['error' => 'Meal name or issue missing.'], 400);
            }

            // Build a prompt that includes the current recipe and the modification request
            $prompt = "I have a recipe for $meal and here's my request: $issue\n\n";
            $prompt .= "Please provide an adjusted recipe that addresses this issue. Format the response as:\n\n";
            $prompt .= "Recipe: [Recipe Name]\n";
            $prompt .= "Ingredients: [List all required ingredients with quantities]\n";
            $prompt .= "Instructions: [Step by step cooking instructions]\n";
            
            $response = $this->ollamaService->generateResponse($prompt);
            
            return response()->json($response)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        } catch (\Exception $e) {
            Log::error('Recipe refinement error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to refine recipe. Please try again.',
                'details' => $e->getMessage()
            ], 500)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }
    }

    public function generateRecipe(Request $request)
    {
        try {
            $preferences = $request->input('preferences', []);
            $prompt = $this->buildPrompt($preferences);
            
            $response = $this->ollamaService->generateResponse($prompt);
            
            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Recipe generation error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate recipe. Please try again.'
            ], 500);
        }
    }

    private function buildPrompt($preferences)
    {
        $prompt = "Generate a recipe with the following format:\n\n";
        $prompt .= "Recipe: [Recipe Name]\n\n";
        $prompt .= "Ingredients:\n[List of ingredients with quantities]\n\n";
        $prompt .= "Instructions:\n[Step by step cooking instructions]\n\n";
        
        if (!empty($preferences)) {
            $prompt .= "Please consider these preferences:\n";
            foreach ($preferences as $key => $value) {
                $prompt .= "- $key: $value\n";
            }
        }
        
        $prompt .= "\nPlease provide the recipe in a clear, easy to follow format.";
        
        return $prompt;
    }
}
