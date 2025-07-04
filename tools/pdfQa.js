import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"; 
import { FakeEmbeddings } from "langchain/embeddings/fake";  
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";

export async function createPdfQaTool(pdfPath, llm) {
  const loader = new PDFLoader(pdfPath);
  const documents = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 70
  });
  const splitDocs = await splitter.splitDocuments(documents);

  const embeddings = new FakeEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

  const retriever = vectorStore.asRetriever();
  const chain = RetrievalQAChain.fromLLM(llm, retriever);

  return async function askQuestion(question) {
    const relevantDocs = await retriever.getRelevantDocuments(question);
    if (!relevantDocs || relevantDocs.length === 0) {
      return "Not relevant question";
    }
    const answer = await chain.call({ query: question });
    return answer.text || "No answer found.";
  };
}
