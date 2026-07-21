"use client";

import { useMemo, useState } from "react";
import { changelog } from "@/data/changelog";
import { formatDate } from "@/lib/dates";
import { siteConfig } from "@config";
import { cn } from "@/lib/cn";

const ALL = "All";
const INITIAL_COUNT = 6;

/**
 * Timeline — the changelog, newest-first, on a left rail.
 *
 * A native <select> is decorated to read like a conventional-commit
 * "feat( … ):" scope. Under "All" the list collapses to the first six rows
 * with a Show more / Show less toggle; picking a specific area shows every
 * match and resets the collapse.
 */
export function Timeline() {
  const [area, setArea] = useState<string>(ALL);
  const [expanded, setExpanded] = useState(false);

  // Areas deduped in first-appearance (data) order, prefixed with "All".
  const areas = useMemo(() => {
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const entry of changelog) {
      if (!seen.has(entry.area)) {
        seen.add(entry.area);
        unique.push(entry.area);
      }
    }
    return [ALL, ...unique];
  }, []);

  const filtered = useMemo(
    () =>
      area === ALL
        ? changelog
        : changelog.filter((entry) => entry.area === area),
    [area],
  );

  const isAll = area === ALL;
  const canCollapse = isAll && filtered.length > INITIAL_COUNT;
  const visible =
    isAll && !expanded ? filtered.slice(0, INITIAL_COUNT) : filtered;
  const remaining = filtered.length - INITIAL_COUNT;

  function handleAreaChange(next: string) {
    setArea(next);
    // Specific area shows all matches; either way, reset the collapse.
    setExpanded(false);
  }

  return (
    <div>
      {/* Filter — decorated to read like a conventional-commit scope. */}
      <div className="mb-8 font-mono text-sm">
        <span aria-hidden className="text-fg-faint">
          feat(
        </span>
        <select
          aria-label="Filter changelog by area"
          value={area}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="bg-transparent font-mono text-accent outline-none transition-colors"
        >
          {areas.map((option) => (
            <option key={option} value={option}>
              {option === ALL ? "all" : option}
            </option>
          ))}
        </select>
        <span aria-hidden className="text-fg-faint">
          ):
        </span>
      </div>

      {/* Rows on a left rail. */}
      <ol className="border-l-2 border-border">
        {visible.map((entry, i) => (
          <li key={`${entry.date}-${entry.title}-${i}`} className="relative pl-6 pb-8">
            <span
              aria-hidden
              className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-border"
            />
            <div className="flex flex-wrap items-baseline gap-x-2">
              <time
                dateTime={entry.date}
                className="font-mono text-fg-faint tabular-nums"
              >
                {formatDate(entry.date, siteConfig.locale)}
              </time>
              <span className="font-mono text-accent">feat({entry.area}):</span>
              <span className="font-medium text-fg">{entry.title}</span>
              {entry.version ? (
                <span className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[11px] text-fg-muted">
                  {entry.version}
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-fg-muted">{entry.description}</p>
          </li>
        ))}
      </ol>

      {canCollapse ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "mt-2 ml-6 font-mono text-sm text-accent transition-colors hover:underline",
          )}
        >
          {expanded ? "Show less" : `Show more (${remaining})`}
        </button>
      ) : null}
    </div>
  );
}
