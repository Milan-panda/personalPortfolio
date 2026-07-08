import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  BrainCircuit,
  Cloud,
  Container,
  Database,
  Globe,
  Globe2,
  Inbox,
  Laptop,
  Layers,
  List,
  MessageSquare,
  Package,
  Route,
  Scale,
  Server,
  ShieldCheck,
  Smartphone,
  Table2,
  Terminal,
  Zap,
} from "lucide-react";
import type { IconProps } from "./types";

function lucide(Icon: LucideIcon) {
  return function LucideIconComponent({ className }: IconProps): ReactElement {
    return <Icon className={className} strokeWidth={1.75} aria-hidden />;
  };
}

/** Lucide icons for components without a Simple Icons brand logo. */
export const semanticIcons: Record<string, (props: IconProps) => ReactElement> = {
  // Clients
  client: lucide(Laptop),
  browser: lucide(Globe),
  "mobile-app": lucide(Smartphone),
  cli: lucide(Terminal),
  // Compute & infra
  server: lucide(Server),
  database: lucide(Database),
  container: lucide(Container),
  // Network
  firewall: lucide(ShieldCheck),
  "api-gateway": lucide(Route),
  cdn: lucide(Globe2),
  dns: lucide(Globe),
  // Data stores
  queue: lucide(List),
  cache: lucide(Layers),
  // Load balancing
  alb: lucide(Scale),
  // AI
  llm: lucide(BrainCircuit),
  // AWS (no longer in Simple Icons — use cohesive Lucide equivalents)
  aws: lucide(Cloud),
  lambda: lucide(Zap),
  s3: lucide(Package),
  sqs: lucide(Inbox),
  rds: lucide(Database),
  dynamodb: lucide(Table2),
  ecs: lucide(Container),
  cloudfront: lucide(Globe2),
  ec2: lucide(Server),
  kinesis: lucide(Archive),
  sns: lucide(MessageSquare),
  cognito: lucide(ShieldCheck),
  // Notifications
  slack: lucide(MessageSquare),
};
