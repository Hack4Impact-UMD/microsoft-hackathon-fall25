import axios from "axios";
import {
  Recipe,
  Ingredient,
  Tool,
  Utensil,
  MealPrep,
  GroceryList,
} from "../shared/types";

const API_URL = "http://localhost:3000"; // TODO: change this to be actual backend URL once deployed

export type RecipePayload = Omit<Recipe, "id">;
export type IngredientPayload = Omit<Ingredient, "id">;
export type ToolPayload = Omit<Tool, "id">;
export type UtensilPayload = Omit<Utensil, "id">;
export type MealPrepPayload = Omit<MealPrep, "id">;
export type GroceryListPayload = Omit<GroceryList, "id">;

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// todo: write this to support queries and add calls to query tasks and assignments
export async function getJSON<T>(url: string) {
  const { data } = await api.get<T>(url);
  return data;
}

export async function postJSON<TRes, TBody = unknown>(
  url: string,
  body?: TBody,
) {
  const { data } = await api.post<TRes>(url, body);
  return data;
}

export async function delJSON<TRes = { id: string }>(url: string) {
  const { data } = await api.delete<TRes>(url);
  return data;
}

export async function putJSON<TRes, TBody = unknown>(
  url: string,
  body?: TBody,
) {
  const { data } = await api.put<TRes>(url, body);
  return data;
}

// Recipes
export async function createRecipe(payload: RecipePayload): Promise<Recipe> {
  return postJSON<Recipe, RecipePayload>("/api/recipes", payload);
}

export async function listRecipes(): Promise<Recipe[]> {
  return getJSON<Recipe[]>("/api/recipes");
}

export async function getRecipe(id: string): Promise<Recipe> {
  return getJSON<Recipe>(`/api/recipes/${id}`);
}

export async function updateRecipe(
  id: string,
  payload: Recipe,
): Promise<Recipe> {
  return putJSON<Recipe, Recipe>(`/api/recipes/${id}`, payload);
}

export async function deleteRecipe(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/recipes/${id}`);
}

// Ingredients
export async function createIngredient(
  payload: IngredientPayload,
): Promise<Ingredient> {
  return postJSON<Ingredient, IngredientPayload>("/api/ingredients", payload);
}

export async function listIngredients(): Promise<Ingredient[]> {
  return getJSON<Ingredient[]>("/api/ingredients");
}

export async function getIngredient(id: string): Promise<Ingredient> {
  return getJSON<Ingredient>(`/api/ingredients/${id}`);
}

export async function updateIngredient(
  id: string,
  payload: Ingredient,
): Promise<Ingredient> {
  return putJSON<Ingredient, Ingredient>(`/api/ingredients/${id}`, payload);
}

export async function deleteIngredient(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/ingredients/${id}`);
}

// Tools
export async function createTool(payload: ToolPayload): Promise<Tool> {
  return postJSON<Tool, ToolPayload>("/api/tools", payload);
}

export async function listTools(): Promise<Tool[]> {
  return getJSON<Tool[]>("/api/tools");
}

export async function getTool(id: string): Promise<Tool> {
  return getJSON<Tool>(`/api/tools/${id}`);
}

export async function updateTool(id: string, payload: Tool): Promise<Tool> {
  return putJSON<Tool, Tool>(`/api/tools/${id}`, payload);
}

export async function deleteTool(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/tools/${id}`);
}

// Utensils
export async function createUtensil(payload: UtensilPayload): Promise<Utensil> {
  return postJSON<Utensil, UtensilPayload>("/api/utensils", payload);
}

export async function listUtensils(): Promise<Utensil[]> {
  return getJSON<Utensil[]>("/api/utensils");
}

export async function getUtensil(id: string): Promise<Utensil> {
  return getJSON<Utensil>(`/api/utensils/${id}`);
}

export async function updateUtensil(
  id: string,
  payload: Utensil,
): Promise<Utensil> {
  return putJSON<Utensil, Utensil>(`/api/utensils/${id}`, payload);
}

export async function deleteUtensil(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/utensils/${id}`);
}

// Meal Preps
export async function createMealPrep(
  payload: MealPrepPayload,
): Promise<MealPrep> {
  return postJSON<MealPrep, MealPrepPayload>("/api/mealpreps", payload);
}

export async function listMealPreps(): Promise<MealPrep[]> {
  return getJSON<MealPrep[]>("/api/mealpreps");
}

export async function getMealPrep(id: string): Promise<MealPrep> {
  return getJSON<MealPrep>(`/api/mealpreps/${id}`);
}

export async function updateMealPrep(
  id: string,
  payload: MealPrep,
): Promise<MealPrep> {
  return putJSON<MealPrep, MealPrep>(`/api/mealpreps/${id}`, payload);
}

export async function deleteMealPrep(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/mealpreps/${id}`);
}

// Grocery Lists
export async function createGroceryList(
  payload: GroceryListPayload,
): Promise<GroceryList> {
  return postJSON<GroceryList, GroceryListPayload>(
    "/api/grocerylists",
    payload,
  );
}

export async function listGroceryLists(): Promise<GroceryList[]> {
  return getJSON<GroceryList[]>("/api/grocerylists");
}

export async function getGroceryList(id: string): Promise<GroceryList> {
  return getJSON<GroceryList>(`/api/grocerylists/${id}`);
}

export async function updateGroceryList(
  id: string,
  payload: GroceryList,
): Promise<GroceryList> {
  return putJSON<GroceryList, GroceryList>(`/api/grocerylists/${id}`, payload);
}

export async function deleteGroceryList(
  id: string,
): Promise<{ message: string; id: string }> {
  return delJSON<{ message: string; id: string }>(`/api/grocerylists/${id}`);
}
