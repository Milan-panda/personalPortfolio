import type { ServiceComponentDef } from "../types";

export const streamProcessingComponents: ServiceComponentDef[] = [
  { id: "kafka-streams", label: "Kafka Streams", category: "stream-processing", iconKey: "kafka" },
  { id: "apache-flink", label: "Apache Flink", category: "stream-processing" },
  { id: "spark-streaming", label: "Spark Streaming", category: "stream-processing" },
  { id: "apache-storm", label: "Apache Storm", category: "stream-processing" },
  { id: "apache-beam", label: "Apache Beam", category: "stream-processing" },
  { id: "kinesis-analytics", label: "Kinesis Analytics", category: "stream-processing" },
];
