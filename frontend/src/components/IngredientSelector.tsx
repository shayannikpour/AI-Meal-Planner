import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchIngredients } from "../api";
import TagList from "./TagList";
import "./MealPlanner.css";

/**
 * Parses a single text block from the AI into an ingredients array and instructions array.
 * - Removes markdown tokens (###, **, etc.).
 * - Skips lines of 3+ dashes (---).
 * - Detects "Ingredients:" vs. "Instructions:" sections.
 * Returns arrays of lines for both.
 */
function parseMealText(aiText: string): {
  parsedIngredients: string[];
  parsedInstructionsArr: string[];
} {
  let sanitized = aiText
    // Remove headings like ###
    .replace(/#{1,6}\s?/g, "")
    // Remove bold markers **
    .replace(/\*\*/g, "")
    // Remove backticks
    .replace(/`+/g, "");

  const lines = sanitized.split("\n");
  const ingredients: string[] = [];
  let instructions: string[] = [];

  let inIngredientsSection = false;
  let inInstructionsSection = false;

  for (let line of lines) {
    let cleanLine = line.trim();

    // Skip lines that are just --- or more dashes
    if (/^-{3,}$/.test(cleanLine)) {
      continue;
    }

    const lower = cleanLine.toLowerCase();

    // Detect "Ingredients:"
    if (lower.startsWith("ingredients:")) {
      inIngredientsSection = true;
      inInstructionsSection = false;
      continue;
    }
    // Detect "Instructions:"
    if (lower.startsWith("instructions:")) {
      inIngredientsSection = false;
      inInstructionsSection = true;
      continue;
    }

    if (inIngredientsSection) {
      // Remove leading dashes
      cleanLine = cleanLine.replace(/^-+\s*/, "");
      if (cleanLine) {
        ingredients.push(cleanLine);
      }
    } else {
      // Treat everything else as instructions
      if (cleanLine && inInstructionsSection) {
        instructions.push(cleanLine);
      } else if (cleanLine && !inIngredientsSection && !inInstructionsSection) {
        // Lines outside any section => also instructions
        instructions.push(cleanLine);
      }
    }
  }

  // === POST-PROCESS: Merge dash lines into the previous step line ===
  // e.g. "Step 1: Cook pasta" + "- Boil water..." => "Step 1: Cook pasta - Boil water..."
  instructions = mergeDashLinesWithPreviousSteps(instructions);

  return {
    parsedIngredients: ingredients,
    parsedInstructionsArr: instructions,
  };
}

/**
 * Merges any line starting with "-" into the previous line if that previous line
 * looks like a step line (e.g. "Step 1:", "1. ", etc.).
 */
function mergeDashLinesWithPreviousSteps(instructions: string[]): string[] {
  // We'll build a new array of lines with merges done in-place
  const merged: string[] = [];

  const stepRegex = /^(step\s*\d+:|\d+\.\s)/i; 
  // Matches "Step 1:" or "1. " at the start of line, case-insensitive

  for (let i = 0; i < instructions.length; i++) {
    const line = instructions[i];
    // Check if line starts with a dash
    if (line.startsWith("-")) {
      // If we have a previous line that looks like a step, merge
      if (merged.length > 0 && stepRegex.test(merged[merged.length - 1])) {
        merged[merged.length - 1] += " " + line.replace(/^-+\s*/, "");
      } else {
        // Otherwise, just push the dash line normally
        merged.push(line);
      }
    } else {
      // Normal line
      merged.push(line);
    }
  }
  return merged;
}

const API_BASE_URL = "http://localhost:8000/api";

interface MealResponse {
  meal: string;
  instructions: string;
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

  // Parse AI instructions into arrays
  let parsedIngredients: string[] = [];
  let parsedInstructionsArr: string[] = [];
  if (mealResponse?.instructions) {
    const parsed = parseMealText(mealResponse.instructions);
    parsedIngredients = parsed.parsedIngredients;
    parsedInstructionsArr = parsed.parsedInstructionsArr;
  }

  /**
   * Renders each instruction line with minimal spacing logic.
   * If line starts with "Meal Name:", we bold it, etc.
   */
  const renderInstructionLine = (line: string, index: number) => {
    const lower = line.toLowerCase();
    if (lower.startsWith("meal name:")) {
      return (
        <p key={index} style={{ fontWeight: "bold" }}>
          {line}
        </p>
      );
    } else if (/^\d+\.\s/.test(line) || lower.startsWith("step")) {
      // Steps get a little margin on top
      return (
        <p key={index} style={{ marginTop: "0.5rem" }}>
          {line}
        </p>
      );
    } else {
      // Normal line
      return <p key={index}>{line}</p>;
    }
  };

  return (
    <div className="meal-planner-page">
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
              .map((ingredient, idx) => {
                const isSelected = selectedIngredients.includes(ingredient);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredient(ingredient)}
                    style={{ cursor: "pointer", padding: "5px 0" }}
                    className={isSelected ? "selected" : ""}
                  >
                    {ingredient} {isSelected ? "✅" : ""}
                  </li>
                );
              })}
          </ul>
          <h3 style={{ marginTop: "1rem" }}>Selected Ingredients:</h3>
          <p>
            {selectedIngredients.length > 0
              ? selectedIngredients.join(", ")
              : "None selected"}
          </p>
        </div>

        {/* Right Column: Tag List */}
        <div className="meal-planner-column">
          <TagList onSelectTags={setSelectedTags} />
        </div>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        {loading ? (
          <p>Loading meals... 🔄</p>
        ) : (
          <button onClick={findMeals} disabled={loading} className="find-meals-button">
            {loading ? "Finding Meals..." : "Find Meals"}
          </button>
        )}
      </div>

      {/* Suggested Meal Card */}
      {mealResponse && (
        <div className="meal-suggestion">
          <h2 className="meal-title">{mealResponse.meal || "Suggested Meal"}</h2>
          <div className="meal-columns">
            <div className="meal-column">
              <h3>Ingredients</h3>
              <ul>
                {parsedIngredients.length > 0 ? (
                  parsedIngredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))
                ) : (
                  <li>No recommended ingredients found.</li>
                )}
              </ul>
            </div>
            <div className="meal-column">
              <h3>Instructions</h3>
              <div>
                {parsedInstructionsArr.length > 0 ? (
                  parsedInstructionsArr.map(renderInstructionLine)
                ) : (
                  <p>No instructions available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSelector;
