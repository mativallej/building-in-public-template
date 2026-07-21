/**
 * business.ts — how the product makes money, stated plainly.
 *
 * `businessModel` renders as a definition list. `openMetrics` is the short list
 * of numbers we commit to publishing; a `null` value renders as "Soon".
 */

export interface BusinessRow {
  label: string;
  value: string;
  detail: string;
}

export const businessModel: BusinessRow[] = [
  {
    label: "Free tier",
    value: "$0",
    detail:
      "Up to 3 projects and 2 teammates, forever. Where most people start, and where many happily stay.",
  },
  {
    label: "Team plan",
    value: "$8",
    detail:
      "Per user, per month. Unlimited projects, shared views, and email support from the two of us.",
  },
  {
    label: "Paying teams",
    value: "20",
    detail:
      "Teams of 3–10 people. No enterprise tier, no sales calls, no per-seat minimums.",
  },
  {
    label: "Monthly costs",
    value: "~$180",
    detail:
      "One small server, a managed Postgres, and transactional email. We're profitable on paper.",
  },
];

export interface OpenMetric {
  label: string;
  value: string | null; // null renders "Soon"
}

export const openMetrics: OpenMetric[] = [
  { label: "Monthly recurring revenue", value: "$1,000" },
  { label: "Gross margin", value: "82%" },
  { label: "Net revenue retention", value: null },
];
