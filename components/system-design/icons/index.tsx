import type { ReactElement } from "react";
import { serviceComponentMap } from "../data";
import type { ComponentCategory, ServiceId } from "../types";
import { brandIcons } from "./brand-icons";
import { categoryIcons, genericIcon } from "./category-icons";
import { semanticIcons } from "./semantic-icons";
import type { IconProps } from "./types";

function resolveIconKey(serviceId: ServiceId): string {
  const component = serviceComponentMap[serviceId];
  return component?.iconKey ?? serviceId;
}

function resolveCategory(serviceId: ServiceId): ComponentCategory {
  const component = serviceComponentMap[serviceId];
  return component?.category ?? "generic";
}

function resolveIcon(serviceId: ServiceId): (props: IconProps) => ReactElement {
  const iconKey = resolveIconKey(serviceId);

  if (brandIcons[iconKey]) {
    return brandIcons[iconKey];
  }

  if (semanticIcons[iconKey]) {
    return semanticIcons[iconKey];
  }

  const category = resolveCategory(serviceId);
  return categoryIcons[category] ?? genericIcon;
}

export function ServiceIcon({
  serviceId,
  className = "h-6 w-6",
}: {
  serviceId: ServiceId;
  className?: string;
}) {
  const Icon = resolveIcon(serviceId);
  return <Icon className={className} />;
}

export type { IconProps } from "./types";
