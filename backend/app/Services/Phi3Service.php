<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class Phi3Service
{
    protected $client;
    protected $apiKey;
    protected $apiUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('PHI3_API_KEY');
        $this->apiUrl = env('PHI3_API_URL');
        
        Log::info("Phi3Service initialized", [
            'apiUrl' => $this->apiUrl
        ]);
    }

    public function generateMeal(array $ingredients, array $tags)
    {
        // Create a more detailed prompt for recipe generation
        $prompt = "Create a delicious recipe using these ingredients: " . implode(", ", $ingredients) . ".\n";
        
        if (!empty($tags)) {
            $prompt .= "Consider these dietary preferences: " . implode(", ", $tags) . ".\n";
        }
        
        $prompt .= "\nPlease format your response as follows:\n";
        $prompt .= "Recipe: [Recipe Name]\n\n";
        $prompt .= "Ingredients:\n[List each ingredient with quantity on a new line]\n\n";
        $prompt .= "Instructions:\n[Provide step-by-step cooking instructions]\n\n";
        $prompt .= "Make sure to use most of the ingredients I mentioned and consider the dietary preferences if specified.";

        try {
            Log::info("Sending recipe generation request to API", [
                'ingredients' => $ingredients,
                'preferences' => $tags,
                'apiUrl' => $this->apiUrl
            ]);
            
            $response = $this->client->post($this->apiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => env('PHI3_MODEL_NAME', 'phi-3'),
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful assistant that creates detailed recipes.'],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'max_tokens' => 800,  // Increased to allow for longer recipes
                    'temperature' => 0.7
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            Log::info("Received response from API for meal generation", [
                'responseStructure' => array_keys($data),
                'hasChoices' => isset($data['choices'])
            ]);
            
            $content = $data['choices'][0]['message']['content'] ?? 'No response from AI.';
            Log::info("Recipe content received", ['length' => strlen($content)]);
            return $content;
        } catch (\Exception $e) {
            Log::error("API Error in generateMeal: " . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'ingredients' => $ingredients,
                'preferences' => $tags
            ]);
            return 'Error generating meal: ' . $e->getMessage();
        }
    }
    
    public function generateRecipeFormat($mealName)
    {
        $prompt = "Generate a detailed recipe for $mealName with the following format:\n\n";
        $prompt .= "Recipe: $mealName\n\n";
        $prompt .= "Ingredients:\n[List of ingredients with quantities]\n\n";
        $prompt .= "Instructions:\n[Step by step cooking instructions]\n\n";
        $prompt .= "Please provide the recipe in a clear, easy to follow format.";
        
        try {
            Log::info("Sending request to Phi3", [
                'prompt' => $prompt
            ]);
            
            $response = $this->client->post($this->apiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => env('PHI3_MODEL_NAME', 'phi-3'),
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful assistant that creates detailed recipes.'],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'max_tokens' => 800,
                    'temperature' => 0.7
                ],
            ]);
            
            $data = json_decode($response->getBody()->getContents(), true);
            Log::info("Received response from Phi3", [
                'response' => $data
            ]);
            
            $recipeText = $data['choices'][0]['message']['content'] ?? 'No response from AI.';
            
            // Parse the response to extract recipe components
            $meal = $mealName;
            $ingredients = [];
            $instructions = '';
            
            // Extract ingredients
            if (preg_match('/Ingredients:(.*?)(?:Instructions|Directions|Steps|$)/is', $recipeText, $matches)) {
                $ingredientsList = trim($matches[1]);
                $ingredients = array_map(function($item) {
                    // Remove leading dashes, asterisks, and dots
                    $item = preg_replace('/^[-*•.\s]+/', '', trim($item));
                    return $item;
                }, explode("\n", $ingredientsList));
                $ingredients = array_filter($ingredients); // Remove empty items
            }
            
            // Extract instructions
            if (preg_match('/(?:Instructions|Directions|Steps):(.*?)$/is', $recipeText, $matches)) {
                $instructions = trim($matches[1]);
                
                // Format the instructions properly
                $instructions = preg_replace('/(\d+)\./', '<h3>Step $1</h3>', $instructions);
            }
            
            return [
                'meal' => $meal,
                'ingredients' => $ingredients,
                'instructions' => $instructions
            ];
            
        } catch (\Exception $e) {
            Log::error("Phi-3 API Error: " . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            // Return a default recipe format with the error
            return [
                'meal' => $mealName,
                'ingredients' => ["Couldn't retrieve ingredients due to API error"],
                'instructions' => "We're sorry, but we couldn't generate a recipe at this time due to an API error: " . $e->getMessage()
            ];
        }
    }
}


?>