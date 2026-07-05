import type { Project } from "@/data/projects";
import { externalLinkProps } from "@/lib/links";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const stackLine = project.stack.join(" · ");

  return (
    <article className="project-card rounded-[6px] border bg-bg-raised p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-lg font-semibold text-text">{project.title}</h3>
        <div className="flex items-center gap-4 font-mono text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="link-underline"
              {...externalLinkProps(project.liveUrl)}
            >
              live
            </a>
          )}
          <a
            href={project.githubUrl}
            className="link-underline"
            {...externalLinkProps(project.githubUrl)}
          >
            github
          </a>
        </div>
      </div>
      <p className="mb-5 text-text-muted">{project.tagline}</p>
      <ul className="project-bullets text-text-muted">
        {project.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <p className="mt-6 border-t border-dashed border-border pt-4 font-mono text-sm text-text-faint">
        {"// "}
        {stackLine}
      </p>
    </article>
  );
}
