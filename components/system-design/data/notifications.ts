import type { ServiceComponentDef } from "../types";

export const notificationComponents: ServiceComponentDef[] = [
  { id: "email", label: "Email", category: "notifications" },
  { id: "sms", label: "SMS", category: "notifications" },
  { id: "push-notifications", label: "Push Notifications", category: "notifications" },
  { id: "webhooks", label: "Webhooks", category: "notifications" },
  { id: "slack", label: "Slack", category: "notifications", iconKey: "slack" },
  { id: "discord", label: "Discord", category: "notifications" },
  { id: "microsoft-teams", label: "Microsoft Teams", category: "notifications" },
];
