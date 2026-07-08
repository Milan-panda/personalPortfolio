import type { ServiceComponentDef } from "../types";

export const storageComponents: ServiceComponentDef[] = [
  { id: "s3", label: "Amazon S3", category: "storage", subcategory: "object", iconKey: "s3" },
  { id: "azure-blob-storage", label: "Azure Blob Storage", category: "storage", subcategory: "object" },
  { id: "google-cloud-storage", label: "Google Cloud Storage", category: "storage", subcategory: "object" },
  { id: "minio", label: "MinIO", category: "storage", subcategory: "object" },
  { id: "ebs", label: "Amazon EBS", category: "storage", subcategory: "block" },
  { id: "azure-managed-disk", label: "Azure Managed Disk", category: "storage", subcategory: "block" },
  { id: "gcp-persistent-disk", label: "GCP Persistent Disk", category: "storage", subcategory: "block" },
  { id: "efs", label: "Amazon EFS", category: "storage", subcategory: "file" },
  { id: "azure-files", label: "Azure Files", category: "storage", subcategory: "file" },
  { id: "filestore", label: "Filestore", category: "storage", subcategory: "file" },
  { id: "nfs", label: "NFS", category: "storage", subcategory: "file" },
  { id: "glacier", label: "Glacier", category: "storage", subcategory: "archive" },
  { id: "coldline", label: "Coldline", category: "storage", subcategory: "archive" },
  { id: "archive-storage", label: "Archive Storage", category: "storage", subcategory: "archive" },
];
