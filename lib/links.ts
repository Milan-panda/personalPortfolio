export function externalLinkProps(href: string) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.endsWith(".pdf")
  ) {
    return { target: "_blank" as const, rel: "noopener noreferrer" };
  }

  return {};
}
