// Cookbook Types

export interface Recipe {
  id: string;
  image_id: string;
  user_id?: string;
  title: string;
  noCook: boolean;
  time: string;
  servingSize: number;
  meal: ('snack' | 'dessert' | 'breakfast' | 'lunch' | 'dinner')[];
  ingredients: RecipeIngredient[];
  tools: Tool[];
  utensils: Utensil[];
  instructions: Instruction[];
  nutrition: Nutrition[];
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  quantity: string;
}

export interface RecipeItem {
  type: 'ingredient' | 'tool' | 'utensil';
  id: string;
  name: string;
  image_id: string;
}
export interface Ingredient extends RecipeItem { type: 'ingredient' };
export interface Tool extends RecipeItem { type: 'tool' };
export interface Utensil extends RecipeItem { type: 'utensil' };

export function isIngredient(recipeItem: RecipeItem): recipeItem is Ingredient { return recipeItem.type === 'ingredient'; }
export function isTool(recipeItem: RecipeItem): recipeItem is Tool { return recipeItem.type === 'tool'; }
export function isUtensil(recipeItem: RecipeItem): recipeItem is Utensil { return recipeItem.type === 'utensil'; }

export interface Image {
  id: string;
  caption: string;
}

export interface MealPrep {
  id: string;
  week: string;
  recipes: Recipe[];
}

export interface GroceryList {
  id: string;
  week: string; // set of dates
  ingredients: GroceryListIngredient[];
}

export interface GroceryListIngredient {
  ingredient: Ingredient;
  quantity: string;
  purchased_status: boolean;
}

export interface Nutrition {
  number: number;
  field: string;
}

export interface Instruction {
  id: string;
  step_number: number;
  instructions: string;
  warning?: string;
  image_id?: string;
}

// Scheduling Types
export interface Assignment {
  id: string;
  complete: boolean;
  date: string;
  startTime: string;
  endTime: string;
  event: Event;
}

export interface Event {
  id: string;
  name: string;
  icon: string; 
  tasks: TaskAssignment[]; 
  image: Image;
}

export interface TaskAssignment {
  id: string;
  complete: boolean;
}

export interface Task {
  id: string;
  name: string;
  icon: string;
  steps: string[];
  category: 'Hobbies' | 'Hygiene' | 'Chores' | 'Skills' | 'Quiet Hobbies' | 'Miscellaneous';
}

export interface Feedback {
  id: string;
  taskAssignmentId: string;
  taskId: string;
  reaction: 'yes' | 'maybe' | 'no';
}
