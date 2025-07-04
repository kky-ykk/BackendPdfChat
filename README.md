# 📄 LangChain PDFChat

**LangChain PDFChat** is a lightweight Node.js library that helps you build a local question–answering chatbot over any PDF.  
It uses local embeddings (so you don’t pay per token) and powerful Groq LLM to generate answers **strictly based on the PDF content**.

✅ **Only answers questions if info is found in the PDF**  
✅ **Fast**: Uses in-memory vector search  
✅ **Easy to use**: Just point to a local PDF, ask questions

---

## ✏️ How it works

1. You load a PDF file from your local system.
2. The tool splits & embeds the PDF content in memory.
3. A retriever fetches only the relevant chunks for each user question.
4. The question and chunks go to the Groq LLM to generate an answer.
5. If the answer isn't in the PDF, it says: `"Not relevant question"`.

---

## 🚀 Quick Start

### Step 1: Install

```bash
npm install langchain-pdfbot
```

## Step 2: Get your free Groq API key
- Sign up at: https://console.groq.com
- Go to **Settings → API Keys → Create API Key**
- Copy your new API key (starts with `gsk_...`)

## Step 3: Add your API key to .env
GROQ_API_KEY=your_groq_api_key_here

## Step 4: Use in your code
```bash
// index.js
import { createPdfQaTool } from "langchain-pdfbot";

const pdfPath = "docs/YourFile.pdf"; // Replace with your local PDF path

const askQuestion = await createPdfQaTool(pdfPath);

const question1 = "What topics are covered in this PDF?";
const answer1 = await askQuestion(question1);
console.log("Q:", question1);
console.log("A:", answer1);

const question2 = "Who won the FIFA World Cup 2018?";
const answer2 = await askQuestion(question2);
console.log("Q:", question2);
console.log("A:", answer2);
```


