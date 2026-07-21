"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@config";
import { SECTIONS } from "@/lib/sections";
import { visibleDevlogEntries } from "@/data/devlog";
import { changelog } from "@/data/changelog";
import { roadmap } from "@/data/roadmap";
import { formatDate } from "@/lib/dates";
import { isHashLink, scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/cn";

interface CommandItem {
  group: string;
  label: string;
  description: string;
  href: string;
}

/** Diacritic-insensitive normalization for substring matching. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Build the full, pre-grouped item list once (order = group order). */
function buildItems(): CommandItem[] {
  const items: CommandItem[] = [];

  for (const section of SECTIONS) {
    items.push({
      group: "Sections",
      label: section.label,
      description: section.description,
      href: `#${section.id}`,
    });
  }

  for (const entry of visibleDevlogEntries) {
    if (!entry.hasArticle) continue;
    items.push({
      group: "Dev log",
      label: entry.title,
      description: entry.excerpt,
      href: `/${entry.slug}`,
    });
  }

  for (const entry of changelog) {
    items.push({
      group: "Changelog",
      label: entry.title,
      description: `${formatDate(entry.date, siteConfig.locale)} · ${entry.description}`,
      href: "#changelog",
    });
  }

  for (const column of roadmap) {
    for (const item of column.items) {
      items.push({
        group: "Roadmap",
        label: item.title,
        description: `${column.horizon} · ${item.description}`,
        href: "#roadmap",
      });
    }
  }

  return items;
}

const EXAMPLE_QUERIES = ["roadmap", "billing", "the failed experiment", "mrr"];

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isMac, setIsMac] = useState(true);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo(buildItems, []);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter((item) =>
      normalize(`${item.label} ${item.description}`).includes(q),
    );
  }, [items, query]);

  // Platform sniff after mount (Mac default pre-hydration avoids a flash).
  useEffect(() => {
    const platform =
      navigator.userAgent || (navigator as Navigator).platform || "";
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(platform));
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Global ⌘K / Ctrl+K toggle.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Reset query/active and focus the input on open; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(id);
    };
  }, [open]);

  // Keep the active item in view.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [active, open, filtered.length]);

  const select = useCallback(
    (item: CommandItem | undefined) => {
      if (!item) return;
      setOpen(false);
      if (isHashLink(item.href)) {
        scrollToHash(item.href);
      } else {
        router.push(item.href);
      }
    },
    [router],
  );

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(filtered[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  const kbd = isMac ? "⌘K" : "Ctrl K";

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Open command menu"
        className="flex w-full items-center justify-between gap-3 rounded border border-border px-4 py-3 text-left text-fg-muted transition-colors hover:border-fg-faint"
      >
        <span>What do you want to know?</span>
        <kbd className="rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-xs text-fg-faint">
          {kbd}
        </kbd>
      </button>

      {/* Overlay */}
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4 pt-[12vh]"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[560px] overflow-hidden rounded-lg border border-border bg-bg shadow-[var(--bip-shadow-overlay)]"
          >
            <div className="border-b border-border px-4">
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-menu-list"
                aria-activedescendant={
                  filtered.length ? `command-item-${active}` : undefined
                }
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Type to filter — sections, dev log, changelog…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                className="w-full bg-transparent py-3.5 text-fg outline-none placeholder:text-fg-faint"
              />
            </div>

            <ul
              ref={listRef}
              id="command-menu-list"
              role="listbox"
              aria-label="Results"
              className="max-h-[52vh] overflow-y-auto py-2"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-6 text-sm text-fg-muted">
                  <p>No matches.</p>
                  <p className="mt-2 text-fg-faint">
                    Try:{" "}
                    {EXAMPLE_QUERIES.map((example, i) => (
                      <span key={example}>
                        {i > 0 ? ", " : ""}
                        <button
                          type="button"
                          className="text-accent hover:underline"
                          onClick={() => {
                            setQuery(example);
                            setActive(0);
                            inputRef.current?.focus();
                          }}
                        >
                          {example}
                        </button>
                      </span>
                    ))}
                  </p>
                </li>
              ) : (
                filtered.map((item, index) => {
                  const previous = filtered[index - 1];
                  const showHeader = !previous || previous.group !== item.group;
                  const isActive = index === active;
                  return (
                    <li key={`${item.group}-${item.label}-${index}`}>
                      {showHeader ? (
                        <p className="px-4 pb-1 pt-3 font-mono text-xs text-fg-faint">
                          {item.group}
                        </p>
                      ) : null}
                      <div
                        id={`command-item-${index}`}
                        data-index={index}
                        role="option"
                        aria-selected={isActive}
                        onMouseMove={() => setActive(index)}
                        onClick={() => select(item)}
                        className={cn(
                          "cursor-pointer px-4 py-2",
                          isActive && "bg-bg-subtle",
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="truncate font-medium text-fg">
                            {item.label}
                          </span>
                          <span
                            aria-hidden
                            className={cn(
                              "font-mono text-xs",
                              isActive ? "text-accent" : "text-fg-faint",
                            )}
                          >
                            {item.href.startsWith("#") ? "jump →" : "open →"}
                          </span>
                        </div>
                        <p className="truncate text-sm text-fg-muted">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
