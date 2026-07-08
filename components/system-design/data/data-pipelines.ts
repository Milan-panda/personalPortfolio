import type { ServiceComponentDef } from "../types";

export const dataPipelineComponents: ServiceComponentDef[] = [
  { id: "etl", label: "ETL", category: "data-pipelines" },
  { id: "elt", label: "ELT", category: "data-pipelines" },
  { id: "apache-airflow", label: "Apache Airflow", category: "data-pipelines", iconKey: "airflow" },
  { id: "dagster", label: "Dagster", category: "data-pipelines" },
  { id: "prefect", label: "Prefect", category: "data-pipelines" },
  { id: "aws-glue", label: "AWS Glue", category: "data-pipelines" },
  { id: "dataflow", label: "Dataflow", category: "data-pipelines" },
  { id: "dataproc", label: "Dataproc", category: "data-pipelines" },
];
