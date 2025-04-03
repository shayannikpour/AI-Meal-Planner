import { useState, useMemo, useContext } from "react";
import axios from "axios";
import { LanguageContext } from '../App';
import "./MealSelection.css";

const API_BASE_URL = "http://localhost:8000/api"; // Laravel API base URL

const MealSelection = () => {
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [mealResponse, setMealResponse] = useState<{ meal: string, ingredients: string[], instructions: string } | null>(null);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [refiningLoading, setRefiningLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useContext(LanguageContext);

    // Upper row of recipes (scrolls right to left)
    const upperRecipes = [
        "Spaghetti Carbonara", "Grilled Chicken with Rice", "Vegetable Stir-Fry", "Salmon with Lemon Butter", "Beef Tacos",
        "Mushroom Risotto", "Thai Green Curry", "Margherita Pizza", "Beef Stroganoff", "Greek Salad",
        "Butter Chicken", "Stuffed Bell Peppers", "Tuna Casserole", "Eggplant Parmesan", "Chicken Fajitas",
        "Pulled Pork Sandwiches", "Gnocchi with Pesto", "Spinach and Ricotta Cannelloni", "Baked Ziti", "Korean Bibimbap",
        "Bangers and Mash", "Jambalaya", "Moroccan Tagine", "Fish and Chips", "Baked Mac and Cheese",
        "Chili Con Carne", "Ratatouille", "Bulgogi Beef", "Quiche Lorraine", "Pho",
        "Paella", "Sweet and Sour Chicken", "Pork Schnitzel", "Fettuccine Alfredo",
        "Tandoori Chicken", "Zucchini Noodles with Marinara", "Lentil Soup", "Shepherd's Pie", "Falafel Wraps",
        "Ceviche", "Steak Frites", "Chicken Katsu Curry", "Nasi Goreng", "Gyoza Dumplings",
        "Risotto alla Milanese", "Beef Wellington", "Chicken Parmesan", "Croque Monsieur", "Roast Duck with Orange Sauce",
        "Coconut Chicken Curry", "Moussaka", "Shrimp Tacos", "Avocado Toast", "Kimchi Fried Rice",
        "Lasagna", "Japanese Curry", "Calamari", "Chicken Shawarma", "Pork Ramen",
        "Steamed Dumplings", "Vietnamese Banh Mi", "Beef Enchiladas", "Bruschetta", "Chicken Cacciatore",
        "Pulled Jackfruit Tacos", "Tortellini Alfredo", "Ginger Chicken Stir Fry", "Barbacoa Beef", "Steak Quesadilla",
        "Sushi Rolls", "Okonomiyaki", "Mapo Tofu", "Shakshuka", "Halloumi Burgers",
        "Chicken Caesar Wraps", "Turkey Meatballs", "Pasta Primavera", "Tofu Pad See Ew", "Arroz con Pollo",
        "Crab Cakes", "Gumbo", "Biryani", "Beef Bulgogi Bowls", "Hoisin Duck Wraps",
        "Spinach Pie", "Chicken Pot Pie", "Baked Falafel", "Prawn Linguine", "Char Siu Pork",
        "Caprese Salad", "Cottage Pie", "Stuffed Cabbage Rolls", "Tempura Udon", "Ham and Cheese Croquettes",
        "French Onion Soup", "Soba Noodle Bowl", "Grilled Sea Bass", "Peking Duck", "Seafood Paella",
        "Polenta with Mushrooms", "Beetroot Salad", "Chicken Tagine", "Vegetarian Chili", "Stuffed Mushrooms"
    ];
    

    const middleRecipes = [
        "Chicken Alfredo", "Tofu Stir-Fry", "Beef and Broccoli", "Tuna Salad", "BBQ Chicken Pizza",
        "Egg Fried Rice", "Baked Potatoes with Cheese", "Chickpea Curry", "Meatball Subs", "Shredded Chicken Enchiladas",
        "Pasta Bolognese", "Salmon Teriyaki", "Crispy Tofu Tacos", "Eggplant Stir Fry", "Stuffed Sweet Potatoes",
        "Veggie Burrito Bowl", "Shrimp Fried Rice", "Zoodle Stir-Fry", "Chicken Pesto Wrap", "Bacon and Egg Sandwich",
        "Garlic Butter Shrimp", "French Toast", "Huevos Rancheros", "Sweet Potato Curry", "Spinach Ravioli",
        "Tom Yum Soup", "Spicy Chicken Ramen", "Kimchi Stew", "Stuffed Zucchini Boats", "Turkey Club Sandwich",
        "Tortilla Española", "Beef Jerky Rice Bowl", "Chili Tofu", "Cucumber Sandwiches", "Japanese Tamagoyaki",
        "Black Bean Burgers", "Katsu Sando", "Egg Curry", "Fish Tikka", "Bulgur Wheat Salad",
        "Vegetarian Tacos", "Bacon Mac and Cheese", "Creamy Mushroom Pasta", "Chicken Gyros", "Pita with Hummus",
        "Cranberry Chicken Salad", "Pineapple Fried Rice", "Mango Chicken Wraps", "Lamb Rogan Josh", "Crab Linguine",
        "Clam Chowder", "Spinach and Feta Quesadilla", "Potato Leek Soup", "Roast Beef Sandwich", "Avocado Chicken Bowl",
        "Sourdough Grilled Cheese", "Sriracha Noodles", "Kale Caesar Salad", "Pesto Zoodles", "Chili Mac",
        "Shrimp Lettuce Wraps", "Chicken Lettuce Wraps", "Burrata Salad", "Panzanella", "Pico de Gallo Chicken",
        "Salmon Cakes", "Yakisoba", "Pork Belly Buns", "Green Lentil Salad", "Vegan Poke Bowl",
        "Creamy Cauliflower Soup", "Chicken Noodle Soup", "Broccoli Cheddar Soup", "Shiitake Fried Rice", "Smashed Chickpea Salad",
        "Vegan Shepherd's Pie", "BBQ Tempeh Wraps", "Orange Chicken", "Pineapple Chicken", "Coconut Shrimp Curry",
        "Garlic Naan with Chole", "Mexican Rice Bowl", "Buffalo Chicken Sandwich", "Pesto Chicken Pizza", "Steamed Bao Buns",
        "Thai Basil Chicken", "Cornbread and Chili", "Cheesy Broccoli Bake", "Beef Kofta", "Roasted Cauliflower Tacos",
        "Mango Avocado Salad", "Lemon Garlic Pasta", "Roasted Vegetable Flatbread", "Chicken Avocado Sandwich", "Egg Salad Sandwich",
        "Cuban Sandwich", "Shrimp Grits", "Pumpkin Risotto", "Lamb Moussaka", "Italian Sub"
    ];
    

    // Lower row of recipes (scrolls left to right)
    const lowerRecipes = [
        "Chicken Tikka Masala", "Pesto Pasta", "Lamb Kebabs", "Shrimp Scampi", "Caesar Salad",
        "Vegetable Lasagna", "Teriyaki Salmon", "Beef Burgers", "Pad Thai", "Mushroom Wellington",
        "Hot and Sour Soup", "Baked Eggplant", "Fried Chicken Sandwich", "Veggie Sushi", "Soba Noodles with Veggies",
        "Miso Ramen", "Ginger Pork", "Sesame Chicken", "Stuffed Tomatoes", "Roasted Beet Salad",
        "Nicoise Salad", "Beef Curry", "Salmon Avocado Roll", "Tofu Curry", "Bacon Wrapped Dates",
        "Avocado Egg Salad", "Roasted Turkey Breast", "Spaghetti Aglio e Olio", "Vegan Mac and Cheese", "Sweet Potato Fries",
        "Brussels Sprouts with Bacon", "Couscous Salad", "Lobster Bisque", "Truffle Pasta", "Ricotta Pancakes",
        "Blueberry Waffles", "Grilled Shrimp Skewers", "Spaghetti with Meatballs", "French Crepes", "BBQ Ribs",
        "Kale and Quinoa Salad", "Eggplant Caponata", "Cauliflower Steak", "Sweetcorn Fritters", "Shrimp Tacos with Slaw",
        "Crab Fried Rice", "Garlic Chicken Thighs", "Lamb Souvlaki", "Tex-Mex Bowl", "Bacon Fried Rice",
        "Oven-Baked Falafel", "Smoked Salmon Bagel", "Jerk Chicken", "Tomato Basil Soup", "Pineapple Chicken Rice",
        "Stuffed Portobello Mushrooms", "Chicken Yakisoba", "Ramen with Soft-Boiled Egg", "Moroccan Couscous", "Lemon Dill Chicken",
        "Chimichurri Steak", "Chicken and Dumplings", "Seared Scallops", "Italian Wedding Soup", "Spinach Artichoke Pasta",
        "Spicy Tuna Roll", "Mango Salsa Chicken", "Garlic Parmesan Wings", "Broccoli Stir Fry", "Cabbage Rolls",
        "Shredded Pork Tacos", "Fajita Bowl", "Pumpkin Soup", "Beef and Bean Burritos", "Corn Fritters",
        "Vietnamese Spring Rolls", "Chicken Pesto Pasta", "Steamed Mussels", "Roasted Chickpeas", "Korean Fried Chicken",
        "Pork Gyoza", "Mini Quiches", "Thai Larb", "Shrimp Toast", "Avocado Corn Salad",
        "Veggie Stir Fry Noodles", "Brie and Apple Sandwich", "Savory Crepes", "Duck Confit", "Ghee Roast Chicken",
        "Paprika Chicken", "Okra and Tomatoes", "Smoked Brisket", "Szechuan Tofu", "Beef Teriyaki",
        "Pineapple Salsa Fish", "Creamed Spinach", "Tuna Melt", "Artichoke Pizza", "Garlic Roasted Potatoes"
    ];
    

    // Memoize the filtered recipes to prevent unnecessary recalculations
    const { filteredUpperRecipes, filteredMiddleRecipes, filteredLowerRecipes } = useMemo(() => {
        const allRecipes = [...upperRecipes, ...lowerRecipes];
        const filteredRecipes = allRecipes.filter(recipe => 
            recipe.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Ensure we have enough items for smooth scrolling by duplicating the filtered results
        const duplicatedFilteredRecipes = [...filteredRecipes, ...filteredRecipes];
        
        return {
            filteredUpperRecipes: duplicatedFilteredRecipes.filter((_, index) => index % 35 === 0),
            filteredMiddleRecipes: duplicatedFilteredRecipes.filter((_, index) => index % 35 === 0),
            filteredLowerRecipes: duplicatedFilteredRecipes.filter((_, index) => index % 35 === 1)
        };
    }, [searchQuery, upperRecipes, middleRecipes, lowerRecipes]);

    const fetchMealRecipe = async (mealName: string) => {
        setLoading(true);
        setSelectedMeal(mealName);
        setMealResponse(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/get-recipe`, { meal: mealName });
            setMealResponse(response.data);
        } catch (error) {
            console.error("Error fetching meal recipe:", error);
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
            setUserInput(""); // Clear input after sending request
        } catch (error) {
            console.error("Error refining recipe:", error);
        } finally {
            setRefiningLoading(false);
        }
    };

    return (
        <div className="meal-selection-container">
            <div className="meal-selection-header">
                <h2>{t('chooseAMeal')}</h2>
                <p className="subtitle">{t('popularMeals')}</p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={t('searchMeals')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="recipe-carousel-container">
                <div className="recipe-carousel upper-carousel">
                    <div className="carousel-inner">
                        {filteredUpperRecipes.map((meal, index) => (
                            <button 
                                key={`upper-${index}`} 
                                onClick={() => fetchMealRecipe(meal)}
                                className={`meal-option-btn ${selectedMeal === meal ? 'active' : ''}`}
                            >
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="recipe-carousel middle-carousel">
                    <div className="carousel-inner">
                        {filteredMiddleRecipes.map((meal, index) => (
                            <button 
                                key={`middle-${index}`} 
                                onClick={() => fetchMealRecipe(meal)}
                                className={`meal-option-btn ${selectedMeal === meal ? 'active' : ''}`}
                            >
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="recipe-carousel lower-carousel">
                    <div className="carousel-inner">
                        {filteredLowerRecipes.map((meal, index) => (
                            <button 
                                key={`lower-${index}`} 
                                onClick={() => fetchMealRecipe(meal)}
                                className={`meal-option-btn ${selectedMeal === meal ? 'active' : ''}`}
                            >
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>{t('loading')}</p>
                </div>
            )}

            {mealResponse && (
                <div className="recipe-details">
                    <h3 className="recipe-title">{mealResponse.meal}</h3>
                    
                    <div className="recipe-content">
                        <div className="ingredients-section">
                            <h4>{t('ingredients')}</h4>
                            <ul className="ingredients-list">
                                {mealResponse.ingredients?.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                )) || <li>{t('noIngredients')}</li>}
                            </ul>
                        </div>
                        
                        <div className="instructions-section">
                            <h4>{t('instructions')}</h4>
                            <div className="instructions-text">
                                {mealResponse.instructions || t('noInstructions')}
                            </div>
                        </div>
                    </div>

                    <div className="recipe-refinement">
                        <h4>{t('needAdjustments')}</h4>
                        <div className="refinement-input-group">
                            <input
                                type="text"
                                placeholder={t('refinementPlaceholder')}
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="refinement-input"
                                disabled={refiningLoading}
                            />
                            {!refiningLoading ? (
                                <button 
                                    onClick={refineRecipe} 
                                    disabled={!userInput} 
                                    className="refinement-button"
                                >
                                    {t('askAI')}
                                </button>
                            ) : (
                                <div className="refinement-loading-button">
                                    <div className="refinement-loading-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <span>{t('aiThinking')}</span>
                                </div>
                            )}
                        </div>
                        {refiningLoading && (
                            <div className="refinement-loading-message">
                                {t('customizingRecipe')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealSelection;
