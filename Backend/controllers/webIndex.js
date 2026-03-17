import axios from "axios";
import { load } from "cheerio";  // Correct way to import
import crypto from "crypto";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../utils/constants.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const indexWeb = async (req, res) => {
  const { webUrl } = req.body;

  if (!webUrl) {
    return sendResponse(res, HTTP_STATUS.NOT_FOUND, false, "Web URL required");
  }

  try {
    const visitedUrls = new Set();
    const urlQueue = [webUrl];
    const maxPages = 10;

    while (urlQueue.length > 0 && visitedUrls.size < maxPages) {
      const currentUrl = urlQueue.shift();
      if (visitedUrls.has(currentUrl)) continue;

      try {
        const { data: html } = await axios.get(currentUrl);
        const $ = load(html);  // Use load from cheerio
        const textContent = $('body').text().replace(/\s+/g, ' ').trim();

        if (textContent) {
          await storeInQdrant(currentUrl, textContent);
          console.log(`Indexed: ${currentUrl}`);
        }

        visitedUrls.add(currentUrl);

        $('a[href]').each((_, el) => {
          const link = $(el).attr('href');
          if (link) {
            let fullLink = link.startsWith('http') ? link : `${webUrl}${link}`;
            if (fullLink.startsWith(webUrl) && !visitedUrls.has(fullLink)) {
              urlQueue.push(fullLink);
            }
          }
        });
      } catch (err) {
        console.error(`Failed to process ${currentUrl}: ${err.message}`);
      }
    }

    return sendResponse(
      res,
      HTTP_STATUS.OK,
      true,
      "Website indexed successfully",
      { webUrl,indexedPages: visitedUrls.size }
    );
  } catch (error) {
    console.error("Indexing failed:", error);
    return sendResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      false,
      "Indexing failed"
    );
  }
};

async function storeInQdrant(url, textContent) {
  const webId = crypto.randomUUID();
  const type = "web";

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = [{ pageContent: textContent, metadata: { url } }];
  const chunks = await textSplitter.splitDocuments(docs);

  const chunksWithMetadata = chunks.map((chunk) => ({
    ...chunk,
    metadata: { ...chunk.metadata, webId, type },
  }));

  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

  await QdrantVectorStore.fromDocuments(chunksWithMetadata, embeddings, {
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    collectionName: "noteai-collection",
  });
}
