import type { ServiceComponentDef } from "../types";

export const computeComponents: ServiceComponentDef[] = [
  { id: "server", label: "Server", category: "compute", subcategory: "generic", iconKey: "server" },
  { id: "virtual-machine", label: "Virtual Machine", category: "compute", subcategory: "generic" },
  { id: "container", label: "Container", category: "compute", subcategory: "generic", iconKey: "docker" },
  { id: "pod", label: "Pod", category: "compute", subcategory: "generic" },
  { id: "function", label: "Function", category: "compute", subcategory: "generic" },
  { id: "worker", label: "Worker", category: "compute", subcategory: "generic" },
  { id: "background-worker", label: "Background Worker", category: "compute", subcategory: "generic" },
  { id: "batch-worker", label: "Batch Worker", category: "compute", subcategory: "generic" },
  { id: "cron-job", label: "Cron Job", category: "compute", subcategory: "generic" },
  { id: "gpu-node", label: "GPU Node", category: "compute", subcategory: "generic" },
  { id: "edge-node", label: "Edge Node", category: "compute", subcategory: "generic" },
  { id: "ec2", label: "EC2", category: "compute", subcategory: "aws" },
  { id: "lambda", label: "Lambda", category: "compute", subcategory: "aws", iconKey: "lambda" },
  { id: "fargate", label: "Fargate", category: "compute", subcategory: "aws" },
  { id: "aws-batch", label: "AWS Batch", category: "compute", subcategory: "aws" },
  { id: "azure-vm", label: "Virtual Machine", category: "compute", subcategory: "azure" },
  { id: "azure-functions", label: "Azure Functions", category: "compute", subcategory: "azure" },
  { id: "compute-engine", label: "Compute Engine", category: "compute", subcategory: "gcp" },
  { id: "cloud-run", label: "Cloud Run", category: "compute", subcategory: "gcp" },
  { id: "cloud-functions", label: "Cloud Functions", category: "compute", subcategory: "gcp" },
];
