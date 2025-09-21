import express, { Request, Response } from "express";
import { CosmosClient } from '@azure/cosmos';
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
import {
  addTask,
  addEvent,
  addAssignment,
  addFeedback,
  deleteTask,
  getContainer,
  addImage,
  getRecipe,
  getRecipes,
  addRecipe,
  deleteRecipe,
  addIngredient,
  getIngredients,
  getIngredient,
  deleteIngredient,
  addTool,
  getTools,
  getTool,
  deleteTool,
  addUtensil,
  getUtensils,
  getUtensil,
  deleteUtensil,
  addMealPrep,
  getMealPreps,
  getMealPrep,
  deleteMealPrep,
  addGroceryList,
  getGroceryLists,
  getGroceryList,
  deleteGroceryList
} from "./cosmos";
import { Task, Event, Assignment, Feedback, Recipe, Ingredient, Tool, Utensil, MealPrep, GroceryList } from "../../rise-dc-app/src/shared/types";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadBlob } from "./blob";
import crypto from "crypto";

dotenv.config();

const app = express();
const port = 3000;

// Enable JSON parsing
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Cosmos setup
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;
const SCHEDULING_DB = process.env.COSMOS_SCHEDULING_DB || "Scheduling";
const BLOB_CONNECTION_STRING = process.env.BLOB_CONNECTION_STRING;
const BLOB_URL = process.env.BLOB_URL;

if (!COSMOS_ENDPOINT || !COSMOS_KEY || !BLOB_CONNECTION_STRING) {
  console.warn("Missing Azure env vars; Cosmos/Blob clients not initialized.");
}

export const cosmosClient = new CosmosClient({ endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY });

// Helper functions
async function getAllItems<T>(containerName: string): Promise<T[]> {
  const container = getContainer(SCHEDULING_DB, containerName);
  const { resources } = await container.items.readAll<T>().fetchAll();
  return resources;
}

async function queryItems<T>(containerName: string, query: string, parameters?: any[]): Promise<T[]> {
  const container = getContainer(SCHEDULING_DB, containerName);
  const { resources } = await container.items.query<T>({
    query,
    parameters: parameters || []
  }).fetchAll();
  return resources;
}

/* ========= API ROUTES ========= */

// Test route
app.get('/', (_, res: Response) => res.send('RISE DC Scheduling API is running!'));

// ===== TASKS =====
app.post('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { taskName, steps } = req.body;
    const task: Task = {
      id: `task_${Date.now()}`,
      name: taskName,
      icon: "",
      steps: steps || [],
      category: 'Miscellaneous'
    };
    const createdTask = await addTask(task);
    return res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
});

app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let tasks: Task[];
    if (search) {
      tasks = await queryItems<Task>(
        "Tasks",
        "SELECT * FROM c WHERE CONTAINS(LOWER(c.name), LOWER(@searchTerm))",
        [{ name: "@searchTerm", value: search as string }]
      );
    } else {
      tasks = await getAllItems<Task>("Tasks");
    }
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const container = getContainer(SCHEDULING_DB, "Tasks");
    const { resource } = await container.item(id, id).read<Task>();
    if (!resource) return res.status(404).json({ error: 'Task not found' });
    return res.json(resource);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch task' });
  }
});

app.delete('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    return res.json({ message: 'Task deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
});

// ===== EVENTS =====
app.post('/api/events', async (req: Request, res: Response) => {
  try {
    const { name, icon, tasks, image } = req.body;
    const event: Event = {
      id: `event_${Date.now()}`,
      name,
      icon: icon || "",
      tasks: tasks || [],
      image: image || { id: "", caption: "" }
    };
    const createdEvent = await addEvent(event);
    return res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

app.get('/api/events', async (_, res: Response) => {
  try {
    const events = await getAllItems<Event>("Events");
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// ===== ASSIGNMENTS =====
app.post('/api/assignments', async (req: Request, res: Response) => {
  try {
    const { complete, date, startTime, endTime, event } = req.body;
    const assignment: Assignment = {
      id: `assignment_${Date.now()}`,
      complete: complete || false,
      date,
      startTime,
      endTime,
      event
    };
    const createdAssignment = await addAssignment(assignment);
    return res.status(201).json(createdAssignment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create assignment' });
  }
});

app.get('/api/assignments', async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    let assignments: Assignment[];
    if (date) {
      assignments = await queryItems<Assignment>(
        "Assignments",
        "SELECT * FROM c WHERE c.date = @date",
        [{ name: "@date", value: date as string }]
      );
    } else {
      assignments = await getAllItems<Assignment>("Assignments");
    }
    return res.json(assignments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// ===== FEEDBACK =====
app.post('/api/feedback', async (req: Request, res: Response) => {
  try {
    const { taskAssignmentId, taskId, reaction } = req.body;
    const feedback: Feedback = {
      id: `feedback_${Date.now()}`,
      taskAssignmentId,
      taskId,
      reaction
    };
    const createdFeedback = await addFeedback(feedback);
    return res.status(201).json(createdFeedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

app.get('/api/recipes', async (req: Request, res: Response) => {
  try {
    const { title } = req.query;
    let recipes: Recipe[];
    if (title) {
      recipes = await queryItems<Recipe>(
        "Recipes",
        "SELECT * FROM c WHERE c.title = @title",
        [{ name: "@title", value: title as string }]
      );
    } else {
      recipes = await getRecipes();
    }
    return res.json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch recipes' });
  }
})

// ===== RECIPES =====

app.post('/api/recipes', async (req: Request, res: Response) => {
  try {
    const recipe: Recipe = { ...req.body, id: req.body.id || `recipe_${crypto.randomUUID()}` };
    const newRecipe = await addRecipe(recipe);
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create recipe' });
  }
});

app.get('/api/recipes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipe(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    return res.json(recipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

app.put('/api/recipes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe: Recipe = req.body;
    if (id !== recipe.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer("Cookbook", "Recipes");
    const { resource: updatedRecipe } = await container.items.upsert(recipe);
    return res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update recipe' });
  }
});

app.delete('/api/recipes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteRecipe(id);
    return res.json({ message: 'Recipe deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete recipe' });
  }
});


// ===== INGREDIENTS =====

app.post('/api/ingredients', async (req: Request, res: Response) => {
  try {
    const ingredient: Ingredient = { ...req.body, id: req.body.id || `ingredient_${crypto.randomUUID()}` };
    const newIngredient = await addIngredient(ingredient);
    return res.status(201).json(newIngredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

app.get('/api/ingredients', async (_, res: Response) => {
  try {
    const ingredients = await getIngredients();
    return res.json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

app.get('/api/ingredients/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient = await getIngredient(id);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    return res.json(ingredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch ingredient' });
  }
});

app.put('/api/ingredients/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient: Ingredient = req.body;
    if (id !== ingredient.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer("Cookbook", "Ingredients");
    const { resource: updatedIngredient } = await container.items.upsert(ingredient);
    return res.json(updatedIngredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update ingredient' });
  }
});

app.delete('/api/ingredients/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteIngredient(id);
    return res.json({ message: 'Ingredient deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

// ===== TOOLS =====

app.post('/api/tools', async (req: Request, res: Response) => {
  try {
    const tool: Tool = { ...req.body, id: req.body.id || `tool_${crypto.randomUUID()}` };
    const newTool = await addTool(tool);
    return res.status(201).json(newTool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create tool' });
  }
});

app.get('/api/tools', async (_, res: Response) => {
  try {
    const tools = await getTools();
    return res.json(tools);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

app.get('/api/tools/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tool = await getTool(id);
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    return res.json(tool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch tool' });
  }
});

app.put('/api/tools/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tool: Tool = req.body;
    if (id !== tool.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer("Cookbook", "Tools");
    const { resource: updatedTool } = await container.items.upsert(tool);
    return res.json(updatedTool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update tool' });
  }
});

app.delete('/api/tools/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTool(id);
    return res.json({ message: 'Tool deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete tool' });
  }
});

// ===== UTENSILS =====

app.post('/api/utensils', async (req: Request, res: Response) => {
  try {
    const utensil: Utensil = { ...req.body, id: req.body.id || `utensil_${crypto.randomUUID()}` };
    const newUtensil = await addUtensil(utensil);
    return res.status(201).json(newUtensil);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create utensil' });
  }
});

app.get('/api/utensils', async (_, res: Response) => {
  try {
    const utensils = await getUtensils();
    return res.json(utensils);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch utensils' });
  }
});

app.get('/api/utensils/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const utensil = await getUtensil(id);
    if (!utensil) {
      return res.status(404).json({ error: 'Utensil not found' });
    }
    return res.json(utensil);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch utensil' });
  }
});

app.put('/api/utensils/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const utensil: Utensil = req.body;
    if (id !== utensil.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer("Cookbook", "Utensils");
    const { resource: updatedUtensil } = await container.items.upsert(utensil);
    return res.json(updatedUtensil);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update utensil' });
  }
});

app.delete('/api/utensils/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUtensil(id);
    return res.json({ message: 'Utensil deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete utensil' });
  }
});

// ===== MEAL PREPS =====

app.post('/api/mealpreps', async (req: Request, res: Response) => {
  try {
    const mealPrep: MealPrep = { ...req.body, id: req.body.id || `mealprep_${crypto.randomUUID()}` };
    const newMealPrep = await addMealPrep(mealPrep);
    return res.status(201).json(newMealPrep);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create meal prep' });
  }
});

app.get('/api/mealpreps', async (_, res: Response) => {
  try {
    const mealPreps = await getMealPreps();
    return res.json(mealPreps);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch meal preps' });
  }
});

app.get('/api/mealpreps/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mealPrep = await getMealPrep(id);
    if (!mealPrep) {
      return res.status(404).json({ error: 'Meal prep not found' });
    }
    return res.json(mealPrep);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch meal prep' });
  }
});

app.put('/api/mealpreps/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mealPrep: MealPrep = req.body;
    if (id !== mealPrep.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer("Cookbook", "Meal Preps");
    const { resource: updatedMealPrep } = await container.items.upsert(mealPrep);
    return res.json(updatedMealPrep);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update meal prep' });
  }
});

app.delete('/api/mealpreps/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteMealPrep(id);
    return res.json({ message: 'Meal prep deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete meal prep' });
  }
});

// ===== GROCERY LISTS =====

app.post('/api/grocerylists', async (req: Request, res: Response) => {
  try {
    const groceryList: GroceryList = { ...req.body, id: req.body.id || `grocerylist_${crypto.randomUUID()}` };
    const newGroceryList = await addGroceryList(groceryList);
    return res.status(201).json(newGroceryList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create grocery list' });
  }
});

app.get('/api/grocerylists', async (_, res: Response) => {
  try {
    const groceryLists = await getGroceryLists();
    return res.json(groceryLists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch grocery lists' });
  }
});

app.get('/api/grocerylists/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const groceryList = await getGroceryList(id);
    if (!groceryList) {
      return res.status(404).json({ error: 'Grocery list not found' });
    }
    return res.json(groceryList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch grocery list' });
  }
});

app.put('/api/grocerylists/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const groceryList: GroceryList = req.body;
    if (id !== groceryList.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer("Cookbook", "Grocery Lists");
    const { resource: updatedGroceryList } = await container.items.upsert(groceryList);
    return res.json(updatedGroceryList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update grocery list' });
  }
});

app.delete('/api/grocerylists/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteGroceryList(id);
    return res.json({ message: 'Grocery list deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete grocery list' });
  }
});



// Error handler
app.use((err: any, _: Request, res: Response, __: any) => {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
});

// Start server
export const blobServiceClient = new BlobServiceClient(BLOB_URL);

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (_, res: Response) => {
  res.send('Hello World!')
})

app.post("/api/upload_image", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    const { caption } = req.body;
    if (!file) return res.status(400).json({ error: "No file uploaded under field 'file'." });
    if (!caption) return res.status(400).json({ error: "No caption uploaded under field 'caption'." });

    const containerName = "uploads";
    const ext = path.extname(file.originalname) || "";
    const id = crypto.randomUUID();
    const blobName = `${id}${ext}`;

    const url = await uploadBlob(containerName, blobName, file.buffer, file.mimetype);
    await addImage({ "id": id, "url": url, "caption": caption });

    return res.status(200).json({ "url": url, "caption": caption });
  } catch (err) {
    return res.status(400).json({ error: "route failed: " + err.message })
  }
});

app.post("/test", async (req: Request, res: Response) => {
  try {
    return res.status(200)
  } catch (err) {
    return res.status(400).json({ error: "route failed: " + err.message })
  }
});

app.listen(port, () => {
  console.log(`🚀 RISE DC API server listening on port ${port}`);
  console.log(`📊 Using Cosmos DB: ${SCHEDULING_DB}`);
});
