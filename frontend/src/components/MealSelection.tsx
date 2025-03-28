import { useState } from "react";
import axios from "axios";
import "./MealSelection.css";

const API_BASE_URL = "http://localhost:8000/api"; // Laravel API base URL

const MealSelection = () => {
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [mealResponse, setMealResponse] = useState<{ meal: string, ingredients: string[], instructions: string } | null>(null);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [refiningLoading, setRefiningLoading] = useState(false);

    // Upper row of recipes (scrolls right to left)
    const upperRecipes = [
        "Spaghetti Carbonara",
        "Grilled Chicken with Rice",
        "Vegetable Stir-Fry",
        "Salmon with Lemon Butter",
        "Beef Tacos",
        "Mushroom Risotto",
        "Thai Green Curry",
        "Margherita Pizza",
        "Beef Stroganoff",
        "Greek Salad"
    ];

    // Lower row of recipes (scrolls left to right)
    const lowerRecipes = [
        "Chicken Tikka Masala",
        "Pesto Pasta",
        "Lamb Kebabs",
        "Shrimp Scampi",
        "Caesar Salad",
        "Vegetable Lasagna",
        "Teriyaki Salmon",
        "Beef Burgers",
        "Pad Thai",
        "Mushroom Wellington"
    ];

    const fetchMealRecipe = async (mealName: string) => {
        setLoading(true);
        setSelectedMeal(mealName);
        setMealResponse(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/get-recipe`, { meal: mealName });
            setMealResponse(response.data);
        } catch (error) {
            console.error("Error fetching meal recipe:", error);
        } finally {
            setLoading(false);
        }
    };

    const refineRecipe = async () => {
        if (!mealResponse) return;

        setRefiningLoading(true);
        
        try {
            const response = await axios.post(`${API_BASE_URL}/refine-recipe`, {
                meal: selectedMeal,
                issue: userInput,
            });

            setMealResponse(response.data);
            setUserInput(""); // Clear input after sending request
        } catch (error) {
            console.error("Error refining recipe:", error);
        } finally {
            setRefiningLoading(false);
        }
    };

    return (
        <div className="meal-selection-container">
            <div className="meal-selection-header">
                <h2>Choose a Meal</h2>
                <p className="subtitle">Select from our curated collection of delicious recipes</p>
            </div>

            <div className="recipe-carousel-container">
                <div className="recipe-carousel upper-carousel">
                    <div className="carousel-inner">
                        {[...upperRecipes, ...upperRecipes].map((meal, index) => (
                            <button 
                                key={`upper-${index}`} 
                                onClick={() => fetchMealRecipe(meal)}
                                className={`meal-option-btn ${selectedMeal === meal ? 'active' : ''}`}
                            >
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="recipe-carousel lower-carousel">
                    <div className="carousel-inner">
                        {[...lowerRecipes, ...lowerRecipes].map((meal, index) => (
                            <button 
                                key={`lower-${index}`} 
                                onClick={() => fetchMealRecipe(meal)}
                                className={`meal-option-btn ${selectedMeal === meal ? 'active' : ''}`}
                            >
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Preparing your recipe...</p>
                </div>
            )}

            {mealResponse && (
                <div className="recipe-details">
                    <h3 className="recipe-title">{mealResponse.meal}</h3>
                    
                    <div className="recipe-content">
                        <div className="ingredients-section">
                            <h4>Ingredients</h4>
                            <ul className="ingredients-list">
                                {mealResponse.ingredients?.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                )) || <li>No ingredients provided</li>}
                            </ul>
                        </div>
                        
                        <div className="instructions-section">
                            <h4>Instructions</h4>
                            <div className="instructions-text">
                                {mealResponse.instructions || "No instructions available"}
                            </div>
                        </div>
                    </div>

                    <div className="recipe-refinement">
                        <h4>Need Adjustments?</h4>
                        <div className="refinement-input-group">
                            <input
                                type="text"
                                placeholder="I don't have rice, what can I use instead?"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="refinement-input"
                                disabled={refiningLoading}
                            />
                            {!refiningLoading ? (
                                <button 
                                    onClick={refineRecipe} 
                                    disabled={!userInput} 
                                    className="refinement-button"
                                >
                                    Ask AI
                                </button>
                            ) : (
                                <div className="refinement-loading-button">
                                    <div className="refinement-loading-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <span>AI thinking...</span>
                                </div>
                            )}
                        </div>
                        {refiningLoading && (
                            <div className="refinement-loading-message">
                                Customizing recipe based on your request...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealSelection;
