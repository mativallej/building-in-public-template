/**
 * updates.ts — monthly recaps, newest first.
 *
 * The Updates section expands the latest by default and collapses the rest.
 * Highlights are short, specific lines — what actually happened that month.
 */

export interface MonthlyUpdate {
  period: string; // "YYYY-MM"
  title: string;
  highlights: string[];
}

export const updates: MonthlyUpdate[] = [
  {
    period: "2026-07",
    title: "Slow and steady",
    highlights: [
      "Crossed $1,000 in monthly recurring revenue across 20 paying teams.",
      "Shipped weekly digest emails; open rate on the first send was 61%.",
      "Weekly active users up to 312, from 280 the month before.",
      "Said no to a big feature request twice. Both times it was the right call.",
    ],
  },
  {
    period: "2026-06",
    title: "Listening to the people who pay",
    highlights: [
      "Talked to all 20 paying teams. Nobody wanted annual billing; two wanted to pause.",
      "Built pause instead of annual plans. Shipped it in a week.",
      "Rewrote the task editor — typing is finally instant at 500+ tasks.",
    ],
  },
  {
    period: "2026-05",
    title: "Recovering from a bad bet",
    highlights: [
      "First full month on the free tier. Signups tripled versus the paywall weeks.",
      "Revenue dipped ~15% and we expected it. The funnel is healthier.",
      "Added daily off-site backups and a monthly restore drill.",
    ],
  },
];
