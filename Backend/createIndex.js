import "dotenv/config"
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

async function run() {
  // Index for webId
  await client.createPayloadIndex("noteai-collection", {
    field_name: "metadata.webId",
    field_schema: "uuid"     // or "keyword"
  });

  // Index for fileId
  await client.createPayloadIndex("noteai-collection", {
    field_name: "metadata.fileId",
    field_schema: "uuid"
  });

  // Index for videoId (YouTube)
  await client.createPayloadIndex("noteai-collection", {
    field_name: "metadata.videoId",
    field_schema: "keyword"  // YouTube video IDs are NOT UUIDs
  });

  console.log("All indexes created successfully.");
}

run();
