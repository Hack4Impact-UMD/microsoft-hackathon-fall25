// Cookbook Types

import { Event } from "@mui/icons-material";

export interface Recipe {
  id: string;
  image_id: string;
  user_id?: string;
  isFavorite: boolean;
  title: string;
  name?: string;
  noCook: boolean;
  time: string;
  servingSize: number;
  meal: ("snack" | "dessert" | "breakfast" | "lunch" | "dinner")[];
  ingredients: RecipeIngredient[];
  tools: Tool[];
  utensils: Utensil[];
  instructions: Instruction[];
  nutrition: Nutrition[];
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  quantity: string;
  storeQuantity: number;
}

export interface RecipeItem {
  type: "ingredient" | "tool" | "utensil";
  id: string;
  name: string;
  image_id: string;
}
export interface Ingredient extends RecipeItem {
  type: "ingredient";
}
export interface Tool extends RecipeItem {
  type: "tool";
}
export interface Utensil extends RecipeItem {
  type: "utensil";
}

export interface Image {
  id: string;
  url?: string;
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
export interface Task {
  id: string;
  userId: string;
  name: string;
  icon: string;
  complete: boolean;
  image?: Image;
  startTime: string; // TODO: this might need to be a different type depending on how Cosmos works
  endTime: string;
  category: TaskCategory;
}

export interface Event extends Task {
  steps: string[]; // TODO: turn this into it's own mini type, likely comrpising of 
}

export enum TaskCategory {
  Hobbies = "Hobbies",
  Hygiene = "Hygiene",
  Chores = "Chores",
  Skills = "Skills",
  QuietHobbies = "QuietHobbies",
  Misc = "Miscellaneous",
}

export interface Feedback {
  id: string;
  taskAssignmentId: string;
  taskId: string;
  reaction: "yes" | "maybe" | "no";
}

export interface ImageDoc {
  id: string;
  blobUrl: string;
  caption: string;
  userId?: string;
  eventId?: string;
  createdAt: string;
}

export type UploadedImage = Pick<ImageDoc, "id" | "caption">;
