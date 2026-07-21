import { siteConfig } from "@config";
import { metrics } from "@/data/metrics";
import { cn } from "@/lib/cn";

/**
 * The public numbers. A static, responsive ruled grid — deliberately NOT
 * draggable and NOT sticky notes. Values step down a size past 9 characters so
 * "1,234" and "$1,000" both sit comfortably.
 */
export function MetricsGrid() {
  return (
    <div>
      <p className="font-mono text-sm text-fg-faint">
        <span aria-hidden>$</span> {siteConfig.name} stats --live
      </p>
      <div className="mt-4 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="border-b border-r border-border p-4 md:p-5"
          >
            <div
              className={cn(
                "font-semibold tabular-nums",
                metric.value.length > 9 ? "text-2xl" : "text-3xl",
                metric.tone === "accent" && "text-accent",
              )}
            >
              {metric.value}
            </div>
            <div className="mt-1 font-mono text-xs text-fg-muted">
              {metric.key}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
