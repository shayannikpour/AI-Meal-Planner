<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MealPlannerSeeder extends Seeder
{
    public function run()
    {
        // Insert Ingredients
        DB::table('ingredients')->insert([
            ['name' => 'Chicken'],
            ['name' => 'Rice'],
            ['name' => 'Tomato'],
            ['name' => 'Egg'],
            ['name' => 'Milk'],
            ['name' => 'Spinach'],
            ['name' => 'Cheese'],
            ['name' => 'Beef'],
            ['name' => 'Garlic'],
            ['name' => 'Olive Oil'],
            // Additional ingredients:
            ['name' => 'Onion'],
            ['name' => 'Potato'],
            ['name' => 'Carrot'],
            ['name' => 'Bell Pepper'],
            ['name' => 'Mushrooms'],
            ['name' => 'Lettuce'],
            ['name' => 'Avocado'],
            ['name' => 'Salmon'],
            ['name' => 'Shrimp'],
            ['name' => 'Pasta'],
            ['name' => 'Beans'],
            ['name' => 'Lentils'],
            ['name' => 'Tofu'],
            ['name' => 'Butter'],
            ['name' => 'Yogurt']
        ]);

        // Insert Tags
        DB::table('tags')->insert([
            ['name' => 'Weight Loss'],
            ['name' => 'Muscle Gain'],
            ['name' => 'Keto-Friendly'],
            ['name' => 'Vegan'],
            ['name' => 'Vegetarian'],
            ['name' => 'Gluten-Free'],
            ['name' => 'Quick & Easy'],
            ['name' => 'Budget-Friendly'],
            // Additional Tags:
            ['name' => 'Low Carb'],
            ['name' => 'High Protein'],
            ['name' => 'Dairy-Free'],
            ['name' => 'Nut-Free'],
            ['name' => 'Paleo'],
            ['name' => 'Mediterranean'],
            ['name' => 'Family-Friendly'],
            ['name' => 'Spicy'],
            ['name' => 'Comfort Food'],
            ['name' => 'Seasonal']
        ]);
    }
}
