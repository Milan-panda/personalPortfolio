import type { ServiceComponentDef } from "../types";

export const apiComponents: ServiceComponentDef[] = [
  { id: "rest-api", label: "REST API", category: "api" },
  { id: "graphql", label: "GraphQL", category: "api", iconKey: "graphql" },
  { id: "grpc", label: "gRPC", category: "api" },
  { id: "websocket", label: "WebSocket", category: "api" },
  { id: "sse", label: "Server-Sent Events (SSE)", category: "api" },
  { id: "backend-for-frontend", label: "Backend For Frontend (BFF)", category: "api" },
  { id: "api-aggregator", label: "API Aggregator", category: "api" },
  { id: "api-proxy", label: "API Proxy", category: "api" },
  { id: "rate-limiter", label: "Rate Limiter", category: "api" },
  { id: "api-versioning", label: "API Versioning", category: "api" },
];
