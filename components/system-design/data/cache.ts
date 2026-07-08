import type { ServiceComponentDef } from "../types";

export const cacheComponents: ServiceComponentDef[] = [
  { id: "cache", label: "Cache", category: "cache", iconKey: "cache" },
  { id: "local-cache", label: "Local Cache", category: "cache" },
  { id: "distributed-cache", label: "Distributed Cache", category: "cache" },
  { id: "browser-cache", label: "Browser Cache", category: "cache" },
  { id: "cdn-cache", label: "CDN Cache", category: "cache" },
  { id: "edge-cache", label: "Edge Cache", category: "cache" },
  { id: "cache-aside", label: "Cache Aside", category: "cache", subcategory: "patterns" },
  { id: "write-through", label: "Write Through", category: "cache", subcategory: "patterns" },
  { id: "write-back", label: "Write Back", category: "cache", subcategory: "patterns" },
  { id: "read-through", label: "Read Through", category: "cache", subcategory: "patterns" },
];
