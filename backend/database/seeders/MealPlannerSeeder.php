<?php

// namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;

// class MealPlannerSeeder extends Seeder
// {
//     /**
//      * Run the database seeds.
//      */
//     public function run(): void
//     {
//         //
//     }
// }

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
            ['name' => 'Olive Oil']
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
            ['name' => 'Budget-Friendly']
        ]);
    }
}
