/**
 * metrics.ts — the public numbers, rendered in MetricsGrid.
 *
 * `key` is snake_case and rendered in mono (it's a machine-ish label).
 * `tone: "accent"` colors the value with the site accent. Two keys here
 * (mrr, weekly_active_users) are referenced by heroFacts in site.config.ts.
 *
 * v1 is a static file. Wiring these to a live source is documented as the v2
 * path in the README.
 */

export interface Metric {
  key: string; // snake_case
  value: string;
  tone?: "accent";
}

export const metrics: Metric[] = [
  { key: "mrr", value: "$1,000", tone: "accent" },
  { key: "weekly_active_users", value: "312", tone: "accent" },
  { key: "paying_teams", value: "20" },
  { key: "free_signups", value: "1,480" },
  { key: "tasks_created", value: "1,234" },
  { key: "avg_tasks_per_active_user", value: "4.0" },
  { key: "uptime_90d", value: "99.2%" },
  { key: "open_issues", value: "37" },
];

/** Fast lookup for heroFacts resolving `metricKey` against this file. */
export const metricsByKey: Record<string, Metric> = Object.fromEntries(
  metrics.map((metric) => [metric.key, metric]),
);
