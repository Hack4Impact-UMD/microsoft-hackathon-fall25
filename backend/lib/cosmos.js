"use strict";
// all purpose utility functions for cosmos
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainer = getContainer;
exports.addItem = addItem;
const app_1 = require("./app");
async function getContainer(database, container) {
    return app_1.cosmosClient.database(database).container(container);
}
async function addItem(item, databaseName, containerName) {
    try {
        const container = await getContainer(databaseName, containerName);
        await container.items.create(item);
    }
    catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
}
//# sourceMappingURL=cosmos.js.map