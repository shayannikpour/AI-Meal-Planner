<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Services\OllamaService;
use App\Services\Phi3Service;

class MealPlannerController extends Controller
{
    protected $ollamaService;
    protected $phi3Service;

    public function __construct(OllamaService $ollamaService, Phi3Service $phi3Service)
    {
        $this->ollamaService = $ollamaService;
        $this->phi3Service = $phi3Service;
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
            // Support both 'preferences' and 'tags' parameter names from frontend
            $preferences = $request->input('preferences', []);
            $tags = $request->input('tags', []);
            
            // Combine preferences and tags if both are provided
            $dietaryPreferences = !empty($tags) ? $tags : $preferences;

            // Directly use Phi3Service without trying Ollama first
            $response = $this->phi3Service->generateMeal($ingredients, $dietaryPreferences);
            
            // Format the response to match the expected structure if needed
            if (is_string($response)) {
                // Parse the text response
                $meal = '';
                $ingredientList = [];
                $instructions = '';
                
                // Extract meal name
                if (preg_match('/Recipe:\s*(.+?)(?:\n|$)/i', $response, $matches)) {
                    $meal = trim($matches[1]);
                }
                
                // Extract ingredients
                if (preg_match('/Ingredients:(.*?)(?:Instructions|Directions|Steps|$)/is', $response, $matches)) {
                    $ingredientText = trim($matches[1]);
                    $ingredientList = array_map('trim', explode("\n", $ingredientText));
                    $ingredientList = array_filter($ingredientList);
                }
                
                // Extract instructions
                if (preg_match('/(?:Instructions|Directions|Steps):(.*?)$/is', $response, $matches)) {
                    $instructions = trim($matches[1]);
                }
                
                $response = [
                    'meal' => $meal ?: 'Recipe with ' . implode(', ', $ingredients),
                    'ingredients' => $ingredientList,
                    'instructions' => $instructions ?: $response
                ];
            }
            
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
            // Directly use Phi3Service without trying Ollama first
            $response = $this->phi3Service->generateRecipeFormat($formattedMeal);
            
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

            // Directly use Phi3Service without trying Ollama first
            $response = $this->phi3Service->generateRecipeFormat($meal . " (refined: $issue)");
            
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
