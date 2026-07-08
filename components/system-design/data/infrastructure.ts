import type { ServiceComponentDef } from "../types";

export const infrastructureComponents: ServiceComponentDef[] = [
  // Users
  { id: "user", label: "User", category: "infrastructure", subcategory: "users" },
  { id: "admin", label: "Admin", category: "infrastructure", subcategory: "users" },
  { id: "developer", label: "Developer", category: "infrastructure", subcategory: "users" },
  // Devices
  { id: "laptop", label: "Laptop", category: "infrastructure", subcategory: "devices" },
  { id: "mobile-phone", label: "Mobile Phone", category: "infrastructure", subcategory: "devices", iconKey: "mobile-app" },
  { id: "tablet", label: "Tablet", category: "infrastructure", subcategory: "devices" },
  // Infrastructure
  { id: "cloud", label: "Cloud", category: "infrastructure", subcategory: "infra" },
  { id: "region", label: "Region", category: "infrastructure", subcategory: "infra" },
  { id: "availability-zone", label: "Availability Zone", category: "infrastructure", subcategory: "infra" },
  { id: "rack", label: "Rack", category: "infrastructure", subcategory: "infra" },
  { id: "data-center", label: "Data Center", category: "infrastructure", subcategory: "infra" },
  // Generic Icons
  { id: "storage-icon", label: "Storage", category: "infrastructure", subcategory: "icons", iconKey: "s3" },
  { id: "queue-icon", label: "Queue", category: "infrastructure", subcategory: "icons", iconKey: "queue" },
  { id: "cache-icon", label: "Cache", category: "infrastructure", subcategory: "icons", iconKey: "cache" },
  { id: "lock-icon", label: "Lock", category: "infrastructure", subcategory: "icons" },
  { id: "key-icon", label: "Key", category: "infrastructure", subcategory: "icons" },
  { id: "certificate-icon", label: "Certificate", category: "infrastructure", subcategory: "icons" },
  { id: "dashboard-icon", label: "Dashboard", category: "infrastructure", subcategory: "icons" },
  { id: "alarm-icon", label: "Alarm", category: "infrastructure", subcategory: "icons" },
  { id: "clock-icon", label: "Clock", category: "infrastructure", subcategory: "icons" },
  { id: "shield-icon", label: "Shield", category: "infrastructure", subcategory: "icons" },
  { id: "globe-icon", label: "Globe", category: "infrastructure", subcategory: "icons" },
  { id: "gear-icon", label: "Gear", category: "infrastructure", subcategory: "icons" },
  { id: "robot-icon", label: "Robot", category: "infrastructure", subcategory: "icons" },
  { id: "ai-brain-icon", label: "AI Brain", category: "infrastructure", subcategory: "icons", iconKey: "llm" },
];
