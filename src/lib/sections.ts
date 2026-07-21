/**
 * The page's section registry. A single source of truth that feeds both the
 * anchor structure of page.tsx and the "Sections" group in the command palette.
 * Keep `id` in sync with the anchors rendered on the page.
 */

export interface Section {
  id: string;
  label: string;
  description: string;
}

export const SECTIONS: Section[] = [
  {
    id: "principles",
    label: "Why we build in public",
    description: "The manifesto and the rules we hold ourselves to.",
  },
  {
    id: "method",
    label: "How we work",
    description: "The loop and the frameworks behind the product.",
  },
  {
    id: "devlog",
    label: "Dev log",
    description: "Decisions, shipped and reversed, newest to oldest.",
  },
  {
    id: "changelog",
    label: "Changelog",
    description: "Everything we've shipped, by month and area.",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    description: "Now, Next, and Someday — no committed dates.",
  },
  {
    id: "business",
    label: "Business model",
    description: "How the product makes money, stated plainly.",
  },
  {
    id: "numbers",
    label: "The numbers",
    description: "The public metrics we update every month.",
  },
  {
    id: "updates",
    label: "Monthly updates",
    description: "Short recaps of what actually happened.",
  },
  {
    id: "team",
    label: "The team",
    description: "The people building it.",
  },
  {
    id: "follow",
    label: "Follow the build",
    description: "Where to keep up with what we ship next.",
  },
];
