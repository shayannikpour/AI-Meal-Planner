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
            'timeout' => 30,
            'connect_timeout' => 5
        ]);
        $this->apiUrl = env('OLLAMA_API_URL', 'http://localhost:11434/api/generate');
        $this->model = 'phi';
        
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
                $this->client->get('http://localhost:11434/');
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
            }

            // Extract ingredients, removing dashes and cleaning up the list
            if (preg_match('/Ingredients:(.*?)(?:Instructions|Directions|Steps|$)/is', $content, $matches)) {
                $ingredientsList = trim($matches[1]);
                $ingredients = array_map(function($item) {
                    // Remove leading dashes, asterisks, and dots
                    $item = preg_replace('/^[-*•.\s]+/', '', trim($item));
                    return $item;
                }, explode("\n", $ingredientsList));
                $ingredients = array_filter($ingredients); // Remove empty items
            }

            // Extract instructions
            if (preg_match('/(?:Instructions|Directions|Steps):(.*?)$/is', $content, $matches)) {
                $instructions = trim($matches[1]);
            }

            $response = [
                'meal' => $meal ?: 'Recipe',
                'ingredients' => $ingredients,
                'instructions' => $instructions ?: $content
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