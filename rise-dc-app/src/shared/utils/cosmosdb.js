import { CosmosClient, BulkOperationType} from '@azure/cosmos';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.VITE_COSMOS_ENDPOINT;
const key = process.env.VITE_COSMOS_KEY;

const client = new CosmosClient({ endpoint, key });

async function getContainer(database, container) {
    return client.database(database).container(container);
}

async function addItem(item, databaseName, containerName) {
    try {
        const container = await getContainer(databaseName, containerName);
        await container.items.create(item);
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
}

async function addItems(items, databaseName, containerName) {
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

export{
    addItem,
    addItems
};