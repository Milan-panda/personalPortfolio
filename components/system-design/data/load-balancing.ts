import type { ServiceComponentDef } from "../types";

export const loadBalancingComponents: ServiceComponentDef[] = [
  { id: "l4-load-balancer", label: "L4 Load Balancer", category: "load-balancing" },
  { id: "l7-load-balancer", label: "L7 Load Balancer", category: "load-balancing" },
  { id: "internal-load-balancer", label: "Internal Load Balancer", category: "load-balancing" },
  { id: "global-load-balancer", label: "Global Load Balancer", category: "load-balancing" },
  { id: "application-load-balancer", label: "Application Load Balancer", category: "load-balancing" },
  { id: "network-load-balancer", label: "Network Load Balancer", category: "load-balancing" },
  { id: "alb", label: "Load Balancer", category: "load-balancing", subcategory: "aws", iconKey: "alb" },
  { id: "haproxy", label: "HAProxy", category: "load-balancing", subcategory: "examples", iconKey: "nginx" },
  { id: "nginx", label: "NGINX", category: "load-balancing", subcategory: "examples", iconKey: "nginx" },
  { id: "envoy", label: "Envoy", category: "load-balancing", subcategory: "examples" },
  { id: "traefik", label: "Traefik", category: "load-balancing", subcategory: "examples" },
];
