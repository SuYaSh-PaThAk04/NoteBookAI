# 🤖 Knowtify – AI-Powered Knowledge Assistant

Knowtify is an **AI-powered RAG (Retrieval-Augmented Generation)** system that transforms unstructured data (text, PDFs, YouTube videos, and web pages) into meaningful, **context-aware conversations**.  
It combines **LangChain**, **Qdrant**, and **LLMs** to deliver **semantic, accurate, and real-time responses** — just like a personal knowledge assistant. ⚡  

---

🧠 "Knowtify bridges your knowledge with intelligence — bringing context to conversation."

---

## 🧩 Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **AI/ML** | LangChain, LLM (e.g., OpenAI / Gemini / Mistral) |
| **Vector Database** | Qdrant |
| **Data Sources** | Text files, PDFs, YouTube links, Website URLs |

---

## 🚀 Key Features

✅ **Retrieval-Augmented Generation (RAG)** — Combines vector search with LLMs for contextual, fact-based responses  
✅ **Multi-Source Knowledge Retrieval** — Supports **Text, PDFs, YouTube transcripts, and Website URLs**  
✅ **Semantic Search via Qdrant** — Fast and meaningful vector-based information retrieval  
✅ **LangChain Integration** — Efficient pipeline for text embedding, chunking, and retrieval  
✅ **React + Tailwind Frontend** — Clean and responsive user interface  
✅ **Express Backend** — API for query processing and model orchestration  
✅ **Scalable & Modular Architecture** — Easy to extend with new data sources or models  

---

## 🧠 System Workflow
User Query ➜ Backend (Node.js) ➜ LangChain Pipeline ➜ Qdrant Vector Search ➜
Top Relevant Chunks ➜ LLM Response Generation ➜ Frontend Display


💡 The system retrieves the most semantically similar information from Qdrant and feeds it to the LLM to produce accurate and contextually aligned responses.

---

## 🏗️ Project Structure

📦 Knowtify
├── 📁 client # React frontend
│ ├── src
│ │ ├── components # UI components
│ │ ├── pages # Chat and upload pages
│ │ └── App.jsx
│ └── tailwind.config.js
│
├── 📁 server # Node.js backend
│ ├── ragController.js # RAG query logic
│ ├── qdrantClient.js # Qdrant setup and vector operations
│ ├── langchainSetup.js # Embedding + retrieval logic
│ ├── server.js # Express server entry
│ └── utils/ # Helper functions
│
├── 📄 .env # Environment variables
├── 📄 package.json
├── 📄 README.md
└── 📄 .gitignore

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/knowtify-ai-assistant.git
cd knowtify-ai-assistant

2️⃣ Install Dependencies
Backend:
cd server
npm install

Frontend:
cd ../client
npm install

3️⃣ Create Environment File

In server/.env:

PORT=5000
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=your_qdrant_api_key
OPENAI_API_KEY=your_openai_api_key

4️⃣ Run the Application
Start Backend:
cd server
npm run dev

Start Frontend:
cd ../client
npm run dev


App will be running at:
👉 Frontend: http://localhost:5173

👉 Backend: http://localhost:5000

🧩 Example Query Flow
Step 1: Upload Knowledge Source

Upload a PDF, text file, YouTube link, or website URL.
Knowtify extracts the content → generates embeddings → stores in Qdrant.

Step 2: Ask a Question

User asks:

"Summarize the key points from this YouTube video on Neural Networks."

Step 3: RAG Pipeline

Retrieve top relevant chunks using semantic search

Combine with user query

Pass to LangChain + LLM for final generation

Step 4: Response

"The video explains how neurons connect to form layers, leading to feature extraction and classification in deep learning models."


✨ Author

👩‍💻 Riya Singh
🚀 Full Stack & AI Developer


