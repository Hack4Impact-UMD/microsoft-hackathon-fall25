import { RecipeCategory } from "../types";

export interface RecipeCardData {
  id: string;
  title: string;
  image: string;
  category: RecipeCategory;
}

const placeholderImage =
  "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";

export const recipeCards: RecipeCardData[] = [
  {
    id: "breakfast-overnight-oats",
    title: "Overnight Oats",
    image: placeholderImage,
    category: "breakfast",
  },
  {
    id: "breakfast-egg-muffins",
    title: "Veggie Egg Muffins",
    image: placeholderImage,
    category: "breakfast",
  },
  {
    id: "breakfast-yogurt-parfait",
    title: "Berry Yogurt Parfait",
    image: placeholderImage,
    category: "breakfast",
  },
  {
    id: "breakfast-banana-pancakes",
    title: "Banana Pancakes",
    image: placeholderImage,
    category: "breakfast",
  },
  {
    id: "lunchDinner-sheet-pan-chicken",
    title: "Sheet Pan Chicken",
    image: placeholderImage,
    category: "lunchDinner",
  },
  {
    id: "lunchDinner-stir-fry",
    title: "Veggie Stir-Fry",
    image: placeholderImage,
    category: "lunchDinner",
  },
  {
    id: "lunchDinner-turkey-chili",
    title: "Turkey Chili",
    image: placeholderImage,
    category: "lunchDinner",
  },
  {
    id: "lunchDinner-taco-bowls",
    title: "Taco Bowls",
    image: placeholderImage,
    category: "lunchDinner",
  },
  {
    id: "snack-energy-balls",
    title: "Energy Bites",
    image: placeholderImage,
    category: "snack",
  },
  {
    id: "snack-veggie-dippers",
    title: "Veggie Dippers",
    image: placeholderImage,
    category: "snack",
  },
  {
    id: "snack-fruit-salsa",
    title: "Fruit Salsa",
    image: placeholderImage,
    category: "snack",
  },
  {
    id: "snack-hummus-plate",
    title: "Hummus Plate",
    image: placeholderImage,
    category: "snack",
  },
  {
    id: "dessert-chia-pudding",
    title: "Chia Pudding",
    image: placeholderImage,
    category: "dessert",
  },
  {
    id: "dessert-fruit-crisp",
    title: "Berry Crisp",
    image: placeholderImage,
    category: "dessert",
  },
  {
    id: "dessert-frozen-yogurt",
    title: "Frozen Yogurt Bark",
    image: placeholderImage,
    category: "dessert",
  },
  {
    id: "dessert-banana-nice-cream",
    title: "Banana Nice Cream",
    image: placeholderImage,
    category: "dessert",
  },
];

export const recipesByCategory: Record<RecipeCategory, RecipeCardData[]> = 
  recipeCards.reduce((acc, recipe) => {
    acc[recipe.category] = acc[recipe.category] || [];
    acc[recipe.category].push(recipe);
    return acc;
  }, {} as Record<RecipeCategory, RecipeCardData[]>);

