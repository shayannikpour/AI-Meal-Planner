import { useEffect, useState } from "react";
import { fetchIngredients } from "../api";
import axios from "axios";
import TagList from "./TagList";

const API_BASE_URL = "http://localhost:8000/api"; // Laravel API base URL

const IngredientSelector = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [mealResponse, setMealResponse] = useState<{ meal: string, ingredients: string[], instructions: string } | null>(null);

    useEffect(() => {
        const loadIngredients = async () => {
            try {
                const data = await fetchIngredients();
                setIngredients(data.map((ingredient: { name: string }) => ingredient.name));
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };
        loadIngredients();
    }, []);

    const toggleIngredient = (ingredient: string) => {
        setSelectedIngredients(prevSelected =>
            prevSelected.includes(ingredient)
                ? prevSelected.filter(item => item !== ingredient)
                : [...prevSelected, ingredient]
        );
    };

    const findMeals = async () => {
        if (selectedIngredients.length === 0) {
            alert("Please select at least one ingredient.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/generate-meal`, {
                ingredients: selectedIngredients,
                tags: selectedTags, // Send selected tags to backend
            });

            setMealResponse(response.data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    return (
        <div>
            <h2>Select Ingredients</h2>
            <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {ingredients
                    .filter(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((ingredient, index) => (
                        <li key={index} onClick={() => toggleIngredient(ingredient)}
                            style={{ cursor: "pointer", fontWeight: selectedIngredients.includes(ingredient) ? "bold" : "normal" }}>
                            {ingredient} {selectedIngredients.includes(ingredient) ? "✅" : ""}
                        </li>
                    ))}
            </ul>
            <h3>Selected Ingredients:</h3>
            <p>{selectedIngredients.length > 0 ? selectedIngredients.join(", ") : "None selected"}</p>

            <TagList onSelectTags={setSelectedTags} />

            <button onClick={findMeals} style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}>Find Meals</button>

            {mealResponse && (
                <div>
                    <h3>Suggested Meal:</h3>
                    <p><strong>{mealResponse.meal}</strong></p>
                    <p><strong>Ingredients:</strong> {mealResponse.ingredients?.join(", ") || "No ingredients provided"}</p>
                    <p><strong>Instructions:</strong> {mealResponse.instructions || "No instructions available"}</p>
                </div>
            )}

        </div>
    );
};

export default IngredientSelector;
