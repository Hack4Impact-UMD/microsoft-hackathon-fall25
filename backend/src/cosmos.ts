// all purpose utility functions for cosmos

import { BulkOperationType } from "@azure/cosmos";
import { cosmosClient, blobServiceClient } from "./app";

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

export async function addItems(items, databaseName, containerName) {
    try {
        const container = await getContainer(databaseName, containerName);
        
        // Create bulk operations array with id as partition key
        const bulkOperations = items.map(item => ({
            operationType: BulkOperationType.Upsert,
            partitionKey: item.id,
            resourceBody: item
        }));

        await container.items.executeBulkOperations(bulkOperations);
    } catch (error) {
        console.error("Error bulk upserting items:", error);
        throw error;
    }
}

export async function uploadBlob(containerName: string, blobName: string, buffer: Buffer, contentType?: string) {
    console.log(blobServiceClient.getProperties());
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists({ access: "container" });
  
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
    await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: contentType || "application/octet-stream" },
    });
  
    return blockBlobClient.url;
  }