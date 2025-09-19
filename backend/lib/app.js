"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobServiceClient = exports.cosmosClient = void 0;
const express_1 = __importDefault(require("express"));
const cosmos_1 = require("@azure/cosmos");
const storage_blob_1 = require("@azure/storage-blob");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cosmos_2 = require("./cosmos");
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// cosmos stuff
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;
const BLOB_CONNECTION_STRING = process.env.BLOB_CONNECTION_STRING;
const BLOB_URL = process.env.BLOB_URL;
if (!COSMOS_ENDPOINT || !COSMOS_KEY || !BLOB_CONNECTION_STRING) {
    console.warn("Missing Azure env vars; Cosmos/Blob clients not initialized.");
}
exports.cosmosClient = new cosmos_1.CosmosClient({ endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY });
exports.blobServiceClient = new storage_blob_1.BlobServiceClient(BLOB_URL);
const uploadDir = path_1.default.join(process.cwd(), "uploads");
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
app.get('/', (_, res) => {
    res.send('Hello World!');
});
// file upload tests
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        if (!file)
            return res.status(400).json({ error: "No file uploaded under field 'file'." });
        const containerName = "uploads";
        const ext = path_1.default.extname(file.originalname) || "";
        const blobName = `${crypto_1.default.randomUUID()}${ext}`;
        const url = await (0, cosmos_2.uploadBlob)(containerName, blobName, file.buffer, file.mimetype);
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
    }
    catch (err) {
        return res.status(400).json({ error: "route failed: " + err.message });
    }
});
app.post("/test", async (req, res) => {
    try {
        await (0, cosmos_2.verifyBlobAuth)();
        return res.status(200);
    }
    catch (err) {
        return res.status(400).json({ error: "route failed: " + err.message });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map