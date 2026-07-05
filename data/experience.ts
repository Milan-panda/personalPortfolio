export type Experience = {
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Adapts AI",
    companyUrl: "https://adapts.ai/",
    role: "Full Stack Software Engineer",
    location: "Remote (US)",
    period: "2024–present",
    bullets: [
      "Own backend systems and infrastructure powering the core product",
      "Built the end-to-end RAG pipeline: ingestion, retrieval orchestration, response generation",
      "Built and maintain integrations with Jira, Confluence, Notion, Azure DevOps, GitLab, GitHub, and Bitbucket",
      "Shipped IDE extensions for VS Code and Cursor",
      "Designed serverless architecture on Lambda + API Gateway with DynamoDB access patterns tuned for high-throughput workloads",
    ],
  },
  {
    company: "Quantiphi",
    companyUrl: "https://quantiphi.com/",
    role: "Framework Engineer",
    location: "Bangalore, Karnataka, India",
    period: "Jun 2022 – Sep 2023",
    bullets: [
      "Owned and upgraded internal tools, platforms, and services for Joyup, shipping three products end-to-end",
      "Built an analytics dashboard in React for internal reporting",
      "Built the client-side web app from scratch as the web equivalent of the Prodeus Chrome extension, translating UI/UX mockups into a full application",
      "Built an MVP dashboard (effectively a lightweight CMS) powering a branded online ordering menu",
      "Fixed React rendering bottlenecks as data volume grew and refactored Redux architecture to remove prop-drilling and duplicated logic",
    ],
  },
];
