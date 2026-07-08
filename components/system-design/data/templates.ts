import type { ServiceComponentDef } from "../types";

export const templateComponents: ServiceComponentDef[] = [
  // Web
  { id: "single-server", label: "Single Server", category: "templates", subcategory: "web" },
  { id: "three-tier", label: "Three-Tier Architecture", category: "templates", subcategory: "web" },
  { id: "monolith", label: "Monolith", category: "templates", subcategory: "web" },
  // Microservices
  { id: "service-mesh-template", label: "Service Mesh", category: "templates", subcategory: "microservices" },
  { id: "api-gateway-template", label: "API Gateway", category: "templates", subcategory: "microservices" },
  { id: "bff-template", label: "Backend for Frontend", category: "templates", subcategory: "microservices" },
  { id: "event-driven-architecture", label: "Event Driven Architecture", category: "templates", subcategory: "microservices" },
  { id: "pub-sub-template", label: "Pub/Sub", category: "templates", subcategory: "microservices" },
  { id: "cqrs-template", label: "CQRS", category: "templates", subcategory: "microservices" },
  { id: "saga-template", label: "Saga", category: "templates", subcategory: "microservices" },
  { id: "event-sourcing-template", label: "Event Sourcing", category: "templates", subcategory: "microservices" },
  { id: "sidecar-pattern", label: "Sidecar Pattern", category: "templates", subcategory: "microservices" },
  { id: "ambassador-pattern", label: "Ambassador Pattern", category: "templates", subcategory: "microservices" },
  { id: "strangler-fig", label: "Strangler Fig Pattern", category: "templates", subcategory: "microservices" },
  // Deployment
  { id: "blue-green", label: "Blue-Green Deployment", category: "templates", subcategory: "deployment" },
  { id: "canary-deployment", label: "Canary Deployment", category: "templates", subcategory: "deployment" },
  { id: "rolling-deployment", label: "Rolling Deployment", category: "templates", subcategory: "deployment" },
  { id: "active-active", label: "Active-Active", category: "templates", subcategory: "deployment" },
  { id: "active-passive", label: "Active-Passive", category: "templates", subcategory: "deployment" },
  { id: "multi-region", label: "Multi-Region", category: "templates", subcategory: "deployment" },
  { id: "read-replicas-template", label: "Read Replicas", category: "templates", subcategory: "deployment" },
  { id: "database-sharding", label: "Database Sharding", category: "templates", subcategory: "deployment" },
  // Data
  { id: "batch-processing", label: "Batch Processing", category: "templates", subcategory: "data" },
  { id: "streaming-pipeline", label: "Streaming Pipeline", category: "templates", subcategory: "data" },
  { id: "etl-pipeline", label: "ETL Pipeline", category: "templates", subcategory: "data" },
  { id: "elt-pipeline", label: "ELT Pipeline", category: "templates", subcategory: "data" },
  { id: "data-warehouse", label: "Data Warehouse", category: "templates", subcategory: "data" },
  { id: "data-lake", label: "Data Lake", category: "templates", subcategory: "data" },
  { id: "lakehouse", label: "Lakehouse", category: "templates", subcategory: "data" },
  // AI
  { id: "ml-training-pipeline", label: "ML Training Pipeline", category: "templates", subcategory: "ai" },
  { id: "model-serving", label: "Model Serving", category: "templates", subcategory: "ai" },
  { id: "rag-pipeline", label: "RAG Pipeline", category: "templates", subcategory: "ai" },
  { id: "ai-chatbot-architecture", label: "AI Chatbot Architecture", category: "templates", subcategory: "ai" },
  { id: "vector-search-pipeline", label: "Vector Search Pipeline", category: "templates", subcategory: "ai" },
  { id: "agentic-ai-architecture", label: "Agentic AI Architecture", category: "templates", subcategory: "ai" },
];
