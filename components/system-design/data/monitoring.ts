import type { ServiceComponentDef } from "../types";

export const monitoringComponents: ServiceComponentDef[] = [
  { id: "prometheus", label: "Prometheus", category: "monitoring", subcategory: "metrics", iconKey: "prometheus" },
  { id: "cloudwatch", label: "CloudWatch", category: "monitoring", subcategory: "metrics" },
  { id: "datadog", label: "Datadog", category: "monitoring", subcategory: "metrics" },
  { id: "new-relic", label: "New Relic", category: "monitoring", subcategory: "metrics" },
  { id: "grafana", label: "Grafana", category: "monitoring", subcategory: "metrics", iconKey: "grafana" },
  { id: "elk-stack", label: "ELK Stack", category: "monitoring", subcategory: "logging" },
  { id: "loki", label: "Loki", category: "monitoring", subcategory: "logging" },
  { id: "splunk", label: "Splunk", category: "monitoring", subcategory: "logging" },
  { id: "fluentd", label: "Fluentd", category: "monitoring", subcategory: "logging" },
  { id: "fluent-bit", label: "Fluent Bit", category: "monitoring", subcategory: "logging" },
  { id: "jaeger", label: "Jaeger", category: "monitoring", subcategory: "tracing" },
  { id: "zipkin", label: "Zipkin", category: "monitoring", subcategory: "tracing" },
  { id: "grafana-tempo", label: "Grafana Tempo", category: "monitoring", subcategory: "tracing" },
  { id: "opentelemetry", label: "OpenTelemetry", category: "monitoring", subcategory: "tracing" },
  { id: "pagerduty", label: "PagerDuty", category: "monitoring", subcategory: "alerting" },
  { id: "opsgenie", label: "Opsgenie", category: "monitoring", subcategory: "alerting" },
  { id: "alertmanager", label: "Alertmanager", category: "monitoring", subcategory: "alerting" },
];
