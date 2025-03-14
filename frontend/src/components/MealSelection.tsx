import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Laravel API base URL

const MealSelection = () => {
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [mealResponse, setMealResponse] = useState<{ meal: string, ingredients: string[], instructions: string } | null>(null);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);

    // List of available meals (you can fetch this from the backend later)
    const meals = [
        "Spaghetti Carbonara",
        "Grilled Chicken with Rice",
        "Vegetable Stir-Fry",
        "Salmon with Lemon Butter",
        "Beef Tacos"
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

        setLoading(true);
        
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
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Select a Meal</h2>
            {meals.map((meal, index) => (
                <button key={index} onClick={() => fetchMealRecipe(meal)} style={{ margin: "5px", padding: "10px", cursor: "pointer" }}>
                    {meal}
                </button>
            ))}

            {loading && <p>Loading recipe... 🔄</p>}

            {mealResponse && (
                <div>
                    <h3>{mealResponse.meal}</h3>
                    <p><strong>Ingredients:</strong> {mealResponse.ingredients?.join(", ") || "No ingredients provided"}</p>
                    <p><strong>Instructions:</strong> {mealResponse.instructions || "No instructions available"}</p>

                    <h4>Need Adjustments?</h4>
                    <input
                        type="text"
                        placeholder="I don’t have rice, what can I use instead?"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button onClick={refineRecipe} disabled={loading || !userInput} style={{ marginLeft: "10px", padding: "10px", cursor: "pointer" }}>
                        Ask AI
                    </button>
                </div>
            )}
        </div>
    );
};

export default MealSelection;
