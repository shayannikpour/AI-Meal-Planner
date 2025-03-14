<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

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

    // Generate a meal using Phi-3 AI
    public function generateMeal(Request $request)
    {
        $ingredients = $request->input('ingredients', []);
        $tags = $request->input('tags', []);

        if (empty($ingredients)) {
            return response()->json(['error' => 'No ingredients selected.'], 400);
        }

        // AI Prompt
        $prompt = "Generate a meal using these ingredients: " . implode(", ", $ingredients) .
              ". Consider these dietary preferences: " . implode(", ", $tags) . "." .
              " Return the meal name, a list of ingredients, and step-by-step instructions.";
              
        // API Configuration
        $apiUrl = env('PHI3_API_URL');
        $apiKey = env('PHI3_API_KEY');

        if (!$apiUrl || !$apiKey) {
            return response()->json(['error' => 'AI API configuration missing.'], 500);
        }

        try {
            $client = new Client();
            $response = $client->post($apiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a genius AI model'],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'model' => 'gpt-4o',
                    'temperature' => 1,
                    'max_tokens' => 4096,
                    'top_p' => 1
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (!isset($data['choices'][0]['message']['content'])) {
                return response()->json(['error' => 'Invalid AI response', 'details' => $data], 500);
            }

            return response()->json([
                'meal' => 'AI Suggested Meal',
                'ingredients' => [], // Empty array for now to avoid undefined error
                'instructions' => $data['choices'][0]['message']['content'],
            ]);
        } catch (\Exception $e) {
            Log::error("Phi-3 API Error: " . $e->getMessage());
            return response()->json(['error' => 'Error generating meal.', 'details' => $e->getMessage()], 500);
        }
    }
}


// Log::info("API Key: " . env('PHI3_API_KEY'));
// Log::info("API URL: " . env('PHI3_API_URL'));
