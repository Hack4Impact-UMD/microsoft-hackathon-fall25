import { blobServiceClient } from "./app";

export async function uploadBlob(
  containerName: string,
  blobName: string,
  buffer: Buffer,
  contentType?: string,
) {
  console.log(blobServiceClient.getProperties());
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists({ access: "container" });

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: {
      blobContentType: contentType || "application/octet-stream",
    },
  });

  return blockBlobClient.url;
}
