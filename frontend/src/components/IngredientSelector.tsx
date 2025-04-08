import React, { useState, useContext } from "react";
import axios from "axios";
import { LanguageContext } from '../App';
import "./IngredientSelector.css";

const API_BASE_URL = "/api";

const DIETARY_TAGS = [
    "weightLoss",
    "muscleGain",
    "ketoFriendly",
    "vegan",
    "vegetarian",
    "glutenFree",
    "quickEasy",
    "budgetFriendly"
];

const INGREDIENTS_LIST = [
    // Vegetables
    "ingredients_tomatoes", "ingredients_onions", "ingredients_garlic", "ingredients_bellPeppers", 
    "ingredients_carrots", "ingredients_broccoli", "ingredients_spinach", "ingredients_lettuce", 
    "ingredients_mushrooms", "ingredients_zucchini", "ingredients_eggplant", "ingredients_cucumber", 
    "ingredients_celery", "ingredients_asparagus", "ingredients_sweetPotatoes", "ingredients_potatoes", 
    "ingredients_corn", "ingredients_greenBeans", "ingredients_peas", "ingredients_cauliflower"
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
    const { t } = useContext(LanguageContext);

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
            alert(t('pleaseSelectIngredient'));
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/generate-meal`, {
                ingredients: selectedIngredients.map(ing => t(ing)),
                tags: selectedTags.map(tag => t(tag)),
            });
            setMealResponse(response.data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredIngredients = INGREDIENTS_LIST.filter(ingredient =>
        t(ingredient).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ingredient-selector-container">
            <div className="ingredient-selector-header">
                <h2>{t('selectIngredients')}</h2>
                <p className="subtitle">{t('chooseIngredients')}</p>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder={t('searchIngredients')}
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
                                    {t(ingredient)}
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
                                    {t(ingredient)}
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
                                    {t(ingredient)}
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
                                    {t(ingredient)}
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
                                    {t(ingredient)}
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
                                    {t(ingredient)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="selected-ingredients-container">
                <h3>{t('selectedIngredients')}</h3>
                <div className="selected-ingredients">
                    {selectedIngredients.length > 0 ? (
                        selectedIngredients.map((ingredient, idx) => (
                            <span key={idx} className="selected-ingredient-tag">
                                {t(ingredient)}
                                <button 
                                    onClick={() => toggleIngredient(ingredient)}
                                    className="remove-ingredient"
                                >
                                    ×
                                </button>
                            </span>
                        ))
                    ) : (
                        <p className="no-selection">{t('noIngredientsSelected')}</p>
                    )}
                </div>
            </div>

            <div className="tags-container">
                <h3>{t('dietaryTags')}</h3>
                <div className="tags-grid">
                    {DIETARY_TAGS.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                        >
                            {t(tag)}
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
                    {loading ? t('generatingMeal') : t('generateMeal')}
                </button>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>{t('findingRecipe')}</p>
                </div>
            )}

            {/* Recipe Display Section */}
            {mealResponse && (
                <div style={{
                    marginTop: "2rem",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "2rem",
                    width: "100%"
                }}>
                    <h2 style={{
                        textAlign: "left",
                        fontSize: "1.5rem",
                        color: "#333",
                        marginBottom: "1.5rem",
                        fontWeight: "500",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "0.5rem"
                    }}>
                        {mealResponse.meal}
                    </h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "250px 1fr",
                        gap: "2rem",
                        alignItems: "start"
                    }}>
                        {/* Ingredients Section */}
                        <div style={{
                            // backgroundColor: '#f8f9fa',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            border: '1px solid #eee'
                        }}>
                            <h3 style={{
                                color: "#333",
                                fontSize: "1rem",
                                marginBottom: "1rem",
                                fontWeight: "500"
                            }}>
                                Ingredients
                            </h3>
                            <ul style={{
                                listStyle: "disc",
                                paddingLeft: "1.2rem",
                                margin: 0,
                                color: "#666"
                            }}>
                                {Array.isArray(mealResponse.ingredients) ? (
                                    mealResponse.ingredients.map((ingredient, idx) => (
                                        <li key={idx} style={{
                                            marginBottom: "0.5rem",
                                            lineHeight: "1.4",
                                            fontSize: "0.9rem"
                                        }}>
                                            {ingredient}
                                        </li>
                                    ))
                                ) : (
                                    <li>{t("noIngredients")}</li>
                                )}
                            </ul>
                        </div>

                        {/* Instructions Section */}
                        <div style={{
                            // backgroundColor: '#f8f9fa',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            border: '1px solid #eee'
                        }}>
                            <h3 style={{
                                color: "#333",
                                fontSize: "1rem",
                                marginBottom: "1rem",
                                fontWeight: "500"
                            }}>
                                Instructions
                            </h3>
                            <div style={{
                                color: "#666"
                            }}>
                                {mealResponse.instructions.split('\n').map((step, idx) => {
                                    const stepMatch = step.trim().match(/^(?:Step\s+)?(\d+)[.:]\s*(.+)$/i);
                                    
                                    if (stepMatch) {
                                        const [_, stepNum, stepContent] = stepMatch;
                                        return (
                                            <div key={idx} style={{
                                                marginBottom: "1rem"
                                            }}>
                                                <div style={{
                                                    fontWeight: "bold",
                                                    marginBottom: "0.5rem",
                                                    fontSize: "1rem",
                                                    color: "#000"
                                                }}>
                                                    Step {stepNum}
                                                </div>
                                                <div style={{
                                                    fontSize: "0.9rem",
                                                    color: "#333",
                                                    lineHeight: "1.4"
                                                }}>
                                                    {stepContent}
                                                </div>
                                            </div>
                                        );
                                    }
                                    
                                    return (
                                        <p key={idx} style={{
                                            marginBottom: "0.75rem",
                                            lineHeight: "1.4",
                                            fontSize: "0.9rem"
                                        }}>
                                            {step.trim()}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientSelector;
