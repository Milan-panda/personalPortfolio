import type { ServiceComponentDef } from "../types";

export const clientComponents: ServiceComponentDef[] = [
  { id: "client", label: "Client", category: "clients" },
  { id: "browser", label: "Browser", category: "clients", iconKey: "browser" },
  { id: "mobile-app", label: "Mobile App", category: "clients", iconKey: "mobile-app" },
  { id: "desktop-app", label: "Desktop App", category: "clients" },
  { id: "cli", label: "CLI", category: "clients", iconKey: "cli" },
  { id: "iot-device", label: "IoT Device", category: "clients" },
  { id: "smart-tv", label: "Smart TV", category: "clients" },
  { id: "embedded-device", label: "Embedded Device", category: "clients" },
  { id: "third-party-client", label: "Third-party Client", category: "clients" },
  { id: "internal-service", label: "Internal Service", category: "clients" },
  { id: "microservice-client", label: "Microservice", category: "clients" },
  { id: "api-consumer", label: "API Consumer", category: "clients" },
  { id: "sdk", label: "SDK", category: "clients" },
  { id: "bot", label: "Bot", category: "clients" },
  { id: "webhook-consumer", label: "Webhook Consumer", category: "clients" },
];
