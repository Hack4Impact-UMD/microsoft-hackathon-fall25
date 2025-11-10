import express, { Request, Response } from "express";
import { CosmosClient } from "@azure/cosmos";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import photoUploadRouter from "./routes/photoUpload";
import schedulerRouter from "./routes/scheduler";
import cookbookRouter from "./routes/cookbook";

dotenv.config();

const app = express();
const port = 3000;

// Enable JSON parsing
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Cosmos setup
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;
const BLOB_CONNECTION_STRING = process.env.BLOB_CONNECTION_STRING;
const BLOB_URL = process.env.BLOB_URL;

if (!COSMOS_ENDPOINT || !COSMOS_KEY || !BLOB_CONNECTION_STRING) {
  console.warn("Missing Azure env vars; Cosmos/Blob clients not initialized.");
}

export const cosmosClient = new CosmosClient({
  endpoint: COSMOS_ENDPOINT,
  key: COSMOS_KEY,
});

export const blobServiceClient = new BlobServiceClient(BLOB_URL);

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/* ========= API ROUTES ========= */

// Test route
app.get("/", (_, res: Response) =>
  res.send("RISE DC Scheduling API is running!")
);

app.use("/api/scheduler", schedulerRouter);

app.use("/api", photoUploadRouter);

app.use("/api/cookbook", cookbookRouter);

// Error handler
app.use((err: any, _: Request, res: Response, __: any) => {
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 RISE DC API server listening on port ${port}`);
});
