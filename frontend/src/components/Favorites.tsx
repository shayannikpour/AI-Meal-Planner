import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from '../translations';
import axios from 'axios';
import './Favorites.css';

const API_BASE_URL = "/api";

interface FavoriteMeal {
    id: string;
    image: string;
    nameKey: string;
    calories: number;
}

interface MealResponse {
    meal: string;
    ingredients: string[];
    instructions: string;
}

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [mealResponse, setMealResponse] = useState<MealResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = () => {
        const savedFavorites = Cookies.get('favorites');
        if (savedFavorites) {
            try {
                const parsedFavorites = JSON.parse(savedFavorites);
                setFavorites(parsedFavorites);
            } catch (error) {
                console.error('Error parsing favorites:', error);
                setFavorites([]);
            }
        }
    };

    const formatMealName = (nameKey: string) => {
        return nameKey
            .replace('meals_', '')
            .split(/(?=[A-Z])/)
            .join(' ');
    };

    const removeFavorite = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        const updatedFavorites = favorites.filter(meal => meal.id !== id);
        setFavorites(updatedFavorites);
        Cookies.set('favorites', JSON.stringify(updatedFavorites), { 
            expires: 365,
            path: '/',
            sameSite: 'lax',
            secure: false
        });
        
        // If the removed meal was selected, clear the selection
        if (selectedMeal === id) {
            setSelectedMeal(null);
            setMealResponse(null);
        }
    };

    const fetchMealRecipe = async (meal: FavoriteMeal) => {
        setLoading(true);
        setSelectedMeal(meal.id);
        setMealResponse(null);
        setError(null);

        try {
            const originalMealName = formatMealName(meal.nameKey);
            const response = await axios.post(`${API_BASE_URL}/get-recipe`, { meal: originalMealName });
            
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            
            if (!response.data.meal || !response.data.ingredients || !response.data.instructions) {
                throw new Error("Invalid recipe format received from server");
            }
            
            setMealResponse(response.data);
        } catch (error: unknown) {
            console.error("Error fetching meal recipe:", error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    setError(t("serverError") || "Server error. Please try again later.");
                } else if (error.response?.data?.details?.includes("UserByModelByDay")) {
                    setError(t("aiRateLimitError") || "AI is busy. Please try again later.");
                } else {
                    setError(t("errorFetchingRecipe") || "Error fetching recipe. Please try again.");
                }
            } else if (error instanceof Error) {
                setError(error.message || t("errorFetchingRecipe") || "Error fetching recipe. Please try again.");
            } else {
                setError(t("errorFetchingRecipe") || "Error fetching recipe. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%'
        }}>
            <div style={{
                backgroundColor: 'var(--color-button-bg)',
                borderRadius: '12px',
                padding: '2rem',
                width: '100%',
                boxShadow: '0 4px 20px var(--color-card-shadow)',
                border: '1px solid var(--color-border)'
            }}>
                <h1 style={{ 
                    color: 'var(--color-text)', 
                    textAlign: 'center', 
                    marginBottom: '1rem',
                    fontSize: '2rem'
                }}>
                    {t('favorites')}
                </h1>

                <p style={{
                    textAlign: 'center',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2rem'
                }}>
                    {t('favoritesDescription')}
                </p>
                
                {favorites.length === 0 ? (
                    <p style={{ 
                        textAlign: 'center', 
                        color: 'var(--color-text-secondary)',
                        fontSize: '1.1rem',
                        padding: '2rem'
                    }}>
                        {t('noFavorites')}
                    </p>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {favorites.map((meal) => (
                            <div 
                                key={meal.id} 
                                onClick={() => fetchMealRecipe(meal)}
                                className="favorite-item"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem 1.5rem',
                                    backgroundColor: selectedMeal === meal.id ? 'var(--color-primary)' : 'var(--color-bg)',
                                    color: selectedMeal === meal.id ? 'white' : 'var(--color-text)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-border)',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{
                                    fontSize: '1.1rem',
                                    textTransform: 'capitalize'
                                }}>
                                    {formatMealName(meal.nameKey)}
                                </span>
                                <button 
                                    onClick={(e) => removeFavorite(meal.id, e)}
                                    style={{
                                        backgroundColor: selectedMeal === meal.id ? 'white' : 'var(--color-primary)',
                                        color: selectedMeal === meal.id ? 'var(--color-primary)' : 'white',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        padding: 0
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {loading && (
                    <div style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        padding: "2rem", 
                        color: "var(--color-text-secondary)" 
                    }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            border: "4px solid rgba(0, 0, 0, 0.1)",
                            borderLeftColor: "var(--color-primary)",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            marginBottom: "1rem"
                        }} />
                        <p>{t("loading")}</p>
                    </div>
                )}

                {error && (
                    <div style={{ 
                        margin: "2rem auto", 
                        padding: "1rem", 
                        backgroundColor: "#fff3f3", 
                        border: "1px solid #ffcdd2", 
                        borderRadius: "8px", 
                        maxWidth: "600px", 
                        textAlign: "center" 
                    }}>
                        <p style={{ color: "#d32f2f", fontSize: "1.1rem", margin: 0 }}>{error}</p>
                    </div>
                )}

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
                                        const stepMatch = step.trim().match(/^(?:<h3>)?Step\s+(\d+)(?:<\/h3>)?\s*(.+)?$/i);
                                        
                                        if (stepMatch) {
                                            const [_, stepNum, stepContent] = stepMatch;
                                            return (
                                                <div key={idx}>
                                                    <span style={{
                                                        display: 'block',
                                                        color: "#333",
                                                        fontSize: "1.1rem",
                                                        marginTop: idx === 0 ? "0" : "1rem",
                                                        marginBottom: "0.5rem",
                                                        fontWeight: "600"
                                                    }}>
                                                        Step {stepNum}
                                                    </span>
                                                    {stepContent && (
                                                        <p style={{
                                                            marginBottom: "0.75rem",
                                                            lineHeight: "1.4",
                                                            fontSize: "0.9rem"
                                                        }}>
                                                            {stepContent}
                                                        </p>
                                                    )}
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
        </div>
    );
};

export default Favorites; 