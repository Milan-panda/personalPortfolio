import type { ServiceComponentDef } from "../types";

export const containerComponents: ServiceComponentDef[] = [
  { id: "docker", label: "Docker", category: "containers", iconKey: "docker" },
  { id: "containerd", label: "containerd", category: "containers" },
  { id: "podman", label: "Podman", category: "containers" },
];
