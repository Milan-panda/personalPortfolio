import type { ServiceComponentDef } from "../types";

export const analyticsComponents: ServiceComponentDef[] = [
  { id: "bigquery", label: "BigQuery", category: "analytics", iconKey: "bigquery" },
  { id: "redshift", label: "Amazon Redshift", category: "analytics" },
  { id: "snowflake", label: "Snowflake", category: "analytics", iconKey: "snowflake" },
  { id: "clickhouse", label: "ClickHouse", category: "analytics" },
  { id: "apache-druid", label: "Apache Druid", category: "analytics" },
  { id: "athena", label: "Athena", category: "analytics" },
  { id: "hive", label: "Hive", category: "analytics" },
  { id: "presto", label: "Presto", category: "analytics" },
  { id: "trino", label: "Trino", category: "analytics" },
];
