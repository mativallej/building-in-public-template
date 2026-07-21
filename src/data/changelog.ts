/**
 * changelog.ts — everything shipped, newest first.
 *
 * `area` is a plain string (not a union) — define your own. The Timeline's
 * filter options derive from these areas by first-appearance order.
 */

export interface ChangelogEntry {
  date: string; // "YYYY-MM-DD" or "YYYY-MM"
  version?: string;
  title: string;
  description: string;
  area: string;
}

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-07",
    title: "Weekly digest emails",
    description:
      "A Monday recap of finished and open tasks, on by default with a one-click opt-out.",
    area: "core",
  },
  {
    date: "2026-06",
    title: "Pause a subscription",
    description:
      "Paying teams can pause billing for up to three months instead of cancelling outright.",
    area: "billing",
  },
  {
    date: "2026-06",
    title: "Keyboard-first task editor",
    description:
      "Create, complete, and move tasks without touching the mouse. Press ? for the full list.",
    area: "editor",
  },
  {
    date: "2026-05",
    version: "v0.4.0",
    title: "Editor rewrite",
    description:
      "Rebuilt around a virtualized list. Typing latency dropped from ~90ms to under 16ms at 500 tasks.",
    area: "editor",
  },
  {
    date: "2026-05",
    title: "Daily off-site backups",
    description:
      "Automated Postgres snapshots to separate storage, with a monthly restore drill.",
    area: "infra",
  },
  {
    date: "2026-04",
    title: "Free tier",
    description:
      "Up to 3 projects and 2 teammates, free forever. No credit card, no trial clock.",
    area: "billing",
  },
  {
    date: "2026-03",
    title: "Removed the setup paywall",
    description:
      "Reverted the $12 guided-setup charge after four weeks. Onboarding is free again.",
    area: "billing",
  },
  {
    date: "2026-02",
    title: "Projects and sections",
    description:
      "Group tasks into projects, and projects into sections. The first real structure in the app.",
    area: "core",
  },
  {
    date: "2026-01",
    title: "Status page",
    description:
      "A public status page fed by the same uptime checks we page ourselves with.",
    area: "infra",
  },
  {
    date: "2025-11",
    version: "v0.1.0",
    title: "Acme Tasks beta",
    description:
      "Create tasks, complete tasks, and share a list with a teammate. The first public build.",
    area: "core",
  },
];
