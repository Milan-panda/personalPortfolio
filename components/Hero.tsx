import { site } from "@/data/site";
import { externalLinkProps } from "@/lib/links";

export function Hero() {
  return (
    <header className="mx-auto w-full max-w-content px-5 pb-24 pt-16">
      <div className="mb-6 flex items-center gap-2.5">
        <span
          className="status-dot inline-block h-2 w-2 rounded-full bg-accent"
          aria-hidden="true"
        />
        <span className="font-mono text-sm text-text-faint">{site.status}</span>
      </div>
      <h1 className="mb-3 text-text">{site.name}</h1>
      <p className="mb-6 font-mono text-sm text-text-muted">{site.role}</p>
      <p className="mb-8 max-w-[640px] text-text-muted">{site.bio}</p>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {site.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="link-underline font-mono text-sm"
              {...externalLinkProps(link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
