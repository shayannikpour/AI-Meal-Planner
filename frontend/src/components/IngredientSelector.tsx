import React, { useState, useContext } from "react";
import axios from "axios";
import { LanguageContext } from '../App';
import "./IngredientSelector.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

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

interface FavoriteMeal {
    id: string;
    image: string;
    nameKey: string;
    calories: number;
}

const IngredientSelector: React.FC = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [mealResponse, setMealResponse] = useState<MealResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const { t } = useContext(LanguageContext);
    const navigate = useNavigate();

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

    const addToFavorites = () => {
        if (!mealResponse) return;

        const savedFavorites = Cookies.get('favorites');
        let favorites: FavoriteMeal[] = [];
        
        if (savedFavorites) {
            try {
                favorites = JSON.parse(savedFavorites);
            } catch (e) {
                console.error('Error parsing favorites:', e);
            }
        }

        // Check if meal is already in favorites
        const isFavorite = favorites.some(fav => fav.nameKey === mealResponse.meal);
        
        if (!isFavorite) {
            const cleanMealName = mealResponse.meal.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).join('-');
            
            const newFavorite: FavoriteMeal = {
                id: Math.random().toString(36).substr(2, 9),
                nameKey: mealResponse.meal,
                image: `https://source.unsplash.com/400x300/?${cleanMealName}`,
                calories: Math.floor(Math.random() * (800 - 300) + 300)
            };
            
            favorites.push(newFavorite);

            try {
                Cookies.set('favorites', JSON.stringify(favorites), { 
                    expires: 365,
                    path: '/',
                    sameSite: 'lax',
                    secure: false
                });
            } catch (error) {
                console.error('Error saving cookie:', error);
            }
        }
        // Always navigate to favorites page
        navigate('/favorites');
    };

    const filteredIngredients = INGREDIENTS_LIST.filter(ingredient =>
        t(ingredient).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ingredient-selector-container">
            <div className="ingredient-selector-header" style={{ position: 'relative' }}>
                <h2>{t('selectIngredients')}</h2>
                <p className="subtitle">{t('chooseIngredients')}</p>
                
                {/* Favorites Button - only show when a meal is generated */}
                {mealResponse && (
                    <button
                        onClick={addToFavorites}
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            width: '45px',
                            height: '45px',
                            backgroundColor: 'var(--color-button-bg)',
                            color: '#4CAF50',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 6px var(--color-card-shadow)',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px var(--color-card-shadow)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 6px var(--color-card-shadow)';
                        }}
                    >
                        ⭐
                    </button>
                )}
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

            {mealResponse && (
                <div className="recipe-container">
                    <h1 className="recipe-title">{mealResponse.meal}</h1>
                    
                    <div className="recipe-content">
                        <div className="recipe-section">
                            <h2>{t('ingredients')}</h2>
                            <ul className="ingredients-list">
                                {mealResponse.ingredients.map((ingredient: string, idx: number) => (
                                    <li key={idx}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="recipe-section">
                            <h2>{t('instructions')}</h2>
                            <div className="instructions-text">
                                {mealResponse.instructions}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientSelector;
