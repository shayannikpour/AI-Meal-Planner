import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchIngredients } from "../api";
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
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [mealResponse, setMealResponse] = useState<MealResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadIngredients = async () => {
            try {
                const data = await fetchIngredients();
                setIngredients(data.map((ing: { name: string }) => ing.name));
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };
        loadIngredients();
    }, []);

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
                    <div className="carousel-inner">
                        {[...ingredients, ...ingredients]
                            .filter((ingredient) =>
                                ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((ingredient, idx) => {
                                const isSelected = selectedIngredients.includes(ingredient);
                                return (
                                    <button
                                        key={`ingredient-${idx}`}
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
                <div className="recipe-details">
                    <div className="recipe-header">
                        <h3 className="recipe-title">{mealResponse.meal}</h3>
                        <div className="recipe-meta">
                            {mealResponse.cookingTime && (
                                <span className="meta-item">
                                    <i className="fas fa-clock"></i> {mealResponse.cookingTime}
                                </span>
                            )}
                            {mealResponse.difficulty && (
                                <span className="meta-item">
                                    <i className="fas fa-signal"></i> {mealResponse.difficulty}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="recipe-content">
                        <div className="ingredients-section">
                            <h4>Ingredients</h4>
                            <div className="ingredients-grid">
                                {mealResponse.ingredients.map((item: string, idx: number) => (
                                    <div key={idx} className="ingredient-item">
                                        <span className="ingredient-name">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="instructions-section">
                            <h4>Instructions</h4>
                            <div className="instructions-list">
                                {mealResponse.instructions.split('\n').map((step, idx) => (
                                    <div key={idx} className="instruction-item">
                                        <span className="step-number">{idx + 1}</span>
                                        <p className="step-text">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {mealResponse.nutritionalInfo && (
                        <div className="nutritional-info">
                            <h4>Nutritional Information</h4>
                            <div className="nutrition-grid">
                                {mealResponse.nutritionalInfo.calories && (
                                    <div className="nutrition-item">
                                        <span className="nutrition-value">{mealResponse.nutritionalInfo.calories}</span>
                                        <span className="nutrition-label">Calories</span>
                                    </div>
                                )}
                                {mealResponse.nutritionalInfo.protein && (
                                    <div className="nutrition-item">
                                        <span className="nutrition-value">{mealResponse.nutritionalInfo.protein}g</span>
                                        <span className="nutrition-label">Protein</span>
                                    </div>
                                )}
                                {mealResponse.nutritionalInfo.carbs && (
                                    <div className="nutrition-item">
                                        <span className="nutrition-value">{mealResponse.nutritionalInfo.carbs}g</span>
                                        <span className="nutrition-label">Carbs</span>
                                    </div>
                                )}
                                {mealResponse.nutritionalInfo.fat && (
                                    <div className="nutrition-item">
                                        <span className="nutrition-value">{mealResponse.nutritionalInfo.fat}g</span>
                                        <span className="nutrition-label">Fat</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IngredientSelector;
