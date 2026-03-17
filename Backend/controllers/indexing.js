import fs from "fs";
import crypto from "crypto";

import { OpenAIEmbeddings } from "@langchain/openai";

// Document loaders
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { TextLoader } from "langchain/document_loaders/fs/text";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Vector store (Qdrant)
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";

import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../utils/constants.js";

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

// ✅ Upload & Index
export const indexFile = async (req, res) => {
  try {
    if (!req.file) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "No file uploaded"
      );
    }

    const file = req.file;
    const filePath = file.path;
    const fileName = file.originalname;
    const fileId = crypto.randomUUID();

    let loader;

    if (file.mimetype === "application/pdf") {
      loader = new PDFLoader(filePath, { splitPages: true });
    } else if (file.mimetype === "text/csv") {
      loader = new CSVLoader(filePath);
    } else if (file.mimetype === "text/plain") {
      loader = new TextLoader(filePath);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      loader = new DocxLoader(filePath);
    } else {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "Unsupported file type"
      );
    }

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(docs);
    const type = "file";
    chunks.forEach((d) => {
      d.metadata = {
        ...(d.metadata || {}),
        fileId,
        fileName,
        type,
      };
    });

    // Remove local file
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Ensure payload index for fileId exists
    try {
      await qdrant.createPayloadIndex("nmeneoteai-collection", {
        field_name: "metadata.fileId",
        field_schema: "keyword",
        type: "file",
      });
      console.log("✅ Index on fileId created");
    } catch (err) {
      if (err?.data?.status?.error?.includes("already exists")) {
        console.log("ℹ️ Index already exists, skipping");
      } else {
        console.error("❌ Failed to create index:", err);
      }
    }

    // Embeddings + Qdrant
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });
    await QdrantVectorStore.fromDocuments(chunks, embeddings, {
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName: "noteai-collection",
    });

    // ✅ Prepare response for frontend
    const responsePayload = {
      type,
      fileId,
      fileName,
      pageCount: docs.length, // total pages or rows depending on loader
    };

    return sendResponse(
      res,
      HTTP_STATUS.OK,
      true,
      "Indexing is done",
      responsePayload
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, false, "Indexing failed");
  }
};

export const getUploadedFiles = async (req, res) => {
  try {
    const result = await qdrant.scroll("noteai-collection", {
      limit: 1000,
      with_payload: true,
    });

    const allFiles = result.points.map((point) => point.payload.metadata || {});

    const uniqueFilesMap = new Map();

    allFiles.forEach((item) => {
      // Agar type file hai
      if (item.type === "file") {
        if (!uniqueFilesMap.has(item.fileId)) {
          uniqueFilesMap.set(item.fileId, {
            id: item.fileId,
            name: item.fileName,
            pageCount: item.pageCount,
            type: "file",
          });
        }
      }

      // Agar type youtube hai
      if (item.type === "youtube") {
        if (!uniqueFilesMap.has(item.videoId)) {
          uniqueFilesMap.set(item.videoId, {
            id: item.videoId,
            name: item.title, // fileName ki jagah YouTube ka title
            url: item.url,
            type: "youtube",
          });
        }
      }
      // Agar type weSite hai
      if (item.type === "web") {
        if (!uniqueFilesMap.has(item.webId)) {
          uniqueFilesMap.set(item.webId, {
            id: item.webId,
            name: item.title,
            type: "web",
            url: item.url,
          });
        }
      }

      // text type ko ignore kar diya 🚫
    });

    const uniqueFiles = Array.from(uniqueFilesMap.values());

    sendResponse(res, HTTP_STATUS.OK, true, "fetched", uniqueFiles);
  } catch (error) {
    console.log(error);
    sendResponse(res, HTTP_STATUS.OK, false, "error");
  }
};
