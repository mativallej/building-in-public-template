/**
 * devlog.ts — the decisions log. The narrative spine of the page.
 *
 * Order: NEWEST FIRST in the array. The Terminal re-sorts to oldest-first for
 * display. `hasArticle: true` links to /{slug} and REQUIRES a matching file at
 * content/devlog/{slug}.md. `failed: true` renders ✗ instead of ✓ — publish the
 * things that didn't work. `hidden: true` removes an entry from the render and
 * 404s its article while leaving the data (and .md) in place.
 */

export interface DevlogAuthor {
  name: string;
  role: string;
}

export interface DevlogEntry {
  slug: string;
  date: string; // "YYYY-MM-DD" or "YYYY-MM"
  version?: string;
  title: string;
  excerpt: string;
  author: DevlogAuthor;
  tags: string[];
  hasArticle?: boolean;
  failed?: boolean;
  hidden?: boolean;
}

const alex: DevlogAuthor = { name: "Alex Founder", role: "Product & code" };
const sam: DevlogAuthor = { name: "Sam Builder", role: "Code & ops" };

export const devlogEntries: DevlogEntry[] = [
  {
    slug: "weekly-digest-emails",
    date: "2026-07-10",
    title: "Weekly digest emails, on by default",
    excerpt:
      "A Monday email with what your team finished last week and what's still open. On by default because the people who need it most never find the setting.",
    author: sam,
    tags: ["product", "retention", "email"],
  },
  {
    slug: "what-20-teams-taught-us-about-billing",
    date: "2026-06-24",
    title: "What 20 paying teams taught us about billing",
    excerpt:
      "Every paying team we have is between 3 and 10 people. Nobody asked for annual plans; two asked for a way to pause. So we built pause, not annual.",
    author: alex,
    tags: ["billing", "customers"],
  },
  {
    slug: "rewriting-the-editor-for-speed",
    date: "2026-05-18",
    title: "Rewrote the task editor for speed",
    excerpt:
      "The editor did a full re-render on every keystroke. It was fine at 20 tasks and miserable at 500. A weekend of work took typing latency from ~90ms to under 16ms.",
    author: sam,
    tags: ["engineering", "performance"],
  },
  {
    slug: "pivoting-to-a-free-tier",
    date: "2026-04-02",
    version: "v0.4.0",
    title: "Pivoting to a free tier",
    excerpt:
      "After the paywall experiment failed we did the opposite: a genuinely useful free tier, up to 3 projects and 2 teammates. Revenue dipped, signups tripled.",
    author: alex,
    tags: ["pricing", "product"],
  },
  {
    slug: "the-onboarding-experiment-that-failed",
    date: "2026-03-05",
    title: "The onboarding experiment that failed",
    excerpt:
      "We put a $12 paywall in front of signup to filter for serious teams. It filtered out almost everyone. Killed after four weeks. The full post-mortem, with numbers.",
    author: alex,
    tags: ["growth", "pricing", "experiment"],
    hasArticle: true,
    failed: true,
  },
  {
    slug: "realtime-sync-rolled-back",
    date: "2026-01-20",
    title: "We shipped realtime sync, then rolled it back",
    excerpt:
      "Live cursors and instant updates demoed beautifully and fell over under real load. We reverted after two days rather than ship something that dropped edits.",
    author: sam,
    tags: ["engineering", "sync"],
    failed: true,
  },
  {
    slug: "why-we-build-in-public",
    date: "2025-12-10",
    version: "v0.2.0",
    title: "Why we build Acme Tasks in public",
    excerpt:
      "A public number is harder to lie to than a private one. The honest reasons a two-person team decided to publish its decisions, mistakes, and metrics.",
    author: alex,
    tags: ["meta", "transparency"],
    hasArticle: true,
  },
  {
    slug: "acme-tasks-beta-is-live",
    date: "2025-11-15",
    version: "v0.1.0",
    title: "Acme Tasks beta is live",
    excerpt:
      "A task manager for small teams, in the hands of the first 40 people. It does three things well and nothing else yet. That's on purpose.",
    author: alex,
    tags: ["launch", "beta"],
  },
];

/** Entries that actually render (hidden ones stay in data, out of the page). */
export const visibleDevlogEntries: DevlogEntry[] = devlogEntries.filter(
  (entry) => !entry.hidden,
);

/** Slugs whose article route should 404 and be excluded from static params. */
export const hiddenSlugs: Set<string> = new Set(
  devlogEntries.filter((entry) => entry.hidden).map((entry) => entry.slug),
);
