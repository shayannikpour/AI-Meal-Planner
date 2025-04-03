import React, { useState } from "react";
import axios from "axios";
import "./IngredientSelector.css";

const API_BASE_URL = "http://localhost:8000/api";

const DIETARY_TAGS = [
    "Weight Loss",
    "Muscle Gain",
    "Keto-Friendly",
    "Vegan",
    "Vegetarian",
    "Gluten-Free",
    "Quick & Easy",
    "Budget-Friendly"
];

const INGREDIENTS_LIST = [
    // Vegetables
    "Tomatoes", "Onions", "Garlic", "Bell Peppers", "Carrots", "Broccoli", "Spinach", 
    "Lettuce", "Mushrooms", "Zucchini", "Eggplant", "Cucumber", "Celery", "Asparagus",
    "Sweet Potatoes", "Potatoes", "Corn", "Green Beans", "Peas", "Cauliflower",
    "Cabbage", "Brussels Sprouts", "Kale", "Arugula", "Radishes", "Beets",
    "Butternut Squash", "Pumpkin", "Artichokes", "Leeks",

    // Fruits
    "Apples", "Bananas", "Oranges", "Lemons", "Limes", "Strawberries", "Blueberries",
    "Raspberries", "Blackberries", "Grapes", "Pineapple", "Mango", "Peaches", "Pears",
    "Plums", "Cherries", "Avocado", "Coconut", "Pomegranate", "Kiwi",

    // Proteins
    "Chicken Breast", "Ground Beef", "Salmon", "Tuna", "Shrimp", "Tofu", "Eggs",
    "Turkey", "Pork Chops", "Lamb", "Ground Turkey", "Bacon", "Ham", "Sausage",
    "Cod", "Tilapia", "Halibut", "Crab", "Lobster", "Scallops",

    // Dairy & Alternatives
    "Milk", "Cheese", "Yogurt", "Butter", "Heavy Cream", "Sour Cream", "Cream Cheese",
    "Mozzarella", "Parmesan", "Cheddar", "Almond Milk", "Soy Milk", "Oat Milk",
    "Coconut Milk", "Greek Yogurt", "Cottage Cheese", "Ricotta", "Feta",

    // Grains & Pasta
    "Rice", "Quinoa", "Pasta", "Bread", "Flour", "Oats", "Couscous", "Barley",
    "Tortillas", "Breadcrumbs", "Spaghetti", "Penne", "Fettuccine", "Brown Rice",
    "Wild Rice", "Bulgur", "Ramen Noodles", "Rice Noodles",

    // Herbs & Spices
    "Basil", "Oregano", "Thyme", "Rosemary", "Cilantro", "Parsley", "Mint",
    "Cumin", "Paprika", "Cinnamon", "Nutmeg", "Ginger", "Turmeric", "Coriander",
    "Bay Leaves", "Sage", "Dill", "Chives",

    // Nuts & Seeds
    "Almonds", "Walnuts", "Pecans", "Cashews", "Peanuts", "Pistachios",
    "Sunflower Seeds", "Pumpkin Seeds", "Chia Seeds", "Flax Seeds", "Pine Nuts",
    "Sesame Seeds", "Macadamia Nuts",

    // Pantry Items
    "Olive Oil", "Vegetable Oil", "Soy Sauce", "Vinegar", "Honey", "Maple Syrup",
    "Sugar", "Brown Sugar", "Salt", "Black Pepper", "Tomato Sauce", "Mustard",
    "Mayonnaise", "Ketchup", "Hot Sauce", "Worcestershire Sauce"
];

interface MealResponse {
    meal: string;
    instructions: string;
    ingredients: string[];
    cookingTime?: string;
    difficulty?: string;
    nutritionalInfo?: {
        calories?: number;
        protein?: number;
        carbs?: number;
        fat?: number;
    };
}

const IngredientSelector: React.FC = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [mealResponse, setMealResponse] = useState<MealResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const toggleIngredient = (ingredient: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredient)
                ? prev.filter((i) => i !== ingredient)
                : [...prev, ingredient]
        );
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    const findMeals = async () => {
        if (selectedIngredients.length === 0) {
            alert("Please select at least one ingredient.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/generate-meal`, {
                ingredients: selectedIngredients,
                tags: selectedTags,
            });
            setMealResponse(response.data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredIngredients = INGREDIENTS_LIST.filter(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ingredient-selector-container">
            <div className="ingredient-selector-header">
                <h2>Select Your Ingredients</h2>
                <p className="subtitle">Choose ingredients you have available to find matching recipes</p>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="ingredients-carousel-container">
                <div className="ingredients-carousel">
                    <div className="carousel-row">
                        {filteredIngredients.slice(0, Math.floor(filteredIngredients.length / 3)).map((ingredient, idx) => {
                            const isSelected = selectedIngredients.includes(ingredient);
                            return (
                                <button
                                    key={`ingredient-1-${idx}`}
                                    onClick={() => toggleIngredient(ingredient)}
                                    className={`ingredient-btn ${isSelected ? 'active' : ''}`}
                                >
                                    {ingredient}
                                </button>
                            );
                        })}
                        {filteredIngredients.slice(0, Math.floor(filteredIngredients.length / 3)).map((ingredient, idx) => {
                            const isSelected = selectedIngredients.includes(ingredient);
                            return (
                                <button
                                    key={`ingredient-1-repeat-${idx}`}
                                    onClick={() => toggleIngredient(ingredient)}
                                    className={`ingredient-btn ${isSelected ? 'active' : ''}`}
                                >
                                    {ingredient}
                                </button>
                            );
                        })}
                    </div>
                    <div className="carousel-row reverse">
                        {filteredIngredients.slice(Math.floor(filteredIngredients.length / 3), Math.floor(2 * filteredIngredients.length / 3)).map((ingredient, idx) => {
                            const isSelected = selectedIngredients.includes(ingredient);
                            return (
                                <button
                                    key={`ingredient-2-${idx}`}
                                    onClick={() => toggleIngredient(ingredient)}
                                    className={`ingredient-btn ${isSelected ? 'active' : ''}`}
                                >
                                    {ingredient}
                                </button>
                            );
                        })}
                        {filteredIngredients.slice(Math.floor(filteredIngredients.length / 3), Math.floor(2 * filteredIngredients.length / 3)).map((ingredient, idx) => {
                            const isSelected = selectedIngredients.includes(ingredient);
                            return (
                                <button
                                    key={`ingredient-2-repeat-${idx}`}
                                    onClick={() => toggleIngredient(ingredient)}
                                    className={`ingredient-btn ${isSelected ? 'active' : ''}`}
                                >
                                    {ingredient}
                                </button>
                            );
                        })}
                    </div>
                    <div className="carousel-row">
                        {filteredIngredients.slice(Math.floor(2 * filteredIngredients.length / 3)).map((ingredient, idx) => {
                            const isSelected = selectedIngredients.includes(ingredient);
                            return (
                                <button
                                    key={`ingredient-3-${idx}`}
                                    onClick={() => toggleIngredient(ingredient)}
                                    className={`ingredient-btn ${isSelected ? 'active' : ''}`}
                                >
                                    {ingredient}
                                </button>
                            );
                        })}
                        {filteredIngredients.slice(Math.floor(2 * filteredIngredients.length / 3)).map((ingredient, idx) => {
                            const isSelected = selectedIngredients.includes(ingredient);
                            return (
                                <button
                                    key={`ingredient-3-repeat-${idx}`}
                                    onClick={() => toggleIngredient(ingredient)}
                                    className={`ingredient-btn ${isSelected ? 'active' : ''}`}
                                >
                                    {ingredient}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="selected-ingredients-container">
                <h3>Selected Ingredients</h3>
                <div className="selected-ingredients">
                    {selectedIngredients.length > 0 ? (
                        selectedIngredients.map((ingredient, idx) => (
                            <span key={idx} className="selected-ingredient-tag">
                                {ingredient}
                                <button 
                                    onClick={() => toggleIngredient(ingredient)}
                                    className="remove-ingredient"
                                >
                                    ×
                                </button>
                            </span>
                        ))
                    ) : (
                        <p className="no-selection">No ingredients selected</p>
                    )}
                </div>
            </div>

            <div className="tags-container">
                <h3>Dietary Preferences</h3>
                <div className="tags-grid">
                    {DIETARY_TAGS.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="find-meals-container">
                <button 
                    onClick={findMeals} 
                    disabled={loading || selectedIngredients.length === 0}
                    className="find-meals-button"
                >
                    {loading ? "Finding Meals..." : "Find Meals"}
                </button>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Finding the perfect recipe for you...</p>
                </div>
            )}

            {mealResponse && (
                <div className="recipe-container">
                    <h1 className="recipe-title">{mealResponse.meal}</h1>
                    
                    <div className="recipe-content">
                        <div className="recipe-section">
                            <h2>Ingredients</h2>
                            <ul className="ingredients-list">
                                {mealResponse.ingredients.map((ingredient: string, idx: number) => (
                                    <li key={idx}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="recipe-section">
                            <h2>Instructions</h2>
                            <div className="instructions-text">
                                {mealResponse.instructions}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientSelector;
