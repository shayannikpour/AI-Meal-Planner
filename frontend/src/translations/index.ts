import { useContext } from 'react';
import { LanguageContext } from '../App';

export const useTranslation = () => {
  const { t } = useContext(LanguageContext);
  return { t };
};

interface Translations {
    [key: string]: {
        welcome: string;
        startMealPlanning: string;
        chooseAMeal: string;
        back: string;
        favorites: string;
        addToFavorites: string;
        noFavorites: string;
        teamMembers: string;
        // Meal Selection translations
        popularMeals: string;
        loadMore: string;
        loading: string;
        searchMeals: string;
        ingredients: string;
        noIngredients: string;
        instructions: string;
        noInstructions: string;
        needAdjustments: string;
        refinementPlaceholder: string;
        askAI: string;
        aiThinking: string;
        customizingRecipe: string;
        // Ingredient Selector translations
        selectIngredients: string;
        searchIngredients: string;
        selectedIngredients: string;
        generateMeal: string;
        dietaryTags: string;
        weightLoss: string;
        muscleGain: string;
        ketoFriendly: string;
        vegan: string;
        vegetarian: string;
        glutenFree: string;
        quickEasy: string;
        budgetFriendly: string;
        chooseIngredients: string;
        noIngredientsSelected: string;
        generatingMeal: string;
        findingRecipe: string;
        // Ingredient translations
        ingredients_tomatoes: string;
        ingredients_onions: string;
        ingredients_garlic: string;
        ingredients_bellPeppers: string;
        ingredients_carrots: string;
        ingredients_broccoli: string;
        ingredients_spinach: string;
        ingredients_lettuce: string;
        ingredients_mushrooms: string;
        ingredients_zucchini: string;
        ingredients_eggplant: string;
        ingredients_cucumber: string;
        ingredients_celery: string;
        ingredients_asparagus: string;
        ingredients_sweetPotatoes: string;
        ingredients_potatoes: string;
        ingredients_corn: string;
        ingredients_greenBeans: string;
        ingredients_peas: string;
        ingredients_cauliflower: string;
        pleaseSelectIngredient: string;
        // Meal translations
        meals_spaghettiCarbonara: string;
        meals_grilledChickenRice: string;
        meals_vegetableStirFry: string;
        meals_salmonLemonButter: string;
        meals_beefTacos: string;
        meals_mushroomRisotto: string;
        meals_thaiGreenCurry: string;
        meals_margheritaPizza: string;
        meals_beefStroganoff: string;
        meals_greekSalad: string;
        meals_butterChicken: string;
        meals_stuffedBellPeppers: string;
        meals_tunaCasserole: string;
        meals_eggplantParmesan: string;
        meals_chickenFajitas: string;
        meals_pulledPorkSandwiches: string;
        meals_gnocchiPesto: string;
        meals_spinachRicottaCannelloni: string;
        meals_bakedZiti: string;
        meals_koreanBibimbap: string;
        meals_bangersAndMash: string;
        meals_jambalaya: string;
        meals_moroccanTagine: string;
        meals_fishAndChips: string;
        meals_bakedMacAndCheese: string;
        meals_chiliConCarne: string;
        meals_ratatouille: string;
        meals_bulgogiBeef: string;
        meals_quicheLorraine: string;
        meals_pho: string;
        meals_paella: string;
        meals_sweetAndSourChicken: string;
        meals_porkSchnitzel: string;
        meals_fettuccineAlfredo: string;
        meals_tandooriChicken: string;
        meals_zucchiniNoodlesMarinara: string;
        meals_lentilSoup: string;
        meals_shepherdsPie: string;
        meals_ceviche: string;
        meals_steakFrites: string;
        meals_chickenKatsuCurry: string;
        meals_nasiGoreng: string;
        meals_gyozaDumplings: string;
        meals_risottoMilanese: string;
        meals_beefWellington: string;
        meals_chickenParmesan: string;
        meals_croqueMonsieur: string;
        meals_roastDuckOrangeSauce: string;
        meals_coconutChickenCurry: string;
        meals_moussaka: string;
        meals_shrimpTacos: string;
        meals_avocadoToast: string;
        meals_kimchiFriedRice: string;
        meals_lasagna: string;
        meals_japaneseCurry: string;
        meals_calamari: string;
        meals_chickenShawarma: string;
        meals_porkRamen: string;
        meals_steamedDumplings: string;
        meals_vietnameseBanhMi: string;
        meals_beefEnchiladas: string;
        meals_bruschetta: string;
        meals_chickenCacciatore: string;
        meals_pulledJackfruitTacos: string;
        meals_tortelliniAlfredo: string;
        meals_gingerChickenStirFry: string;
        meals_barbacoaBeef: string;
        meals_steakQuesadilla: string;
        meals_sushiRolls: string;
        meals_okonomiyaki: string;
        meals_mapoTofu: string;
        meals_shakshuka: string;
        meals_halloumiBurgers: string;
        meals_chickenCaesarWraps: string;
        meals_turkeyMeatballs: string;
        meals_pastaPrimavera: string;
        meals_tofuPadSeeEw: string;
        meals_arrozConPollo: string;
        meals_crabCakes: string;
        meals_gumbo: string;
        meals_biryani: string;
        meals_beefBulgogiBowls: string;
        meals_hoisinDuckWraps: string;
        meals_spinachPie: string;
        meals_chickenPotPie: string;
        meals_bakedFalafel: string;
        meals_prawnLinguine: string;
        meals_charSiuPork: string;
        meals_capreseSalad: string;
        meals_cottagePie: string;
        meals_stuffedCabbageRolls: string;
        meals_tempuraUdon: string;
        meals_hamAndCheeseCroquettes: string;
        meals_frenchOnionSoup: string;
        meals_sobaNoodleBowl: string;
        meals_grilledSeaBass: string;
        meals_pekingDuck: string;
        meals_seafoodPaella: string;
        meals_polentaMushrooms: string;
        meals_beetrootSalad: string;
        meals_chickenTagine: string;
        meals_vegetarianChili: string;
        meals_stuffedMushrooms: string;
        meals_chickenAlfredo: string;
        meals_tofuStirFry: string;
        meals_beefAndBroccoli: string;
        meals_tunaSalad: string;
        meals_bbqChickenPizza: string;
        meals_eggFriedRice: string;
        meals_bakedPotatoesCheese: string;
        meals_chickpeaCurry: string;
        meals_meatballSubs: string;
        meals_shreddedChickenEnchiladas: string;
        meals_pastaBolognese: string;
        meals_salmonTeriyaki: string;
        meals_crispyTofuTacos: string;
        meals_eggplantStirFry: string;
        meals_stuffedSweetPotatoes: string;
        meals_veggieBurritoBowl: string;
        meals_shrimpFriedRice: string;
        meals_zoodleStirFry: string;
        meals_chickenPestoWrap: string;
        meals_baconAndEggSandwich: string;
        meals_garlicButterShrimp: string;
        meals_frenchToast: string;
        meals_huevosRancheros: string;
        meals_sweetPotatoCurry: string;
        meals_spinachRavioli: string;
        meals_tomYumSoup: string;
        meals_spicyChickenRamen: string;
        meals_kimchiStew: string;
        meals_stuffedZucchiniBoats: string;
        meals_turkeyClubSandwich: string;
        meals_tortillaEspanola: string;
        meals_beefJerkyRiceBowl: string;
        meals_chiliTofu: string;
        meals_cucumberSandwiches: string;
        meals_japaneseTamagoyaki: string;
        meals_blackBeanBurgers: string;
        meals_katsuSando: string;
        meals_eggCurry: string;
        meals_fishTikka: string;
        meals_bulgurWheatSalad: string;
        meals_vegetarianTacos: string;
        meals_baconMacAndCheese: string;
        meals_creamyMushroomPasta: string;
        meals_chickenGyros: string;
        meals_pitaWithHummus: string;
        meals_cranberryChickenSalad: string;
        meals_pineappleFriedRice: string;
        meals_mangoChickenWraps: string;
        meals_lambRoganJosh: string;
        meals_crabLinguine: string;
        meals_clamChowder: string;
        meals_spinachAndFetaQuesadilla: string;
        meals_potatoLeekSoup: string;
        meals_roastBeefSandwich: string;
        meals_avocadoChickenBowl: string;
        meals_sourdoughGrilledCheese: string;
        meals_srirachaNoodles: string;
        meals_kaleCaesarSalad: string;
        meals_pestoZoodles: string;
        meals_chiliMac: string;
        meals_shrimpLettuceWraps: string;
        meals_panzanella: string;
        meals_picoDeGalloChicken: string;
        meals_salmonCakes: string;
        meals_yakisoba: string;
        meals_porkBellyBuns: string;
        meals_greenLentilSalad: string;
        meals_veganPokeBowl: string;
        meals_creamyCauliflowerSoup: string;
        meals_chickenNoodleSoup: string;
        meals_broccoliCheddarSoup: string;
        meals_shiitakeFriedRice: string;
        meals_smashedChickpeaSalad: string;
        meals_veganShepherdsPie: string;
        meals_bbqTempehWraps: string;
        meals_orangeChicken: string;
        meals_pineappleChicken: string;
        meals_coconutShrimpCurry: string;
        meals_garlicNaanWithChole: string;
        meals_mexicanRiceBowl: string;
        meals_buffaloChickenSandwich: string;
        meals_pestoChickenPizza: string;
        meals_steamedBaoBuns: string;
        meals_thaiBasilChicken: string;
        meals_cornbreadAndChili: string;
        meals_cheesyBroccoliBake: string;
        meals_beefKofta: string;
        meals_roastedCauliflowerTacos: string;
        meals_mangoAvocadoSalad: string;
        meals_lemonGarlicPasta: string;
        meals_roastedVegetableFlatbread: string;
        meals_chickenAvocadoSandwich: string;
        meals_eggSaladSandwich: string;
        meals_cubanSandwich: string;
        meals_shrimpGrits: string;
        meals_pumpkinRisotto: string;
        meals_lambMoussaka: string;
        meals_italianSub: string;
        meals_chickenTikkaMasala: string;
        meals_pestoPasta: string;
        meals_lambKebabs: string;
        meals_shrimpScampi: string;
        meals_caesarSalad: string;
        meals_vegetableLasagna: string;
        meals_teriyakiSalmon: string;
        meals_beefBurgers: string;
        meals_padThai: string;
        meals_mushroomWellington: string;
        meals_hotAndSourSoup: string;
        meals_bakedEggplant: string;
        meals_friedChickenSandwich: string;
        meals_veggieSushi: string;
        meals_sobaNoodlesWithVeggies: string;
        meals_misoRamen: string;
        meals_gingerPork: string;
        meals_sesameChicken: string;
        meals_stuffedTomatoes: string;
        meals_roastedBeetSalad: string;
        meals_nicoiseSalad: string;
        meals_beefCurry: string;
        meals_salmonAvocadoRoll: string;
        meals_tofuCurry: string;
        meals_baconWrappedDates: string;
        meals_avocadoEggSalad: string;
        meals_roastedTurkeyBreast: string;
        meals_spaghettiAglioEOlio: string;
        meals_veganMacAndCheese: string;
        meals_sweetPotatoFries: string;
        meals_brusselsSproutsWithBacon: string;
        meals_couscousSalad: string;
        meals_lobsterBisque: string;
        meals_trufflePasta: string;
        meals_ricottaPancakes: string;
        meals_blueberryWaffles: string;
        meals_grilledShrimpSkewers: string;
        meals_spaghettiWithMeatballs: string;
        meals_frenchCrepes: string;
        meals_bbqRibs: string;
        meals_kaleAndQuinoaSalad: string;
        meals_eggplantCaponata: string;
        meals_cauliflowerSteak: string;
        meals_sweetcornFritters: string;
        meals_shrimpTacosWithSlaw: string;
        meals_crabFriedRice: string;
        meals_garlicChickenThighs: string;
        meals_lambSouvlaki: string;
        meals_texMexBowl: string;
        meals_baconFriedRice: string;
        meals_ovenBakedFalafel: string;
        meals_smokedSalmonBagel: string;
        meals_jerkChicken: string;
        meals_tomatoBasilSoup: string;
        meals_pineappleChickenRice: string;
        meals_stuffedPortobelloMushrooms: string;
        meals_chickenYakisoba: string;
        meals_ramenWithSoftBoiledEgg: string;
        meals_moroccanCouscous: string;
        meals_lemonDillChicken: string;
        meals_chimichurriSteak: string;
        meals_italianWeddingSoup: string;
        meals_spinachArtichokePasta: string;
        meals_spicyTunaRoll: string;
        meals_mangoSalsaChicken: string;
        meals_garlicParmesanWings: string;
        meals_broccoliStirFry: string;
        meals_cabbageRolls: string;
        meals_shreddedPorkTacos: string;
        meals_fajitaBowl: string;
        meals_pumpkinSoup: string;
        meals_beefAndBeanBurritos: string;
        meals_cornFritters: string;
        meals_vietnameseSpringRolls: string;
        meals_chickenPestoPasta: string;
        meals_steamedMussels: string;
        meals_roastedChickpeas: string;
        meals_koreanFriedChicken: string;
        meals_porkGyoza: string;
        meals_miniQuiches: string;
        meals_thaiLarb: string;
        meals_shrimpToast: string;
        meals_avocadoCornSalad: string;
        meals_veggieStirFryNoodles: string;
        meals_brieAndAppleSandwich: string;
        meals_savoryCrepes: string;
        meals_duckConfit: string;
        meals_gheeRoastChicken: string;
        meals_paprikaChicken: string;
        meals_okraAndTomatoes: string;
        meals_smokedBrisket: string;
        meals_szechuanTofu: string;
        meals_beefTeriyaki: string;
        meals_pineappleSalsaFish: string;
        meals_creamedSpinach: string;
        meals_tunaMelt: string;
        meals_artichokePizza: string;
        meals_garlicRoastedPotatoes: string;
        start: string;
        addedToFavorites: string;
        alreadyInFavorites: string;
    };
}

const translations: Translations = {
    en: {
        welcome: 'Welcome to AI Meal Planner! Your personal assistant for delicious and healthy meals.',
        startMealPlanning: 'Start Meal Planning',
        chooseAMeal: 'Choose a Meal',
        back: '← Back to Main Menu',
        favorites: 'Favorites',
        addToFavorites: 'Add to Favorites',
        noFavorites: 'No favorite meals yet. Add some from the meal selection page!',
        teamMembers: 'Team Members: Shayan, Mitchell, Eddie, Jaskunwar',
        // Meal Selection translations
        popularMeals: 'Select from our curated collection of delicious recipes',
        loadMore: 'Load More',
        loading: 'Preparing your recipe...',
        searchMeals: 'Search recipes...',
        ingredients: 'Ingredients',
        noIngredients: 'No ingredients provided',
        instructions: 'Instructions',
        noInstructions: 'No instructions available',
        needAdjustments: 'Need Adjustments?',
        refinementPlaceholder: "I don't have rice, what can I use instead?",
        askAI: 'Ask AI',
        aiThinking: 'AI thinking...',
        customizingRecipe: 'Customizing recipe based on your request...',
        // Ingredient Selector translations
        selectIngredients: 'Select Your Ingredients',
        searchIngredients: 'Search ingredients...',
        selectedIngredients: 'Selected Ingredients',
        generateMeal: 'Generate Meal',
        dietaryTags: 'Dietary Preferences',
        weightLoss: 'Weight Loss',
        muscleGain: 'Muscle Gain',
        ketoFriendly: 'Keto-Friendly',
        vegan: 'Vegan',
        vegetarian: 'Vegetarian',
        glutenFree: 'Gluten-Free',
        quickEasy: 'Quick & Easy',
        budgetFriendly: 'Budget-Friendly',
        chooseIngredients: 'Choose ingredients you have available to find matching recipes',
        noIngredientsSelected: 'No ingredients selected',
        generatingMeal: 'Generating meal...',
        findingRecipe: 'Finding the perfect recipe for you...',
        // Ingredient translations
        ingredients_tomatoes: 'Tomatoes',
        ingredients_onions: 'Onions',
        ingredients_garlic: 'Garlic',
        ingredients_bellPeppers: 'Bell Peppers',
        ingredients_carrots: 'Carrots',
        ingredients_broccoli: 'Broccoli',
        ingredients_spinach: 'Spinach',
        ingredients_lettuce: 'Lettuce',
        ingredients_mushrooms: 'Mushrooms',
        ingredients_zucchini: 'Zucchini',
        ingredients_eggplant: 'Eggplant',
        ingredients_cucumber: 'Cucumber',
        ingredients_celery: 'Celery',
        ingredients_asparagus: 'Asparagus',
        ingredients_sweetPotatoes: 'Sweet Potatoes',
        ingredients_potatoes: 'Potatoes',
        ingredients_corn: 'Corn',
        ingredients_greenBeans: 'Green Beans',
        ingredients_peas: 'Peas',
        ingredients_cauliflower: 'Cauliflower',
        pleaseSelectIngredient: 'Please select at least one ingredient.',
        // Meal translations
        meals_spaghettiCarbonara: 'Spaghetti Carbonara',
        meals_grilledChickenRice: 'Grilled Chicken with Rice',
        meals_vegetableStirFry: 'Vegetable Stir Fry',
        meals_salmonLemonButter: 'Salmon with Lemon Butter',
        meals_beefTacos: 'Beef Tacos',
        meals_mushroomRisotto: 'Mushroom Risotto',
        meals_thaiGreenCurry: 'Thai Green Curry',
        meals_margheritaPizza: 'Margherita Pizza',
        meals_beefStroganoff: 'Beef Stroganoff',
        meals_greekSalad: 'Greek Salad',
        meals_butterChicken: 'Butter Chicken',
        meals_stuffedBellPeppers: 'Stuffed Bell Peppers',
        meals_tunaCasserole: 'Tuna Casserole',
        meals_eggplantParmesan: 'Eggplant Parmesan',
        meals_chickenFajitas: 'Chicken Fajitas',
        meals_pulledPorkSandwiches: 'Pulled Pork Sandwiches',
        meals_gnocchiPesto: 'Gnocchi with Pesto',
        meals_spinachRicottaCannelloni: 'Spinach and Ricotta Cannelloni',
        meals_bakedZiti: 'Baked Ziti',
        meals_koreanBibimbap: 'Korean Bibimbap',
        meals_bangersAndMash: 'Bangers and Mash',
        meals_jambalaya: 'Jambalaya',
        meals_moroccanTagine: 'Moroccan Tagine',
        meals_fishAndChips: 'Fish and Chips',
        meals_bakedMacAndCheese: 'Baked Mac and Cheese',
        meals_chiliConCarne: 'Chili Con Carne',
        meals_ratatouille: 'Ratatouille',
        meals_bulgogiBeef: 'Bulgogi Beef',
        meals_quicheLorraine: 'Quiche Lorraine',
        meals_pho: 'Pho',
        meals_paella: 'Paella',
        meals_sweetAndSourChicken: 'Sweet and Sour Chicken',
        meals_porkSchnitzel: 'Pork Schnitzel',
        meals_fettuccineAlfredo: 'Fettuccine Alfredo',
        meals_tandooriChicken: 'Tandoori Chicken',
        meals_zucchiniNoodlesMarinara: 'Zucchini Noodles with Marinara',
        meals_lentilSoup: 'Lentil Soup',
        meals_shepherdsPie: 'Shepherd\'s Pie',
        meals_ceviche: 'Ceviche',
        meals_steakFrites: 'Steak Frites',
        meals_chickenKatsuCurry: 'Chicken Katsu Curry',
        meals_nasiGoreng: 'Nasi Goreng',
        meals_gyozaDumplings: 'Gyoza Dumplings',
        meals_risottoMilanese: 'Risotto Milanese',
        meals_beefWellington: 'Beef Wellington',
        meals_chickenParmesan: 'Chicken Parmesan',
        meals_croqueMonsieur: 'Croque Monsieur',
        meals_roastDuckOrangeSauce: 'Roast Duck with Orange Sauce',
        meals_coconutChickenCurry: 'Coconut Chicken Curry',
        meals_moussaka: 'Moussaka',
        meals_shrimpTacos: 'Shrimp Tacos',
        meals_avocadoToast: 'Avocado Toast',
        meals_kimchiFriedRice: 'Kimchi Fried Rice',
        meals_lasagna: 'Lasagna',
        meals_japaneseCurry: 'Japanese Curry',
        meals_calamari: 'Calamari',
        meals_chickenShawarma: 'Chicken Shawarma',
        meals_porkRamen: 'Pork Ramen',
        meals_steamedDumplings: 'Steamed Dumplings',
        meals_vietnameseBanhMi: 'Vietnamese Banh Mi',
        meals_beefEnchiladas: 'Beef Enchiladas',
        meals_bruschetta: 'Bruschetta',
        meals_chickenCacciatore: 'Chicken Cacciatore',
        meals_pulledJackfruitTacos: 'Pulled Jackfruit Tacos',
        meals_tortelliniAlfredo: 'Tortellini Alfredo',
        meals_gingerChickenStirFry: 'Ginger Chicken Stir Fry',
        meals_barbacoaBeef: 'Barbacoa Beef',
        meals_steakQuesadilla: 'Steak Quesadilla',
        meals_sushiRolls: 'Sushi Rolls',
        meals_okonomiyaki: 'Okonomiyaki',
        meals_mapoTofu: 'Mapo Tofu',
        meals_shakshuka: 'Shakshuka',
        meals_halloumiBurgers: 'Halloumi Burgers',
        meals_chickenCaesarWraps: 'Chicken Caesar Wraps',
        meals_turkeyMeatballs: 'Turkey Meatballs',
        meals_pastaPrimavera: 'Pasta Primavera',
        meals_tofuPadSeeEw: 'Tofu Pad See Ew',
        meals_arrozConPollo: 'Arroz con Pollo',
        meals_crabCakes: 'Crab Cakes',
        meals_gumbo: 'Gumbo',
        meals_biryani: 'Biryani',
        meals_beefBulgogiBowls: 'Beef Bulgogi Bowls',
        meals_hoisinDuckWraps: 'Hoisin Duck Wraps',
        meals_spinachPie: 'Spinach Pie',
        meals_chickenPotPie: 'Chicken Pot Pie',
        meals_bakedFalafel: 'Baked Falafel',
        meals_prawnLinguine: 'Prawn Linguine',
        meals_charSiuPork: 'Char Siu Pork',
        meals_capreseSalad: 'Caprese Salad',
        meals_cottagePie: 'Cottage Pie',
        meals_stuffedCabbageRolls: 'Stuffed Cabbage Rolls',
        meals_tempuraUdon: 'Tempura Udon',
        meals_hamAndCheeseCroquettes: 'Ham and Cheese Croquettes',
        meals_frenchOnionSoup: 'French Onion Soup',
        meals_sobaNoodleBowl: 'Soba Noodle Bowl',
        meals_grilledSeaBass: 'Grilled Sea Bass',
        meals_pekingDuck: 'Peking Duck',
        meals_seafoodPaella: 'Seafood Paella',
        meals_polentaMushrooms: 'Polenta with Mushrooms',
        meals_beetrootSalad: 'Beetroot Salad',
        meals_chickenTagine: 'Chicken Tagine',
        meals_vegetarianChili: 'Vegetarian Chili',
        meals_stuffedMushrooms: 'Stuffed Mushrooms',
        meals_chickenAlfredo: 'Chicken Alfredo',
        meals_tofuStirFry: 'Tofu Stir Fry',
        meals_beefAndBroccoli: 'Beef and Broccoli',
        meals_tunaSalad: 'Tuna Salad',
        meals_bbqChickenPizza: 'BBQ Chicken Pizza',
        meals_eggFriedRice: 'Egg Fried Rice',
        meals_bakedPotatoesCheese: 'Baked Potatoes with Cheese',
        meals_chickpeaCurry: 'Chickpea Curry',
        meals_meatballSubs: 'Meatball Subs',
        meals_shreddedChickenEnchiladas: 'Shredded Chicken Enchiladas',
        meals_pastaBolognese: 'Pasta Bolognese',
        meals_salmonTeriyaki: 'Salmon Teriyaki',
        meals_crispyTofuTacos: 'Crispy Tofu Tacos',
        meals_eggplantStirFry: 'Eggplant Stir Fry',
        meals_stuffedSweetPotatoes: 'Stuffed Sweet Potatoes',
        meals_veggieBurritoBowl: 'Veggie Burrito Bowl',
        meals_shrimpFriedRice: 'Shrimp Fried Rice',
        meals_zoodleStirFry: 'Zoodle Stir Fry',
        meals_chickenPestoWrap: 'Chicken Pesto Wrap',
        meals_baconAndEggSandwich: 'Bacon and Egg Sandwich',
        meals_garlicButterShrimp: 'Garlic Butter Shrimp',
        meals_frenchToast: 'French Toast',
        meals_huevosRancheros: 'Huevos Rancheros',
        meals_sweetPotatoCurry: 'Sweet Potato Curry',
        meals_spinachRavioli: 'Spinach Ravioli',
        meals_tomYumSoup: 'Tom Yum Soup',
        meals_spicyChickenRamen: 'Spicy Chicken Ramen',
        meals_kimchiStew: 'Kimchi Stew',
        meals_stuffedZucchiniBoats: 'Stuffed Zucchini Boats',
        meals_turkeyClubSandwich: 'Turkey Club Sandwich',
        meals_tortillaEspanola: 'Tortilla Espanola',
        meals_beefJerkyRiceBowl: 'Beef Jerky Rice Bowl',
        meals_chiliTofu: 'Chili Tofu',
        meals_cucumberSandwiches: 'Cucumber Sandwiches',
        meals_japaneseTamagoyaki: 'Japanese Tamagoyaki',
        meals_blackBeanBurgers: 'Black Bean Burgers',
        meals_katsuSando: 'Katsu Sando',
        meals_eggCurry: 'Egg Curry',
        meals_fishTikka: 'Fish Tikka',
        meals_bulgurWheatSalad: 'Bulgur Wheat Salad',
        meals_vegetarianTacos: 'Vegetarian Tacos',
        meals_baconMacAndCheese: 'Bacon Mac and Cheese',
        meals_creamyMushroomPasta: 'Creamy Mushroom Pasta',
        meals_chickenGyros: 'Chicken Gyros',
        meals_pitaWithHummus: 'Pita with Hummus',
        meals_cranberryChickenSalad: 'Cranberry Chicken Salad',
        meals_pineappleFriedRice: 'Pineapple Fried Rice',
        meals_mangoChickenWraps: 'Mango Chicken Wraps',
        meals_lambRoganJosh: 'Lamb Rogan Josh',
        meals_crabLinguine: 'Crab Linguine',
        meals_clamChowder: 'Clam Chowder',
        meals_spinachAndFetaQuesadilla: 'Spinach and Feta Quesadilla',
        meals_potatoLeekSoup: 'Potato Leek Soup',
        meals_roastBeefSandwich: 'Roast Beef Sandwich',
        meals_avocadoChickenBowl: 'Avocado Chicken Bowl',
        meals_sourdoughGrilledCheese: 'Sourdough Grilled Cheese',
        meals_srirachaNoodles: 'Sriracha Noodles',
        meals_kaleCaesarSalad: 'Kale Caesar Salad',
        meals_pestoZoodles: 'Pesto Zoodles',
        meals_chiliMac: 'Chili Mac',
        meals_shrimpLettuceWraps: 'Shrimp Lettuce Wraps',
        meals_panzanella: 'Panzanella',
        meals_picoDeGalloChicken: 'Pico de Gallo Chicken',
        meals_salmonCakes: 'Salmon Cakes',
        meals_yakisoba: 'Yakisoba',
        meals_porkBellyBuns: 'Pork Belly Buns',
        meals_greenLentilSalad: 'Green Lentil Salad',
        meals_veganPokeBowl: 'Vegan Poke Bowl',
        meals_creamyCauliflowerSoup: 'Creamy Cauliflower Soup',
        meals_chickenNoodleSoup: 'Chicken Noodle Soup',
        meals_broccoliCheddarSoup: 'Broccoli Cheddar Soup',
        meals_shiitakeFriedRice: 'Shiitake Fried Rice',
        meals_smashedChickpeaSalad: 'Smashed Chickpea Salad',
        meals_veganShepherdsPie: 'Vegan Shepherd\'s Pie',
        meals_bbqTempehWraps: 'BBQ Tempeh Wraps',
        meals_orangeChicken: 'Orange Chicken',
        meals_pineappleChicken: 'Pineapple Chicken',
        meals_coconutShrimpCurry: 'Coconut Shrimp Curry',
        meals_garlicNaanWithChole: 'Garlic Naan with Chole',
        meals_mexicanRiceBowl: 'Mexican Rice Bowl',
        meals_buffaloChickenSandwich: 'Buffalo Chicken Sandwich',
        meals_pestoChickenPizza: 'Pesto Chicken Pizza',
        meals_steamedBaoBuns: 'Steamed Bao Buns',
        meals_thaiBasilChicken: 'Thai Basil Chicken',
        meals_cornbreadAndChili: 'Cornbread and Chili',
        meals_cheesyBroccoliBake: 'Cheesy Broccoli Bake',
        meals_beefKofta: 'Beef Kofta',
        meals_roastedCauliflowerTacos: 'Roasted Cauliflower Tacos',
        meals_mangoAvocadoSalad: 'Mango Avocado Salad',
        meals_lemonGarlicPasta: 'Lemon Garlic Pasta',
        meals_roastedVegetableFlatbread: 'Roasted Vegetable Flatbread',
        meals_chickenAvocadoSandwich: 'Chicken Avocado Sandwich',
        meals_eggSaladSandwich: 'Egg Salad Sandwich',
        meals_cubanSandwich: 'Cuban Sandwich',
        meals_shrimpGrits: 'Shrimp and Grits',
        meals_pumpkinRisotto: 'Pumpkin Risotto',
        meals_lambMoussaka: 'Lamb Moussaka',
        meals_italianSub: 'Italian Sub',
        meals_chickenTikkaMasala: 'Chicken Tikka Masala',
        meals_pestoPasta: 'Pesto Pasta',
        meals_lambKebabs: 'Lamb Kebabs',
        meals_shrimpScampi: 'Shrimp Scampi',
        meals_caesarSalad: 'Caesar Salad',
        meals_vegetableLasagna: 'Vegetable Lasagna',
        meals_teriyakiSalmon: 'Teriyaki Salmon',
        meals_beefBurgers: 'Beef Burgers',
        meals_padThai: 'Pad Thai',
        meals_mushroomWellington: 'Mushroom Wellington',
        meals_hotAndSourSoup: 'Hot and Sour Soup',
        meals_bakedEggplant: 'Baked Eggplant',
        meals_friedChickenSandwich: 'Fried Chicken Sandwich',
        meals_veggieSushi: 'Veggie Sushi',
        meals_sobaNoodlesWithVeggies: 'Soba Noodles with Veggies',
        meals_misoRamen: 'Miso Ramen',
        meals_gingerPork: 'Ginger Pork',
        meals_sesameChicken: 'Sesame Chicken',
        meals_stuffedTomatoes: 'Stuffed Tomatoes',
        meals_roastedBeetSalad: 'Roasted Beet Salad',
        meals_nicoiseSalad: 'Nicoise Salad',
        meals_beefCurry: 'Beef Curry',
        meals_salmonAvocadoRoll: 'Salmon Avocado Roll',
        meals_tofuCurry: 'Tofu Curry',
        meals_baconWrappedDates: 'Bacon Wrapped Dates',
        meals_avocadoEggSalad: 'Avocado Egg Salad',
        meals_roastedTurkeyBreast: 'Roasted Turkey Breast',
        meals_spaghettiAglioEOlio: 'Spaghetti Aglio e Olio',
        meals_veganMacAndCheese: 'Vegan Mac and Cheese',
        meals_sweetPotatoFries: 'Sweet Potato Fries',
        meals_brusselsSproutsWithBacon: 'Brussels Sprouts with Bacon',
        meals_couscousSalad: 'Couscous Salad',
        meals_lobsterBisque: 'Lobster Bisque',
        meals_trufflePasta: 'Truffle Pasta',
        meals_ricottaPancakes: 'Ricotta Pancakes',
        meals_blueberryWaffles: 'Blueberry Waffles',
        meals_grilledShrimpSkewers: 'Grilled Shrimp Skewers',
        meals_spaghettiWithMeatballs: 'Spaghetti with Meatballs',
        meals_frenchCrepes: 'French Crepes',
        meals_bbqRibs: 'BBQ Ribs',
        meals_kaleAndQuinoaSalad: 'Kale and Quinoa Salad',
        meals_eggplantCaponata: 'Eggplant Caponata',
        meals_cauliflowerSteak: 'Cauliflower Steak',
        meals_sweetcornFritters: 'Sweetcorn Fritters',
        meals_shrimpTacosWithSlaw: 'Shrimp Tacos with Slaw',
        meals_crabFriedRice: 'Crab Fried Rice',
        meals_garlicChickenThighs: 'Garlic Chicken Thighs',
        meals_lambSouvlaki: 'Lamb Souvlaki',
        meals_texMexBowl: 'Tex-Mex Bowl',
        meals_baconFriedRice: 'Bacon Fried Rice',
        meals_ovenBakedFalafel: 'Oven Baked Falafel',
        meals_smokedSalmonBagel: 'Smoked Salmon Bagel',
        meals_jerkChicken: 'Jerk Chicken',
        meals_tomatoBasilSoup: 'Tomato Basil Soup',
        meals_pineappleChickenRice: 'Pineapple Chicken Rice',
        meals_stuffedPortobelloMushrooms: 'Stuffed Portobello Mushrooms',
        meals_chickenYakisoba: 'Chicken Yakisoba',
        meals_ramenWithSoftBoiledEgg: 'Ramen with Soft Boiled Egg',
        meals_moroccanCouscous: 'Moroccan Couscous',
        meals_lemonDillChicken: 'Lemon Dill Chicken',
        meals_chimichurriSteak: 'Chimichurri Steak',
        meals_italianWeddingSoup: 'Italian Wedding Soup',
        meals_spinachArtichokePasta: 'Spinach Artichoke Pasta',
        meals_spicyTunaRoll: 'Spicy Tuna Roll',
        meals_mangoSalsaChicken: 'Mango Salsa Chicken',
        meals_garlicParmesanWings: 'Garlic Parmesan Wings',
        meals_broccoliStirFry: 'Broccoli Stir Fry',
        meals_cabbageRolls: 'Cabbage Rolls',
        meals_shreddedPorkTacos: 'Shredded Pork Tacos',
        meals_fajitaBowl: 'Fajita Bowl',
        meals_pumpkinSoup: 'Pumpkin Soup',
        meals_beefAndBeanBurritos: 'Beef and Bean Burritos',
        meals_cornFritters: 'Corn Fritters',
        meals_vietnameseSpringRolls: 'Vietnamese Spring Rolls',
        meals_chickenPestoPasta: 'Chicken Pesto Pasta',
        meals_steamedMussels: 'Steamed Mussels',
        meals_roastedChickpeas: 'Roasted Chickpeas',
        meals_koreanFriedChicken: 'Korean Fried Chicken',
        meals_porkGyoza: 'Pork Gyoza',
        meals_miniQuiches: 'Mini Quiches',
        meals_thaiLarb: 'Thai Larb',
        meals_shrimpToast: 'Shrimp Toast',
        meals_avocadoCornSalad: 'Avocado Corn Salad',
        meals_veggieStirFryNoodles: 'Veggie Stir Fry Noodles',
        meals_brieAndAppleSandwich: 'Brie and Apple Sandwich',
        meals_savoryCrepes: 'Savory Crepes',
        meals_duckConfit: 'Duck Confit',
        meals_gheeRoastChicken: 'Ghee Roast Chicken',
        meals_paprikaChicken: 'Paprika Chicken',
        meals_okraAndTomatoes: 'Okra and Tomatoes',
        meals_smokedBrisket: 'Smoked Brisket',
        meals_szechuanTofu: 'Szechuan Tofu',
        meals_beefTeriyaki: 'Beef Teriyaki',
        meals_pineappleSalsaFish: 'Pineapple Salsa Fish',
        meals_creamedSpinach: 'Creamed Spinach',
        meals_tunaMelt: 'Tuna Melt',
        meals_artichokePizza: 'Artichoke Pizza',
        meals_garlicRoastedPotatoes: 'Garlic Roasted Potatoes',
        start: "Start",
        addedToFavorites: "✨ Added to your favorites! Check the favorites page to view your saved meals.",
        alreadyInFavorites: "This meal is already in your favorites!"
    },
    es: {
        welcome: '¡Bienvenido a AI Meal Planner! Tu asistente personal para comidas deliciosas y saludables.',
        startMealPlanning: 'Comenzar planificación',
        chooseAMeal: 'Elegir una comida',
        back: '← Volver al menú principal',
        favorites: 'Favoritos',
        addToFavorites: 'Añadir a Favoritos',
        noFavorites: '¡Aún no hay comidas favoritas. ¡Añade algunas desde la página de selección de comidas!',
        teamMembers: 'Miembros del equipo: Shayan, Mitchell, Eddie, Jaskunwar',
        // Meal Selection translations
        popularMeals: 'Selecciona de nuestra colección de deliciosas recetas',
        loadMore: 'Cargar Más',
        loading: 'Preparando tu receta...',
        searchMeals: 'Buscar recetas...',
        ingredients: 'Ingredientes',
        noIngredients: 'No hay ingredientes disponibles',
        instructions: 'Instrucciones',
        noInstructions: 'No hay instrucciones disponibles',
        needAdjustments: '¿Necesitas ajustes?',
        refinementPlaceholder: "No tengo arroz, ¿qué puedo usar en su lugar?",
        askAI: 'Preguntar a IA',
        aiThinking: 'IA pensando...',
        customizingRecipe: 'Personalizando la receta según tu solicitud...',
        // Ingredient Selector translations
        selectIngredients: 'Selecciona tus Ingredientes',
        searchIngredients: 'Buscar ingredientes...',
        selectedIngredients: 'Ingredientes Seleccionados',
        generateMeal: 'Generar Comida',
        dietaryTags: 'Preferencias Dietéticas',
        weightLoss: 'Pérdida de Peso',
        muscleGain: 'Ganancia Muscular',
        ketoFriendly: 'Apto para Keto',
        vegan: 'Vegano',
        vegetarian: 'Vegetariano',
        glutenFree: 'Sin Gluten',
        quickEasy: 'Rápido y Fácil',
        budgetFriendly: 'Económico',
        chooseIngredients: 'Elige los ingredientes que tienes disponibles para encontrar recetas coincidentes',
        noIngredientsSelected: 'No hay ingredientes seleccionados',
        generatingMeal: 'Generando comida...',
        findingRecipe: 'Buscando la receta perfecta para ti...',
        // Ingredient translations
        ingredients_tomatoes: 'Tomates',
        ingredients_onions: 'Cebollas',
        ingredients_garlic: 'Ajo',
        ingredients_bellPeppers: 'Pimientos',
        ingredients_carrots: 'Zanahorias',
        ingredients_broccoli: 'Brócoli',
        ingredients_spinach: 'Espinacas',
        ingredients_lettuce: 'Lechuga',
        ingredients_mushrooms: 'Champiñones',
        ingredients_zucchini: 'Calabacín',
        ingredients_eggplant: 'Berenjena',
        ingredients_cucumber: 'Pepino',
        ingredients_celery: 'Apio',
        ingredients_asparagus: 'Espárragos',
        ingredients_sweetPotatoes: 'Batatas',
        ingredients_potatoes: 'Papas',
        ingredients_corn: 'Maíz',
        ingredients_greenBeans: 'Judías Verdes',
        ingredients_peas: 'Guisantes',
        ingredients_cauliflower: 'Coliflor',
        pleaseSelectIngredient: 'Por favor, selecciona al menos un ingrediente.',
        // Meal translations
        meals_spaghettiCarbonara: 'Spaghetti Carbonara',
        meals_grilledChickenRice: 'Pollo a la Parrilla con Arroz',
        meals_vegetableStirFry: 'Sauté de Verduras',
        meals_salmonLemonButter: 'Salmón con Mantequilla de Limón',
        meals_beefTacos: 'Tacos de Carne',
        meals_mushroomRisotto: 'Risotto de Champiñones',
        meals_thaiGreenCurry: 'Curry Verde Tailandés',
        meals_margheritaPizza: 'Pizza Margherita',
        meals_beefStroganoff: 'Beef Stroganoff',
        meals_greekSalad: 'Ensalada Griega',
        meals_butterChicken: 'Pollo a la Mantequilla',
        meals_stuffedBellPeppers: 'Pimientos Rellenos',
        meals_tunaCasserole: 'Cazuela de Atún',
        meals_eggplantParmesan: 'Berenjena Parmesana',
        meals_chickenFajitas: 'Pollo Fajitas',
        meals_pulledPorkSandwiches: 'Sandwiches de Lomo de Cerdo Retirado',
        meals_gnocchiPesto: 'Gnocchi con Pesto',
        meals_spinachRicottaCannelloni: 'Cannelloni de Espinaca y Ricotta',
        meals_bakedZiti: 'Ziti Horneado',
        meals_koreanBibimbap: 'Bibimbap Coreano',
        meals_bangersAndMash: 'Bangers and Mash',
        meals_jambalaya: 'Jambalaya',
        meals_moroccanTagine: 'Tagine Marroquí',
        meals_fishAndChips: 'Pescado y Patatas Fritas',
        meals_bakedMacAndCheese: 'Mac y Queso Horneado',
        meals_chiliConCarne: 'Chili Con Carne',
        meals_ratatouille: 'Ratatouille',
        meals_bulgogiBeef: 'Carne de Búlgogi',
        meals_quicheLorraine: 'Quiche Lorraine',
        meals_pho: 'Pho',
        meals_paella: 'Paella',
        meals_sweetAndSourChicken: 'Pollo Dulce y Agradable',
        meals_porkSchnitzel: 'Pechuga de Cerdo Horneada',
        meals_fettuccineAlfredo: 'Fettuccine Alfredo',
        meals_tandooriChicken: 'Pollo Tandoori',
        meals_zucchiniNoodlesMarinara: 'Zucchini Noodles con Marinara',
        meals_lentilSoup: 'Sopa de Lentejas',
        meals_shepherdsPie: 'Pastel de Oveja',
        meals_ceviche: 'Ceviche',
        meals_steakFrites: 'Ternera Frita',
        meals_chickenKatsuCurry: 'Pollo Katsu Curry',
        meals_nasiGoreng: 'Nasi Goreng',
        meals_gyozaDumplings: 'Gyoza Empanadas',
        meals_risottoMilanese: 'Risotto Milaneso',
        meals_beefWellington: 'Filete de Vaca Wellington',
        meals_chickenParmesan: 'Pollo Parmesano',
        meals_croqueMonsieur: 'Croque Monsieur',
        meals_roastDuckOrangeSauce: 'Caza de Pato con Salsa de Naranja',
        meals_coconutChickenCurry: 'Curry de Pollo con Cocos',
        meals_moussaka: 'Moussaka',
        meals_shrimpTacos: 'Camarones al Ajillo',
        meals_avocadoToast: 'Tostada de Aguacate',
        meals_kimchiFriedRice: 'Arroz Frito Kimchi',
        meals_lasagna: 'Lasagna',
        meals_japaneseCurry: 'Curry Japonés',
        meals_calamari: 'Calamares',
        meals_chickenShawarma: 'Pollo Shawarma',
        meals_porkRamen: 'Ramen de Cerdo',
        meals_steamedDumplings: 'Empanadas Horneadas',
        meals_vietnameseBanhMi: 'Banh Mi Vietnamita',
        meals_beefEnchiladas: 'Enchiladas de Carne',
        meals_bruschetta: 'Bruschetta',
        meals_chickenCacciatore: 'Pollo Cacciatore',
        meals_pulledJackfruitTacos: 'Tacos de Jackfruit Retirado',
        meals_tortelliniAlfredo: 'Tortellini Alfredo',
        meals_gingerChickenStirFry: 'Pollo de Pollo con Ajo y Perejil',
        meals_barbacoaBeef: 'Carne de Barbacoa',
        meals_steakQuesadilla: 'Quesadilla de Ternera',
        meals_sushiRolls: 'Rolls de Sushi',
        meals_okonomiyaki: 'Okonomiyaki',
        meals_mapoTofu: 'Tofu Mapo',
        meals_shakshuka: 'Shakshuka',
        meals_halloumiBurgers: 'Hamburguesas de Halloumi',
        meals_chickenCaesarWraps: 'Wraps de Pollo Caesar',
        meals_turkeyMeatballs: 'Meatballs de Pavo',
        meals_pastaPrimavera: 'Pasta Primavera',
        meals_tofuPadSeeEw: 'Tofu Pad See Ew',
        meals_arrozConPollo: 'Arroz con Pollo',
        meals_crabCakes: 'Pastelitos de Cangrejo',
        meals_gumbo: 'Gumbo',
        meals_biryani: 'Biryani',
        meals_beefBulgogiBowls: 'Tazas de Bulgogi de Carne',
        meals_hoisinDuckWraps: 'Wraps de Pato Hoisin',
        meals_spinachPie: 'Pastel de Espinaca',
        meals_chickenPotPie: 'Pastel de Pollo',
        meals_bakedFalafel: 'Falafel Horneado',
        meals_prawnLinguine: 'Linguine de Camarón',
        meals_charSiuPork: 'Char Siu de Cerdo',
        meals_capreseSalad: 'Ensalada de Caprese',
        meals_cottagePie: 'Pastel de Campo',
        meals_stuffedCabbageRolls: 'Rollos de Col Rellenos',
        meals_tempuraUdon: 'Udon Tempura',
        meals_hamAndCheeseCroquettes: 'Croquetas de Jamón y Queso',
        meals_frenchOnionSoup: 'Sopa de Cebolla Francesa',
        meals_sobaNoodleBowl: 'Tazón de Soba',
        meals_grilledSeaBass: 'Lenguado a la Parrilla',
        meals_pekingDuck: 'Pavo Pekinés',
        meals_seafoodPaella: 'Paella de Marisco',
        meals_polentaMushrooms: 'Polenta con Champiñones',
        meals_beetrootSalad: 'Ensalada de Remolacha',
        meals_chickenTagine: 'Tagine de Pollo',
        meals_vegetarianChili: 'Chili Vegetariano',
        meals_stuffedMushrooms: 'Champiñones Rellenos',
        meals_chickenAlfredo: 'Pollo Alfredo',
        meals_tofuStirFry: 'Tofu Sauté',
        meals_beefAndBroccoli: 'Carne y Broccoli',
        meals_tunaSalad: 'Ensalada de Atún',
        meals_bbqChickenPizza: 'Pizza de Pollo BBQ',
        meals_eggFriedRice: 'Arroz Frito',
        meals_bakedPotatoesCheese: 'Patatas con Queso Horneadas',
        meals_chickpeaCurry: 'Curry de Chickpeas',
        meals_meatballSubs: 'Subs de Bolas de Carne',
        meals_shreddedChickenEnchiladas: 'Enchiladas de Pollo Desmenuzado',
        meals_pastaBolognese: 'Pasta Bolognese',
        meals_salmonTeriyaki: 'Salmón Teriyaki',
        meals_crispyTofuTacos: 'Tacos de Tofu Fritos',
        meals_eggplantStirFry: 'Tofu Sauté',
        meals_stuffedSweetPotatoes: 'Patatas Dulces Rellenas',
        meals_veggieBurritoBowl: 'Tazón de Burrito Vegetariano',
        meals_shrimpFriedRice: 'Arroz Frito de Camarón',
        meals_zoodleStirFry: 'Tostado de Zoodle',
        meals_chickenPestoWrap: 'Wrap de Pesto de Pollo',
        meals_baconAndEggSandwich: 'Sandwich de Bacon y Huevo',
        meals_garlicButterShrimp: 'Camarón con Mantequilla de Ajo',
        meals_frenchToast: 'Tostada Francesa',
        meals_huevosRancheros: 'Huevos Rancheros',
        meals_sweetPotatoCurry: 'Curry de Papa Dulce',
        meals_spinachRavioli: 'Ravioli de Espinaca',
        meals_tomYumSoup: 'Sopa Tom Yum',
        meals_spicyChickenRamen: 'Ramen de Pollo Picante',
        meals_kimchiStew: 'Stew de Kimchi',
        meals_stuffedZucchiniBoats: 'Tostados de Calabacín Rellenos',
        meals_turkeyClubSandwich: 'Sandwich de Club de Pavo',
        meals_tortillaEspanola: 'Tortilla Española',
        meals_beefJerkyRiceBowl: 'Tazón de Carne Seca',
        meals_chiliTofu: 'Tofu Picante',
        meals_cucumberSandwiches: 'Sandwiches de Pepino',
        meals_japaneseTamagoyaki: 'Tamagoyaki Japonés',
        meals_blackBeanBurgers: 'Hamburguesas de Frijol Negro',
        meals_katsuSando: 'Katsu Sando',
        meals_eggCurry: 'Curry de Huevo',
        meals_fishTikka: 'Tikka de Pescado',
        meals_bulgurWheatSalad: 'Ensalada de Trigo Bulgur',
        meals_vegetarianTacos: 'Tacos Vegetarianos',
        meals_baconMacAndCheese: 'Mac y Queso de Panceta',
        meals_creamyMushroomPasta: 'Pasta de Champiñones Cremosos',
        meals_chickenGyros: 'Gyros de Pollo',
        meals_pitaWithHummus: 'Pita con Hummus',
        meals_cranberryChickenSalad: 'Ensalada de Pollo con Arándanos',
        meals_pineappleFriedRice: 'Arroz Frito de Piña',
        meals_mangoChickenWraps: 'Wraps de Pollo con Mango',
        meals_lambRoganJosh: 'Lamb Rogan Josh',
        meals_crabLinguine: 'Linguine de Cangrejo',
        meals_clamChowder: 'Cazuela de Clamares',
        meals_spinachAndFetaQuesadilla: 'Quesadilla de Espinaca y Feta',
        meals_potatoLeekSoup: 'Sopa de Apio',
        meals_roastBeefSandwich: 'Sandwich de Vaca Horneada',
        meals_avocadoChickenBowl: 'Tazón de Pollo con Aguacate',
        meals_sourdoughGrilledCheese: 'Queso Fresco Horneado',
        meals_srirachaNoodles: 'Noodles Sriracha',
        meals_kaleCaesarSalad: 'Ensalada de Kale Caesar',
        meals_pestoZoodles: 'Zoodles de Pesto',
        meals_chiliMac: 'Chili Mac',
        meals_shrimpLettuceWraps: 'Wraps de Camarón',
        meals_panzanella: 'Panzanella',
        meals_picoDeGalloChicken: 'Pollo Picante',
        meals_salmonCakes: 'Pastelitos de Salmón',
        meals_yakisoba: 'Yakisoba',
        meals_porkBellyBuns: 'Bun de Lomo de Cerdo',
        meals_greenLentilSalad: 'Ensalada de Lentejas',
        meals_veganPokeBowl: 'Tazón de Poke Vegano',
        meals_creamyCauliflowerSoup: 'Sopa de Coliflor Cremosa',
        meals_chickenNoodleSoup: 'Sopa de Fideos de Pollo',
        meals_broccoliCheddarSoup: 'Sopa de Broccoli Cheddar',
        meals_shiitakeFriedRice: 'Arroz Frito de Shiitake',
        meals_smashedChickpeaSalad: 'Ensalada de Chickpeas',
        meals_veganShepherdsPie: 'Pastel de Oveja Vegano',
        meals_bbqTempehWraps: 'Wraps de Tempeh BBQ',
        meals_orangeChicken: 'Pollo Naranja',
        meals_pineappleChicken: 'Pollo de Piña',
        meals_coconutShrimpCurry: 'Curry de Camarón con Cocos',
        meals_garlicNaanWithChole: 'Naan con Chole',
        meals_mexicanRiceBowl: 'Tazón de Arroz Mexicano',
        meals_buffaloChickenSandwich: 'Sandwich de Pollo Buffalo',
        meals_pestoChickenPizza: 'Pizza de Pollo Pesto',
        meals_steamedBaoBuns: 'Buns de Bao Horneado',
        meals_thaiBasilChicken: 'Pollo con Ajo de Tailandés',
        meals_cornbreadAndChili: 'Tostada de Maíz y Chili',
        meals_cheesyBroccoliBake: 'Torta de Broccoli',
        meals_beefKofta: 'Kofta de Carne',
        meals_roastedCauliflowerTacos: 'Tacos de Chou-fleur Rôtis',
        meals_mangoAvocadoSalad: 'Salade Mangue-Avocat',
        meals_lemonGarlicPasta: 'Pâte à l\'Ail et au Limon',
        meals_roastedVegetableFlatbread: 'Pain Plat de Légumes Rôti',
        meals_chickenAvocadoSandwich: 'Sandwich de Poulet au Avocat',
        meals_eggSaladSandwich: 'Sandwich de Huevo',
        meals_cubanSandwich: 'Sandwich Cubain',
        meals_shrimpGrits: 'Shrimp and Grits',
        meals_pumpkinRisotto: 'Risotto de Pomme de Terre',
        meals_lambMoussaka: 'Moussaka de Lomo',
        meals_italianSub: 'Sub Italiano',
        meals_chickenTikkaMasala: 'Pollo Tikka Masala',
        meals_pestoPasta: 'Pasta Pesto',
        meals_lambKebabs: 'Kebabs de Lomo',
        meals_shrimpScampi: 'Scampi de Camarón',
        meals_caesarSalad: 'Ensalada Cesar',
        meals_vegetableLasagna: 'Lasagna Vegetariana',
        meals_teriyakiSalmon: 'Salmón Teriyaki',
        meals_beefBurgers: 'Hamburguesas de Carne',
        meals_padThai: 'Pad Thai',
        meals_mushroomWellington: 'Filete de Lomo Horneado',
        meals_hotAndSourSoup: 'Sopa Picante',
        meals_bakedEggplant: 'Berenjena Horneada',
        meals_friedChickenSandwich: 'Sandwich de Pollo Frito',
        meals_veggieSushi: 'Sushi Vegetariano',
        meals_sobaNoodlesWithVeggies: 'Soba Noodles con Verduras',
        meals_misoRamen: 'Ramen Miso',
        meals_gingerPork: 'Bœuf Ginger',
        meals_sesameChicken: 'Poulet au Sésame',
        meals_stuffedTomatoes: 'Tomates Remplis',
        meals_roastedBeetSalad: 'Ensalada de Remoulade Rôtie',
        meals_nicoiseSalad: 'Salade Nicoise',
        meals_beefCurry: 'Curry de Bœuf',
        meals_salmonAvocadoRoll: 'Rouleau de Saumon et Avocat',
        meals_tofuCurry: 'Curry de Tofu',
        meals_baconWrappedDates: 'Framboises Roulées',
        meals_avocadoEggSalad: 'Ensalada de Huevo y Aguacate',
        meals_roastedTurkeyBreast: 'Pecho de Pavo Horneado',
        meals_spaghettiAglioEOlio: 'Spaghetti Aglio e Olio',
        meals_veganMacAndCheese: 'Mac y Queso Vegano',
        meals_sweetPotatoFries: 'Patatas de Papa Dulce',
        meals_brusselsSproutsWithBacon: 'Brusselas con Panceta',
        meals_couscousSalad: 'Ensalada de Couscous',
        meals_lobsterBisque: 'Cazuela de Langosta',
        meals_trufflePasta: 'Pasta con Trufa',
        meals_ricottaPancakes: 'Panqueques de Ricotta',
        meals_blueberryWaffles: 'Waffles aux Framboises',
        meals_grilledShrimpSkewers: 'Brochetas de Camarón',
        meals_spaghettiWithMeatballs: 'Spaghetti con Bolas de Carne',
        meals_frenchCrepes: 'Crepes Franceses',
        meals_bbqRibs: 'Costillas BBQ',
        meals_kaleAndQuinoaSalad: 'Ensalada de Kale y Quinoa',
        meals_eggplantCaponata: 'Caponata de Berenjena',
        meals_cauliflowerSteak: 'Ternera de Cauliflower',
        meals_sweetcornFritters: 'Frituras de Maíz Dulce',
        meals_shrimpTacosWithSlaw: 'Tacos de Camarón con Remolacha',
        meals_crabFriedRice: 'Arroz Frito de Cangrejo',
        meals_garlicChickenThighs: 'Muslos de Pollo con Ajo',
        meals_lambSouvlaki: 'Souvlaki de Lomo',
        meals_texMexBowl: 'Tazón Tex-Mex',
        meals_baconFriedRice: 'Arroz Frito de Panceta',
        meals_ovenBakedFalafel: 'Falafel Horneado',
        meals_smokedSalmonBagel: 'Bagel de Salmón Fumado',
        meals_jerkChicken: 'Poulet à la Jerk',
        meals_tomatoBasilSoup: 'Soupe au Tomate et Ail',
        meals_pineappleChickenRice: 'Riz de Poulet au Pêche',
        meals_stuffedPortobelloMushrooms: 'Champiñones Rellenos',
        meals_chickenYakisoba: 'Yakisoba',
        meals_ramenWithSoftBoiledEgg: 'Ramen avec Œuf Dur',
        meals_moroccanCouscous: 'Couscous Marroquí',
        meals_lemonDillChicken: 'Pollo de Limón y Perejil',
        meals_chimichurriSteak: 'Ternera a la Chimichurri',
        meals_italianWeddingSoup: 'Sopa de Bodas Italiana',
        meals_spinachArtichokePasta: 'Pasta de Espinaca y Alcachofa',
        meals_spicyTunaRoll: 'Roll de Atún Picante',
        meals_mangoSalsaChicken: 'Pollo con Salsa de Mango',
        meals_garlicParmesanWings: 'Alares de Ajo y Parmesano',
        meals_broccoliStirFry: 'Broccoli Sauté',
        meals_cabbageRolls: 'Rollos de Chou',
        meals_shreddedPorkTacos: 'Tacos de Lomo Desmenuzado',
        meals_fajitaBowl: 'Tazón de Fajitas',
        meals_pumpkinSoup: 'Sopa de Pomme de Terre',
        meals_beefAndBeanBurritos: 'Burritos de Bœuf et Fève',
        meals_cornFritters: 'Fritures de Maïs',
        meals_vietnameseSpringRolls: 'Roulées de Printemps',
        meals_chickenPestoPasta: 'Pasta de Pesto',
        meals_steamedMussels: 'Mussels Horneados',
        meals_roastedChickpeas: 'Chichpeas Horneadas',
        meals_koreanFriedChicken: 'Pollo Frit Coréen',
        meals_porkGyoza: 'Gyoza de Porc',
        meals_miniQuiches: 'Mini Quiches',
        meals_thaiLarb: 'Thai Larb',
        meals_shrimpToast: 'Tostada de Camarón',
        meals_avocadoCornSalad: 'Ensalada de Maíz',
        meals_veggieStirFryNoodles: 'Noodles Sauté',
        meals_brieAndAppleSandwich: 'Sandwich de Brie y Manzana',
        meals_savoryCrepes: 'Crepes Savory',
        meals_duckConfit: 'Confit de Pato',
        meals_gheeRoastChicken: 'Poulet Rôti',
        meals_paprikaChicken: 'Poulet Picant',
        meals_okraAndTomatoes: 'Okra y Tomates',
        meals_smokedBrisket: 'Lomo Fumado',
        meals_szechuanTofu: 'Tofu Szechuan',
        meals_beefTeriyaki: 'Lomo Teriyaki',
        meals_pineappleSalsaFish: 'Pescado con Salsa de Piña',
        meals_creamedSpinach: 'Espinaca Crema',
        meals_tunaMelt: 'Tuna Melt',
        meals_artichokePizza: 'Pizza d\'Artichaut',
        meals_garlicRoastedPotatoes: 'Patatas Horneadas',
        start: "Comenzar",
        addedToFavorites: "✨ ¡Añadido a tus favoritos! Visita la página de favoritos para ver tus comidas guardadas.",
        alreadyInFavorites: "¡Esta comida ya está en tus favoritos!"
    },
    fr: {
        welcome: 'Bienvenue sur AI Meal Planner ! Votre assistant personnel pour des repas délicieux et sains.',
        startMealPlanning: 'Commencer la planification',
        chooseAMeal: 'Choisir un repas',
        back: '← Retour au menu principal',
        favorites: 'Favoris',
        addToFavorites: 'Ajouter aux favoris',
        noFavorites: 'Aucun repas encore en favoris. Ajoutez-en depuis la page de sélection de repas !',
        teamMembers: 'Membres de l\'équipe : Shayan, Mitchell, Eddie, Jaskunwar',
        // Meal Selection translations
        popularMeals: 'Sélectionnez parmi notre collection de délicieuses recettes',
        loadMore: 'Charger Plus',
        loading: 'Préparation de votre recette...',
        searchMeals: 'Rechercher des recettes...',
        ingredients: 'Ingrédients',
        noIngredients: 'Aucun ingrédient disponible',
        instructions: 'Instructions',
        noInstructions: 'Aucune instruction disponible',
        needAdjustments: 'Besoin d\'ajustements ?',
        refinementPlaceholder: "Je n'ai pas de riz, que puis-je utiliser à la place ?",
        askAI: 'Demander à l\'IA',
        aiThinking: 'L\'IA réfléchit...',
        customizingRecipe: 'Personnalisation de la recette selon votre demande...',
        // Ingredient Selector translations
        selectIngredients: 'Sélectionnez vos Ingrédients',
        searchIngredients: 'Rechercher des ingrédients...',
        selectedIngredients: 'Ingrédients Sélectionnés',
        generateMeal: 'Générer un Repas',
        dietaryTags: 'Préférences Alimentaires',
        weightLoss: 'Perte de Poids',
        muscleGain: 'Prise de Muscle',
        ketoFriendly: 'Compatible Keto',
        vegan: 'Végétalien',
        vegetarian: 'Végétarien',
        glutenFree: 'Sans Gluten',
        quickEasy: 'Rapide et Facile',
        budgetFriendly: 'Économique',
        chooseIngredients: 'Choisissez les ingrédients dont vous disposez pour trouver des recettes correspondantes',
        noIngredientsSelected: 'Aucun ingrédient sélectionné',
        generatingMeal: 'Génération du repas...',
        findingRecipe: 'Recherche de la recette parfaite pour vous...',
        // Ingredient translations
        ingredients_tomatoes: 'Tomates',
        ingredients_onions: 'Oignons',
        ingredients_garlic: 'Ail',
        ingredients_bellPeppers: 'Poivrons',
        ingredients_carrots: 'Carottes',
        ingredients_broccoli: 'Brocoli',
        ingredients_spinach: 'Épinards',
        ingredients_lettuce: 'Laitue',
        ingredients_mushrooms: 'Champignons',
        ingredients_zucchini: 'Courgette',
        ingredients_eggplant: 'Aubergine',
        ingredients_cucumber: 'Concombre',
        ingredients_celery: 'Céleri',
        ingredients_asparagus: 'Asperges',
        ingredients_sweetPotatoes: 'Patates Douces',
        ingredients_potatoes: 'Pommes de Terre',
        ingredients_corn: 'Maïs',
        ingredients_greenBeans: 'Haricots Verts',
        ingredients_peas: 'Petits Pois',
        ingredients_cauliflower: 'Chou-fleur',
        pleaseSelectIngredient: 'Veuillez sélectionner au moins un ingrédient.',
        // Meal translations
        meals_spaghettiCarbonara: 'Spaghetti Carbonara',
        meals_grilledChickenRice: 'Poulet Grillé avec Riz',
        meals_vegetableStirFry: 'Sauté de Légumes',
        meals_salmonLemonButter: 'Saumon avec Beurre de Limon',
        meals_beefTacos: 'Tacos de Viande',
        meals_mushroomRisotto: 'Risotto aux Champignons',
        meals_thaiGreenCurry: 'Curry Vert Thaïlandais',
        meals_margheritaPizza: 'Pizza Margherita',
        meals_beefStroganoff: 'Beef Stroganoff',
        meals_greekSalad: 'Salade Grecque',
        meals_butterChicken: 'Poulet au Beurre',
        meals_stuffedBellPeppers: 'Poivrons Remplis',
        meals_tunaCasserole: 'Casserole de Thon',
        meals_eggplantParmesan: 'Aubergine Parmesan',
        meals_chickenFajitas: 'Poulet Fajitas',
        meals_pulledPorkSandwiches: 'Sandwiches de Lard Retiré',
        meals_gnocchiPesto: 'Gnocchi au Pesto',
        meals_spinachRicottaCannelloni: 'Cannelloni aux Épinards et Ricotta',
        meals_bakedZiti: 'Ziti Fourré',
        meals_koreanBibimbap: 'Bibimbap Coréen',
        meals_bangersAndMash: 'Bangers and Mash',
        meals_jambalaya: 'Jambalaya',
        meals_moroccanTagine: 'Tagine Marocain',
        meals_fishAndChips: 'Poisson et Frites',
        meals_bakedMacAndCheese: 'Mac et Fromage Fourré',
        meals_chiliConCarne: 'Chili Con Carne',
        meals_ratatouille: 'Ratatouille',
        meals_bulgogiBeef: 'Bœuf Bulgogi',
        meals_quicheLorraine: 'Quiche Lorraine',
        meals_pho: 'Pho',
        meals_paella: 'Paella',
        meals_sweetAndSourChicken: 'Poulet Doux et Agréable',
        meals_porkSchnitzel: 'Schnitzel de Porc',
        meals_fettuccineAlfredo: 'Fettuccine Alfredo',
        meals_tandooriChicken: 'Poulet Tandoori',
        meals_zucchiniNoodlesMarinara: 'Pâtes de Courgette Marinara',
        meals_lentilSoup: 'Soupe de Lentilles',
        meals_shepherdsPie: 'Tarte Shepherd',
        meals_ceviche: 'Ceviche',
        meals_steakFrites: 'Steak Frites',
        meals_chickenKatsuCurry: 'Poulet Katsu Curry',
        meals_nasiGoreng: 'Nasi Goreng',
        meals_gyozaDumplings: 'Gyoza Empanadas',
        meals_risottoMilanese: 'Risotto Milanais',
        meals_beefWellington: 'Filet de Bœuf Wellington',
        meals_chickenParmesan: 'Poulet Parmesan',
        meals_croqueMonsieur: 'Croque Monsieur',
        meals_roastDuckOrangeSauce: 'Dinde Rôtie à Sauce Orange',
        meals_coconutChickenCurry: 'Curry de Poulet au Coco',
        meals_moussaka: 'Moussaka',
        meals_shrimpTacos: 'Crevettes au Pesto',
        meals_avocadoToast: 'Toast au Avocat',
        meals_kimchiFriedRice: 'Riz Frit Kimchi',
        meals_lasagna: 'Lasagne',
        meals_japaneseCurry: 'Curry Japonais',
        meals_calamari: 'Calamars',
        meals_chickenShawarma: 'Poulet Shawarma',
        meals_porkRamen: 'Ramen de Porc',
        meals_steamedDumplings: 'Empanadas Steampé',
        meals_vietnameseBanhMi: 'Banh Mi Viêt Nam',
        meals_beefEnchiladas: 'Enchiladas de Bœuf',
        meals_bruschetta: 'Bruschetta',
        meals_chickenCacciatore: 'Poulet Cacciatore',
        meals_pulledJackfruitTacos: 'Tacos de Jackfruit Retiré',
        meals_tortelliniAlfredo: 'Tortellini Alfredo',
        meals_gingerChickenStirFry: 'Poulet Ginger Stir Fry',
        meals_barbacoaBeef: 'Bœuf Barbacoa',
        meals_steakQuesadilla: 'Quiche de Bœuf',
        meals_sushiRolls: 'Rolls de Sushi',
        meals_okonomiyaki: 'Okonomiyaki',
        meals_mapoTofu: 'Tofu Mapo',
        meals_shakshuka: 'Shakshuka',
        meals_halloumiBurgers: 'Burgers au Halloumi',
        meals_chickenCaesarWraps: 'Wraps de Poulet Caesar',
        meals_turkeyMeatballs: 'Boulettes de Dinde',
        meals_pastaPrimavera: 'Pasta Primavera',
        meals_tofuPadSeeEw: 'Tofu Pad See Ew',
        meals_arrozConPollo: 'Riz au Poulet',
        meals_crabCakes: 'Gâteaux de Crevette',
        meals_gumbo: 'Gumbo',
        meals_biryani: 'Biryani',
        meals_beefBulgogiBowls: 'Tasses de Bulgogi de Bœuf',
        meals_hoisinDuckWraps: 'Wraps de Canard Hoisin',
        meals_spinachPie: 'Tarte aux Épinards',
        meals_chickenPotPie: 'Tarte de Poulet',
        meals_bakedFalafel: 'Falafel Fourré',
        meals_prawnLinguine: 'Linguine de Crevette',
        meals_charSiuPork: 'Char Siu de Porc',
        meals_capreseSalad: 'Salade Caprese',
        meals_cottagePie: 'Tarte de Campagne',
        meals_stuffedCabbageRolls: 'Roulades de Chou Remplis',
        meals_tempuraUdon: 'Udon Tempéré',
        meals_hamAndCheeseCroquettes: 'Croquettes de Jambon et Fromage',
        meals_frenchOnionSoup: 'Soupe d\'Oignon Française',
        meals_sobaNoodleBowl: 'Tazin de Soba',
        meals_grilledSeaBass: 'Sole à la Grillade',
        meals_pekingDuck: 'Dinde de Pékin',
        meals_seafoodPaella: 'Paella de Mer',
        meals_polentaMushrooms: 'Polenta aux Champignons',
        meals_beetrootSalad: 'Salade de Remoulade',
        meals_chickenTagine: 'Tagine de Poulet',
        meals_vegetarianChili: 'Chili Végétarien',
        meals_stuffedMushrooms: 'Champignons Remplis',
        meals_chickenAlfredo: 'Poulet Alfredo',
        meals_tofuStirFry: 'Tofu Sauté',
        meals_beefAndBroccoli: 'Bœuf et Broccoli',
        meals_tunaSalad: 'Salade de Thon',
        meals_bbqChickenPizza: 'Pizza de Poulet BBQ',
        meals_eggFriedRice: 'Riz Frit',
        meals_bakedPotatoesCheese: 'Pommes de Terre Fourrées',
        meals_chickpeaCurry: 'Curry de Chickpeas',
        meals_meatballSubs: 'Soupes de Boules de Viande',
        meals_shreddedChickenEnchiladas: 'Enchiladas de Poulet Déshabillé',
        meals_pastaBolognese: 'Pasta Bolognese',
        meals_salmonTeriyaki: 'Saumon Teriyaki',
        meals_crispyTofuTacos: 'Tacos de Tofu Frit',
        meals_eggplantStirFry: 'Tofu Sauté',
        meals_stuffedSweetPotatoes: 'Pommes de Terre Douces Remplies',
        meals_veggieBurritoBowl: 'Tazin de Burrito Végétarien',
        meals_shrimpFriedRice: 'Riz Frit de Crevette',
        meals_zoodleStirFry: 'Tosté de Zoodle',
        meals_chickenPestoWrap: 'Wrap de Pesto de Poulet',
        meals_baconAndEggSandwich: 'Sandwich à la Pancette',
        meals_garlicButterShrimp: 'Crevette au Beurre d\'Ail',
        meals_frenchToast: 'Toast Français',
        meals_huevosRancheros: 'Huevos Rancheros',
        meals_sweetPotatoCurry: 'Curry de Pomme de Terre',
        meals_spinachRavioli: 'Ravioli d\'Épinards',
        meals_tomYumSoup: 'Soupe Tom Yum',
        meals_spicyChickenRamen: 'Ramen de Poulet Picant',
        meals_kimchiStew: 'Stew Kimchi',
        meals_stuffedZucchiniBoats: 'Tostés de Courgette Remplis',
        meals_turkeyClubSandwich: 'Sandwich de Club de Dinde',
        meals_tortillaEspanola: 'Tortilla Espagnole',
        meals_beefJerkyRiceBowl: 'Tazin de Bœuf Séché',
        meals_chiliTofu: 'Tofu Picant',
        meals_cucumberSandwiches: 'Sandwiches de Concombre',
        meals_japaneseTamagoyaki: 'Tamagoyaki Japonais',
        meals_blackBeanBurgers: 'Burgers de Fève noire',
        meals_katsuSando: 'Katsu Sando',
        meals_eggCurry: 'Curry d\'Oeuf',
        meals_fishTikka: 'Tikka de Poisson',
        meals_bulgurWheatSalad: 'Salade de Blé Bulgare',
        meals_vegetarianTacos: 'Tacos Végétariens',
        meals_baconMacAndCheese: 'Mac et Fromage à la Pancette',
        meals_creamyMushroomPasta: 'Pâte à la Crème de Champignons',
        meals_chickenGyros: 'Gyros de Poulet',
        meals_pitaWithHummus: 'Pita avec Hummus',
        meals_cranberryChickenSalad: 'Salade de Poulet aux Framboises',
        meals_pineappleFriedRice: 'Riz Frit de Pêche',
        meals_mangoChickenWraps: 'Wraps de Poulet au Mangue',
        meals_lambRoganJosh: 'Lamb Rogan Josh',
        meals_crabLinguine: 'Linguine de Crevette',
        meals_clamChowder: 'Casse-Croûte de Crevette',
        meals_spinachAndFetaQuesadilla: 'Quiche aux Épinards et Feta',
        meals_potatoLeekSoup: 'Soupe de Poireau',
        meals_roastBeefSandwich: 'Sandwich de Bœuf Rôti',
        meals_avocadoChickenBowl: 'Tazin de Poulet au Avocat',
        meals_sourdoughGrilledCheese: 'Fromage Frais Grillé',
        meals_srirachaNoodles: 'Nouilles Sriracha',
        meals_kaleCaesarSalad: 'Salade de Chou et Quinoa',
        meals_pestoZoodles: 'Pâtes Zoodles au Pesto',
        meals_chiliMac: 'Chili Mac',
        meals_shrimpLettuceWraps: 'Wraps de Crevette',
        meals_panzanella: 'Panzanella',
        meals_picoDeGalloChicken: 'Poulet Picant',
        meals_salmonCakes: 'Gâteaux de Saumon',
        meals_yakisoba: 'Yakisoba',
        meals_porkBellyBuns: 'Buns de Lard de Porc',
        meals_greenLentilSalad: 'Salade de Lentilles',
        meals_veganPokeBowl: 'Tazin de Poke Végétarien',
        meals_creamyCauliflowerSoup: 'Soupe de Chou-fleur Crémeuse',
        meals_chickenNoodleSoup: 'Soupe de Fideos de Poulet',
        meals_broccoliCheddarSoup: 'Soupe de Broccoli Cheddar',
        meals_shiitakeFriedRice: 'Riz Frit de Shiitake',
        meals_smashedChickpeaSalad: 'Salade de Chickpeas',
        meals_veganShepherdsPie: 'Tarte de Mouton Végétarien',
        meals_bbqTempehWraps: 'Wraps de Tempeh BBQ',
        meals_orangeChicken: 'Poulet Orange',
        meals_pineappleChicken: 'Poulet de Pêche',
        meals_coconutShrimpCurry: 'Curry de Crevette au Coco',
        meals_garlicNaanWithChole: 'Naan au Chole',
        meals_mexicanRiceBowl: 'Tazin de Riz Mexicain',
        meals_buffaloChickenSandwich: 'Sandwich de Poulet Buffalo',
        meals_pestoChickenPizza: 'Pizza de Poulet au Pesto',
        meals_steamedBaoBuns: 'Buns de Bao Steampé',
        meals_thaiBasilChicken: 'Poulet au Ail de Thaïlandais',
        meals_cornbreadAndChili: 'Tostada de Maïs et Chili',
        meals_cheesyBroccoliBake: 'Tarte au Broccoli',
        meals_beefKofta: 'Kofta de Bœuf',
        meals_roastedCauliflowerTacos: 'Tacos de Chou-fleur Rôtis',
        meals_mangoAvocadoSalad: 'Salade Mangue-Avocat',
        meals_lemonGarlicPasta: 'Pâte à l\'Ail et au Limon',
        meals_roastedVegetableFlatbread: 'Pain Plat de Légumes Rôti',
        meals_chickenAvocadoSandwich: 'Sandwich de Poulet au Avocat',
        meals_eggSaladSandwich: 'Sandwich d\'Oeuf',
        meals_cubanSandwich: 'Sandwich Cubain',
        meals_shrimpGrits: 'Shrimp and Grits',
        meals_pumpkinRisotto: 'Risotto de Pomme de Terre',
        meals_lambMoussaka: 'Moussaka de Lard',
        meals_italianSub: 'Sub Italien',
        meals_chickenTikkaMasala: 'Poulet Tikka Masala',
        meals_pestoPasta: 'Pâte au Pesto',
        meals_lambKebabs: 'Kebabs de Lard',
        meals_shrimpScampi: 'Scampi de Crevette',
        meals_caesarSalad: 'Salade Cesar',
        meals_vegetableLasagna: 'Lasagne Végétarienne',
        meals_teriyakiSalmon: 'Saumon Teriyaki',
        meals_beefBurgers: 'Burgers de Bœuf',
        meals_padThai: 'Pad Thai',
        meals_mushroomWellington: 'Filet de Lard Rôti',
        meals_hotAndSourSoup: 'Soupe Picante',
        meals_bakedEggplant: 'Aubergine Rôtie',
        meals_friedChickenSandwich: 'Sandwich de Poulet Frit',
        meals_veggieSushi: 'Sushi Végétarien',
        meals_sobaNoodlesWithVeggies: 'Nouilles Soba avec Légumes',
        meals_misoRamen: 'Ramen Miso',
        meals_gingerPork: 'Bœuf Ginger',
        meals_sesameChicken: 'Poulet au Sésame',
        meals_stuffedTomatoes: 'Tomates Remplis',
        meals_roastedBeetSalad: 'Salade de Remoulade Rôtie',
        meals_nicoiseSalad: 'Salade Nicoise',
        meals_beefCurry: 'Curry de Bœuf',
        meals_salmonAvocadoRoll: 'Rouleau de Saumon et Avocat',
        meals_tofuCurry: 'Curry de Tofu',
        meals_baconWrappedDates: 'Framboises Roulées',
        meals_avocadoEggSalad: 'Salade d\'Oeuf et Avocat',
        meals_roastedTurkeyBreast: 'Poitrine de Dinde Rôtie',
        meals_spaghettiAglioEOlio: 'Spaghetti Aglio e Olio',
        meals_veganMacAndCheese: 'Mac et Fromage Végétarien',
        meals_sweetPotatoFries: 'Pommes de Terre Douces',
        meals_brusselsSproutsWithBacon: 'Chou-de-Bruxelles avec Pancette',
        meals_couscousSalad: 'Salade de Couscous',
        meals_lobsterBisque: 'Bisque de Homard',
        meals_trufflePasta: 'Pâte à la Truffe',
        meals_ricottaPancakes: 'Pancakes de Ricotta',
        meals_blueberryWaffles: 'Waffles aux Framboises',
        meals_grilledShrimpSkewers: 'Brochettes de Crevette',
        meals_spaghettiWithMeatballs: 'Spaghetti avec des Boules de Viande',
        meals_frenchCrepes: 'Crepes Françaises',
        meals_bbqRibs: 'Ribs BBQ',
        meals_kaleAndQuinoaSalad: 'Salade de Chou et Quinoa',
        meals_eggplantCaponata: 'Caponata d\'Aubergine',
        meals_cauliflowerSteak: 'Steak de Chou-fleur',
        meals_sweetcornFritters: 'Fritures de Maïs',
        meals_shrimpTacosWithSlaw: 'Tacos de Crevette avec Remoulade',
        meals_crabFriedRice: 'Riz Frit de Crevette',
        meals_garlicChickenThighs: 'Cuisses de Poulet au Ail',
        meals_lambSouvlaki: 'Souvlaki de Lard',
        meals_texMexBowl: 'Tazin Tex-Mex',
        meals_baconFriedRice: 'Riz Frit à la Pancette',
        meals_ovenBakedFalafel: 'Falafel Fourré',
        meals_smokedSalmonBagel: 'Bagel Smoked',
        meals_jerkChicken: 'Poulet à la Jerk',
        meals_tomatoBasilSoup: 'Soupe au Tomate et Ail',
        meals_pineappleChickenRice: 'Riz de Poulet au Pêche',
        meals_stuffedPortobelloMushrooms: 'Champiñones Rellenos',
        meals_chickenYakisoba: 'Yakisoba',
        meals_ramenWithSoftBoiledEgg: 'Ramen avec Œuf Dur',
        meals_moroccanCouscous: 'Couscous Marocain',
        meals_lemonDillChicken: 'Poulet au Citron et Persil',
        meals_chimichurriSteak: 'Steak Chimichurri',
        meals_italianWeddingSoup: 'Soupe de Mariage Italienne',
        meals_spinachArtichokePasta: 'Pâte aux Épinards et Artichaut',
        meals_spicyTunaRoll: 'Rouleau de Thon Picant',
        meals_mangoSalsaChicken: 'Poulet au Salsa de Mangue',
        meals_garlicParmesanWings: 'Ailes de Ail et Parmesan',
        meals_broccoliStirFry: 'Broccoli Sauté',
        meals_cabbageRolls: 'Roulades de Chou',
        meals_shreddedPorkTacos: 'Tacos de Lomo Desmenuzado',
        meals_fajitaBowl: 'Tazin de Fajitas',
        meals_pumpkinSoup: 'Soupe de Pomme de Terre',
        meals_beefAndBeanBurritos: 'Burritos de Bœuf et Fève',
        meals_cornFritters: 'Fritures de Maïs',
        meals_vietnameseSpringRolls: 'Roulées de Printemps',
        meals_chickenPestoPasta: 'Pâte au Pesto',
        meals_steamedMussels: 'Mussels Steampé',
        meals_roastedChickpeas: 'Chichpeas Rôtis',
        meals_koreanFriedChicken: 'Poulet Frit Coréen',
        meals_porkGyoza: 'Gyoza de Porc',
        meals_miniQuiches: 'Mini Quiches',
        meals_thaiLarb: 'Thai Larb',
        meals_shrimpToast: 'Toast de Crevette',
        meals_avocadoCornSalad: 'Salade de Maïs',
        meals_veggieStirFryNoodles: 'Nouilles Sauté',
        meals_brieAndAppleSandwich: 'Sandwich de Brie et Pomme',
        meals_savoryCrepes: 'Crepes Savory',
        meals_duckConfit: 'Confit de Canard',
        meals_gheeRoastChicken: 'Poulet Rôti',
        meals_paprikaChicken: 'Poulet Picant',
        meals_okraAndTomatoes: 'Okra et Tomates',
        meals_smokedBrisket: 'Lomo Fumado',
        meals_szechuanTofu: 'Tofu Szechuan',
        meals_beefTeriyaki: 'Bœuf Teriyaki',
        meals_pineappleSalsaFish: 'Poisson avec Salsa de Pêche',
        meals_creamedSpinach: 'Épinards Crémeux',
        meals_tunaMelt: 'Tuna Melt',
        meals_artichokePizza: 'Pizza d\'Artichaut',
        meals_garlicRoastedPotatoes: 'Pommes de Terre Rôties',
        start: "Commencer",
        addedToFavorites: "✨ Ajouté à vos favoris ! Consultez la page des favoris pour voir vos repas enregistrés.",
        alreadyInFavorites: "Ce repas est déjà dans vos favoris !"
    },
    zh: {
        welcome: '欢迎使用AI膳食规划师！您的美味健康餐点个人助手。',
        startMealPlanning: '开始膳食规划',
        chooseAMeal: '选择餐点',
        back: '← 返回主菜单',
        favorites: '收藏夹',
        addToFavorites: '添加到收藏夹',
        noFavorites: '还没有喜欢的餐点。从餐点选择页面添加一些吧！',
        teamMembers: '团队成员：Shayan, Mitchell, Eddie, Jaskunwar',
        // Meal Selection translations
        popularMeals: '从我们精选的美味食谱中选择',
        loadMore: '加载更多',
        loading: '正在准备您的食谱...',
        searchMeals: '搜索食谱...',
        ingredients: '食材',
        noIngredients: '暂无食材信息',
        instructions: '烹饪步骤',
        noInstructions: '暂无烹饪步骤',
        needAdjustments: '需要调整？',
        refinementPlaceholder: "我没有米饭，可以用什么代替？",
        askAI: '询问AI',
        aiThinking: 'AI思考中...',
        customizingRecipe: '根据您的要求定制食谱...',
        // Ingredient Selector translations
        selectIngredients: '选择食材',
        searchIngredients: '搜索食材...',
        selectedIngredients: '已选食材',
        generateMeal: '生成餐点',
        dietaryTags: '饮食偏好',
        weightLoss: '减重',
        muscleGain: '增肌',
        ketoFriendly: '生酮友好',
        vegan: '纯素',
        vegetarian: '素食',
        glutenFree: '无麸质',
        quickEasy: '快速简单',
        budgetFriendly: '经济实惠',
        chooseIngredients: '选择您现有的食材来寻找匹配的食谱',
        noIngredientsSelected: '未选择食材',
        generatingMeal: '正在生成餐点...',
        findingRecipe: '正在为您寻找完美的食谱...',
        // Ingredient translations
        ingredients_tomatoes: '番茄',
        ingredients_onions: '洋葱',
        ingredients_garlic: '大蒜',
        ingredients_bellPeppers: '甜椒',
        ingredients_carrots: '胡萝卜',
        ingredients_broccoli: '西兰花',
        ingredients_spinach: '菠菜',
        ingredients_lettuce: '生菜',
        ingredients_mushrooms: '蘑菇',
        ingredients_zucchini: '西葫芦',
        ingredients_eggplant: '茄子',
        ingredients_cucumber: '黄瓜',
        ingredients_celery: '芹菜',
        ingredients_asparagus: '芦笋',
        ingredients_sweetPotatoes: '红薯',
        ingredients_potatoes: '土豆',
        ingredients_corn: '玉米',
        ingredients_greenBeans: '四季豆',
        ingredients_peas: '豌豆',
        ingredients_cauliflower: '花椰菜',
        pleaseSelectIngredient: '请至少选择一种食材。',
        // Meal translations
        meals_spaghettiCarbonara: '意大利面配奶油蘑菇酱',
        meals_grilledChickenRice: '烤鸡配米饭',
        meals_vegetableStirFry: '蔬菜炒饭',
        meals_salmonLemonButter: '柠檬黄油鲑鱼',
        meals_beefTacos: '牛肉塔可',
        meals_mushroomRisotto: '蘑菇烩饭',
        meals_thaiGreenCurry: '泰式青咖喱',
        meals_margheritaPizza: '玛格丽特披萨',
        meals_beefStroganoff: '牛肉斯特罗甘诺夫',
        meals_greekSalad: '希腊沙拉',
        meals_butterChicken: '黄油鸡',
        meals_stuffedBellPeppers: '填充辣椒',
        meals_tunaCasserole: '金枪鱼炖菜',
        meals_eggplantParmesan: '茄子帕尔马干酪',
        meals_chickenFajitas: '鸡肉塔可',
        meals_pulledPorkSandwiches: '抽取猪肉三明治',
        meals_gnocchiPesto: '意大利青酱通心粉',
        meals_spinachRicottaCannelloni: '菠菜和奶酪意大利面',
        meals_bakedZiti: '烤宽面条',
        meals_koreanBibimbap: '韩国拌饭',
        meals_bangersAndMash: '牛肉土豆泥',
        meals_jambalaya: '什锦菜',
        meals_moroccanTagine: '摩洛哥塔吉锅',
        meals_fishAndChips: '鱼和薯条',
        meals_bakedMacAndCheese: '烤奶酪通心粉',
        meals_chiliConCarne: '肉末炒菜',
        meals_ratatouille: '烤蔬菜',
        meals_bulgogiBeef: '烤牛肉',
        meals_quicheLorraine: '洛林酥皮派',
        meals_pho: '河粉',
        meals_paella: '西班牙海鲜饭',
        meals_sweetAndSourChicken: '甜酸鸡',
        meals_porkSchnitzel: '猪肉排',
        meals_fettuccineAlfredo: '意大利宽面条',
        meals_tandooriChicken: '坦都里烤鸡',
        meals_zucchiniNoodlesMarinara: '意大利面配马尔纳拉酱',
        meals_lentilSoup: '小扁豆汤',
        meals_shepherdsPie: '牧羊人派',
        meals_ceviche: '生鱼片',
        meals_steakFrites: '牛排薯条',
        meals_chickenKatsuCurry: '日式炸鸡咖喱',
        meals_nasiGoreng: '印尼炒饭',
        meals_gyozaDumplings: '饺子',
        meals_risottoMilanese: '米兰式烩饭',
        meals_beefWellington: '牛排派',
        meals_chickenParmesan: '鸡肉帕尔马干酪',
        meals_croqueMonsieur: '法式烤奶酪三明治',
        meals_roastDuckOrangeSauce: '烤鸭橙酱',
        meals_coconutChickenCurry: '椰子鸡咖喱',
        meals_moussaka: '穆萨卡',
        meals_shrimpTacos: '大虾塔可',
        meals_avocadoToast: '牛油果吐司',
        meals_kimchiFriedRice: '泡菜炒饭',
        meals_lasagna: '意大利面',
        meals_japaneseCurry: '日式咖喱',
        meals_calamari: '鱿鱼',
        meals_chickenShawarma: '鸡肉沙瓦玛',
        meals_porkRamen: '猪肉拉面',
        meals_steamedDumplings: '蒸饺',
        meals_vietnameseBanhMi: '越南三明治',
        meals_beefEnchiladas: '牛肉卷饼',
        meals_bruschetta: '烤面包',
        meals_chickenCacciatore: '鸡肉坎恰罗特',
        meals_pulledJackfruitTacos: '抽取木瓜塔可',
        meals_tortelliniAlfredo: '意大利宽面条',
        meals_gingerChickenStirFry: '姜鸡炒饭',
        meals_barbacoaBeef: '巴尔巴科牛肉',
        meals_steakQuesadilla: '牛排卷饼',
        meals_sushiRolls: '寿司卷',
        meals_okonomiyaki: '御好烧',
        meals_mapoTofu: '麻婆豆腐',
        meals_shakshuka: '沙卡舒卡',
        meals_halloumiBurgers: '哈罗米汉堡',
        meals_chickenCaesarWraps: '鸡肉凯撒卷',
        meals_turkeyMeatballs: '火鸡肉丸',
        meals_pastaPrimavera: '春季意大利面',
        meals_tofuPadSeeEw: '豆腐拌饭',
        meals_arrozConPollo: '鸡肉米饭',
        meals_crabCakes: '螃蟹蛋糕',
        meals_gumbo: '卡真',
        meals_biryani: '比尔亚尼',
        meals_beefBulgogiBowls: '牛肉博格高杯',
        meals_hoisinDuckWraps: '鸭肉酱卷',
        meals_spinachPie: '菠菜派',
        meals_chickenPotPie: '鸡肉派',
        meals_bakedFalafel: '烤鹰嘴豆泥',
        meals_prawnLinguine: '大虾意大利面',
        meals_charSiuPork: '叉烧猪肉',
        meals_capreseSalad: '马苏里拉奶酪沙拉',
        meals_cottagePie: '乡村派',
        meals_stuffedCabbageRolls: '卷心菜卷',
        meals_tempuraUdon: '天妇罗乌冬面',
        meals_hamAndCheeseCroquettes: '火腿奶酪烤饼',
        meals_frenchOnionSoup: '法式洋葱汤',
        meals_sobaNoodleBowl: '荞麦面碗',
        meals_grilledSeaBass: '烤海鲈鱼',
        meals_pekingDuck: '北京烤鸭',
        meals_seafoodPaella: '海鲜饭',
        meals_polentaMushrooms: '玉米糊配蘑菇',
        meals_beetrootSalad: '甜菜沙拉',
        meals_chickenTagine: '鸡肉塔吉锅',
        meals_vegetarianChili: '素食辣椒',
        meals_stuffedMushrooms: '填充蘑菇',
        meals_chickenAlfredo: '鸡肉阿尔弗雷多',
        meals_tofuStirFry: '豆腐炒饭',
        meals_beefAndBroccoli: '牛肉和西兰花',
        meals_tunaSalad: '金枪鱼沙拉',
        meals_bbqChickenPizza: 'BBQ鸡肉披萨',
        meals_eggFriedRice: '鸡蛋炒饭',
        meals_bakedPotatoesCheese: '奶酪烤土豆',
        meals_chickpeaCurry: '鹰嘴豆咖喱',
        meals_meatballSubs: '肉丸三明治',
        meals_shreddedChickenEnchiladas: '鸡肉卷饼',
        meals_pastaBolognese: '博洛尼亚肉酱面',
        meals_salmonTeriyaki: '三文鱼天妇罗',
        meals_crispyTofuTacos: '脆皮豆腐塔可',
        meals_eggplantStirFry: '茄子炒饭',
        meals_stuffedSweetPotatoes: '甜土豆卷',
        meals_veggieBurritoBowl: '素食卷饼碗',
        meals_shrimpFriedRice: '虾炒饭',
        meals_zoodleStirFry: '炒面',
        meals_chickenPestoWrap: '鸡肉青酱卷',
        meals_baconAndEggSandwich: '培根和鸡蛋三明治',
        meals_garlicButterShrimp: '蒜黄油虾',
        meals_frenchToast: '法式吐司',
        meals_huevosRancheros: '墨西哥蛋饼',
        meals_sweetPotatoCurry: '甜土豆咖喱',
        meals_spinachRavioli: '菠菜拉维罗',
        meals_tomYumSoup: '冬阴功汤',
        meals_spicyChickenRamen: '辣鸡肉拉面',
        meals_kimchiStew: '泡菜炖菜',
        meals_stuffedZucchiniBoats: '填充西葫芦船',
        meals_turkeyClubSandwich: '火鸡俱乐部三明治',
        meals_tortillaEspanola: '西班牙煎饼',
        meals_beefJerkyRiceBowl: '牛肉干米饭',
        meals_chiliTofu: '豆腐辣酱',
        meals_cucumberSandwiches: '黄瓜三明治',
        meals_japaneseTamagoyaki: '日式玉子烧',
        meals_blackBeanBurgers: '黑豆汉堡',
        meals_katsuSando: '日式三明治',
        meals_eggCurry: '鸡蛋咖喱',
        meals_fishTikka: '鱼Tikka',
        meals_bulgurWheatSalad: '粗麦沙拉',
        meals_vegetarianTacos: '素食塔可',
        meals_baconMacAndCheese: '培根奶酪',
        meals_creamyMushroomPasta: '奶油蘑菇面',
        meals_chickenGyros: '鸡肉Gyros',
        meals_pitaWithHummus: '皮塔配鹰嘴豆泥',
        meals_cranberryChickenSalad: '蔓越莓鸡肉沙拉',
        meals_pineappleFriedRice: '菠萝炒饭',
        meals_mangoChickenWraps: '芒果鸡肉卷',
        meals_lambRoganJosh: '羊肉罗根乔什',
        meals_crabLinguine: '螃蟹意大利面',
        meals_clamChowder: '蛤蜊浓汤',
        meals_spinachAndFetaQuesadilla: '菠菜和菲达奶酪卷饼',
        meals_potatoLeekSoup: '韭菜土豆汤',
        meals_roastBeefSandwich: '烤牛肉三明治',
        meals_avocadoChickenBowl: '牛油果鸡肉碗',
        meals_sourdoughGrilledCheese: '酸面包烤奶酪',
        meals_srirachaNoodles: '辣面',
        meals_kaleCaesarSalad: '凯撒沙拉',
        meals_pestoZoodles: '意大利面',
        meals_chiliMac: '辣面',
        meals_shrimpLettuceWraps: '虾生菜卷',
        meals_panzanella: '帕萨内拉',
        meals_picoDeGalloChicken: '墨西哥胡椒鸡',
        meals_salmonCakes: '三文鱼蛋糕',
        meals_yakisoba: '烤荞麦面',
        meals_porkBellyBuns: '猪肚三明治',
        meals_greenLentilSalad: '绿色小扁豆沙拉',
        meals_veganPokeBowl: '素食poke碗',
        meals_creamyCauliflowerSoup: '奶油花椰菜汤',
        meals_chickenNoodleSoup: '鸡肉面汤',
        meals_broccoliCheddarSoup: '奶油花椰菜汤',
        meals_shiitakeFriedRice: '香菇炒饭',
        meals_smashedChickpeaSalad: '鹰嘴豆沙拉',
        meals_veganShepherdsPie: '素食牧羊人派',
        meals_bbqTempehWraps: 'BBQ烤豆卷',
        meals_orangeChicken: '橙色鸡肉',
        meals_pineappleChicken: '菠萝鸡肉',
        meals_coconutShrimpCurry: '椰子虾咖喱',
        meals_garlicNaanWithChole: '大蒜naan',
        meals_mexicanRiceBowl: '墨西哥米饭碗',
        meals_buffaloChickenSandwich: '水牛城鸡肉三明治',
        meals_pestoChickenPizza: '意大利辣味鸡肉披萨',
        meals_steamedBaoBuns: '蒸包子',
        meals_thaiBasilChicken: '泰国罗勒鸡',
        meals_cornbreadAndChili: '玉米面包和辣椒',
        meals_cheesyBroccoliBake: '奶酪花椰菜烤',
        meals_beefKofta: '牛肉烤肉',
        meals_roastedCauliflowerTacos: '烤花椰菜塔可',
        meals_mangoAvocadoSalad: '芒果牛油果沙拉',
        meals_lemonGarlicPasta: '柠檬大蒜面',
        meals_roastedVegetableFlatbread: '烤蔬菜扁面包',
        meals_chickenAvocadoSandwich: '鸡肉牛油果三明治',
        meals_eggSaladSandwich: '鸡蛋沙拉三明治',
        meals_cubanSandwich: '古巴三明治',
        meals_shrimpGrits: '虾和玉米粥',
        meals_pumpkinRisotto: '南瓜饭',
        meals_lambMoussaka: '羊肉穆萨卡',
        meals_italianSub: '意大利三明治',
        meals_chickenTikkaMasala: '鸡肉Tikka Masala',
        meals_pestoPasta: '青酱面',
        meals_lambKebabs: '羊肉串',
        meals_shrimpScampi: '虾大虾',
        meals_caesarSalad: '凯撒沙拉',
        meals_vegetableLasagna: '蔬菜千层面',
        meals_teriyakiSalmon: '三文鱼天妇罗',
        meals_beefBurgers: '牛肉汉堡',
        meals_padThai: '泰式炒河粉',
        meals_mushroomWellington: '蘑菇惠灵顿',
        meals_hotAndSourSoup: '辣和酸汤',
        meals_bakedEggplant: '烤茄子',
        meals_friedChickenSandwich: '炸鸡三明治',
        meals_veggieSushi: '素食寿司',
        meals_sobaNoodlesWithVeggies: '荞麦面配蔬菜',
        meals_misoRamen: '味噌拉面',
        meals_gingerPork: '姜猪肉',
        meals_sesameChicken: '芝麻鸡',
        meals_stuffedTomatoes: '填充西红柿',
        meals_roastedBeetSalad: '烤甜菜沙拉',
        meals_nicoiseSalad: '尼科西亚沙拉',
        meals_beefCurry: '牛肉咖喱',
        meals_salmonAvocadoRoll: '三文鱼牛油果卷',
        meals_tofuCurry: '豆腐咖喱',
        meals_baconWrappedDates: '培根包裹的日期',
        meals_avocadoEggSalad: '牛油果鸡蛋沙拉',
        meals_roastedTurkeyBreast: '烤火鸡胸',
        meals_spaghettiAglioEOlio: '意大利面',
        meals_veganMacAndCheese: '素食奶酪',
        meals_sweetPotatoFries: '甜土豆薯条',
        meals_brusselsSproutsWithBacon: '布鲁塞尔芽菜配培根',
        meals_couscousSalad: '库斯库斯沙拉',
        meals_lobsterBisque: '龙虾浓汤',
        meals_trufflePasta: '松露面',
        meals_ricottaPancakes: '乳清干酪煎饼',
        meals_blueberryWaffles: '蓝莓华夫饼',
        meals_grilledShrimpSkewers: '烤大虾串',
        meals_spaghettiWithMeatballs: '意大利面配肉丸',
        meals_frenchCrepes: '法式可丽饼',
        meals_bbqRibs: 'BBQ排骨',
        meals_kaleAndQuinoaSalad: '羽衣甘蓝和藜麦沙拉',
        meals_eggplantCaponata: '茄子Caponata',
        meals_cauliflowerSteak: '花椰菜牛排',
        meals_sweetcornFritters: '甜玉米片',
        meals_shrimpTacosWithSlaw: '虾和卷心菜沙拉塔可',
        meals_crabFriedRice: '螃蟹炒饭',
        meals_garlicChickenThighs: '大蒜鸡腿',
        meals_lambSouvlaki: '羊肉Souvlaki',
        meals_texMexBowl: '德州墨西哥碗',
        meals_baconFriedRice: '培根炒饭',
        meals_ovenBakedFalafel: '烤鹰嘴豆泥',
        meals_smokedSalmonBagel: '烟熏三文鱼Bagel',
        meals_jerkChicken: '牙买加烤鸡',
        meals_tomatoBasilSoup: '番茄罗勒汤',
        meals_pineappleChickenRice: '菠萝鸡肉饭',
        meals_stuffedPortobelloMushrooms: '填充蘑菇',
        meals_chickenYakisoba: '鸡肉Yakisoba',
        meals_ramenWithSoftBoiledEgg: '带软煮鸡蛋的拉面',
        meals_moroccanCouscous: '摩洛哥库斯库斯',
        meals_lemonDillChicken: '柠檬香菜鸡',
        meals_chimichurriSteak: '烤肉酱牛排',
        meals_italianWeddingSoup: '意大利婚礼汤',
        meals_spinachArtichokePasta: '菠菜和洋蓟面',
        meals_spicyTunaRoll: '辣金枪鱼卷',
        meals_mangoSalsaChicken: '芒果莎莎鸡肉',
        meals_garlicParmesanWings: '大蒜帕尔马干酪翅膀',
        meals_broccoliStirFry: '炒花椰菜',
        meals_cabbageRolls: '卷心菜卷',
        meals_shreddedPorkTacos: '猪肉塔可',
        meals_fajitaBowl: '法吉塔碗',
        meals_pumpkinSoup: '南瓜汤',
        meals_beefAndBeanBurritos: '牛肉和豆卷饼',
        meals_cornFritters: '玉米片',
        meals_vietnameseSpringRolls: '越南春卷',
        meals_chickenPestoPasta: '鸡肉青酱面',
        meals_steamedMussels: '蒸蛤蜊',
        meals_roastedChickpeas: '烤鹰嘴豆',
        meals_koreanFriedChicken: '韩国炸鸡',
        meals_porkGyoza: '猪肉饺子',
        meals_miniQuiches: '迷你Quiches',
        meals_thaiLarb: '泰国Larb',
        meals_shrimpToast: '虾吐司',
        meals_avocadoCornSalad: '牛油果玉米沙拉',
        meals_veggieStirFryNoodles: '炒蔬菜面',
        meals_brieAndAppleSandwich: '布里和苹果三明治',
        meals_savoryCrepes: '美味可丽饼',
        meals_duckConfit: '鸭子Confit',
        meals_gheeRoastChicken: '黄油烤鸡',
        meals_paprikaChicken: '辣椒鸡',
        meals_okraAndTomatoes: '秋葵和西红柿',
        meals_smokedBrisket: '烟熏牛肋条',
        meals_szechuanTofu: '四川豆腐',
        meals_beefTeriyaki: '牛肉Teriyaki',
        meals_pineappleSalsaFish: '菠萝莎莎鱼',
        meals_creamedSpinach: '奶油菠菜',
        meals_tunaMelt: '金枪鱼融化',
        meals_artichokePizza: '洋蓟披萨',
        meals_garlicRoastedPotatoes: '烤大蒜土豆',
        start: "开始膳食规划",
        addedToFavorites: "✨ Added to your favorites! Check the favorites page to view your saved meals.",
        alreadyInFavorites: "✨ Added to your favorites! Check the favorites page to view your saved meals."
    },
};

export default translations; 