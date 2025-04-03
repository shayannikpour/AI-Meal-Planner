import React, { useState } from "react";
import IngredientSelector from "./components/IngredientSelector";
import MealSelection from "./components/MealSelection";
import "./App.css";

const App: React.FC = () => {
    const [view, setView] = useState<string | null>(null);

    return (
        <div className="app-container">
            <header className={`app-header ${!view ? 'home-header' : ''}`}>

                {view && (
                    <button
                        onClick={() => setView(null)}
                        className="back-button"
                    >
                        ← Back to Main Menu
                    </button>
                )}

                <h1>AI Meal Planner</h1>
                {view && (
                    <button
                        onClick={() => setView(null)}
                        className="back-button"
                    >
                        Favorites
                    </button>
                )}
                
            </header>

            {/* Show main menu buttons if no view is selected */}
            {!view && (
                <div className="main-menu">
                    <div className="menu-description">
                        <p>Welcome to AI Meal Planner! Your personal assistant for delicious and healthy meals.</p>
                    </div>
                    <div className="menu-options">
                        <button
                            onClick={() => setView("mealPlanner")}
                            className="menu-button planner-button"
                        >
                            <span className="button-icon">🥗</span>
                            <span className="button-text">Start Meal Planning</span>
                        </button>
                        <button
                            onClick={() => setView("mealSelection")}
                            className="menu-button selection-button"
                        >
                            <span className="button-icon">🍽️</span>
                            <span className="button-text">Choose a Meal</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Show Ingredient Selector */}
            {view === "mealPlanner" && (
                <div className="content-container">
                    <IngredientSelector />
                </div>
            )}

            {/* Show Meal Selection Page */}
            {view === "mealSelection" && (
                <div className="content-container">
                    <MealSelection />
                </div>
            )}

            {/* Footer */}
            <footer className="app-footer">
                <p>Team Members: Shayan, Mitchell, Eddie, Jaskunwar</p>
            </footer>
        </div>
    );
};

export default App;
