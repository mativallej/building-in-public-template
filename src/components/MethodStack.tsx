"use client";

import { useMemo, useState } from "react";
import { methods } from "@/data/methods";
import { cn } from "@/lib/cn";

const ALL = "all";
const COLLAPSED_COUNT = 5;

/**
 * MethodStack — the frameworks and methods we use, as a filterable, flat list.
 *
 * Plain-system doctrine: no cards, no fills, no shadows. Emphasis comes from the
 * accent color and weight only. Pills filter by category (derived from the data
 * in first-appearance order); the "all" view collapses to the first five rows.
 */
export function MethodStack() {
  const [active, setActive] = useState<string>(ALL);
  const [expanded, setExpanded] = useState(false);

  // Categories deduped in data order (first appearance).
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const method of methods) {
      if (!seen.has(method.category)) {
        seen.add(method.category);
        ordered.push(method.category);
      }
    }
    return ordered;
  }, []);

  const filters = useMemo(() => [ALL, ...categories], [categories]);

  const matches = useMemo(
    () =>
      active === ALL
        ? methods
        : methods.filter((method) => method.category === active),
    [active],
  );

  // "all" collapses to the first five; a specific category shows every match.
  const collapsible = active === ALL && matches.length > COLLAPSED_COUNT;
  const visible =
    collapsible && !expanded ? matches.slice(0, COLLAPSED_COUNT) : matches;
  const remaining = matches.length - COLLAPSED_COUNT;

  const selectFilter = (filter: string) => {
    setActive(filter);
    setExpanded(false);
  };

  return (
    <div>
      <div
        role="group"
        aria-label="Filter methods by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectFilter(filter)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                isActive
                  ? "border-accent text-accent"
                  : "border-border text-fg-muted hover:text-fg",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-8 divide-y divide-border border-t border-border">
        {visible.map((method) => (
          <div
            key={method.name}
            className="grid gap-1 py-4 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-6"
          >
            <div>
              <p className="font-medium text-fg">{method.name}</p>
              <p className="font-mono text-xs text-fg-faint">{method.source}</p>
            </div>
            <p className="text-sm text-fg-muted">{method.use}</p>
          </div>
        ))}
      </div>

      {collapsible ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 text-sm text-accent transition-colors hover:underline"
        >
          {expanded ? "Show less" : `Show more (${remaining})`}
        </button>
      ) : null}
    </div>
  );
}
