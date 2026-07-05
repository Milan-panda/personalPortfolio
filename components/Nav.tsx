const navLinks = [
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export function Nav() {
  return (
    <nav className="mx-auto w-full max-w-content px-5 pt-8">
      <div className="flex items-center justify-between gap-6">
        <a
          href="#"
          className="font-mono text-sm text-text no-underline"
          aria-label="Home"
        >
          <span className="text-accent">~$</span> milan.panda
        </a>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline font-mono text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
