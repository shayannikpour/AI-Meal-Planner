<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MealPlannerSeeder extends Seeder
{
    public function run()
    {
        // Insert Ingredients (Total: 45)
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
            // Next 15 ingredients (making 25 total so far)
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
            ['name' => 'Yogurt'],
            // Additional 20 ingredients to reach 45 total:
            ['name' => 'Broccoli'],
            ['name' => 'Cauliflower'],
            ['name' => 'Zucchini'],
            ['name' => 'Eggplant'],
            ['name' => 'Cucumber'],
            ['name' => 'Corn'],
            ['name' => 'Peas'],
            ['name' => 'Quinoa'],
            ['name' => 'Oats'],
            ['name' => 'Barley'],
            ['name' => 'Sweet Potato'],
            ['name' => 'Kale'],
            ['name' => 'Snap Peas'],
            ['name' => 'Cabbage'],
            ['name' => 'Parsley'],
            ['name' => 'Basil'],
            ['name' => 'Cilantro'],
            ['name' => 'Lemon'],
            ['name' => 'Lime'],
            ['name' => 'Ginger']
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
