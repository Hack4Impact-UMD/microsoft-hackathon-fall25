"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosmosClient = void 0;
const express_1 = __importDefault(require("express"));
const cosmos_1 = require("@azure/cosmos");
const dotenv_1 = __importDefault(require("dotenv"));
const cosmos_2 = require("./cosmos");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// cosmos stuff
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;
exports.cosmosClient = new cosmos_1.CosmosClient({ endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY });
// async function getContainer(database, container) {
//   return cosmosClient.database(database).container(container);
// }
app.get('/', (_, res) => {
    (0, cosmos_2.addItem)({ "hello": "world" }, "Cookbook", "Recipes");
    console.log("YOOOO");
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map