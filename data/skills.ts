export type SkillCategory = {
  category: string;
  values: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    values: ["Python", "TypeScript", "JavaScript"],
  },
  {
    category: "Frontend",
    values: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend & Infra",
    values: [
      "REST APIs",
      "Serverless (Lambda, API Gateway)",
      "AWS CDK",
      "Docker",
      "Distributed Systems",
    ],
  },
  {
    category: "Data",
    values: ["PostgreSQL", "DynamoDB", "MongoDB"],
  },
  {
    category: "AI Systems",
    values: ["RAG", "LangChain", "OpenAI SDK", "Claude SDK", "AWS Bedrock"],
  },
];
