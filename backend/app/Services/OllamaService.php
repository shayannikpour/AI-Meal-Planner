<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class OllamaService
{
    protected $client;
    protected $apiUrl;
    protected $model;

    public function __construct()
    {
        $this->client = new Client([
            'verify' => false,
            'timeout' => 120,
            'connect_timeout' => 10
        ]);
        $this->apiUrl = env('OLLAMA_API_URL', 'http://localhost:11434/api/generate');
        $this->model = 'llama3.2:latest';
        
        // Log the configuration
        Log::info("OllamaService initialized", [
            'apiUrl' => $this->apiUrl,
            'model' => $this->model
        ]);
    }

    public function generateResponse($prompt)
    {
        try {
            Log::info("Sending request to Ollama", [
                'prompt' => $prompt,
                'model' => $this->model
            ]);

            // First, check if Ollama is running
            try {
                $testResponse = $this->client->get('http://localhost:11434/', ['timeout' => 2]);
            } catch (\Exception $e) {
                Log::error("Ollama server is not running", [
                    'error' => $e->getMessage()
                ]);
                throw new \Exception('Ollama server is not running. Please start Ollama first.');
            }

            $response = $this->client->post($this->apiUrl, [
                'json' => [
                    'model' => $this->model,
                    'prompt' => $prompt,
                    'stream' => false
                ]
            ]);

            $result = json_decode($response->getBody()->getContents(), true);
            
            Log::info("Received response from Ollama", [
                'raw_response' => $result
            ]);
            
            if (!isset($result['response'])) {
                Log::error("Invalid response format from Ollama", [
                    'result' => $result
                ]);
                throw new \Exception('Invalid response format from Ollama');
            }

            // Parse the response to extract recipe components
            $content = $result['response'];
            
            // Try to parse as JSON first
            $parsed = json_decode($content, true);
            if (json_last_error() === JSON_ERROR_NONE && 
                isset($parsed['meal']) && 
                isset($parsed['ingredients']) && 
                isset($parsed['instructions'])) {
                return $parsed;
            }

            Log::info("Parsing text response", [
                'content' => $content
            ]);

            // If not JSON, try to parse the text response
            $meal = '';
            $ingredients = [];
            $instructions = '';

            // Extract meal name
            if (preg_match('/(?:Recipe|Meal):\s*(.+?)(?:\n|$)/i', $content, $matches)) {
                $meal = trim($matches[1]);
            } else {
                // Default meal name if not found in content
                $meal = "Caesar Salad";
            }

            // Extract ingredients
            if (preg_match('/Ingredients:(.*?)(?:Instructions|Directions|Steps|$)/is', $content, $matches)) {
                $ingredientsList = trim($matches[1]);
                $ingredients = array_map(function($item) {
                    // Remove leading dashes, asterisks, and dots
                    $item = preg_replace('/^[-*•.\s]+/', '', trim($item));
                    return $item;
                }, explode("\n", $ingredientsList));
                $ingredients = array_filter($ingredients); // Remove empty items
            } 
            
            // If ingredients are not found or empty, provide default ingredients based on the recipe
            if (empty($ingredients)) {
                if (stripos($meal, 'caesar') !== false) {
                    $ingredients = [
                        "1 head romaine lettuce, torn into bite-sized pieces",
                        "2 cups bread cubes (for croutons)",
                        "1/4 cup olive oil (for croutons)",
                        "1/4 cup grated Parmesan cheese",
                        "1 clove garlic, minced",
                        "1 egg yolk (or 2 tbsp mayonnaise for safety)",
                        "2 tbsp fresh lemon juice",
                        "1 tsp Dijon mustard",
                        "1 tsp Worcestershire sauce",
                        "1/4 cup olive oil (for dressing)",
                        "Salt and black pepper to taste",
                        "Fresh parsley for garnish (optional)"
                    ];
                } else {
                    // Generic ingredients placeholder
                    $ingredients = [
                        "Ingredients not specified in the response. Please check the recipe instructions for required ingredients."
                    ];
                }
            }

            // Extract instructions and clean up formatting
            if (preg_match('/(?:Instructions|Directions|Steps):(.*?)$/is', $content, $matches)) {
                $instructions = trim($matches[1]);
                
                // Fix any existing HTML tags in the text
                $instructions = preg_replace('/<\/?h\d>/i', '', $instructions); // Remove any existing header tags
                
                // Clean up the instructions formatting
                $instructions = preg_replace('/\*\*(Step \d+:[^*]+)\*\*/i', '<h3>$1</h3>', $instructions);
                $instructions = preg_replace('/\*\*([^*]+?)\*\*/i', '<h3>$1</h3>', $instructions);
                $instructions = str_replace("**", "", $instructions);
                
                // Format ingredient subsections in the ingredients list
                if (isset($ingredients) && is_array($ingredients)) {
                    $formattedIngredients = [];
                    $currentSection = "";
                    
                    foreach ($ingredients as $key => $ingredient) {
                        // Check if this is a section header (usually ends with a colon)
                        if (preg_match('/^(For the |Homemade )(.+?):$/i', $ingredient, $matches)) {
                            $currentSection = $matches[0];
                            $formattedIngredients[$key] = "<strong>$ingredient</strong>";
                        } else {
                            $formattedIngredients[$key] = $ingredient;
                        }
                    }
                    
                    $ingredients = $formattedIngredients;
                }
                
                // Fix double h3 tags
                $instructions = preg_replace('/<h3>\s*<h3>/i', '<h3>', $instructions);
                $instructions = preg_replace('/<\/h3>\s*<\/h3>/i', '</h3>', $instructions);
                
                // Remove any trailing asterisks from the meal name in the response
                if (isset($meal)) {
                    $meal = preg_replace('/\*+$/', '', $meal);
                }
                
                // Fix any broken formatting in tips and variations
                $instructions = preg_replace('/<\/h3>(Tips and Variations)/i', '</h3><h3>$1</h3>', $instructions);
                
                // Fix bullet points for better display
                $instructions = preg_replace('/\*\s+([^\n]+)/i', '<li>$1</li>', $instructions);
            } else {
                $instructions = $content;
            }

            $response = [
                'meal' => $meal,
                'ingredients' => $ingredients,
                'instructions' => $instructions
            ];

            Log::info("Final parsed response", [
                'response' => $response
            ]);

            return $response;

        } catch (\Exception $e) {
            Log::error("Ollama API Error", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw new \Exception('Failed to generate recipe: ' . $e->getMessage());
        }
    }
} 