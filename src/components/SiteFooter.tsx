import { siteConfig } from "@config";
import { SocialIcon } from "@/components/SocialIcons";

/** The template's home and author — used by the (removable) attribution line. */
const TEMPLATE_REPO =
  "https://github.com/matiasvallejosdev/building-in-public-template";
const TEMPLATE_AUTHOR = "https://matiasvallejos.com";

/** Socials + license note + the default-on, removable attribution credit. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 px-6 py-10 text-sm text-fg-muted md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {siteConfig.socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} on ${s.name}`}
              className="transition-colors hover:text-fg"
            >
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>

        <div className="space-y-1 md:text-right">
          {siteConfig.attribution ? (
            <p>
              Built with the{" "}
              <a
                href={TEMPLATE_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Building in Public Template
              </a>{" "}
              by{" "}
              <a
                href={TEMPLATE_AUTHOR}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Matías Vallejos
              </a>
              .
            </p>
          ) : null}
          <p className="text-fg-faint">
            MIT licensed. © {siteConfig.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
