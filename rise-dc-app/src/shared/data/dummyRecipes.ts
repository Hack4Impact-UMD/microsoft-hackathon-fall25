import { Recipe } from "../types";

const placeholderImage =
  "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";

export const recipes: Recipe[] = [
  // Breakfast
  {
    id: "breakfast-overnight-oats",
    title: "Overnight Oats",
    image_id: placeholderImage,
    noCook: true,
    time: "5 minutes",
    servingSize: 1,
    meal: ["breakfast"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "rolled-oats",
          name: "Rolled Oats",
          image_id: "/oats.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "milk",
          name: "Milk",
          image_id: "/milk.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "chia-seeds",
          name: "Chia Seeds",
          image_id: "/chia.png",
        },
        quantity: "1 tbsp",
        storeQuantity: 0.0625,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "honey",
          name: "Honey",
          image_id: "/honey.png",
        },
        quantity: "1 tsp",
        storeQuantity: 0.0208,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "berries",
          name: "Mixed Berries",
          image_id: "/berries.png",
        },
        quantity: "1/4 cup",
        storeQuantity: 0.125,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "breakfast-egg-muffins",
    title: "Veggie Egg Muffins",
    image_id: placeholderImage,
    noCook: false,
    time: "30 minutes",
    servingSize: 6,
    meal: ["breakfast"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "eggs",
          name: "Eggs",
          image_id: "/eggs.png",
        },
        quantity: "6",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "milk",
          name: "Milk",
          image_id: "/milk.png",
        },
        quantity: "1/4 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "bell-pepper",
          name: "Bell Pepper",
          image_id: "/bell_pepper.png",
        },
        quantity: "1",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "spinach",
          name: "Spinach",
          image_id: "/spinach.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "cheese",
          name: "Cheddar Cheese",
          image_id: "/cheese.png",
        },
        quantity: "1/2 cup, shredded",
        storeQuantity: 0.25,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "breakfast-yogurt-parfait",
    title: "Berry Yogurt Parfait",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes",
    servingSize: 1,
    meal: ["breakfast"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "greek-yogurt",
          name: "Greek Yogurt",
          image_id: "/yogurt.png",
        },
        quantity: "1 cup",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "berries",
          name: "Mixed Berries",
          image_id: "/berries.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "granola",
          name: "Granola",
          image_id: "/granola.png",
        },
        quantity: "1/4 cup",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "honey",
          name: "Honey",
          image_id: "/honey.png",
        },
        quantity: "1 tsp",
        storeQuantity: 0.0208,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "breakfast-banana-pancakes",
    title: "Banana Pancakes",
    image_id: placeholderImage,
    noCook: false,
    time: "20 minutes",
    servingSize: 4,
    meal: ["breakfast"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "banana",
          name: "Banana",
          image_id: "/banana.png",
        },
        quantity: "2 ripe",
        storeQuantity: 2,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "eggs",
          name: "Eggs",
          image_id: "/eggs.png",
        },
        quantity: "2",
        storeQuantity: 0.167,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "rolled-oats",
          name: "Rolled Oats",
          image_id: "/oats.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "baking-powder",
          name: "Baking Powder",
          image_id: "/baking_powder.png",
        },
        quantity: "1 tsp",
        storeQuantity: 0.0417,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "butter",
          name: "Butter",
          image_id: "/butter.png",
        },
        quantity: "1 tbsp (for cooking)",
        storeQuantity: 0.125,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },

  // Lunch/Dinner
  {
    id: "lunchDinner-sheet-pan-chicken",
    title: "Sheet Pan Chicken",
    image_id: placeholderImage,
    noCook: false,
    time: "45 minutes",
    servingSize: 4,
    meal: ["lunch", "dinner"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "chicken-breast",
          name: "Chicken Breast",
          image_id: "/chicken.png",
        },
        quantity: "4 pieces",
        storeQuantity: 4,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "olive-oil",
          name: "Olive Oil",
          image_id: "/olive_oil.png",
        },
        quantity: "2 tbsp",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "carrots",
          name: "Carrots",
          image_id: "/carrots.png",
        },
        quantity: "2 cups, sliced",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "broccoli",
          name: "Broccoli",
          image_id: "/broccoli.png",
        },
        quantity: "2 cups",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "garlic",
          name: "Garlic Cloves",
          image_id: "/garlic.png",
        },
        quantity: "3",
        storeQuantity: 0.25,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "lunchDinner-stir-fry",
    title: "Veggie Stir-Fry",
    image_id: placeholderImage,
    noCook: false,
    time: "25 minutes",
    servingSize: 4,
    meal: ["lunch", "dinner"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "broccoli",
          name: "Broccoli",
          image_id: "/broccoli.png",
        },
        quantity: "2 cups",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "bell-pepper",
          name: "Bell Pepper",
          image_id: "/bell_pepper.png",
        },
        quantity: "1",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "carrots",
          name: "Carrots",
          image_id: "/carrots.png",
        },
        quantity: "1 cup, sliced",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "soy-sauce",
          name: "Soy Sauce",
          image_id: "/soy_sauce.png",
        },
        quantity: "2 tbsp",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "olive-oil",
          name: "Olive Oil",
          image_id: "/olive_oil.png",
        },
        quantity: "1 tbsp",
        storeQuantity: 0.0625,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "garlic",
          name: "Garlic Cloves",
          image_id: "/garlic.png",
        },
        quantity: "2",
        storeQuantity: 0.167,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "lunchDinner-turkey-chili",
    title: "Turkey Chili",
    image_id: placeholderImage,
    noCook: false,
    time: "60 minutes",
    servingSize: 6,
    meal: ["lunch", "dinner"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "ground-turkey",
          name: "Ground Turkey",
          image_id: "/turkey.png",
        },
        quantity: "1 lb",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "onion",
          name: "Onion",
          image_id: "/onion.png",
        },
        quantity: "1",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "bell-pepper",
          name: "Bell Pepper",
          image_id: "/bell_pepper.png",
        },
        quantity: "1",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "canned-tomatoes",
          name: "Canned Tomatoes",
          image_id: "/canned_tomatoes.png",
        },
        quantity: "14 oz",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "beans",
          name: "Beans",
          image_id: "/beans.png",
        },
        quantity: "1 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "chili-powder",
          name: "Chili Powder",
          image_id: "/chili_powder.png",
        },
        quantity: "1 tbsp",
        storeQuantity: 0.0625,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },

  {
    id: "lunchDinner-taco-bowls",
    title: "Taco Bowls",
    image_id: placeholderImage,
    noCook: false,
    time: "30 minutes",
    servingSize: 4,
    meal: ["lunch", "dinner"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "ground-turkey",
          name: "Ground Turkey",
          image_id: "/turkey.png",
        },
        quantity: "1/2 lb",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "rice",
          name: "Cooked Rice",
          image_id: "/rice.png",
        },
        quantity: "1 cup",
        storeQuantity: 0.25,
      }, // 4 cups/pack
      {
        ingredient: {
          type: "ingredient",
          id: "black-beans",
          name: "Black Beans",
          image_id: "/beans.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.125,
      }, // 4 cups/pack
      {
        ingredient: {
          type: "ingredient",
          id: "corn",
          name: "Corn",
          image_id: "/corn.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "cheese",
          name: "Cheddar Cheese",
          image_id: "/cheese.png",
        },
        quantity: "1/4 cup, shredded",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "salsa",
          name: "Salsa",
          image_id: "/salsa.png",
        },
        quantity: "2 tbsp",
        storeQuantity: 0.125,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },

  // Snacks
  {
    id: "snack-energy-balls",
    title: "Energy Bites",
    image_id: placeholderImage,
    noCook: true,
    time: "15 minutes",
    servingSize: 12,
    meal: ["snack"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "rolled-oats",
          name: "Rolled Oats",
          image_id: "/oats.png",
        },
        quantity: "1 cup",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "peanut-butter",
          name: "Peanut Butter",
          image_id: "/peanut_butter.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "honey",
          name: "Honey",
          image_id: "/honey.png",
        },
        quantity: "1/3 cup",
        storeQuantity: 0.167,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "chia-seeds",
          name: "Chia Seeds",
          image_id: "/chia.png",
        },
        quantity: "2 tbsp",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "mini-chocolate-chips",
          name: "Mini Chocolate Chips",
          image_id: "/choc_chips.png",
        },
        quantity: "1/4 cup",
        storeQuantity: 0.125,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "snack-veggie-dippers",
    title: "Veggie Dippers",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes",
    servingSize: 4,
    meal: ["snack"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "carrots",
          name: "Carrots",
          image_id: "/carrots.png",
        },
        quantity: "1 cup, sliced",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "celery",
          name: "Celery",
          image_id: "/celery.png",
        },
        quantity: "1 cup, sliced",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "bell-pepper",
          name: "Bell Pepper",
          image_id: "/bell_pepper.png",
        },
        quantity: "1",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "hummus",
          name: "Hummus",
          image_id: "/hummus.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "snack-fruit-salsa",
    title: "Fruit Salsa",
    image_id: placeholderImage,
    noCook: true,
    time: "15 minutes",
    servingSize: 6,
    meal: ["snack"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "strawberries",
          name: "Strawberries",
          image_id: "/strawberries.png",
        },
        quantity: "1 cup, chopped",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "kiwi",
          name: "Kiwi",
          image_id: "/kiwi.png",
        },
        quantity: "2, diced",
        storeQuantity: 2,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "mango",
          name: "Mango",
          image_id: "/mango.png",
        },
        quantity: "1, diced",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "lime",
          name: "Lime",
          image_id: "/lime.png",
        },
        quantity: "1, juiced",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "honey",
          name: "Honey",
          image_id: "/honey.png",
        },
        quantity: "1 tbsp",
        storeQuantity: 0.0625,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "snack-hummus-plate",
    title: "Hummus Plate",
    image_id: placeholderImage,
    noCook: true,
    time: "5 minutes",
    servingSize: 4,
    meal: ["snack"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "hummus",
          name: "Hummus",
          image_id: "/hummus.png",
        },
        quantity: "1 cup",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "carrots",
          name: "Carrots",
          image_id: "/carrots.png",
        },
        quantity: "1 cup, sliced",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "celery",
          name: "Celery",
          image_id: "/celery.png",
        },
        quantity: "1 cup, sliced",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "cucumber",
          name: "Cucumber",
          image_id: "/cucumber.png",
        },
        quantity: "1, sliced",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "bell-pepper",
          name: "Bell Pepper",
          image_id: "/bell_pepper.png",
        },
        quantity: "1, sliced",
        storeQuantity: 1,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },

  // Desserts
  {
    id: "dessert-chia-pudding",
    title: "Chia Pudding",
    image_id: placeholderImage,
    noCook: true,
    time: "5 minutes + chill time",
    servingSize: 2,
    meal: ["dessert"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "chia-seeds",
          name: "Chia Seeds",
          image_id: "/chia.png",
        },
        quantity: "3 tbsp",
        storeQuantity: 0.1875,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "milk",
          name: "Milk",
          image_id: "/milk.png",
        },
        quantity: "1 cup",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "honey",
          name: "Honey",
          image_id: "/honey.png",
        },
        quantity: "1 tbsp",
        storeQuantity: 0.0625,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "vanilla-extract",
          name: "Vanilla Extract",
          image_id: "/vanilla.png",
        },
        quantity: "1 tsp",
        storeQuantity: 0.0208,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "dessert-fruit-crisp",
    title: "Berry Crisp",
    image_id: placeholderImage,
    noCook: false,
    time: "45 minutes",
    servingSize: 6,
    meal: ["dessert"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "mixed-berries",
          name: "Mixed Berries",
          image_id: "/berries.png",
        },
        quantity: "4 cups",
        storeQuantity: 2,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "rolled-oats",
          name: "Rolled Oats",
          image_id: "/oats.png",
        },
        quantity: "1 cup",
        storeQuantity: 0.5,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "flour",
          name: "All-Purpose Flour",
          image_id: "/flour.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "brown-sugar",
          name: "Brown Sugar",
          image_id: "/brown_sugar.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "butter",
          name: "Butter",
          image_id: "/butter.png",
        },
        quantity: "1/4 cup",
        storeQuantity: 0.125,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "dessert-frozen-yogurt",
    title: "Frozen Yogurt Bark",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes + freeze time",
    servingSize: 8,
    meal: ["dessert"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "greek-yogurt",
          name: "Greek Yogurt",
          image_id: "/yogurt.png",
        },
        quantity: "2 cups",
        storeQuantity: 1,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "berries",
          name: "Mixed Berries",
          image_id: "/berries.png",
        },
        quantity: "1/2 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "honey",
          name: "Honey",
          image_id: "/honey.png",
        },
        quantity: "2 tbsp",
        storeQuantity: 0.125,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },
  {
    id: "dessert-banana-nice-cream",
    title: "Banana Nice Cream",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes",
    servingSize: 2,
    meal: ["dessert"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "banana",
          name: "Banana",
          image_id: "/banana.png",
        },
        quantity: "2 ripe",
        storeQuantity: 2,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "milk",
          name: "Milk",
          image_id: "/milk.png",
        },
        quantity: "1/4 cup",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "vanilla-extract",
          name: "Vanilla Extract",
          image_id: "/vanilla.png",
        },
        quantity: "1 tsp",
        storeQuantity: 0.0208,
      },
    ],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false,
  },

  // Lunch/Dinner – Grilled Cheese
  {
    id: "grilled-cheese",
    title: "Grilled Cheese Sandwich",
    image_id: "/grilled-cheese-img.png",
    noCook: false,
    time: "10 minutes",
    servingSize: 1,
    meal: ["lunch", "dinner"],
    ingredients: [
      {
        ingredient: {
          type: "ingredient",
          id: "bread",
          name: "Bread",
          image_id: "/bread.jpg",
        },
        quantity: "2 slices",
        storeQuantity: 0.125,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "cheese",
          name: "Cheddar Cheese",
          image_id: "/cheese.png",
        },
        quantity: "2 slices",
        storeQuantity: 0.25,
      },
      {
        ingredient: {
          type: "ingredient",
          id: "butter",
          name: "Butter",
          image_id: "/butter.png",
        },
        quantity: "1 tbsp",
        storeQuantity: 0.125,
      },
    ],
    tools: [
      {
        type: "tool",
        id: "skillet",
        name: "Skillet",
        image_id: "/skillet.png",
      },
    ],
    utensils: [
      {
        type: "utensil",
        id: "spatula",
        name: "Spatula",
        image_id: "/spatula.png",
      },
      {
        type: "utensil",
        id: "butter-knife",
        name: "Butter Knife",
        image_id: "/butter_knife.webp",
      },
    ],
    instructions: [
      {
        id: "step1",
        step_number: 1,
        image_id: placeholderImage,
        warning: "Be careful, the knife is sharp!",
        instructions: "Spread butter on one side of each bread slice."
      },
      {
        id: "step2",
        step_number: 2,
        image_id: placeholderImage,
        instructions: "Place one slice of bread, butter-side down, in a skillet over medium heat."
      },
      {
        id: "step3",
        step_number: 3,
        image_id: placeholderImage,
        instructions: "Top with cheese slices and the second slice of bread, butter-side up."
      },
      {
        id: "step4",
        step_number: 4,
        image_id: placeholderImage,
        instructions: "Cook until the bottom slice is golden brown (about 3–4 minutes)."
      },
      {
        id: "step5",
        step_number: 5,
        image_id: placeholderImage,
        instructions: "Flip the sandwich carefully with a spatula and cook until the other side is golden brown and cheese is melted."
      },
      {
        id: "step6",
        step_number: 6,
        image_id: placeholderImage,
        instructions: "Remove from skillet, slice in half, and serve hot."
      }
    ],
    nutrition: [
      { number: 400, field: "Calories" },
      { number: 12, field: "Protein (g)" },
      { number: 28, field: "Carbohydrates (g)" },
      { number: 24, field: "Fat (g)" }
    ],
    isFavorite: false,
  },
];

export function toggleFavorite(recipeId: string) {
  const recipe = recipes.find((r) => r.id === recipeId);
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
  }
}

export function getRecipe(recipeId: string) {
  return recipes.find((r) => r.id === recipeId);
}
