import type { SkillCategory } from "@/data/skills";

type SkillRowProps = {
  skill: SkillCategory;
  isLast: boolean;
};

export function SkillRow({ skill, isLast }: SkillRowProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-2 py-4 min-[620px]:grid-cols-[130px_1fr] min-[620px]:gap-6 ${
        isLast ? "" : "border-b border-border"
      }`}
    >
      <p className="font-mono text-sm text-text-faint">{skill.category}</p>
      <p className="text-text">{skill.values.join(", ")}</p>
    </div>
  );
}
