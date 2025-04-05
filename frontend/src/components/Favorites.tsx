import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LanguageContext } from '../App';
// import { FavoriteMeal } from './MealSelection';
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api";

interface MealResponse {
    meal: string;
    ingredients: string[];
    instructions: string;
}

export interface FavoriteMeal {
    id: string;
    image: string;
    nameKey: string;
    calories: number;
}

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [mealResponse, setMealResponse] = useState<MealResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [userInput, setUserInput] = useState<string>("");
    const [refiningLoading, setRefiningLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        console.log('Translation function available:', !!t);
        console.log('Translation test:', t('favorites'));
        loadFavorites();
    }, [t]);

    const loadFavorites = () => {
        const savedFavorites = Cookies.get('favorites');
        console.log('Saved favorites from cookie:', savedFavorites);
        if (savedFavorites) {
            try {
                const parsedFavorites = JSON.parse(savedFavorites);
                console.log('Parsed favorites:', parsedFavorites);
                // Validate the structure of each favorite
                const validFavorites = parsedFavorites.filter((fav: any) => {
                    const isValid = fav && typeof fav === 'object' && 'id' in fav && 'nameKey' in fav;
                    if (!isValid) {
                        console.error('Invalid favorite structure:', fav);
                    }
                    return isValid;
                });
                setFavorites(validFavorites);
            } catch (error) {
                console.error('Error parsing favorites:', error);
                setFavorites([]);
            }
        } else {
            console.log('No favorites found in cookies');
            setFavorites([]);
        }
    };

    const formatMealName = (nameKey: string) => {
        if (!nameKey) {
            console.error('Received undefined or empty nameKey');
            return 'Unknown Meal';
        }
        try {
            return nameKey
                .replace(/^meals_/, '')  // Make the meals_ prefix optional
                .split(/(?=[A-Z])/)
                .join(' ')
                .trim();
        } catch (error) {
            console.error('Error formatting meal name:', error);
            return nameKey; // Return the original string if formatting fails
        }
    };

    const filteredFavorites = favorites.filter(meal => 
        formatMealName(meal.nameKey)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

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

    const refineRecipe = async () => {
        if (!mealResponse) return;
        setRefiningLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/refine-recipe`, {
                meal: selectedMeal,
                issue: userInput,
            });
            
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            
            setMealResponse(response.data);
            setUserInput("");
        } catch (error) {
            console.error("Error refining recipe:", error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    setError(t("serverError") || "Server error. Please try again later.");
                } else {
                    setError(t("errorRefiningRecipe") || "Error refining recipe. Please try again.");
                }
            }
        } finally {
            setRefiningLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            minHeight: 'calc(100vh - 200px)'
        }}>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(211, 211, 211, 0.8)',
                    padding: '1rem',
                    borderRadius: '12px',
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(76, 175, 80, 0.1)',
                        borderTopColor: '#388E3C',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{
                        marginTop: '0.5rem',
                        color: 'var(--color-text)',
                        fontSize: '1rem',
                        textAlign: 'center'
                    }}>
                        Preparing your recipe...
                    </p>
                    <style>
                        {`
                        @keyframes spin {
                            to {
                                transform: rotate(360deg);
                            }
                        }
                        `}
                    </style>
                </div>
            )}

            <div style={{
                backgroundColor: 'var(--color-button-bg)',
                borderRadius: '12px',
                padding: '2rem',
                width: '100%',
                boxShadow: '0 4px 20px var(--color-card-shadow)',
                border: '1px solid var(--color-border)'
            }}>
                <h2 style={{ 
                    color: 'var(--color-text)', 
                    textAlign: 'center', 
                    marginBottom: '1rem',
                    fontSize: '2rem'
                }}>
                    {t('favorites')}
                </h2>

                <p style={{
                    textAlign: 'center',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2rem'
                }}>
                    {t('favoritesDescription')}
                </p>

                <div style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '0 1rem'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                        boxShadow: '0 2px 8px var(--color-card-shadow)',
                        borderRadius: '50px',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border)'
                    }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search recipes..."
                            style={{
                                width: '100%',
                                padding: '1rem 1.5rem',
                                fontSize: '1rem',
                                border: 'none',
                                borderRadius: '50px',
                                backgroundColor: 'transparent',
                                color: 'var(--color-text)',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div style={{
                        color: '#f44336',
                        textAlign: 'center',
                        padding: '1rem',
                        backgroundColor: '#ffebee',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        {error}
                    </div>
                )}

                {favorites.length === 0 ? (
                    <p style={{ 
                        textAlign: 'center', 
                        color: 'var(--color-text-secondary)',
                        fontSize: '1.1rem',
                        padding: '2rem'
                    }}>
                        {t('noFavorites')}
                    </p>
                ) : filteredFavorites.length === 0 ? (
                    <p style={{ 
                        textAlign: 'center', 
                        color: 'var(--color-text-secondary)',
                        fontSize: '1.1rem',
                        padding: '2rem'
                    }}>
                        {t('noMatchingFavorites')}
                    </p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: mealResponse ? '300px 1fr' : '1fr',
                        gap: '2rem',
                        alignItems: 'start'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {filteredFavorites.map((meal) => (
                                <div 
                                    key={meal.id} 
                                    onClick={() => fetchMealRecipe(meal)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem 1.5rem',
                                        backgroundColor: selectedMeal === meal.id ? '#4CAF50' : 'var(--color-bg)',
                                        color: selectedMeal === meal.id ? 'white' : 'var(--color-text)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        border: '1px solid var(--color-border)',
                                        boxShadow: '0 2px 4px var(--color-card-shadow)'
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
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px',
                                            minWidth: '32px',
                                            padding: 0,
                                            border: 'none',
                                            borderRadius: '50%',
                                            backgroundColor: 'transparent',
                                            color: selectedMeal === meal.id 
                                                ? 'white' 
                                                : '#ff4444',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontSize: '28px',
                                            fontWeight: '300',
                                            outline: 'none',
                                            lineHeight: '1'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = selectedMeal === meal.id 
                                                ? 'rgba(255, 255, 255, 0.8)' 
                                                : '#ff0000';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = selectedMeal === meal.id 
                                                ? 'white' 
                                                : '#ff4444';
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        {mealResponse && (
                            <div style={{
                                backgroundColor: 'var(--color-bg)',
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid var(--color-border)',
                                boxShadow: '0 2px 8px var(--color-card-shadow)'
                            }}>
                                <h3 style={{
                                    color: 'var(--color-text)',
                                    marginBottom: '1.5rem',
                                    fontSize: '1.5rem',
                                    borderBottom: '2px solid var(--color-border)',
                                    paddingBottom: '0.5rem'
                                }}>
                                    {mealResponse.meal}
                                </h3>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr',
                                    gap: '2rem'
                                }}>
                                    <div>
                                        <h4 style={{
                                            color: 'var(--color-text)',
                                            marginBottom: '1rem',
                                            fontSize: '1.2rem'
                                        }}>
                                            {t('ingredients')}
                                        </h4>
                                        <ul style={{
                                            listStyle: 'disc',
                                            paddingLeft: '1.5rem',
                                            color: 'var(--color-text-secondary)'
                                        }}>
                                            {mealResponse.ingredients.map((ingredient, index) => (
                                                <li key={index} style={{ marginBottom: '0.5rem' }}>
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 style={{
                                            color: 'var(--color-text)',
                                            marginBottom: '1rem',
                                            fontSize: '1.2rem'
                                        }}>
                                            {t('instructions')}
                                        </h4>
                                        <div style={{
                                            color: 'var(--color-text-secondary)',
                                            lineHeight: '1.6',
                                            whiteSpace: 'pre-line'
                                        }}>
                                            {mealResponse.instructions}
                                        </div>
                                    </div>
                                </div>

                                {mealResponse && (
                                    <div style={{
                                        marginTop: "2rem",
                                        backgroundColor: "var(--color-bg)",
                                        borderRadius: "12px",
                                        padding: "1.5rem",
                                        border: "1px solid var(--color-border)",
                                        boxShadow: "0 2px 8px var(--color-card-shadow)"
                                    }}>
                                        <h4 style={{
                                            color: "var(--color-text)",
                                            marginTop: 0,
                                            marginBottom: "1rem",
                                            fontSize: "1.2rem"
                                        }}>
                                            {t("needAdjustments")}
                                        </h4>
                                        <div style={{
                                            display: "flex",
                                            gap: "10px"
                                        }}>
                                            <input
                                                type="text"
                                                placeholder={t("refinementPlaceholder")}
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                                style={{
                                                    flex: 1,
                                                    padding: "0.8rem 1rem",
                                                    border: "1px solid var(--color-border)",
                                                    borderRadius: "8px",
                                                    fontSize: "1rem",
                                                    backgroundColor: "var(--color-bg)",
                                                    color: "var(--color-text)",
                                                    outline: "none"
                                                }}
                                                disabled={refiningLoading}
                                            />
                                            <button
                                                onClick={refineRecipe}
                                                disabled={!userInput || refiningLoading}
                                                style={{
                                                    padding: "0.8rem 1.5rem",
                                                    backgroundColor: !userInput || refiningLoading ? "var(--color-border)" : "#4CAF50",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    fontWeight: 500,
                                                    cursor: !userInput || refiningLoading ? "not-allowed" : "pointer",
                                                    minWidth: "100px",
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                {refiningLoading ? t("aiThinking") : t("askAI")}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites; 