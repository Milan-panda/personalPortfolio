import type { Edge, Node, Viewport } from "@xyflow/react";

export type EditorTool = "select" | "pan" | "pen" | "text" | "box";

export type ComponentCategory =
  | "clients"
  | "network"
  | "compute"
  | "databases"
  | "storage"
  | "cache"
  | "messaging"
  | "api"
  | "auth"
  | "microservices"
  | "load-balancing"
  | "stream-processing"
  | "search"
  | "analytics"
  | "data-pipelines"
  | "monitoring"
  | "cicd"
  | "containers"
  | "orchestration"
  | "service-discovery"
  | "service-mesh"
  | "secrets"
  | "config"
  | "scheduling"
  | "ai-ml"
  | "media"
  | "notifications"
  | "security"
  | "observability"
  | "patterns"
  | "edge"
  | "infrastructure"
  | "templates"
  | "aws"
  | "azure"
  | "gcp"
  | "generic";

export type ServiceId = string;

export type ServiceComponentDef = {
  id: ServiceId;
  label: string;
  category: ComponentCategory;
  subcategory?: string;
  iconKey?: string;
};

export type ServiceNodeData = {
  serviceId: ServiceId;
  label: string;
};

export type TextNodeData = {
  label: string;
};

export type BoxNodeData = {
  label: string;
};

export type GroupNodeData = {
  label: string;
};

export type FlowEdgeData = {
  label?: string;
  isEditing?: boolean;
};

export type StrokePath = {
  id: string;
  points: [number, number, number][];
  color: string;
  size: number;
};

export type DiagramSnapshot = {
  nodes: Node[];
  edges: Edge[];
  strokes: StrokePath[];
  viewport: Viewport;
};
