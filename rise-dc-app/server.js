import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 4000;

// ------------------- Event Suggestions -------------------
const getEventSuggestions = async (existingEvents) => {
  const AI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
  const AI_KEY = process.env.AZURE_OPENAI_KEY;
  const DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT;

  const client = new OpenAI({
    apiKey: AI_KEY,
    baseURL: `${AI_ENDPOINT}openai/deployments/${DEPLOYMENT_NAME}`,
    defaultQuery: { "api-version": "2024-06-01" },
  });

  try {
    const completion = await client.chat.completions.create({
      model: DEPLOYMENT_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that suggests 4-5 short events based on existing events for children. Use accessible language. Base suggestions off of their current events and interests.",
        },
        {
          role: "user",
          content: `Here are my existing events: ${existingEvents.join(
            ", "
          )}. Suggest 3-4 additional events that complement them. Keep each 2-5 words.`,
        },
      ],
      max_tokens: 120,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch (error) {
    console.error("AI suggestion error:", error);
    return ["Take a short break", "Review progress", "Prepare for tomorrow", "Reflect on goals"];
  }
};

// POST endpoint for events
app.post("/api/ai-suggestions", async (req, res) => {
  const { existingEvents } = req.body;

  if (!existingEvents || !Array.isArray(existingEvents)) {
    return res.status(400).json({ error: "existingEvents array is required" });
  }

  const suggestions = await getEventSuggestions(existingEvents);
  res.json({ suggestions });
});

// ------------------- Recipe Recommendations -------------------
const getRecipeSuggestions = async (storedIngredients, recipeSummaries) => {
  const AI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
  const AI_KEY = process.env.AZURE_OPENAI_KEY;
  const DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT;

  const client = new OpenAI({
    apiKey: AI_KEY,
    baseURL: `${AI_ENDPOINT}openai/deployments/${DEPLOYMENT_NAME}`,
    defaultQuery: { "api-version": "2024-06-01" },
  });

  try {
    const prompt = `
You have the following ingredients available: ${storedIngredients.join(", ")}.

Here are existing recipe summaries:
${JSON.stringify(recipeSummaries, null, 2)}

Your task:
- Only select recipes from the list above (do NOT create new recipes).
- Identify which recipes can be made fully with the stored ingredients.
- For recipes that are missing 1-2 ingredients, include them but list the missing ingredients.
- Do NOT invent any recipes or ingredients.

Output format (JSON array):
[
  {
    "title": "Recipe Name",
    "type": "stored",
    "ingredients": ["ingredient1", "ingredient2", ...],
    "missingIngredients": ["ingredientX"] or []
  }
]

Ensure the JSON is valid and only contains recipes from the provided list.
`;

    const completion = await client.chat.completions.create({
      model: DEPLOYMENT_NAME,
      messages: [
        { role: "system", content: "You are a helpful recipe assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0, // Lower temperature to reduce hallucination
    });

    const text = completion.choices[0]?.message?.content ?? "[]";
    console.log("AI output:", text);

    try {
      return JSON.parse(text);
    } catch {
      return [];
    }
  } catch (error) {
    console.error("AI recipe suggestion error:", error);
    return [];
  }
};

app.post("/api/ai-recipes", async (req, res) => {
  const { storedIngredients, recipeSummaries } = req.body;

  if (
    !storedIngredients ||
    !Array.isArray(storedIngredients) ||
    !recipeSummaries ||
    !Array.isArray(recipeSummaries)
  ) {
    return res
      .status(400)
      .json({ error: "storedIngredients and recipeSummaries arrays are required" });
  }

  try {
    // Call the AI function
    const recipes = await getRecipeSuggestions(storedIngredients, recipeSummaries);

    res.json({ recipes });
  } catch (error) {
    console.error("Error in /api/ai-recipes:", error);
    res.status(500).json({ recipes: [] });
  }
});