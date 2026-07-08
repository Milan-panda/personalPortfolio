import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SectionLabel } from "@/components/SectionLabel";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolCard } from "@/components/ToolCard";
import { ExperienceItem } from "@/components/ExperienceItem";
import { SkillRow } from "@/components/SkillRow";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";
import { tools } from "@/data/tools";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section
          id="work"
          className="mx-auto w-full max-w-content border-t border-border px-5 pt-24"
        >
          <SectionLabel number="01" text="selected-work" />
          <h2 className="sr-only">Selected Work</h2>
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section
          id="lab"
          className="mx-auto w-full max-w-content border-t border-border px-5 pt-24"
        >
          <SectionLabel number="02" text="lab" />
          <h2 className="sr-only">Lab</h2>
          <p className="mb-8 max-w-prose text-text-muted">
            Interactive tools and frontend experiments. Open one and start building.
          </p>
          <div className="flex flex-col gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto w-full max-w-content border-t border-border px-5 pt-24"
        >
          <SectionLabel number="03" text="experience" />
          <h2 className="sr-only">Experience</h2>
          <div className="flex flex-col gap-10">
            {experience.map((item) => (
              <ExperienceItem key={item.company} item={item} />
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto w-full max-w-content border-t border-border px-5 pt-24"
        >
          <SectionLabel number="04" text="skills" />
          <h2 className="sr-only">Skills</h2>
          <div>
            {skills.map((skill, index) => (
              <SkillRow
                key={skill.category}
                skill={skill}
                isLast={index === skills.length - 1}
              />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
