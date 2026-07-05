import type { Experience } from "@/data/experience";
import { externalLinkProps } from "@/lib/links";

type ExperienceItemProps = {
  item: Experience;
};

export function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className="grid grid-cols-1 gap-2 min-[620px]:grid-cols-[130px_1fr] min-[620px]:gap-6">
      <p className="font-mono text-sm text-text-faint">{item.period}</p>
      <div>
        <h3 className="mb-4 text-text">
          {item.companyUrl ? (
            <a
              href={item.companyUrl}
              className="link-underline"
              {...externalLinkProps(item.companyUrl)}
            >
              {item.company}
            </a>
          ) : (
            item.company
          )}{" "}
          · {item.role} · {item.location}
        </h3>
        <ul className="project-bullets text-text-muted">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
