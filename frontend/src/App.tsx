import React, { useState } from "react";
import IngredientSelector from "./components/IngredientSelector";
import MealSelection from "./components/MealSelection";

const App: React.FC = () => {
    const [view, setView] = useState<string | null>(null);

    return (
        <div>
            <h1>AI Meal Planner</h1>

            {/* Show main menu buttons if no view is selected */}
            {!view && (
                <div>
                    <button onClick={() => setView("mealPlanner")} style={{ margin: "10px", padding: "10px", cursor: "pointer" }}>
                        Start Meal Planning
                    </button>
                    <button onClick={() => setView("mealSelection")} style={{ margin: "10px", padding: "10px", cursor: "pointer" }}>
                        Choose a Meal
                    </button>
                </div>
            )}

            {/* Show Ingredient Selector */}
            {view === "mealPlanner" && (
                <div>
                    <button onClick={() => setView(null)} style={{ margin: "10px", padding: "10px", cursor: "pointer" }}>
                        🔙 Back to Main Menu
                    </button>
                    <IngredientSelector />
                </div>
            )}

            {/* Show Meal Selection Page */}
            {view === "mealSelection" && (
                <div>
                    <button onClick={() => setView(null)} style={{ margin: "10px", padding: "10px", cursor: "pointer" }}>
                        🔙 Back to Main Menu
                    </button>
                    <MealSelection />
                </div>
            )}
        </div>
    );
};

export default App;
