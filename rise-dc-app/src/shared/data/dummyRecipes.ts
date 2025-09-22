import { Recipe } from "../types";

const placeholderImage =
  "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";

export const recipes: Recipe[] = [
  {
    id: "breakfast-overnight-oats",
    title: "Overnight Oats",
    image_id: placeholderImage,
    noCook: true,
    time: "5 minutes",
    servingSize: 1,
    meal: ["breakfast"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "breakfast-egg-muffins",
    title: "Veggie Egg Muffins",
    image_id: placeholderImage,
    noCook: false,
    time: "30 minutes",
    servingSize: 6,
    meal: ["breakfast"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "breakfast-yogurt-parfait",
    title: "Berry Yogurt Parfait",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes",
    servingSize: 1,
    meal: ["breakfast"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "breakfast-banana-pancakes",
    title: "Banana Pancakes",
    image_id: placeholderImage,
    noCook: false,
    time: "20 minutes",
    servingSize: 4,
    meal: ["breakfast"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "lunchDinner-sheet-pan-chicken",
    title: "Sheet Pan Chicken",
    image_id: placeholderImage,
    noCook: false,
    time: "45 minutes",
    servingSize: 4,
    meal: ["lunch", "dinner"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "lunchDinner-stir-fry",
    title: "Veggie Stir-Fry",
    image_id: placeholderImage,
    noCook: false,
    time: "25 minutes",
    servingSize: 4,
    meal: ["lunch", "dinner"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "lunchDinner-turkey-chili",
    title: "Turkey Chili",
    image_id: placeholderImage,
    noCook: false,
    time: "60 minutes",
    servingSize: 6,
    meal: ["lunch", "dinner"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "lunchDinner-taco-bowls",
    title: "Taco Bowls",
    image_id: placeholderImage,
    noCook: false,
    time: "30 minutes",
    servingSize: 4,
    meal: ["lunch", "dinner"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "snack-energy-balls",
    title: "Energy Bites",
    image_id: placeholderImage,
    noCook: true,
    time: "15 minutes",
    servingSize: 12,
    meal: ["snack"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "snack-veggie-dippers",
    title: "Veggie Dippers",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes",
    servingSize: 4,
    meal: ["snack"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "snack-fruit-salsa",
    title: "Fruit Salsa",
    image_id: placeholderImage,
    noCook: true,
    time: "15 minutes",
    servingSize: 6,
    meal: ["snack"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "snack-hummus-plate",
    title: "Hummus Plate",
    image_id: placeholderImage,
    noCook: true,
    time: "5 minutes",
    servingSize: 4,
    meal: ["snack"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "dessert-chia-pudding",
    title: "Chia Pudding",
    image_id: placeholderImage,
    noCook: true,
    time: "5 minutes + chill time",
    servingSize: 2,
    meal: ["dessert"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "dessert-fruit-crisp",
    title: "Berry Crisp",
    image_id: placeholderImage,
    noCook: false,
    time: "45 minutes",
    servingSize: 6,
    meal: ["dessert"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "dessert-frozen-yogurt",
    title: "Frozen Yogurt Bark",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes + freeze time",
    servingSize: 8,
    meal: ["dessert"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
  {
    id: "dessert-banana-nice-cream",
    title: "Banana Nice Cream",
    image_id: placeholderImage,
    noCook: true,
    time: "10 minutes",
    servingSize: 2,
    meal: ["dessert"],
    ingredients: [],
    tools: [],
    utensils: [],
    instructions: [],
    nutrition: [],
    isFavorite: false
  },
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
          image_id: "/bread.jpg"
        },
        quantity: "2 slices"
      },
      {
        ingredient: {
          type: "ingredient",
          id: "cheese",
          name: "Cheddar Cheese",
          image_id: "/cheese.png"
        },
        quantity: "2 slices"
      },
      {
        ingredient: {
          type: "ingredient",
          id: "butter",
          name: "Butter",
          image_id: "/butter.png"
        },
        quantity: "1 tbsp"
      }
    ],
    tools: [
      {
        type: "tool",
        id: "skillet",
        name: "Skillet",
        image_id: "/skillet.png"
      }
    ],
    utensils: [
      {
        type: "utensil",
        id: "spatula",
        name: "Spatula",
        image_id: "/spatula.png"
      },
      {
        type: "utensil",
        id: "butter-knife",
        name: "Butter Knife",
        image_id: "/butter_knife.webp"
      }
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
    isFavorite: false
  }
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