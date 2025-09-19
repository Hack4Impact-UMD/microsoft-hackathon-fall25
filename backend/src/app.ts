import express, { Request, Response } from "express"
import { CosmosClient } from '@azure/cosmos';
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadBlob, verifyBlobAuth } from "./cosmos";
import crypto from "crypto";

dotenv.config(); 

const app = express()
const port = 3000

// cosmos stuff
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;
const BLOB_CONNECTION_STRING = process.env.BLOB_CONNECTION_STRING;
const BLOB_URL = process.env.BLOB_URL;

if (!COSMOS_ENDPOINT || !COSMOS_KEY || !BLOB_CONNECTION_STRING) {
  console.warn("Missing Azure env vars; Cosmos/Blob clients not initialized.");
}

export const cosmosClient = new CosmosClient({endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY});

export const blobServiceClient = new BlobServiceClient(BLOB_URL);

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (_, res: Response) => {
  res.send('Hello World!')
})

app.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: "No file uploaded under field 'file'." });

    const containerName = "uploads"; 
    const ext = path.extname(file.originalname) || ""; 
    const blobName = `${crypto.randomUUID()}${ext}`;

    const url = await uploadBlob(containerName, blobName, file.buffer, file.mimetype);

    // (TODO) write small record to Cosmos, etc.
    // await addItem({ blobUrl: url, name: file.originalname, type: file.mimetype, size: file.size }, "Cookbook", "Recipes");

    return res.json({
      ok: true,
      url,                      
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      blobName,
      containerName,
    });
  } catch (err) {
    return res.status(400).json({ error: "route failed: " + err.message })
  }
});

app.post("/test", async (req: Request, res: Response) => {
  try {
    await verifyBlobAuth()

    return res.status(200)
  } catch (err) {
    return res.status(400).json({ error: "route failed: " + err.message })
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
