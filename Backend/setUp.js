import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY, // optional
});

async function setup() {
  const collectionName = "noteai-collection";

  // Step 1: Create collection
  try {
    await client.createCollection(collectionName, {
      vectors: {
        size: 1536,
        distance: "Cosine",
      },
    });
    console.log("✅ Collection created");
  } catch (err) {
    if (err.status === 409) {
      console.log("⚠️ Collection already exists");
    } else {
      console.error("❌ Collection creation error:", err);
    }
  }

  // Step 2: Insert a sample point with payload
  try {
    await client.upsert(collectionName, {
      wait: true,
      points: [
        {
          id: 1,
          vector: new Array(1536).fill(0.5),
          payload: {
            videoId: "abc123",
            note: "Sample note",
          },
        },
      ],
    });
    console.log("✅ Sample point inserted with payload");
  } catch (err) {
    console.error("❌ Point insert error:", err);
  }
}

setup();
