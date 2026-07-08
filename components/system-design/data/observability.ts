import type { ServiceComponentDef } from "../types";

export const observabilityComponents: ServiceComponentDef[] = [
  { id: "logs", label: "Logs", category: "observability" },
  { id: "metrics", label: "Metrics", category: "observability" },
  { id: "traces", label: "Traces", category: "observability" },
  { id: "dashboard", label: "Dashboard", category: "observability" },
  { id: "alerts", label: "Alerts", category: "observability" },
  { id: "profiling", label: "Profiling", category: "observability" },
  { id: "health-checks", label: "Health Checks", category: "observability" },
  { id: "synthetic-monitoring", label: "Synthetic Monitoring", category: "observability" },
];
