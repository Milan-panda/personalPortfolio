import type { ServiceComponentDef } from "../types";

export const serviceDiscoveryComponents: ServiceComponentDef[] = [
  { id: "consul", label: "Consul", category: "service-discovery" },
  { id: "eureka", label: "Eureka", category: "service-discovery" },
  { id: "zookeeper", label: "ZooKeeper", category: "service-discovery" },
  { id: "kubernetes-dns", label: "Kubernetes DNS", category: "service-discovery" },
  { id: "etcd", label: "etcd", category: "service-discovery" },
];
