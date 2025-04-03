import { useState, useMemo, useContext, useEffect } from "react";
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
    const [error, setError] = useState<string | null>(null);
    const { t, language } = useContext(LanguageContext);

    // Add useEffect to debug mealResponse changes
    useEffect(() => {
        console.log('mealResponse changed:', mealResponse);
    }, [mealResponse]);

    // Upper row of recipes (scrolls right to left)
    const upperRecipes = [
        t('meals_spaghettiCarbonara'), t('meals_grilledChickenRice'), t('meals_vegetableStirFry'), 
        t('meals_salmonLemonButter'), t('meals_beefTacos'),
        t('meals_mushroomRisotto'), t('meals_thaiGreenCurry'), t('meals_margheritaPizza'), 
        t('meals_beefStroganoff'), t('meals_greekSalad'),
        t('meals_butterChicken'), t('meals_stuffedBellPeppers'), t('meals_tunaCasserole'), 
        t('meals_eggplantParmesan'), t('meals_chickenFajitas'),
        t('meals_pulledPorkSandwiches'), t('meals_gnocchiPesto'), t('meals_spinachRicottaCannelloni'), 
        t('meals_bakedZiti'), t('meals_koreanBibimbap'),
        t('meals_bangersAndMash'), t('meals_jambalaya'), t('meals_moroccanTagine'), 
        t('meals_fishAndChips'), t('meals_bakedMacAndCheese'),
        t('meals_chiliConCarne'), t('meals_ratatouille'), t('meals_bulgogiBeef'), 
        t('meals_quicheLorraine'), t('meals_pho'),
        t('meals_paella'), t('meals_sweetAndSourChicken'), t('meals_porkSchnitzel'), 
        t('meals_fettuccineAlfredo'),
        t('meals_tandooriChicken'), t('meals_zucchiniNoodlesMarinara'), t('meals_lentilSoup'), 
        t('meals_shepherdsPie'), t('meals_falafelWraps'),
        t('meals_ceviche'), t('meals_steakFrites'), t('meals_chickenKatsuCurry'), 
        t('meals_nasiGoreng'), t('meals_gyozaDumplings'),
        t('meals_risottoMilanese'), t('meals_beefWellington'), t('meals_chickenParmesan'), 
        t('meals_croqueMonsieur'), t('meals_roastDuckOrangeSauce'),
        t('meals_coconutChickenCurry'), t('meals_moussaka'), t('meals_shrimpTacos'), 
        t('meals_avocadoToast'), t('meals_kimchiFriedRice'),
        t('meals_lasagna'), t('meals_japaneseCurry'), t('meals_calamari'), 
        t('meals_chickenShawarma'), t('meals_porkRamen'),
        t('meals_steamedDumplings'), t('meals_vietnameseBanhMi'), t('meals_beefEnchiladas'), 
        t('meals_bruschetta'), t('meals_chickenCacciatore'),
        t('meals_pulledJackfruitTacos'), t('meals_tortelliniAlfredo'), t('meals_gingerChickenStirFry'), 
        t('meals_barbacoaBeef'), t('meals_steakQuesadilla'),
        t('meals_sushiRolls'), t('meals_okonomiyaki'), t('meals_mapoTofu'), 
        t('meals_shakshuka'), t('meals_halloumiBurgers'),
        t('meals_chickenCaesarWraps'), t('meals_turkeyMeatballs'), t('meals_pastaPrimavera'), 
        t('meals_tofuPadSeeEw'), t('meals_arrozConPollo'),
        t('meals_crabCakes'), t('meals_gumbo'), t('meals_biryani'), 
        t('meals_beefBulgogiBowls'), t('meals_hoisinDuckWraps'),
        t('meals_spinachPie'), t('meals_chickenPotPie'), t('meals_bakedFalafel'), 
        t('meals_prawnLinguine'), t('meals_charSiuPork'),
        t('meals_capreseSalad'), t('meals_cottagePie'), t('meals_stuffedCabbageRolls'), 
        t('meals_tempuraUdon'), t('meals_hamAndCheeseCroquettes'),
        t('meals_frenchOnionSoup'), t('meals_sobaNoodleBowl'), t('meals_grilledSeaBass'), 
        t('meals_pekingDuck'), t('meals_seafoodPaella'),
        t('meals_polentaMushrooms'), t('meals_beetrootSalad'), t('meals_chickenTagine'), 
        t('meals_vegetarianChili'), t('meals_stuffedMushrooms')
    ];

    // Middle row of recipes
    const middleRecipes = [
        t('meals_chickenAlfredo'), t('meals_tofuStirFry'), t('meals_beefAndBroccoli'), 
        t('meals_tunaSalad'), t('meals_bbqChickenPizza'),
        t('meals_eggFriedRice'), t('meals_bakedPotatoesCheese'), t('meals_chickpeaCurry'), 
        t('meals_meatballSubs'), t('meals_shreddedChickenEnchiladas'),
        t('meals_pastaBolognese'), t('meals_salmonTeriyaki'), t('meals_crispyTofuTacos'), 
        t('meals_eggplantStirFry'), t('meals_stuffedSweetPotatoes'),
        t('meals_veggieBurritoBowl'), t('meals_shrimpFriedRice'), t('meals_zoodleStirFry'), 
        t('meals_chickenPestoWrap'), t('meals_baconAndEggSandwich'),
        t('meals_garlicButterShrimp'), t('meals_frenchToast'), t('meals_huevosRancheros'), 
        t('meals_sweetPotatoCurry'), t('meals_spinachRavioli'),
        t('meals_tomYumSoup'), t('meals_spicyChickenRamen'), t('meals_kimchiStew'), 
        t('meals_stuffedZucchiniBoats'), t('meals_turkeyClubSandwich'),
        t('meals_tortillaEspanola'), t('meals_beefJerkyRiceBowl'), t('meals_chiliTofu'), 
        t('meals_cucumberSandwiches'), t('meals_japaneseTamagoyaki'),
        t('meals_blackBeanBurgers'), t('meals_katsuSando'), t('meals_eggCurry'), 
        t('meals_fishTikka'), t('meals_bulgurWheatSalad'),
        t('meals_vegetarianTacos'), t('meals_baconMacAndCheese'), t('meals_creamyMushroomPasta'), 
        t('meals_chickenGyros'), t('meals_pitaWithHummus'),
        t('meals_cranberryChickenSalad'), t('meals_pineappleFriedRice'), t('meals_mangoChickenWraps'), 
        t('meals_lambRoganJosh'), t('meals_crabLinguine'),
        t('meals_clamChowder'), t('meals_spinachAndFetaQuesadilla'), t('meals_potatoLeekSoup'), 
        t('meals_roastBeefSandwich'), t('meals_avocadoChickenBowl'),
        t('meals_sourdoughGrilledCheese'), t('meals_srirachaNoodles'), t('meals_kaleCaesarSalad'), 
        t('meals_pestoZoodles'), t('meals_chiliMac'),
        t('meals_shrimpLettuceWraps'), t('meals_chickenLettuceWraps'), t('meals_burrataSalad'), 
        t('meals_panzanella'), t('meals_picoDeGalloChicken'),
        t('meals_salmonCakes'), t('meals_yakisoba'), t('meals_porkBellyBuns'), 
        t('meals_greenLentilSalad'), t('meals_veganPokeBowl'),
        t('meals_creamyCauliflowerSoup'), t('meals_chickenNoodleSoup'), t('meals_broccoliCheddarSoup'), 
        t('meals_shiitakeFriedRice'), t('meals_smashedChickpeaSalad'),
        t('meals_veganShepherdsPie'), t('meals_bbqTempehWraps'), t('meals_orangeChicken'), 
        t('meals_pineappleChicken'), t('meals_coconutShrimpCurry'),
        t('meals_garlicNaanWithChole'), t('meals_mexicanRiceBowl'), t('meals_buffaloChickenSandwich'), 
        t('meals_pestoChickenPizza'), t('meals_steamedBaoBuns'),
        t('meals_thaiBasilChicken'), t('meals_cornbreadAndChili'), t('meals_cheesyBroccoliBake'), 
        t('meals_beefKofta'), t('meals_roastedCauliflowerTacos'),
        t('meals_mangoAvocadoSalad'), t('meals_lemonGarlicPasta'), t('meals_roastedVegetableFlatbread'), 
        t('meals_chickenAvocadoSandwich'), t('meals_eggSaladSandwich'),
        t('meals_cubanSandwich'), t('meals_shrimpGrits'), t('meals_pumpkinRisotto'), 
        t('meals_lambMoussaka'), t('meals_italianSub')
    ];

    // Lower row of recipes (scrolls left to right)
    const lowerRecipes = [
        t('meals_chickenTikkaMasala'), t('meals_pestoPasta'), t('meals_lambKebabs'), 
        t('meals_shrimpScampi'), t('meals_caesarSalad'),
        t('meals_vegetableLasagna'), t('meals_teriyakiSalmon'), t('meals_beefBurgers'), 
        t('meals_padThai'), t('meals_mushroomWellington'),
        t('meals_hotAndSourSoup'), t('meals_bakedEggplant'), t('meals_friedChickenSandwich'), 
        t('meals_veggieSushi'), t('meals_sobaNoodlesWithVeggies'),
        t('meals_misoRamen'), t('meals_gingerPork'), t('meals_sesameChicken'), 
        t('meals_stuffedTomatoes'), t('meals_roastedBeetSalad'),
        t('meals_nicoiseSalad'), t('meals_beefCurry'), t('meals_salmonAvocadoRoll'), 
        t('meals_tofuCurry'), t('meals_baconWrappedDates'),
        t('meals_avocadoEggSalad'), t('meals_roastedTurkeyBreast'), t('meals_spaghettiAglioEOlio'), 
        t('meals_veganMacAndCheese'), t('meals_sweetPotatoFries'),
        t('meals_brusselsSproutsWithBacon'), t('meals_couscousSalad'), t('meals_lobsterBisque'), 
        t('meals_trufflePasta'), t('meals_ricottaPancakes'),
        t('meals_blueberryWaffles'), t('meals_grilledShrimpSkewers'), t('meals_spaghettiWithMeatballs'), 
        t('meals_frenchCrepes'), t('meals_bbqRibs'),
        t('meals_kaleAndQuinoaSalad'), t('meals_eggplantCaponata'), t('meals_cauliflowerSteak'), 
        t('meals_sweetcornFritters'), t('meals_shrimpTacosWithSlaw'),
        t('meals_crabFriedRice'), t('meals_garlicChickenThighs'), t('meals_lambSouvlaki'), 
        t('meals_texMexBowl'), t('meals_baconFriedRice'),
        t('meals_ovenBakedFalafel'), t('meals_smokedSalmonBagel'), t('meals_jerkChicken'), 
        t('meals_tomatoBasilSoup'), t('meals_pineappleChickenRice'),
        t('meals_stuffedPortobelloMushrooms'), t('meals_chickenYakisoba'), t('meals_ramenWithSoftBoiledEgg'), 
        t('meals_moroccanCouscous'), t('meals_lemonDillChicken'),
        t('meals_chimichurriSteak'), t('meals_chickenAndDumplings'), t('meals_searedScallops'), 
        t('meals_italianWeddingSoup'), t('meals_spinachArtichokePasta'),
        t('meals_spicyTunaRoll'), t('meals_mangoSalsaChicken'), t('meals_garlicParmesanWings'), 
        t('meals_broccoliStirFry'), t('meals_cabbageRolls'),
        t('meals_shreddedPorkTacos'), t('meals_fajitaBowl'), t('meals_pumpkinSoup'), 
        t('meals_beefAndBeanBurritos'), t('meals_cornFritters'),
        t('meals_vietnameseSpringRolls'), t('meals_chickenPestoPasta'), t('meals_steamedMussels'), 
        t('meals_roastedChickpeas'), t('meals_koreanFriedChicken'),
        t('meals_porkGyoza'), t('meals_miniQuiches'), t('meals_thaiLarb'), 
        t('meals_shrimpToast'), t('meals_avocadoCornSalad'),
        t('meals_veggieStirFryNoodles'), t('meals_brieAndAppleSandwich'), t('meals_savoryCrepes'), 
        t('meals_duckConfit'), t('meals_gheeRoastChicken'),
        t('meals_paprikaChicken'), t('meals_okraAndTomatoes'), t('meals_smokedBrisket'), 
        t('meals_szechuanTofu'), t('meals_beefTeriyaki'),
        t('meals_pineappleSalsaFish'), t('meals_creamedSpinach'), t('meals_tunaMelt'), 
        t('meals_artichokePizza'), t('meals_garlicRoastedPotatoes')
    ];

    // Memoize the filtered recipes to prevent unnecessary recalculations
    const { filteredUpperRecipes, filteredMiddleRecipes, filteredLowerRecipes } = useMemo(() => {
        const allRecipes = [...upperRecipes, ...middleRecipes, ...lowerRecipes].filter(recipe => recipe && typeof recipe === 'string');
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
    }, [searchQuery, upperRecipes, middleRecipes, lowerRecipes, language]);

    const fetchMealRecipe = async (mealName: string) => {
        setLoading(true);
        setSelectedMeal(mealName);
        setMealResponse(null);
        setError(null);

        try {
            // Get the original meal name by removing the 'meals_' prefix
            const originalMealName = mealName.replace('meals_', '');
            console.log('Sending meal name to API:', originalMealName);
            
            const response = await axios.post(`${API_BASE_URL}/get-recipe`, { meal: originalMealName });
            console.log('API Response:', response.data);
            
            // Log the state before update
            console.log('Current mealResponse state:', mealResponse);
            
            setMealResponse(response.data);
            
            // Log after state update (will show in next render)
            console.log('Updated mealResponse state:', response.data);
        } catch (error) {
            console.error("Error fetching meal recipe:", error);
            if (axios.isAxiosError(error)) {
                console.error("Error details:", error.response?.data);
                
                // Check if it's a rate limit error
                if (error.response?.data?.details?.includes('UserByModelByDay')) {
                    setError(t('aiRateLimitError') || 'The AI service is currently busy. Please try again in a few minutes.');
                } else {
                    setError(t('errorFetchingRecipe') || 'Error fetching recipe. Please try again.');
                }
            } else {
                setError(t('errorFetchingRecipe') || 'Error fetching recipe. Please try again.');
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

            {error && (
                <div className="error-container">
                    <p className="error-message">{error}</p>
                </div>
            )}

            {mealResponse && (
                <div className="recipe-details" style={{ display: 'block' }}>
                    <h3 className="recipe-title">{mealResponse.meal}</h3>
                    
                    <div className="recipe-content">
                        <div className="ingredients-section">
                            <h4>{t('ingredients')}</h4>
                            <ul className="ingredients-list">
                                {Array.isArray(mealResponse.ingredients) ? (
                                    mealResponse.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))
                                ) : (
                                    <li>{t('noIngredients')}</li>
                                )}
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
                                <button className="refinement-button" disabled>
                                    {t('aiThinking')}
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
