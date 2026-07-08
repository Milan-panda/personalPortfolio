import type { ServiceComponentDef } from "../types";

export const serviceMeshComponents: ServiceComponentDef[] = [
  { id: "istio", label: "Istio", category: "service-mesh", iconKey: "istio" },
  { id: "linkerd", label: "Linkerd", category: "service-mesh" },
  { id: "consul-connect", label: "Consul Connect", category: "service-mesh" },
  { id: "kuma", label: "Kuma", category: "service-mesh" },
];
