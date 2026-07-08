import type { ServiceComponentDef } from "../types";

export const cicdComponents: ServiceComponentDef[] = [
  { id: "jenkins", label: "Jenkins", category: "cicd", iconKey: "jenkins" },
  { id: "github-actions", label: "GitHub Actions", category: "cicd", iconKey: "github-actions" },
  { id: "gitlab-cicd", label: "GitLab CI/CD", category: "cicd" },
  { id: "circleci", label: "CircleCI", category: "cicd" },
  { id: "argocd", label: "ArgoCD", category: "cicd", iconKey: "argocd" },
  { id: "fluxcd", label: "FluxCD", category: "cicd" },
  { id: "azure-devops", label: "Azure DevOps", category: "cicd" },
  { id: "aws-codepipeline", label: "AWS CodePipeline", category: "cicd" },
];
