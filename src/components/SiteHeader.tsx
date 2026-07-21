import { siteConfig } from "@config";
import { SocialIcon } from "@/components/SocialIcons";

/** A quiet sticky bar: text logo on the left, GitHub + primary social right. */
export function SiteHeader() {
  const github = siteConfig.socials.find((s) => s.name === "github");
  const primary = siteConfig.socials.find((s) => s.name !== "github");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-6">
        <a href="#top" className="font-semibold tracking-tight">
          {siteConfig.name}
        </a>
        <nav className="flex items-center gap-4 text-fg-muted">
          {github ? (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} on GitHub`}
              className="transition-colors hover:text-fg"
            >
              <SocialIcon name="github" />
            </a>
          ) : null}
          {primary ? (
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} on ${primary.name}`}
              className="transition-colors hover:text-fg"
            >
              <SocialIcon name={primary.name} />
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
