import { aiMlComponents } from "./ai-ml";
import { analyticsComponents } from "./analytics";
import { apiComponents } from "./api";
import { authComponents } from "./auth";
import { cacheComponents } from "./cache";
import { cicdComponents } from "./cicd";
import { clientComponents } from "./clients";
import { configComponents } from "./config";
import { containerComponents } from "./containers";
import { dataPipelineComponents } from "./data-pipelines";
import { databaseComponents } from "./databases";
import { edgeComponents } from "./edge";
import { infrastructureComponents } from "./infrastructure";
import { loadBalancingComponents } from "./load-balancing";
import { mediaComponents } from "./media";
import { messagingComponents } from "./messaging";
import { microservicesComponents } from "./microservices";
import { monitoringComponents } from "./monitoring";
import { networkComponents } from "./network";
import { notificationComponents } from "./notifications";
import { observabilityComponents } from "./observability";
import { orchestrationComponents } from "./orchestration";
import { patternComponents } from "./patterns";
import { computeComponents } from "./compute";
import { schedulingComponents } from "./scheduling";
import { searchComponents } from "./search";
import { secretsComponents } from "./secrets";
import { securityComponents } from "./security";
import { serviceDiscoveryComponents } from "./service-discovery";
import { serviceMeshComponents } from "./service-mesh";
import { storageComponents } from "./storage";
import { streamProcessingComponents } from "./stream-processing";
import { templateComponents } from "./templates";
import type { ServiceComponentDef } from "../types";

export { paletteCategories, subcategoryLabels } from "./categories";

const allComponents: ServiceComponentDef[] = [
  ...clientComponents,
  ...infrastructureComponents,
  ...networkComponents,
  ...computeComponents,
  ...containerComponents,
  ...orchestrationComponents,
  ...loadBalancingComponents,
  ...apiComponents,
  ...authComponents,
  ...microservicesComponents,
  ...databaseComponents,
  ...storageComponents,
  ...cacheComponents,
  ...messagingComponents,
  ...streamProcessingComponents,
  ...searchComponents,
  ...analyticsComponents,
  ...dataPipelineComponents,
  ...aiMlComponents,
  ...mediaComponents,
  ...notificationComponents,
  ...monitoringComponents,
  ...observabilityComponents,
  ...securityComponents,
  ...secretsComponents,
  ...serviceDiscoveryComponents,
  ...serviceMeshComponents,
  ...configComponents,
  ...schedulingComponents,
  ...cicdComponents,
  ...patternComponents,
  ...edgeComponents,
  ...templateComponents,
];

export const serviceComponents: ServiceComponentDef[] = allComponents;

export const serviceComponentMap = Object.fromEntries(
  serviceComponents.map((component) => [component.id, component]),
) as Record<string, ServiceComponentDef>;
