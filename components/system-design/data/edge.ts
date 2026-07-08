import type { ServiceComponentDef } from "../types";

export const edgeComponents: ServiceComponentDef[] = [
  { id: "edge-function", label: "Edge Function", category: "edge" },
  { id: "edge-worker", label: "Edge Worker", category: "edge" },
  { id: "cdn-pop", label: "CDN POP", category: "edge" },
  { id: "api-edge", label: "API Edge", category: "edge" },
];
