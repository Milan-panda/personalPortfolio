export type SiteLink = {
  label: string;
  href: string;
};

export type SiteInfo = {
  name: string;
  role: string;
  bio: string;
  status: string;
  email: string;
  phone: string;
  location: string;
  links: SiteLink[];
  socialLinks: SiteLink[];
};

export const site: SiteInfo = {
  name: "Milan Panda",
  role: "Full Stack Software Engineer",
  bio: "I build and own products end-to-end: React/Next.js frontends, Python backends, and AWS infrastructure. Production experience shipping RAG systems built for low latency and reliability. Currently at Adapts AI.",
  status: "available for new roles",
  email: "milanpanda4425@gmail.com",
  phone: "+91-93156-00657",
  location: "Delhi, India",
  links: [
    { label: "Resume", href: "/resume.pdf" },
    { label: "GitHub", href: "https://github.com/Milan-panda" },
    { label: "LinkedIn", href: "https://linkedin.com/in/milanpanda" },
    { label: "Email", href: "mailto:milanpanda4425@gmail.com" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Milan-panda" },
    { label: "LinkedIn", href: "https://linkedin.com/in/milanpanda" },
  ],
};
