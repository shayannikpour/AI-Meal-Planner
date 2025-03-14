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
    }

    public function generateMeal(array $ingredients, array $tags)
    {
        $prompt = "Generate a meal using these ingredients: " . implode(", ", $ingredients) .
                  ". Consider these dietary preferences: " . implode(", ", $tags) . ".";

        try {
            $response = $this->client->post($this->apiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'prompt' => $prompt,
                    'max_tokens' => 200,
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            return $data['choices'][0]['text'] ?? 'No response from AI.';
        } catch (\Exception $e) {
            Log::error("Phi-3 API Error: " . $e->getMessage());
            return 'Error generating meal.';
        }
    }
}


?>