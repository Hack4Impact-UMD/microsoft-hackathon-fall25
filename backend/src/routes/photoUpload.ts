import { Request, Response, Router } from "express";
import { CosmosClient } from "@azure/cosmos";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import { uploadBlob } from "../blob";
import { addImage } from "../cosmos";

const router = Router();
const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});
const container = client
  .database(process.env.COSMOS_DB!)
  .container(process.env.COSMOS_IMAGES_CONTAINER!);

const upload = multer({ storage: multer.memoryStorage() });

router.post("/photos", async (req: Request, res: Response) => {
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
      partitionKey: eventId ?? userId,
    });
    res.json(resource);
  } catch (err) {
    console.error("Cosmos upsert failed:", err);
    res.status(500).json({ error: "Failed to save photo metadata" });
  }
});

router.post(
  "/upload_image",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file = req.file as Express.Multer.File | undefined;
      const { caption } = req.body;
      if (!file)
        return res
          .status(400)
          .json({ error: "No file uploaded under field 'file'." });
      if (!caption)
        return res
          .status(400)
          .json({ error: "No caption uploaded under field 'caption'." });

      const containerName = "uploads";
      const ext = path.extname(file.originalname) || "";
      const id = crypto.randomUUID();
      const blobName = `${id}${ext}`;

      const url = await uploadBlob(
        containerName,
        blobName,
        file.buffer,
        file.mimetype,
      );
      await addImage({ id: id, url: url, caption: caption });

      return res.status(200).json({ url: url, caption: caption });
    } catch (err) {
      return res.status(400).json({ error: "route failed: " + err.message });
    }
  },
);

export default router;
