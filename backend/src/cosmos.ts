// all purpose utility functions for cosmos

import { cosmosClient } from "./app";

export async function getContainer(database, container) {
  return cosmosClient.database(database).container(container);
}

export async function addItem(item, databaseName, containerName) {
    try {
        const container = await getContainer(databaseName, containerName);
        await container.items.create(item);
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
}
