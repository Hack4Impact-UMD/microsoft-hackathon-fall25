import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // or whatever port your frontend uses
  credentials: true
}));app.use(express.json());

const PORT = process.env.PORT || 4000;

// Helper function for AI suggestions
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

// Helper function for AI recipe suggestions (no hallucination)
const getRecipeSuggestions = async (currentRecipes, currentIngredients) => {
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
            "You are a helpful assistant that suggests recipes. You can add a few recipes not from the input, please specify if you do so. Use simple and clear language.",
        },
        {
          role: "user",
          content: `Current recipes: ${JSON.stringify(currentRecipes)}. Current ingredients: ${JSON.stringify(currentIngredients)}. 
          Only list recipes from the current recipes that can be made with these ingredients. Distinguish recipes not from the input.`,
        },
      ],
      max_tokens: 500,
      temperature: 0,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch (error) {
    console.error("AI recipe suggestion error:", error);
    return [];
  }
};

// POST endpoint
app.post("/api/ai-recipes", async (req, res) => {
  const { currentRecipes, currentIngredients } = req.body;

  if (!currentRecipes || !Array.isArray(currentRecipes)) {
    return res.status(400).json({ error: "currentRecipes array is required" });
  }

  if (!currentIngredients || !Array.isArray(currentIngredients)) {
    return res.status(400).json({ error: "currentIngredients array is required" });
  }

  const recipeSuggestions = await getRecipeSuggestions(currentRecipes, currentIngredients);
  res.json({ recipeSuggestions });
});

// POST endpoint
app.post("/api/ai-suggestions", async (req, res) => {
  const { existingEvents } = req.body;

  if (!existingEvents || !Array.isArray(existingEvents)) {
    return res.status(400).json({ error: "existingEvents array is required" });
  }

  const suggestions = await getEventSuggestions(existingEvents);
  res.json({ suggestions });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
