import type { ServiceComponentDef } from "../types";

export const configComponents: ServiceComponentDef[] = [
  { id: "config-server", label: "Config Server", category: "config" },
  { id: "consul-kv", label: "Consul KV", category: "config" },
  { id: "config-etcd", label: "etcd", category: "config" },
  { id: "config-zookeeper", label: "ZooKeeper", category: "config" },
  { id: "configmap", label: "ConfigMap", category: "config" },
];
