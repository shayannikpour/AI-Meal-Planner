import { useState, useMemo, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LanguageContext } from "../App";
import Cookies from 'js-cookie';
import "./MealSelection.css";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Laravel API base URL

interface FavoriteMeal {
  id: string;
  image: string;
  nameKey: string;
  calories: number;
}

const MealSelection = () => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [mealResponse, setMealResponse] = useState<{
    meal: string;
    ingredients: string[];
    instructions: string;
  } | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [refiningLoading, setRefiningLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [hoverRow, setHoverRow] = useState<string | null>(null);
  
  // Store the current transforms when a carousel is clicked
  const [upperRowTransform, setUpperRowTransform] = useState<string>("");
  const [middleRowTransform, setMiddleRowTransform] = useState<string>("");
  const [lowerRowTransform, setLowerRowTransform] = useState<string>("");
  
  const { t, language } = useContext(LanguageContext);
  const navigate = useNavigate();

  // Upper row of recipes (scrolls right to left) - First set of unique recipes
  const upperRecipes = [
      t('meals_spaghettiCarbonara'), t('meals_grilledChickenRice'), t('meals_vegetableStirFry'), 
      t('meals_salmonLemonButter'), t('meals_beefTacos'),
      t('meals_mushroomRisotto'), t('meals_thaiGreenCurry'), t('meals_margheritaPizza'), 
      t('meals_beefStroganoff'), t('meals_greekSalad'),
      t('meals_butterChicken'), t('meals_stuffedBellPeppers'), t('meals_tunaCasserole'), 
      t('meals_eggplantParmesan'), t('meals_chickenFajitas'),
      t('meals_pulledPorkSandwiches'), t('meals_gnocchiPesto'), t('meals_spinachRicottaCannelloni'), 
      t('meals_bakedZiti'), t('meals_koreanBibimbap')
  ];

  // Middle row of recipes - Second set of unique recipes
  const middleRecipes = [
      t('meals_chickenAlfredo'), t('meals_tofuStirFry'), t('meals_beefAndBroccoli'), 
      t('meals_tunaSalad'), t('meals_bbqChickenPizza'),
      t('meals_eggFriedRice'), t('meals_bakedPotatoesCheese'), t('meals_chickpeaCurry'), 
      t('meals_meatballSubs'), t('meals_shreddedChickenEnchiladas'),
      t('meals_pastaBolognese'), t('meals_salmonTeriyaki'), t('meals_crispyTofuTacos'), 
      t('meals_eggplantStirFry'), t('meals_stuffedSweetPotatoes'),
      t('meals_veggieBurritoBowl'), t('meals_shrimpFriedRice'), t('meals_zoodleStirFry'), 
      t('meals_chickenPestoWrap'), t('meals_baconAndEggSandwich')
  ];

  // Lower row of recipes - Third set of unique recipes
  const lowerRecipes = [
      t('meals_chickenTikkaMasala'), t('meals_pestoPasta'), t('meals_lambKebabs'), 
      t('meals_shrimpScampi'), t('meals_caesarSalad'),
      t('meals_vegetableLasagna'), t('meals_teriyakiSalmon'), t('meals_beefBurgers'), 
      t('meals_padThai'), t('meals_mushroomWellington'),
      t('meals_hotAndSourSoup'), t('meals_bakedEggplant'), t('meals_friedChickenSandwich'), 
      t('meals_veggieSushi'), t('meals_sobaNoodlesWithVeggies'),
      t('meals_misoRamen'), t('meals_gingerPork'), t('meals_sesameChicken'), 
      t('meals_stuffedTomatoes'), t('meals_roastedBeetSalad')
  ];

  // Filtered recipes logic with unique meals per row
  const { filteredUpperRecipes, filteredMiddleRecipes, filteredLowerRecipes } = useMemo(() => {
    // If there's a search query, filter each row separately
    if (searchQuery) {
      const filteredUpper = upperRecipes.filter(recipe => 
        recipe && typeof recipe === 'string' && 
        recipe.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const filteredMiddle = middleRecipes.filter(recipe => 
        recipe && typeof recipe === 'string' && 
        recipe.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const filteredLower = lowerRecipes.filter(recipe => 
        recipe && typeof recipe === 'string' && 
        recipe.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Duplicate each row's filtered results for animation
      return {
        filteredUpperRecipes: [...filteredUpper, ...filteredUpper],
        filteredMiddleRecipes: [...filteredMiddle, ...filteredMiddle],
        filteredLowerRecipes: [...filteredLower, ...filteredLower],
      };
    }
    
    // If no search query, use the full sets of unique meals
    return {
      filteredUpperRecipes: [...upperRecipes, ...upperRecipes],
      filteredMiddleRecipes: [...middleRecipes, ...middleRecipes],
      filteredLowerRecipes: [...lowerRecipes, ...lowerRecipes],
    };
  }, [searchQuery, upperRecipes, middleRecipes, lowerRecipes, language]);

  // Function to capture the current position of a carousel
  const captureCarouselPosition = (rowType: string, event: React.MouseEvent) => {
    // Get the element that was clicked
    const target = event.currentTarget as HTMLElement;
    
    // Get the carousel container (parent element)
    const carouselContainer = target.parentElement;
    
    if (carouselContainer) {
      // Get computed style to capture current transform
      const style = window.getComputedStyle(carouselContainer);
      const transform = style.getPropertyValue('transform');
      
      // Store the transform based on row type
      if (rowType === 'upper') {
        setUpperRowTransform(transform);
      } else if (rowType === 'middle') {
        setMiddleRowTransform(transform);
      } else if (rowType === 'lower') {
        setLowerRowTransform(transform);
      }
    }
  };

  const fetchMealRecipe = async (mealName: string, rowType: string, event: React.MouseEvent) => {
    // Capture position first
    captureCarouselPosition(rowType, event);
    
    setLoading(true);
    setSelectedMeal(mealName);
    setMealResponse(null);
    setError(null);
    setActiveRow(rowType);

    try {
      const originalMealName = mealName.replace("meals_", "").split(/(?=[A-Z])/).join(" ");
      console.log("Sending meal name to API:", originalMealName);
      const response = await axios.post(`${API_BASE_URL}/get-recipe`, { meal: originalMealName });
      console.log("API Response:", response.data);
      
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

    try {
      const response = await axios.post(`${API_BASE_URL}/refine-recipe`, {
        meal: selectedMeal,
        issue: userInput,
      });
      setMealResponse(response.data);
      setUserInput("");
    } catch (error) {
      console.error("Error refining recipe:", error);
    } finally {
      setRefiningLoading(false);
    }
  };

  // Mouse event handlers for hovering
  const handleMouseEnter = (rowType: string) => {
    setHoverRow(rowType);
  };
  
  const handleMouseLeave = () => {
    setHoverRow(null);
  };

  const addToFavorites = () => {
    if (!selectedMeal) return;

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
    const isFavorite = favorites.some(fav => fav.nameKey === selectedMeal);
    
    if (!isFavorite) {
      const cleanMealName = selectedMeal.replace('meals_', '').split(/(?=[A-Z])/).join(' ');
      
      const newFavorite: FavoriteMeal = {
        id: Math.random().toString(36).substr(2, 9),
        nameKey: selectedMeal,
        image: `https://source.unsplash.com/400x300/?${cleanMealName.replace(/\s+/g, '-')}`,
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

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "var(--color-button-bg)",
        borderRadius: "12px",
        boxShadow: "0 4px 20px var(--color-card-shadow)",
        position: "relative"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2.2rem", color: "var(--color-text)", marginBottom: "0.5rem" }}>
          {t("chooseAMeal")}
        </h2>
        
        {/* Star Button - only show when a meal is selected */}
        {selectedMeal && (
          <button
            onClick={addToFavorites}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--color-button-bg)',
              color: '#4CAF50',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px var(--color-card-shadow)'
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

        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem", marginTop: 0 }}>
          {t("popularMeals")}
        </p>
        <div style={{ margin: "20px 0", width: "100%", maxWidth: "500px", marginLeft: "auto", marginRight: "auto", position: "relative", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder={t("searchMeals")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 20px",
              border: "2px solid var(--color-border)",
              borderRadius: "25px",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.3s ease",
              backgroundColor: "var(--color-button-bg)",
              color: "var(--color-text)",
              boxShadow: "0 2px 5px var(--color-card-shadow)",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", overflow: "hidden", position: "relative" }}>
        {/* Upper carousel */}
        <div 
          style={{ width: "100%", margin: "0 auto", overflow: "hidden", position: "relative" }}
          onMouseEnter={() => handleMouseEnter('upper')}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            style={{ 
              display: "flex", 
              gap: "15px", 
              padding: "10px 0", 
              width: "fit-content", 
              margin: "0 auto",
              animation: activeRow === 'upper' ? 'none' : 'scrollRightToLeft 120s linear infinite',
              animationPlayState: hoverRow === 'upper' ? 'paused' : 'running',
              transform: activeRow === 'upper' ? upperRowTransform : ''
            }}
          >
            {filteredUpperRecipes.map((meal, index) => (
              <button
                key={`upper-${index}`}
                onClick={(e) => fetchMealRecipe(meal, 'upper', e)}
                style={{
                  backgroundColor: selectedMeal === meal ? 'var(--color-primary)' : 'var(--color-button-bg)',
                  color: selectedMeal === meal ? 'white' : 'var(--color-text)',
                  fontWeight: 500,
                  padding: "0.8rem 1.5rem",
                  borderRadius: "30px",
                  border: `2px solid ${selectedMeal === meal ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>

        {/* Middle carousel */}
        <div 
          style={{ width: "100%", margin: "0 auto", overflow: "hidden", position: "relative" }}
          onMouseEnter={() => handleMouseEnter('middle')}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            style={{ 
              display: "flex", 
              gap: "15px", 
              padding: "10px 0", 
              width: "fit-content", 
              margin: "0 auto",
              animation: activeRow === 'middle' ? 'none' : 'scrollLeftToRight 120s linear infinite',
              animationPlayState: hoverRow === 'middle' ? 'paused' : 'running',
              transform: activeRow === 'middle' ? middleRowTransform : ''
            }}
          >
            {filteredMiddleRecipes.map((meal, index) => (
              <button
                key={`middle-${index}`}
                onClick={(e) => fetchMealRecipe(meal, 'middle', e)}
                style={{
                  backgroundColor: selectedMeal === meal ? 'var(--color-primary)' : 'var(--color-button-bg)',
                  color: selectedMeal === meal ? 'white' : 'var(--color-text)',
                  fontWeight: 500,
                  padding: "0.8rem 1.5rem",
                  borderRadius: "30px",
                  border: `2px solid ${selectedMeal === meal ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>

        {/* Lower carousel */}
        <div 
          style={{ width: "100%", margin: "0 auto", overflow: "hidden", position: "relative" }}
          onMouseEnter={() => handleMouseEnter('lower')}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            style={{ 
              display: "flex", 
              gap: "15px", 
              padding: "10px 0", 
              width: "fit-content", 
              margin: "0 auto",
              animation: activeRow === 'lower' ? 'none' : 'scrollRightToLeft 120s linear infinite',
              animationPlayState: hoverRow === 'lower' ? 'paused' : 'running',
              transform: activeRow === 'lower' ? lowerRowTransform : ''
            }}
          >
            {filteredLowerRecipes.map((meal, index) => (
              <button
                key={`lower-${index}`}
                onClick={(e) => fetchMealRecipe(meal, 'lower', e)}
                style={{
                  backgroundColor: selectedMeal === meal ? 'var(--color-primary)' : 'var(--color-button-bg)',
                  color: selectedMeal === meal ? 'white' : 'var(--color-text)',
                  fontWeight: 500,
                  padding: "0.8rem 1.5rem",
                  borderRadius: "30px",
                  border: `2px solid ${selectedMeal === meal ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", color: "#666" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid rgba(0, 0, 0, 0.1)",
              borderLeftColor: "#4CAF50",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "1rem",
            }}
          />
          <p>{t("loading")}</p>
        </div>
      )}

      {error && (
        <div style={{ margin: "2rem auto", padding: "1rem", backgroundColor: "#fff3f3", border: "1px solid #ffcdd2", borderRadius: "8px", maxWidth: "600px", textAlign: "center" }}>
          <p style={{ color: "#d32f2f", fontSize: "1.1rem", margin: 0 }}>{error}</p>
        </div>
      )}

      {mealResponse && (
        <div
          style={{
            marginTop: "1.5rem",
            backgroundColor: "var(--color-button-bg)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "inset 0 2px 8px var(--color-card-shadow)",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              color: "var(--color-text)",
              marginBottom: "1.5rem",
              paddingBottom: "0.8rem",
              borderBottom: "2px solid var(--color-border)",
            }}
          >
            {mealResponse.meal}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
            {/* Ingredients */}
            <div
              style={{
                backgroundColor: "var(--color-button-bg)",
                borderRadius: "8px",
                padding: "1.5rem",
                boxShadow: "0 2px 10px var(--color-card-shadow)",
              }}
            >
              <h4 style={{ color: "var(--color-text)", marginTop: 0, paddingBottom: "0.5rem", borderBottom: "1px solid var(--color-border)", fontSize: "1.3rem" }}>
                {t("ingredients")}
              </h4>
              <ul style={{ paddingLeft: "1.5rem", color: "var(--color-text-secondary)", marginTop: "1rem" }}>
                {Array.isArray(mealResponse.ingredients) ? (
                  mealResponse.ingredients.map((ingredient, idx) => (
                    <li key={idx} style={{ marginBottom: "0.5rem" }}>
                      {ingredient}
                    </li>
                  ))
                ) : (
                  <li>{t("noIngredients")}</li>
                )}
              </ul>
            </div>

            {/* Instructions */}
            <div
              style={{
                backgroundColor: "var(--color-button-bg)",
                borderRadius: "8px",
                padding: "1.5rem",
                boxShadow: "0 2px 10px var(--color-card-shadow)",
              }}
            >
              <h4 style={{ color: "var(--color-text)", marginTop: 0, paddingBottom: "0.5rem", borderBottom: "1px solid var(--color-border)", fontSize: "1.3rem" }}>
                {t("instructions")}
              </h4>
              <div
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                  padding: "1rem",
                  marginTop: "1rem",
                  backgroundColor: "var(--color-button-bg)",
                  borderRadius: "6px",
                }}
              >
                {mealResponse.instructions || t("noInstructions")}
              </div>
            </div>
          </div>

          {/* Refinement */}
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "var(--color-button-bg)",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 2px 10px var(--color-card-shadow)",
            }}
          >
            <h4 style={{ color: "var(--color-text)", marginTop: 0, marginBottom: "1rem" }}>
              {t("needAdjustments")}
            </h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder={t("refinementPlaceholder")}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.8rem 1rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  backgroundColor: "var(--color-button-bg)",
                }}
                disabled={refiningLoading}
              />
              {!refiningLoading ? (
                <button
                  onClick={refineRecipe}
                  disabled={!userInput}
                  style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    minWidth: "100px",
                    cursor: !userInput ? "not-allowed" : "pointer",
                    opacity: !userInput ? 0.7 : 1,
                  }}
                >
                  {t("askAI")}
                </button>
              ) : (
                <button
                  style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: "var(--color-border)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 500,
                    minWidth: "100px",
                  }}
                  disabled
                >
                  {t("aiThinking")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSelection;