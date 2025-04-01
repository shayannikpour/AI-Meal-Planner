import { useEffect, useState } from "react";
import { fetchIngredients } from "../api";
import axios from "axios";
import TagList from "./TagList";
import "./MealPlanner.css"; // Import the layout & styling CSS

const API_BASE_URL = "http://localhost:8000/api"; // Adjust as needed

const IngredientSelector = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mealResponse, setMealResponse] = useState<{
    meal: string;
    ingredients: string[];
    instructions: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

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
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
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
    <div className="meal-planner-page">

      {/* Two-column layout */}
      <div className="meal-planner-container">
        {/* Left Column: Ingredient Selector */}
        <div className="meal-planner-column">
          <h2 className="column-heading">Select Ingredients</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="Search Ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ul>
            {ingredients
              .filter((ingredient) =>
                ingredient.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((ingredient, index) => {
                const isSelected = selectedIngredients.includes(ingredient);
                return (
                  <li
                    key={index}
                    onClick={() => toggleIngredient(ingredient)}
                    className={isSelected ? "selected" : ""}
                    style={{ cursor: "pointer", padding: "5px 0" }}
                  >
                    {ingredient} {isSelected ? "✅" : ""}
                  </li>
                );
              })}
          </ul>

          <h3 style={{ marginTop: "1rem" }}>Selected Ingredients:</h3>
          <p>{selectedIngredients.length > 0 ? selectedIngredients.join(", ") : "None selected"}</p>
        </div>

        {/* Right Column: Tag List */}
        <div className="meal-planner-column">
          <TagList onSelectTags={setSelectedTags} />
        </div>
      </div>

      {/* Bottom: Meal output */}
      <div className="meal-output-section">
        {loading ? (
          <p>Loading meals... 🔄</p>
        ) : (
          <button onClick={findMeals} className="find-meals-button" disabled={loading}>
            {loading ? "Finding Meals..." : "Find Meals"}
          </button>
        )}

        {mealResponse && (
          <div style={{ marginTop: "1rem" }}>
            <h3 className="meal-output-heading">Suggested Meal:</h3>
            <p className="meal-output-paragraph">
              <strong>{mealResponse.meal}</strong>
            </p>
            <p className="meal-output-paragraph">
              <strong>Ingredients:</strong>{" "}
              {mealResponse.ingredients?.join(", ") || "No ingredients provided"}
            </p>
            <p className="meal-output-paragraph">
              <strong>Instructions:</strong>{" "}
              {mealResponse.instructions || "No instructions available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientSelector;
