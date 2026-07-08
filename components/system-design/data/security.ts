import type { ServiceComponentDef } from "../types";

export const securityComponents: ServiceComponentDef[] = [
  { id: "iam", label: "IAM", category: "security" },
  { id: "kms", label: "KMS", category: "security" },
  { id: "hsm", label: "HSM", category: "security" },
  { id: "certificate-manager", label: "Certificate Manager", category: "security" },
  { id: "ids", label: "IDS", category: "security" },
  { id: "ips", label: "IPS", category: "security" },
  { id: "siem", label: "SIEM", category: "security" },
  { id: "dlp", label: "DLP", category: "security" },
];
