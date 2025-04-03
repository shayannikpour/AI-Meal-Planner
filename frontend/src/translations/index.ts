interface Translations {
    [key: string]: {
        welcome: string;
        startMealPlanning: string;
        chooseAMeal: string;
        back: string;
        favorites: string;
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
    };
}

const translations: Translations = {
    en: {
        welcome: 'Welcome to AI Meal Planner! Your personal assistant for delicious and healthy meals.',
        startMealPlanning: 'Start Meal Planning',
        chooseAMeal: 'Choose a Meal',
        back: '← Back to Main Menu',
        favorites: 'Favorites',
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
    },
    es: {
        welcome: '¡Bienvenido a AI Meal Planner! Tu asistente personal para comidas deliciosas y saludables.',
        startMealPlanning: 'Comenzar planificación',
        chooseAMeal: 'Elegir una comida',
        back: '← Volver al menú principal',
        favorites: 'Favoritos',
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
    },
    fr: {
        welcome: 'Bienvenue sur AI Meal Planner ! Votre assistant personnel pour des repas délicieux et sains.',
        startMealPlanning: 'Commencer la planification',
        chooseAMeal: 'Choisir un repas',
        back: '← Retour au menu principal',
        favorites: 'Favoris',
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
    },
    zh: {
        welcome: '欢迎使用AI膳食规划师！您的美味健康餐点个人助手。',
        startMealPlanning: '开始膳食规划',
        chooseAMeal: '选择餐点',
        back: '← 返回主菜单',
        favorites: '收藏夹',
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
    }
};

export default translations; 