<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class Phi3Service
{
    protected $client;
    protected $apiKey;
    protected $apiUrl;
    protected $model;

    public function __construct()
    {
        $this->apiKey = env('PHI3_API_KEY');
        $this->apiUrl = env('PHI3_API_URL');
        $this->model = env('PHI3_MODEL_NAME', 'Phi-3-mini-4k-instruct');
        
        $this->client = new Client([
            'verify' => false,  // Disable SSL verification
            'timeout' => 30,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->apiKey
            ]
        ]);
        
        Log::info("Phi3Service initialized", [
            'apiUrl' => $this->apiUrl,
            'model' => $this->model
        ]);
    }

    public function generateResponse($prompt)
    {
        try {
            Log::info("Sending request to Phi-3", [
                'prompt' => $prompt,
                'model' => $this->model,
                'url' => $this->apiUrl
            ]);

            $response = $this->client->post($this->apiUrl, [
                'json' => [
                    'model' => $this->model,
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful cooking assistant that provides detailed recipes.'],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'temperature' => 0.7,
                    'max_tokens' => 800
                ]
            ]);

            $result = json_decode($response->getBody()->getContents(), true);
            
            Log::info("Received response from Phi-3", [
                'raw_response' => $result
            ]);

            if (!isset($result['choices'][0]['message']['content'])) {
                throw new \Exception('Invalid response format from API');
            }

            $content = $result['choices'][0]['message']['content'];
            
            // Parse the response to extract recipe components
            $meal = '';
            $ingredients = [];
            $instructions = '';

            // Extract meal name
            if (preg_match('/(?:Recipe|Meal):\s*(.+?)(?:\n|$)/i', $content, $matches)) {
                $meal = trim($matches[1]);
            }

            // Extract ingredients
            if (preg_match('/Ingredients:(.*?)(?:Instructions|Directions|Steps|$)/is', $content, $matches)) {
                $ingredientsList = trim($matches[1]);
                $ingredients = array_map(function($item) {
                    return trim(preg_replace('/^[-*•.\s]+/', '', trim($item)));
                }, explode("\n", $ingredientsList));
                $ingredients = array_filter($ingredients);
            }

            // Extract instructions
            if (preg_match('/(?:Instructions|Directions|Steps):(.*?)$/is', $content, $matches)) {
                $instructions = trim($matches[1]);
            } else {
                $instructions = $content;
            }

            return [
                'meal' => $meal ?: 'Custom Recipe',
                'ingredients' => $ingredients ?: ['Could not parse ingredients'],
                'instructions' => $instructions ?: 'Could not parse instructions'
            ];

        } catch (\Exception $e) {
            Log::error("Phi-3 API Error", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'url' => $this->apiUrl,
                'model' => $this->model
            ]);
            throw new \Exception('Failed to generate recipe: ' . $e->getMessage());
        }
    }

    public function generateMeal(array $ingredients, array $tags)
    {
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
                'url' => $this->apiUrl,
                'model' => $this->model
            ]);
            
            $response = $this->client->post($this->apiUrl, [
                'json' => [
                    'model' => $this->model,
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful assistant that creates detailed recipes.'],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'max_tokens' => 800,
                    'temperature' => 0.7
                ]
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            
            if (!isset($data['choices'][0]['message']['content'])) {
                throw new \Exception('Invalid response format from API');
            }
            
            $content = $data['choices'][0]['message']['content'];
            
            // Parse the response to extract recipe components
            $meal = '';
            $ingredients = [];
            $instructions = '';

            // Extract meal name
            if (preg_match('/(?:Recipe|Meal):\s*(.+?)(?:\n|$)/i', $content, $matches)) {
                $meal = trim($matches[1]);
            }

            // Extract ingredients
            if (preg_match('/Ingredients:(.*?)(?:Instructions|Directions|Steps|$)/is', $content, $matches)) {
                $ingredientsList = trim($matches[1]);
                $ingredients = array_map(function($item) {
                    return trim(preg_replace('/^[-*•.\s]+/', '', trim($item)));
                }, explode("\n", $ingredientsList));
                $ingredients = array_filter($ingredients);
            }

            // Extract instructions
            if (preg_match('/(?:Instructions|Directions|Steps):(.*?)$/is', $content, $matches)) {
                $instructions = trim($matches[1]);
            } else {
                $instructions = $content;
            }

            return [
                'meal' => $meal ?: 'Custom Recipe',
                'ingredients' => $ingredients ?: ['Could not parse ingredients'],
                'instructions' => $instructions ?: 'Could not parse instructions'
            ];
            
        } catch (\Exception $e) {
            Log::error("API Error in generateMeal", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'url' => $this->apiUrl,
                'model' => $this->model
            ]);
            throw new \Exception('Failed to generate meal: ' . $e->getMessage());
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
                'prompt' => $prompt,
                'url' => $this->apiUrl,
                'model' => $this->model
            ]);
            
            $response = $this->client->post($this->apiUrl, [
                'json' => [
                    'model' => $this->model,
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful assistant that creates detailed recipes.'],
                        ['role' => 'user', 'content' => $prompt]
                    ],
                    'max_tokens' => 800,
                    'temperature' => 0.7
                ]
            ]);
            
            $data = json_decode($response->getBody()->getContents(), true);
            
            if (!isset($data['choices'][0]['message']['content'])) {
                throw new \Exception('Invalid response format from API');
            }
            
            $recipeText = $data['choices'][0]['message']['content'];
            
            // Parse the response to extract recipe components
            $meal = $mealName;
            $ingredients = [];
            $instructions = '';
            
            // Extract ingredients
            if (preg_match('/Ingredients:(.*?)(?:Instructions|Directions|Steps|$)/is', $recipeText, $matches)) {
                $ingredientsList = trim($matches[1]);
                $ingredients = array_map(function($item) {
                    return trim(preg_replace('/^[-*•.\s]+/', '', trim($item)));
                }, explode("\n", $ingredientsList));
                $ingredients = array_filter($ingredients);
            }
            
            // Extract instructions
            if (preg_match('/(?:Instructions|Directions|Steps):(.*?)$/is', $recipeText, $matches)) {
                $instructions = trim($matches[1]);
                $instructions = preg_replace('/(\d+)\./', '<h3>Step $1</h3>', $instructions);
            }
            
            return [
                'meal' => $meal,
                'ingredients' => $ingredients ?: ['Could not parse ingredients'],
                'instructions' => $instructions ?: 'Could not parse instructions'
            ];
            
        } catch (\Exception $e) {
            Log::error("Phi-3 API Error", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'url' => $this->apiUrl,
                'model' => $this->model
            ]);
            
            throw new \Exception('Failed to generate recipe: ' . $e->getMessage());
        }
    }
}


?>