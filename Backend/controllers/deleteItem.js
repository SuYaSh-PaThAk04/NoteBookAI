import { QdrantClient } from "@qdrant/js-client-rest";
import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../utils/constants.js";

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const deleteIndexedItem = async (req, res) => {
  try {
    const { id, type } = req.body; 
    // id = fileId ya videoId
    // type = "file" ya "youtube"

    let filter = {};

    if (type === "file") {
      filter = {
        must: [
          { key: "metadata.fileId", match: { value: id } }
        ]
      };
    }

    if (type === "youtube") {
      filter = {
        must: [
          { key: "metadata.videoId", match: { value: id } }
        ]
      };
    }
    if (type === "web") {   
      filter = {
        must: [
          { key: "metadata.webId", match: { value: id } }
        ]
      };
    }

    const result = await qdrant.delete("noteai-collection", {
      filter,
    });

    console.log("Deleted:", result);

    sendResponse(res, HTTP_STATUS.OK, true, "Deleted successfully", result);
  } catch (error) {
    console.log(error);
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, "Error deleting");
  }
};