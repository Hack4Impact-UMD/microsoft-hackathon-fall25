import { cosmosClient } from "./app";
// all purpose utility functions for cosmos
import { BulkOperationType } from "@azure/cosmos";
import { Task, Event, Assignment, Feedback, Recipe, Ingredient, Tool, Utensil, MealPrep, GroceryList, Image } from "../../rise-dc-app/src/shared/types";

// Get a container
export function getContainer(database: string, container: string) {
  return cosmosClient.database(database).container(container);
}

// Generic add
export async function addItem<T>(item: T, databaseName: string, containerName: string): Promise<T> {
  try {
    const container = getContainer(databaseName, containerName);
    const { resource } = await container.items.create(item);
    return resource as T;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

// Generic get all items
export async function getAllItems<T>(databaseName: string, containerName: string): Promise<T[]> {
  try {
    const container = getContainer(databaseName, containerName);
    const { resources } = await container.items.readAll<T>().fetchAll();
    return resources;
  } catch (error) {
    console.error("Error getting all items:", error);
    throw error;
  }
}

// Generic get single item by id
export async function getItem<T>(id: string, databaseName: string, containerName: string): Promise<T | null> {
  try {
    const container = getContainer(databaseName, containerName);
    const { resource } = await container.item(id, id).read<T>();
    return resource || null;
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
}

// Generic query items
export async function queryItems<T>(databaseName: string, containerName: string, query: string, parameters?: any[]): Promise<T[]> {
  try {
    const container = getContainer(databaseName, containerName);
    const { resources } = await container.items.query<T>({
      query,
      parameters: parameters || []
    }).fetchAll();
    return resources;
  } catch (error) {
    console.error("Error querying items:", error);
    throw error;
  }
}

// Generic delete
export async function deleteItem(id: string, partitionKey: string, databaseName: string, containerName: string) {
  try {
    const container = getContainer(databaseName, containerName);
    await container.item(id, partitionKey).delete();
    return { id };
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

/* ========= Domain Functions ========= */
const SCHEDULING_DB = process.env.COSMOS_SCHEDULING_DB || "Scheduling";
const COOKBOOK_DB = "Cookbook";
const SHARED_DB = "Shared";

//Recipe
export const addRecipe = (recipe: Recipe) => addItem(recipe, COOKBOOK_DB, "Recipes");
export const getRecipes = () => getAllItems<Recipe>(COOKBOOK_DB, "Recipes");
export const getRecipe = (id: string) => getItem<Recipe>(id, COOKBOOK_DB, "Recipes");
export const deleteRecipe = (id: string) => deleteItem(id, id, COOKBOOK_DB, "Recipes");

//Ingredient
export const addIngredient = (ingredient: Ingredient) => addItem(ingredient, COOKBOOK_DB, "Ingredients");
export const getIngredients = () => getAllItems<Ingredient>(COOKBOOK_DB, "Ingredients");
export const getIngredient = (id: string) => getItem<Ingredient>(id, COOKBOOK_DB, "Ingredients");
export const deleteIngredient = (id: string) => deleteItem(id, id, COOKBOOK_DB, "Ingredients");

//Tool
export const addTool = (tool: Tool) => addItem(tool, COOKBOOK_DB, "Tools");
export const getTools = () => getAllItems<Tool>(COOKBOOK_DB, "Tools");
export const getTool = (id: string) => getItem<Tool>(id, COOKBOOK_DB, "Tools");
export const deleteTool = (id: string) => deleteItem(id, id, COOKBOOK_DB, "Tools");

//Utensil
export const addUtensil = (utensil: Utensil) => addItem(utensil, COOKBOOK_DB, "Utensils");
export const getUtensils = () => getAllItems<Utensil>(COOKBOOK_DB, "Utensils");
export const getUtensil = (id: string) => getItem<Utensil>(id, COOKBOOK_DB, "Utensils");
export const deleteUtensil = (id: string) => deleteItem(id, id, COOKBOOK_DB, "Utensils");

//Meal Prep
export const addMealPrep = (mealPrep: MealPrep) => addItem(mealPrep, COOKBOOK_DB, "Meal Preps");
export const getMealPreps = () => getAllItems<MealPrep>(COOKBOOK_DB, "Meal Preps");
export const getMealPrep = (id: string) => getItem<MealPrep>(id, COOKBOOK_DB, "Meal Preps");
export const deleteMealPrep = (id: string) => deleteItem(id, id, COOKBOOK_DB, "Meal Preps");

//Grocery list
export const addGroceryList = (groceryList: GroceryList) => addItem(groceryList, COOKBOOK_DB, "Grocery Lists");
export const getGroceryLists = () => getAllItems<GroceryList>(COOKBOOK_DB, "Grocery Lists");
export const getGroceryList = (id: string) => getItem<GroceryList>(id, COOKBOOK_DB, "Grocery Lists");
export const deleteGroceryList = (id: string) => deleteItem(id, id, COOKBOOK_DB, "Grocery Lists");

// Tasks
export const addTask = (task: Task) => addItem(task, SCHEDULING_DB, "Tasks");
export const getTasks = () => getAllItems<Task>(SCHEDULING_DB, "Tasks");
export const getTask = (id: string) => getItem<Task>(id, SCHEDULING_DB, "Tasks");
export const deleteTask = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Tasks");

// Events
export const addEvent = (event: Event) => addItem(event, SCHEDULING_DB, "Events");
export const getEvents = () => getAllItems<Event>(SCHEDULING_DB, "Events");
export const getEvent = (id: string) => getItem<Event>(id, SCHEDULING_DB, "Events");
export const deleteEvent = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Events");

// Assignments
export const addAssignment = (assignment: Assignment) => addItem(assignment, SCHEDULING_DB, "Assignments");
export const getAssignments = () => getAllItems<Assignment>(SCHEDULING_DB, "Assignments");
export const getAssignment = (id: string) => getItem<Assignment>(id, SCHEDULING_DB, "Assignments");
export const deleteAssignment = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Assignments");

// Feedback
export const addFeedback = (feedback: Feedback) => addItem(feedback, SCHEDULING_DB, "Feedback");
export const getFeedback = () => getAllItems<Feedback>(SCHEDULING_DB, "Feedback");
export const getFeedbackItem = (id: string) => getItem<Feedback>(id, SCHEDULING_DB, "Feedback");
export const deleteFeedback = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Feedback");

// Image
export const addImage = (image: Image) => addItem(image, SHARED_DB, "Images");
export const getImages = () => getAllItems<Image>(SHARED_DB, "Images");
export const getImage = (id: string) => getItem<Image>(id, SHARED_DB, "Images");
export const deleteImage = (id: string) => deleteItem(id, id, SHARED_DB, "Images");

export async function addItems(items, databaseName, containerName) {
    try {
        const container = await getContainer(databaseName, containerName);
        
        // Create bulk operations array with id as partition key
        const bulkOperations = items.map(item => ({
            operationType: BulkOperationType.Upsert,
            partitionKey: item.id,
            resourceBody: item
        }));

        await container.items.executeBulkOperations(bulkOperations);
    } catch (error) {
        console.error("Error bulk upserting items:", error);
        throw error;
    }
}