import type { ServiceComponentDef } from "../types";

export const secretsComponents: ServiceComponentDef[] = [
  { id: "vault", label: "HashiCorp Vault", category: "secrets", iconKey: "vault" },
  { id: "aws-secrets-manager", label: "AWS Secrets Manager", category: "secrets" },
  { id: "azure-key-vault", label: "Azure Key Vault", category: "secrets" },
  { id: "google-secret-manager", label: "Google Secret Manager", category: "secrets" },
  { id: "kubernetes-secrets", label: "Kubernetes Secrets", category: "secrets" },
];
