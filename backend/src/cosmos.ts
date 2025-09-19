import { cosmosClient, blobServiceClient} from "./app";
import { Task, Event, Assignment, Feedback } from "../../rise-dc-app/src/shared/types";
// all purpose utility functions for cosmos
import { BulkOperationType } from "@azure/cosmos";

// Get a container
export function getContainer(database: string, container: string) {
  return cosmosClient.database(database).container(container);
}

// Generic add
export async function addItem<T>(item: T, databaseName: string, containerName: string): Promise<T> {
  try {
    const container = getContainer(databaseName, containerName);
    const { resource } = await container.items.create(item);
    return resource as T;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

// Generic delete
export async function deleteItem(id: string, partitionKey: string, databaseName: string, containerName: string) {
  try {
    const container = getContainer(databaseName, containerName);
    await container.item(id, partitionKey).delete();
    return { id };
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

/* ========= Domain Functions ========= */
const SCHEDULING_DB = process.env.COSMOS_SCHEDULING_DB || "Scheduling";

// Tasks
export const addTask = (task: Task) => addItem(task, SCHEDULING_DB, "Tasks");
export const deleteTask = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Tasks");

// Events
export const addEvent = (event: Event) => addItem(event, SCHEDULING_DB, "Events");
export const deleteEvent = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Events");

// Assignments
export const addAssignment = (assignment: Assignment) => addItem(assignment, SCHEDULING_DB, "Assignments");
export const deleteAssignment = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Assignments");

// Feedback
export const addFeedback = (feedback: Feedback) => addItem(feedback, SCHEDULING_DB, "Feedback");
export const deleteFeedback = (id: string) => deleteItem(id, id, SCHEDULING_DB, "Feedback");
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