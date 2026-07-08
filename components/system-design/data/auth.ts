import type { ServiceComponentDef } from "../types";

export const authComponents: ServiceComponentDef[] = [
  { id: "oauth", label: "OAuth", category: "auth" },
  { id: "oauth2", label: "OAuth2", category: "auth" },
  { id: "oidc", label: "OpenID Connect (OIDC)", category: "auth" },
  { id: "saml", label: "SAML", category: "auth" },
  { id: "jwt", label: "JWT", category: "auth" },
  { id: "session-store", label: "Session Store", category: "auth" },
  { id: "idp", label: "Identity Provider (IdP)", category: "auth" },
  { id: "mfa", label: "MFA", category: "auth" },
  { id: "ldap", label: "LDAP", category: "auth" },
  { id: "active-directory", label: "Active Directory", category: "auth" },
  { id: "api-keys", label: "API Keys", category: "auth" },
  { id: "auth-service", label: "Auth Service", category: "auth" },
  { id: "keycloak", label: "Keycloak", category: "auth", subcategory: "providers" },
  { id: "auth0", label: "Auth0", category: "auth", subcategory: "providers" },
  { id: "okta", label: "Okta", category: "auth", subcategory: "providers" },
  { id: "aws-cognito", label: "AWS Cognito", category: "auth", subcategory: "providers" },
];
