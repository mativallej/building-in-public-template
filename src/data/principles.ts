/**
 * principles.ts — the manifesto. Renders as a numbered list (01, 02, …), no
 * icons, no cards. Keep it to 3–5 items that you'd actually defend.
 */

export interface Principle {
  title: string;
  description: string;
}

export const principles: Principle[] = [
  {
    title: "Publish the number, especially when it's small",
    description:
      "A metric you've said out loud is harder to lie to yourself about. We put revenue, users, and uptime on this page and update them whether they went up or down.",
  },
  {
    title: "Ship the failures too",
    description:
      "The paywall that flopped and the sync we rolled back are on the record next to the wins. A build log that only shows wins is marketing, not a build log.",
  },
  {
    title: "No unannounced launches, no vanity metrics",
    description:
      "We don't count signups we didn't earn or celebrate downloads that never came back. If a number can't survive being questioned, it doesn't go on the page.",
  },
  {
    title: "Decisions should be defensible in public",
    description:
      "Before we change pricing, cut a feature, or reverse course, we ask whether we'd be comfortable explaining it here. Usually that question is the whole decision.",
  },
];
