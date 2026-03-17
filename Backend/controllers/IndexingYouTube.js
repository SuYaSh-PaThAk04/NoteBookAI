import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { QdrantVectorStore } from "@langchain/qdrant";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../utils/constants.js";
import crypto from "crypto";

export const indexYoutube = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "No YouTube URL provided"
      );
    }
    const videoId = crypto.randomUUID();

    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await splitter.splitDocuments(docs);

    const type = "youtube";

    chunks.forEach((chunk) => {
      chunk.metadata = {
        ...(chunk.metadata || {}),
        videoId,
        url,
        type,
      };
    });

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });
    console.log(process.env.QDRANT_URL);

    await QdrantVectorStore.fromDocuments(chunks, embeddings, {
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName: "noteai-collection",
    });

    return sendResponse(
      res,
      HTTP_STATUS.CREATED,
      true,
      "YouTube video indexed seccessfully",
      {
        videoId,
        videoTitle: docs[0].metadata.title || "Unknown",
        chunksCount: chunks.length,
        type,
      }
    );
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      false,
      "Indexing failed"
    );
  }
};
