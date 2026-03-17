import { OpenAIEmbeddings } from "@langchain/openai"
import { QdrantVectorStore } from "@langchain/qdrant";
import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../utils/constants.js";
import crypto from "crypto";
import { QdrantClient } from "@qdrant/js-client-rest";

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const indexText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, false, "Text required");
    }

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    const id = crypto.randomUUID();
    const vector = await embeddings.embedQuery(text);

    await qdrant.upsert("noteai-collection", {
  points: [
    {
      id,
      vector,
      payload: {
        pageContent: text,   // 👈 ye key zaruri hai
        metadata: { type: "note", id ,text}
      }
    }
  ],
});
  

    sendResponse(res, HTTP_STATUS.CREATED, true, "Text indexed", { text, id });
  } catch (error) {
    console.error("Error indexing text:", error);
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, false, "Failed to index text");
  }
};

export const deleteText=async(req,res)=>{
  try {
    const {id}=req.body;

    const scroll = await qdrant.scroll("noteai-collection", {
      limit: 1000,
      with_payload: true
    });
    console.log(scroll);
    
  
    const result = await qdrant.delete("noteai-collection", {
          points:[id]
      });
  
      return sendResponse(res,HTTP_STATUS.OK,true,"Deleted sucessfully",result)
  } catch (error) {
    sendResponse(res,HTTP_STATUS.BAD_REQUEST,false,"Deletion Failed",error)
  }
}

