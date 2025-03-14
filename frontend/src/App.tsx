import React from "react";
import IngredientSelector from "./components/IngredientSelector";

const App: React.FC = () => {
    return (
        <div>
            <h1>AI Meal Planner</h1>
            <IngredientSelector />
        </div>
    );
};

export default App;
