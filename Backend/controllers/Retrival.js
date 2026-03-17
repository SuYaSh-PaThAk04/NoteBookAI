import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../utils/constants.js";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let history=[];

export const RetriveAnswer = async (req, res) => {
  try {
    const { query } = req.body;

    history.push({role:"user",content:query})

    if (!query) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        false,
        "Query is required"
      );
    }

    // Embeddings setup
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    // Connect to existing Qdrant collection
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: "noteai-collection",
      }
    );

    // Create retriever
    const retriever = vectorStore.asRetriever({ k: 3 });
    

    let relevantDocs = await retriever.invoke(query);

    relevantDocs = relevantDocs.map((doc) => {
      return {
        pageContent:
          doc.pageContent ||
          doc.metadata?.pageContent ||
          doc.payload?.pageContent ||
          "",
        metadata: doc.metadata || doc.payload || {},
        id: doc.id,
      };
    });

    // System prompt
    const SYSTEM_PROMPT = `
You are an intelligent AI assistant designed to answer user queries using ONLY the provided context by user.

 Rules to Follow :

1- If the context is in Hindi, answer in Hinglish or English.

2- Always mention the page number from the PDF, if available.

3- If no context is provided, reply:
 👉 "Please provide a context so I can help you better."

4- If the user just wants to chat, respond in a friendly, conversational tone.

5- Always explain your answer step by step, using new lines for clarity.

6- Keep your answers precise, and easy to understand.

7-Also use emojis for interaction.

 
Context:
${JSON.stringify(relevantDocs)}
`;

    // Call OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
      ],
      
    });

    const assistantMessage=response.choices[0].message.content;
    history.push({role:"assistant",content:assistantMessage})

    // Send response
    return sendResponse(
      res,
      HTTP_STATUS.OK,
      true,
      "Answer generated successfully",
      {
        answer: assistantMessage
      }
    );
  } catch (error) {
    console.error("Retrieval error:", error?.message || error);
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      false,
      "Retrieval failed"
    );
  }
};

export const reset=async(req,res)=>{
  history=[];
  return sendResponse(res,HTTP_STATUS.OK,true,"Cleared History")
}
