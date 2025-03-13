<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MealPlannerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/ingredients', [MealPlannerController::class, 'getIngredients']);
Route::get('/tags', [MealPlannerController::class, 'getTags']);
Route::post('/generate-meal', [MealPlannerController::class, 'generateMeal']);
Route::get('/recipe/{id}', [MealPlannerController::class, 'getRecipe']);