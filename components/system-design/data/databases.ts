import type { ServiceComponentDef } from "../types";

export const databaseComponents: ServiceComponentDef[] = [
  { id: "database", label: "Database", category: "databases" },
  // Relational
  {
    id: "postgresql",
    label: "PostgreSQL",
    category: "databases",
    subcategory: "relational",
    iconKey: "postgresql",
  },
  { id: "mysql", label: "MySQL", category: "databases", subcategory: "relational", iconKey: "mysql" },
  { id: "mariadb", label: "MariaDB", category: "databases", subcategory: "relational" },
  { id: "sql-server", label: "SQL Server", category: "databases", subcategory: "relational" },
  { id: "oracle", label: "Oracle", category: "databases", subcategory: "relational" },
  { id: "sqlite", label: "SQLite", category: "databases", subcategory: "relational" },
  // Cloud Relational
  { id: "rds", label: "Amazon RDS", category: "databases", subcategory: "cloud-relational", iconKey: "rds" },
  { id: "aurora", label: "Amazon Aurora", category: "databases", subcategory: "cloud-relational" },
  { id: "cloud-sql", label: "Cloud SQL", category: "databases", subcategory: "cloud-relational" },
  { id: "azure-sql", label: "Azure SQL Database", category: "databases", subcategory: "cloud-relational" },
  // Document
  {
    id: "mongodb",
    label: "MongoDB",
    category: "databases",
    subcategory: "document",
    iconKey: "mongodb",
  },
  { id: "couchdb", label: "CouchDB", category: "databases", subcategory: "document" },
  { id: "cosmos-db", label: "Cosmos DB", category: "databases", subcategory: "document" },
  { id: "firestore", label: "Firestore", category: "databases", subcategory: "document" },
  // Key-Value
  { id: "redis", label: "Redis", category: "databases", subcategory: "key-value", iconKey: "redis" },
  {
    id: "dynamodb",
    label: "DynamoDB",
    category: "databases",
    subcategory: "key-value",
    iconKey: "dynamodb",
  },
  { id: "riak", label: "Riak", category: "databases", subcategory: "key-value" },
  { id: "memcached", label: "Memcached", category: "databases", subcategory: "key-value" },
  // Wide Column
  {
    id: "cassandra",
    label: "Cassandra",
    category: "databases",
    subcategory: "wide-column",
    iconKey: "cassandra",
  },
  { id: "hbase", label: "HBase", category: "databases", subcategory: "wide-column" },
  { id: "bigtable", label: "Bigtable", category: "databases", subcategory: "wide-column" },
  { id: "scylladb", label: "ScyllaDB", category: "databases", subcategory: "wide-column" },
  // Graph
  { id: "neo4j", label: "Neo4j", category: "databases", subcategory: "graph" },
  { id: "neptune", label: "Amazon Neptune", category: "databases", subcategory: "graph" },
  { id: "janusgraph", label: "JanusGraph", category: "databases", subcategory: "graph" },
  { id: "arangodb", label: "ArangoDB", category: "databases", subcategory: "graph" },
  // Time Series
  { id: "influxdb", label: "InfluxDB", category: "databases", subcategory: "time-series" },
  { id: "timescaledb", label: "TimescaleDB", category: "databases", subcategory: "time-series" },
  { id: "questdb", label: "QuestDB", category: "databases", subcategory: "time-series" },
  { id: "opentsdb", label: "OpenTSDB", category: "databases", subcategory: "time-series" },
  // Search
  {
    id: "elasticsearch",
    label: "Elasticsearch",
    category: "databases",
    subcategory: "search",
    iconKey: "elasticsearch",
  },
  { id: "opensearch", label: "OpenSearch", category: "databases", subcategory: "search" },
  { id: "solr", label: "Solr", category: "databases", subcategory: "search" },
  { id: "meilisearch", label: "Meilisearch", category: "databases", subcategory: "search" },
  // Vector
  { id: "pinecone", label: "Pinecone", category: "databases", subcategory: "vector" },
  { id: "milvus", label: "Milvus", category: "databases", subcategory: "vector" },
  { id: "weaviate", label: "Weaviate", category: "databases", subcategory: "vector" },
  { id: "qdrant", label: "Qdrant", category: "databases", subcategory: "vector" },
  { id: "chroma", label: "Chroma", category: "databases", subcategory: "vector" },
  { id: "pgvector", label: "pgvector", category: "databases", subcategory: "vector" },
  { id: "faiss", label: "FAISS", category: "databases", subcategory: "vector" },
  // Ledger
  { id: "qldb", label: "QLDB", category: "databases", subcategory: "ledger" },
  { id: "hyperledger", label: "Hyperledger", category: "databases", subcategory: "ledger" },
];
