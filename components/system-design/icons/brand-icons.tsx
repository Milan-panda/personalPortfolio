import type { ReactElement } from "react";
import type { IconType } from "react-icons";
import {
  SiApacheairflow,
  SiApachecassandra,
  SiApachekafka,
  SiArgo,
  SiAuth0,
  SiClickhouse,
  SiConsul,
  SiDiscord,
  SiDocker,
  SiElasticsearch,
  SiFirebase,
  SiGithubactions,
  SiGooglebigquery,
  SiGooglecloud,
  SiGrafana,
  SiGraphql,
  SiHashicorp,
  SiHuggingface,
  SiInfluxdb,
  SiIstio,
  SiJenkins,
  SiKubernetes,
  SiMinio,
  SiMongodb,
  SiMysql,
  SiNeo4J,
  SiNginx,
  SiOkta,
  SiPostgresql,
  SiPrometheus,
  SiRabbitmq,
  SiRedis,
  SiSnowflake,
  SiTerraform,
} from "react-icons/si";
import type { IconProps } from "./types";

function brand(Icon: IconType) {
  return function BrandIconComponent({ className }: IconProps): ReactElement {
    return <Icon className={className} aria-hidden />;
  };
}

/** Brand logos from Simple Icons — inherit currentColor from the palette. */
export const brandIcons: Record<string, (props: IconProps) => ReactElement> = {
  // Databases
  postgresql: brand(SiPostgresql),
  mysql: brand(SiMysql),
  mongodb: brand(SiMongodb),
  redis: brand(SiRedis),
  elasticsearch: brand(SiElasticsearch),
  cassandra: brand(SiApachecassandra),
  influxdb: brand(SiInfluxdb),
  neo4j: brand(SiNeo4J),
  clickhouse: brand(SiClickhouse),
  firestore: brand(SiFirebase),
  // Containers & orchestration
  docker: brand(SiDocker),
  kubernetes: brand(SiKubernetes),
  // Messaging
  kafka: brand(SiApachekafka),
  rabbitmq: brand(SiRabbitmq),
  // Networking
  nginx: brand(SiNginx),
  // API
  graphql: brand(SiGraphql),
  // CI/CD
  jenkins: brand(SiJenkins),
  "github-actions": brand(SiGithubactions),
  argocd: brand(SiArgo),
  // Monitoring
  prometheus: brand(SiPrometheus),
  grafana: brand(SiGrafana),
  // Secrets & mesh
  vault: brand(SiHashicorp),
  istio: brand(SiIstio),
  consul: brand(SiConsul),
  keycloak: brand(SiHashicorp),
  // Data
  airflow: brand(SiApacheairflow),
  bigquery: brand(SiGooglebigquery),
  snowflake: brand(SiSnowflake),
  // AI
  "hugging-face": brand(SiHuggingface),
  // Notifications
  discord: brand(SiDiscord),
  // Auth providers
  auth0: brand(SiAuth0),
  okta: brand(SiOkta),
  // Cloud & storage
  "google-cloud-storage": brand(SiGooglecloud),
  "cloud-sql": brand(SiGooglecloud),
  gcp: brand(SiGooglecloud),
  minio: brand(SiMinio),
  terraform: brand(SiTerraform),
};
