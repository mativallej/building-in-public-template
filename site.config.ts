/**
 * site.config.ts — THE single personalization point.
 *
 * Everything a founder needs to make this page their own lives here plus the
 * files in `src/data/` and `content/devlog/`. No components need editing.
 *
 * The values below describe a fictional product, "Acme Tasks", so the template
 * renders as a complete, coherent example out of the box. Replace them with
 * your own (or run the `bip-setup` Claude Code skill, which does it for you).
 */

export interface SiteConfig {
  /** Product name, e.g. "Acme Tasks". Used as the text logo and metadata title. */
  name: string;
  /** Canonical URL (no trailing slash), e.g. "https://acme.example.com". */
  url: string;
  /** Hero H1, e.g. "We build Acme Tasks in public." */
  tagline: string;
  /** Hero paragraph under the H1. */
  subtitle: string;
  /** <meta name="description"> value. */
  description: string;
  /** BCP-47 locale, e.g. "en-US" — drives date formatting. */
  locale: string;
  /** Hex color injected as --bip-accent (links, focus, active filters, solid button). */
  accent: string;
  /** Contact address for the quiet feedback line. */
  email: string;
  /** Current public version, e.g. "v0.4.0". */
  currentVersion: string;
  /** Facts shown in the hero row. `metricKey` pulls the live value from metrics.ts. */
  heroFacts: { value: string; label: string; metricKey?: string }[];
  /** Social links; `name` selects the inline SVG icon. */
  socials: {
    name: "x" | "github" | "linkedin" | "instagram";
    handle: string;
    href: string;
  }[];
  /** Default-on footer credit + repo link (MIT, removable). */
  attribution: boolean;
  terminal: {
    enabled: boolean;
    /** Prompt shown before the caret, e.g. "guest@acme.dev". */
    prompt: string;
    /** Custom commands: name → the lines printed when it runs. */
    commands: Record<string, string[]>;
  };
}

export const siteConfig: SiteConfig = {
  name: "Acme Tasks",
  url: "https://acme.example.com",
  tagline: "We build Acme Tasks in public.",
  subtitle:
    "A small task manager for small teams — and an open notebook of every decision, number, and mistake it took to build it. No launch hype, no vanity metrics, just the work.",
  description:
    "Acme Tasks, built in public. The dev log, changelog, roadmap, business model, and live metrics behind a small task manager for small teams.",
  locale: "en-US",
  accent: "#2563eb",
  email: "hello@acme.example.com",
  currentVersion: "v0.4.0",
  heroFacts: [
    { value: "v0.4.0", label: "current version" },
    { metricKey: "mrr", value: "$1,000", label: "monthly recurring revenue" },
    {
      metricKey: "weekly_active_users",
      value: "312",
      label: "weekly active users",
    },
  ],
  socials: [
    { name: "x", handle: "@acmetasks", href: "https://x.com/acmetasks" },
    {
      name: "github",
      handle: "acmetasks",
      href: "https://github.com/acmetasks",
    },
    {
      name: "linkedin",
      handle: "acme-tasks",
      href: "https://www.linkedin.com/company/acme-tasks",
    },
    {
      name: "instagram",
      handle: "@acmetasks",
      href: "https://instagram.com/acmetasks",
    },
  ],
  attribution: true,
  terminal: {
    enabled: true,
    prompt: "guest@acme.dev",
    commands: {
      stack: [
        "next.js · typescript · postgres",
        "hosted on a single small box, deployed from main",
      ],
      team: [
        "alex founder  — product & code",
        "sam builder   — code & ops",
        "that's the whole company.",
      ],
      mrr: [
        "$1,000 mrr across 20 paying teams.",
        "free tier is where most people live. that's fine.",
      ],
      why: [
        "because a public number is harder to lie to than a private one.",
        "read /#principles for the long version.",
      ],
    },
  },
};

export default siteConfig;
