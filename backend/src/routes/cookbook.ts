import { Request, Response, Router } from "express";
import { GroceryList, Ingredient, MealPrep, Recipe, Tool, Utensil } from "../../../rise-dc-app/src/shared/types";
import { addGroceryList, addIngredient, addMealPrep, addRecipe, addTool, addUtensil, deleteGroceryList, deleteIngredient, deleteMealPrep, deleteRecipe, deleteTool, deleteUtensil, getContainer, getGroceryList, getGroceryLists, getIngredient, getIngredients, getMealPrep, getMealPreps, getRecipe, getRecipes, getTool, getTools, getUtensil, getUtensils, queryItems } from "../cosmos";

const COOKBOOK_DB = process.env.COSMOS_COOKBOOK_DB || "Cookbook";

const cookbookRouter = Router();

// ===== RECIPES =====

cookbookRouter.get('/recipes', async (req: Request, res: Response) => {
  try {
    const { title } = req.query;
    let recipes: Recipe[];
    if (title) {
      recipes = await queryItems<Recipe>(
        COOKBOOK_DB,
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

cookbookRouter.post('/recipes', async (req: Request, res: Response) => {
  try {
    const recipe: Recipe = { ...req.body, id: req.body.id || `recipe_${crypto.randomUUID()}` };
    const newRecipe = await addRecipe(recipe);
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create recipe' });
  }
});

cookbookRouter.get('/recipes/:id', async (req: Request, res: Response) => {
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

cookbookRouter.put('/recipes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe: Recipe = req.body;
    if (id !== recipe.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer(COOKBOOK_DB, "Recipes");
    const { resource: updatedRecipe } = await container.items.upsert(recipe);
    return res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update recipe' });
  }
});

cookbookRouter.delete('/recipes/:id', async (req: Request, res: Response) => {
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

cookbookRouter.post('/ingredients', async (req: Request, res: Response) => {
  try {
    const ingredient: Ingredient = { ...req.body, id: req.body.id || `ingredient_${crypto.randomUUID()}` };
    const newIngredient = await addIngredient(ingredient);
    return res.status(201).json(newIngredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

cookbookRouter.get('/ingredients', async (_, res: Response) => {
  try {
    const ingredients = await getIngredients();
    return res.json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

cookbookRouter.get('/ingredients/:id', async (req: Request, res: Response) => {
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

cookbookRouter.put('/ingredients/:id', async (req: Request, res: Response) => {
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

cookbookRouter.delete('/ingredients/:id', async (req: Request, res: Response) => {
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

cookbookRouter.post('/tools', async (req: Request, res: Response) => {
  try {
    const tool: Tool = { ...req.body, id: req.body.id || `tool_${crypto.randomUUID()}` };
    const newTool = await addTool(tool);
    return res.status(201).json(newTool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create tool' });
  }
});

cookbookRouter.get('/tools', async (_, res: Response) => {
  try {
    const tools = await getTools();
    return res.json(tools);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

cookbookRouter.get('/tools/:id', async (req: Request, res: Response) => {
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

cookbookRouter.put('/tools/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tool: Tool = req.body;
    if (id !== tool.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer(COOKBOOK_DB, "Tools");
    const { resource: updatedTool } = await container.items.upsert(tool);
    return res.json(updatedTool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update tool' });
  }
});

cookbookRouter.delete('/tools/:id', async (req: Request, res: Response) => {
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

cookbookRouter.post('/utensils', async (req: Request, res: Response) => {
  try {
    const utensil: Utensil = { ...req.body, id: req.body.id || `utensil_${crypto.randomUUID()}` };
    const newUtensil = await addUtensil(utensil);
    return res.status(201).json(newUtensil);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create utensil' });
  }
});

cookbookRouter.get('/utensils', async (_, res: Response) => {
  try {
    const utensils = await getUtensils();
    return res.json(utensils);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch utensils' });
  }
});

cookbookRouter.get('/utensils/:id', async (req: Request, res: Response) => {
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

cookbookRouter.put('/utensils/:id', async (req: Request, res: Response) => {
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

cookbookRouter.delete('/utensils/:id', async (req: Request, res: Response) => {
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

cookbookRouter.post('/mealpreps', async (req: Request, res: Response) => {
  try {
    const mealPrep: MealPrep = { ...req.body, id: req.body.id || `mealprep_${crypto.randomUUID()}` };
    const newMealPrep = await addMealPrep(mealPrep);
    return res.status(201).json(newMealPrep);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create meal prep' });
  }
});

cookbookRouter.get('/mealpreps', async (_, res: Response) => {
  try {
    const mealPreps = await getMealPreps();
    return res.json(mealPreps);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch meal preps' });
  }
});

cookbookRouter.get('/mealpreps/:id', async (req: Request, res: Response) => {
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

cookbookRouter.put('/mealpreps/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mealPrep: MealPrep = req.body;
    if (id !== mealPrep.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer(COOKBOOK_DB, "Meal Preps");
    const { resource: updatedMealPrep } = await container.items.upsert(mealPrep);
    return res.json(updatedMealPrep);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update meal prep' });
  }
});

cookbookRouter.delete('/mealpreps/:id', async (req: Request, res: Response) => {
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

cookbookRouter.post('/grocerylists', async (req: Request, res: Response) => {
  try {
    const groceryList: GroceryList = { ...req.body, id: req.body.id || `grocerylist_${crypto.randomUUID()}` };
    const newGroceryList = await addGroceryList(groceryList);
    return res.status(201).json(newGroceryList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create grocery list' });
  }
});

cookbookRouter.get('/grocerylists', async (_, res: Response) => {
  try {
    const groceryLists = await getGroceryLists();
    return res.json(groceryLists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch grocery lists' });
  }
});

cookbookRouter.get('/grocerylists/:id', async (req: Request, res: Response) => {
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

cookbookRouter.put('/grocerylists/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const groceryList: GroceryList = req.body;
    if (id !== groceryList.id) {
      return res.status(400).json({ error: "ID in URL does not match ID in body" });
    }
    const container = getContainer(COOKBOOK_DB, "Grocery Lists");
    const { resource: updatedGroceryList } = await container.items.upsert(groceryList);
    return res.json(updatedGroceryList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update grocery list' });
  }
});

cookbookRouter.delete('/grocerylists/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteGroceryList(id);
    return res.json({ message: 'Grocery list deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete grocery list' });
  }
});

export default cookbookRouter;