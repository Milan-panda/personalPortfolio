import Link from "next/link";
import type { Tool } from "@/data/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  const stackLine = tool.stack.join(" · ");

  return (
    <Link
      href={tool.href}
      className="project-card block rounded-[6px] border bg-bg-raised p-6 no-underline"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-lg font-semibold text-text">{tool.title}</h3>
        <span className="font-mono text-sm text-accent">{tool.status}</span>
      </div>
      <p className="mb-5 text-text-muted">{tool.tagline}</p>
      <p className="font-mono text-sm text-accent">open tool →</p>
      <p className="mt-6 border-t border-dashed border-border pt-4 font-mono text-sm text-text-faint">
        {"// "}
        {stackLine}
      </p>
    </Link>
  );
}
