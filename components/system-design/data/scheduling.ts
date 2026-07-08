import type { ServiceComponentDef } from "../types";

export const schedulingComponents: ServiceComponentDef[] = [
  { id: "cron", label: "Cron", category: "scheduling" },
  { id: "quartz-scheduler", label: "Quartz Scheduler", category: "scheduling" },
  { id: "kubernetes-cronjob", label: "Kubernetes CronJob", category: "scheduling" },
  { id: "cloud-scheduler", label: "Cloud Scheduler", category: "scheduling" },
  { id: "airflow-scheduler", label: "Airflow Scheduler", category: "scheduling" },
];
