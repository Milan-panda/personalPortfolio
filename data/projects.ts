export type Project = {
  title: string;
  tagline: string;
  bullets: string[];
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Togglebit",
    tagline:
      "Feature flag SaaS: ship safely with percentage rollouts and segment targeting, no redeploys.",
    bullets: [
      "Published a TypeScript SDK (<2kb gzipped) with separate client/server entry points for React hooks and Server Components",
      "Redis-cached evaluation API with a JSONB rule engine for sub-millisecond flag evaluation",
      "Multi-tenant dashboard: Clerk auth, 4-role RBAC, per-environment flags, audit logging",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com/Milan-panda/togglebit",
    liveUrl: "http://xuno.duckdns.org:8765/",
  },
  {
    title: "Knowrix",
    tagline:
      "RAG knowledge platform: ingest documents, web content, and repos into a vector store for semantic search.",
    bullets: [
      "Hybrid retrieval (dense vector search + reranking) with streaming responses for lower perceived latency",
      "Async ingestion pipeline via background workers; large sources don't block the app",
      "Multi-tenant by design: auth, workspace isolation, API-level access control",
    ],
    stack: ["Next.js", "FastAPI", "Qdrant", "Redis", "Docker"],
    githubUrl: "https://github.com/Milan-panda/knowrix",
    liveUrl: "https://knowrix.vercel.app/",
  },
];
