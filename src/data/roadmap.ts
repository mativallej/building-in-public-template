/**
 * roadmap.ts — qualitative horizons, no committed dates.
 *
 * Exactly three columns: Now / Next / Someday. A column may be empty; the page
 * renders a single honest line instead of a placeholder card.
 */

export interface RoadmapItem {
  title: string;
  description: string;
}

export interface RoadmapColumn {
  horizon: "Now" | "Next" | "Someday";
  note: string;
  items: RoadmapItem[];
}

export const roadmap: [RoadmapColumn, RoadmapColumn, RoadmapColumn] = [
  {
    horizon: "Now",
    note: "In progress this cycle.",
    items: [
      {
        title: "Recurring tasks",
        description:
          "Daily, weekly, and custom repeats — the single most-requested thing from paying teams.",
      },
      {
        title: "CSV import & export",
        description:
          "Get your data in from a spreadsheet, and out whenever you want. No lock-in.",
      },
    ],
  },
  {
    horizon: "Next",
    note: "Likely the cycle after this one.",
    items: [
      {
        title: "Shared team views",
        description:
          "Saved filters a whole team can open — 'everything due this week', 'blocked', and so on.",
      },
    ],
  },
  {
    horizon: "Someday",
    note: "Real, but not soon. Here so we don't forget.",
    items: [
      {
        title: "A public API",
        description:
          "Read and write tasks from your own scripts. Waiting until the data model stops moving.",
      },
    ],
  },
];
