import { siteConfig } from "@config";
import { updates } from "@/data/updates";
import { formatDate } from "@/lib/dates";

/**
 * Monthly recaps as an inline section (NOT a floating widget). Latest is open
 * by default, the rest collapsed. Zero client JS — native <details>.
 */
export function Updates() {
  return (
    <div className="divide-y divide-border border-t border-border">
      {updates.map((update, index) => (
        <details key={update.period} open={index === 0} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center gap-3">
            <span
              aria-hidden
              className="text-fg-faint transition-transform group-open:rotate-90"
            >
              ▸
            </span>
            <span className="font-mono text-sm tabular-nums text-fg-faint">
              {formatDate(update.period, siteConfig.locale)}
            </span>
            <span className="font-medium">{update.title}</span>
            <span className="ml-auto font-mono text-xs text-fg-faint">
              +{update.highlights.length}
            </span>
          </summary>
          <ul className="mt-3 space-y-1.5 pl-7">
            {update.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-2 text-fg-muted">
                <span aria-hidden className="text-fg-faint">
                  →
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
