import { site } from "@/data/site";
import { SectionLabel } from "@/components/SectionLabel";
import { externalLinkProps } from "@/lib/links";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-content border-t border-border px-5 pb-16 pt-24"
    >
      <SectionLabel number="04" text="contact" />
      <h2 className="sr-only">Contact</h2>
      <p className="mb-6 text-lg text-text">
        Let&apos;s talk:{" "}
        <a href={`mailto:${site.email}`} className="link-underline">
          {site.email}
        </a>
        {" · "}
        <a href={`tel:${site.phone.replace(/-/g, "")}`} className="link-underline">
          {site.phone}
        </a>
      </p>
      <ul className="mb-12 flex flex-wrap items-center gap-x-5 gap-y-2">
        {site.socialLinks.map((link) => (
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
      <p className="font-mono text-sm text-text-faint">
        {site.location}
      </p>
    </footer>
  );
}
