import type { ServiceComponentDef } from "../types";

export const aiMlComponents: ServiceComponentDef[] = [
  { id: "model-server", label: "Model Server", category: "ai-ml" },
  { id: "feature-store", label: "Feature Store", category: "ai-ml" },
  { id: "embedding-service", label: "Embedding Service", category: "ai-ml" },
  { id: "llm", label: "LLM", category: "ai-ml", iconKey: "llm" },
  { id: "training-cluster", label: "Training Cluster", category: "ai-ml" },
  { id: "inference-server", label: "Inference Server", category: "ai-ml" },
  { id: "ml-pipeline", label: "ML Pipeline", category: "ai-ml" },
  { id: "hugging-face", label: "Hugging Face", category: "ai-ml", iconKey: "hugging-face" },
  { id: "ollama", label: "Ollama", category: "ai-ml" },
  { id: "triton-inference", label: "Triton Inference Server", category: "ai-ml" },
  { id: "vllm", label: "vLLM", category: "ai-ml" },
];
