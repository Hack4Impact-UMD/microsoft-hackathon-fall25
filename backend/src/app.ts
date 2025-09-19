import express, { Response } from "express"
import { CosmosClient } from '@azure/cosmos';
import dotenv from "dotenv";
import { addItem } from "./cosmos";

dotenv.config(); 

const app = express()
const port = 3000

// cosmos stuff
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;

export const cosmosClient = new CosmosClient({endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY});

// async function getContainer(database, container) {
//   return cosmosClient.database(database).container(container);
// }

app.get('/', (_, res: Response) => {
  addItem({"hello": "world"}, "Cookbook", "Recipes")
  console.log("YOOOO")
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
