import type { ServiceComponentDef } from "../types";

export const orchestrationComponents: ServiceComponentDef[] = [
  { id: "kubernetes", label: "Kubernetes", category: "orchestration", iconKey: "kubernetes" },
  { id: "docker-swarm", label: "Docker Swarm", category: "orchestration" },
  { id: "nomad", label: "Nomad", category: "orchestration" },
  { id: "openshift", label: "OpenShift", category: "orchestration" },
  { id: "ecs", label: "ECS", category: "orchestration", subcategory: "aws", iconKey: "ecs" },
  { id: "eks", label: "EKS", category: "orchestration", subcategory: "aws" },
  { id: "aks", label: "AKS", category: "orchestration", subcategory: "azure" },
  { id: "gke", label: "GKE", category: "orchestration", subcategory: "gcp" },
];
