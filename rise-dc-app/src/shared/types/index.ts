// Cookbook Types

export interface Recipe {
  id: string;
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

export interface Ingredient {
  id: string;
  name: string;
  image_id: string;
}

export interface Tool {
  id: string;
  name: string;
  image_id: string;
}

export interface Utensil {
  id: string;
  name: string;
  image_id: string;
}

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
  category: 'Hobbies' | 'Hygiene' | 'Chores' | 'Skills' | 'Quiet Hobbies' | 'Miscellaneous';
}

export interface Feedback {
  id: string;
  taskAssignmentId: string;
  taskId: string;
  reaction: 'yes' | 'maybe' | 'no';
}
