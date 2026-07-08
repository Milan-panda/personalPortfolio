export type Tool = {
  title: string;
  tagline: string;
  description: string;
  href: string;
  status: "live" | "soon";
  stack: string[];
};

export const tools: Tool[] = [
  {
    title: "Blueprint",
    tagline:
      "Sketch system architectures on a drag-and-drop canvas — components, flows, and annotations in one place.",
    description:
      "Drag AWS and generic components, connect flows, and annotate with pen, text, and boxes. Export diagrams as PNG.",
    href: "/tools/system-design",
    status: "live",
    stack: ["React Flow", "Next.js", "Canvas", "localStorage"],
  },
];
