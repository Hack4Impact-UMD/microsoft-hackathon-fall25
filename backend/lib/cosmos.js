"use strict";
// all purpose utility functions for cosmos
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainer = getContainer;
exports.addItem = addItem;
exports.uploadBlob = uploadBlob;
exports.verifyBlobAuth = verifyBlobAuth;
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
async function uploadBlob(containerName, blobName, buffer, contentType) {
    console.log(app_1.blobServiceClient.getProperties());
    const containerClient = app_1.blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists({ access: "container" });
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: contentType || "application/octet-stream" },
    });
    return blockBlobClient.url;
}
async function verifyBlobAuth() {
    var _a, e_1, _b, _c;
    // 1) Can we list containers? (requires 'l' on SAS, or account key)
    const names = [];
    try {
        for (var _d = true, _e = __asyncValues(app_1.blobServiceClient.listContainers({ includeMetadata: false })), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
            _c = _f.value;
            _d = false;
            const c = _c;
            names.push(c.name);
            if (names.length > 5)
                break;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log("Containers (sample):", names);
    // 2) Try a tiny probe upload to the target container
    const containerName = "uploads";
    const container = app_1.blobServiceClient.getContainerClient(containerName);
    await container.createIfNotExists(); // This does NOT require public access; it requires auth
    const blob = container.getBlockBlobClient("auth-probe.txt");
    await blob.uploadData(Buffer.from("ok"), {
        blobHTTPHeaders: { blobContentType: "text/plain" },
    });
    console.log("Probe upload URL:", blob.url);
}
verifyBlobAuth().catch(e => {
    console.error("verifyBlobAuth failed:", e.message);
});
//# sourceMappingURL=cosmos.js.map