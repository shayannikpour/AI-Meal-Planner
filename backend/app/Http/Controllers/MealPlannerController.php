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
            // 1) Disable SSL verification for dev (NOT for production)
            $client = new Client([
                'verify' => false,
            ]);

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
                'ingredients' => [],
                'instructions' => $data['choices'][0]['message']['content'],
            ]);
        } catch (\Exception $e) {
            Log::error("Phi-3 API Error: " . $e->getMessage());
            return response()->json(['error' => 'Error generating meal.', 'details' => $e->getMessage()], 500);
        }
    }

    public function getRecipe(Request $request)
    {
        $meal = $request->input('meal');

        if (!$meal) {
            return response()->json(['error' => 'No meal selected.'], 400);
        }

        $prompt = "Give me the ingredients and step-by-step instructions for $meal.";

        return $this->askAI($prompt);
    }

    public function refineRecipe(Request $request)
    {
        $meal = $request->input('meal');
        $issue = $request->input('issue');

        if (!$meal || !$issue) {
            return response()->json(['error' => 'Meal name or issue missing.'], 400);
        }

        $prompt = "I am making $meal, but I have an issue: $issue. How can I adjust the recipe?";

        return $this->askAI($prompt);
    }

    private function askAI($prompt)
    {
        $apiUrl = env('PHI3_API_URL');
        $apiKey = env('PHI3_API_KEY');

        try {
            // 1) Disable SSL verification for dev (NOT for production)
            $client = new Client([
                'verify' => false,
            ]);

            $response = $client->post($apiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => 'You are an expert chef. Always return a JSON object with this structure: {"meal": "Meal Name", "ingredients": ["ingredient1", "ingredient2"], "instructions": "Step-by-step instructions"}. Do NOT include anything outside of this JSON format.'
                        ],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'model' => 'gpt-4o',
                    'temperature' => 1,
                    'max_tokens' => 4096,
                    'top_p' => 1
                ],
            ]);

            // Get AI raw response
            $responseBody = $response->getBody()->getContents();
            Log::info("🔍 AI Raw Response: " . $responseBody);

            $data = json_decode($responseBody, true);

            // Check if AI returned a valid structure
            if (!isset($data['choices'][0]['message']['content'])) {
                Log::error("❌ AI Response Missing Content: " . json_encode($data));
                return response()->json(['error' => 'AI returned an invalid format', 'raw_response' => $data], 500);
            }

            // Get the AI's message content
            $content = $data['choices'][0]['message']['content'];
            Log::info("🛠️ AI Content Before Parsing: " . $content);

            // 2) Strip code fences (```json ... ```), if present
            $content = str_replace(["```json", "```"], "", $content);

            // Attempt to parse the JSON
            $aiResponse = json_decode($content, true);

            // Check if JSON decoding was successful
            if (!is_array($aiResponse) || !isset($aiResponse['meal'])) {
                Log::error("❌ Invalid AI JSON format: " . $content);
                return response()->json(['error' => 'AI did not return structured JSON', 'raw_response' => $content], 500);
            }

            Log::info("✅ Parsed AI Response: " . json_encode($aiResponse));
            return response()->json($aiResponse);
        } catch (\Exception $e) {
            Log::error("🔥 AI API Error: " . $e->getMessage());
            return response()->json(['error' => 'Error generating meal.', 'details' => $e->getMessage()], 500);
        }
    }
}
