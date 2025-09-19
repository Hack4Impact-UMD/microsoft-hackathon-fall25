import { Router } from "express";
import { CosmosClient } from "@azure/cosmos";

const router = Router();
const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});
const container = client
  .database(process.env.COSMOS_DB!)
  .container(process.env.COSMOS_IMAGES_CONTAINER!);

router.post("/photos", async (req, res) => {
  try {
    const { blobUrl, caption, userId, eventId } = req.body;
    const doc = {
      id: crypto.randomUUID(),
      blobUrl,
      caption,
      userId,
      eventId,
      createdAt: new Date().toISOString(),
    };
    const { resource } = await container.items.upsert(doc, {
      partitionKey: eventId ?? userId, // match your Cosmos partition key
    });
    res.json(resource);
  } catch (err) {
    console.error("Cosmos upsert failed:", err);
    res.status(500).json({ error: "Failed to save photo metadata" });
  }
});

export default router;
