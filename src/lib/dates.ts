/**
 * Date formatting for the two precisions used across the template:
 *   - "YYYY-MM"     → month precision, e.g. "Jun 2026"
 *   - "YYYY-MM-DD"  → full date, locale short, e.g. "Jun 3, 2026"
 *
 * We always append a local midnight ("T00:00:00") before parsing so the
 * displayed day never drifts backwards across the UTC boundary.
 */

const MONTH_ONLY = /^\d{4}-\d{2}$/;
const FULL_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isMonthPrecision(value: string): boolean {
  return MONTH_ONLY.test(value);
}

export function formatDate(value: string, locale = "en-US"): string {
  if (MONTH_ONLY.test(value)) {
    const d = new Date(`${value}-01T00:00:00`);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
    }).format(d);
  }

  if (FULL_DATE.test(value)) {
    const d = new Date(`${value}T00:00:00`);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  }

  // Unknown shape — render as authored rather than guessing.
  return value;
}
