"use client";

import { useState } from "react";
import Link from "next/link";
import { visibleDevlogEntries } from "@/data/devlog";
import { SECTIONS } from "@/lib/sections";
import { siteConfig } from "@config";
import { formatDate } from "@/lib/dates";
import { cn } from "@/lib/cn";

interface HistoryItem {
  command: string;
  output: string[];
}

/** shortRole = the role up to the first " & " separator. */
function shortRole(role: string): string {
  return role.split(" & ")[0];
}

/** The built-in command names, in help order. */
const BUILTINS = ["help", "ls", "clear", "echo", "date", "sudo"];

/** Log entries, oldest-first. Copy before sorting — never mutate the import. */
const logEntries = [...visibleDevlogEntries].sort((a, b) =>
  a.date.localeCompare(b.date),
);

/** One dev-log line: [date] mark version title — author · role. */
function LogLine({
  entry,
  asLink,
}: {
  entry: (typeof logEntries)[number];
  asLink?: boolean;
}) {
  const mark = entry.failed ? "✗" : "✓";

  return (
    <span className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-fg-faint">
        [{formatDate(entry.date, siteConfig.locale)}]
      </span>
      <span className={entry.failed ? "text-fail" : "text-ok"} aria-hidden>
        {mark}
      </span>
      {entry.version ? (
        <span className="text-fg-faint">{entry.version}</span>
      ) : null}
      <span className="text-fg">{entry.title}</span>
      <span className="text-fg-faint">
        — {entry.author.name} · {shortRole(entry.author.role)}
      </span>
      {asLink ? <span className="text-accent">read →</span> : null}
    </span>
  );
}

export function Terminal() {
  const { terminal, locale } = siteConfig;
  const prompt = terminal.prompt;

  const [value, setValue] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  function run(command: string): string[] | null {
    const trimmed = command.trim();
    if (trimmed === "") return null;

    const [cmd, ...args] = trimmed.split(/\s+/);

    switch (cmd) {
      case "help": {
        const names = [...BUILTINS, ...Object.keys(terminal.commands)];
        const width = names.reduce((w, n) => Math.max(w, n.length), 0);
        const describe: Record<string, string> = {
          help: "list available commands",
          ls: "list the page sections",
          clear: "clear the terminal",
          echo: "print the given text",
          date: "print today's date",
          sudo: "try to gain root",
        };
        return [
          "available commands:",
          ...names.map(
            (n) =>
              `  ${n.padEnd(width)}  ${describe[n] ?? "custom command"}`,
          ),
        ];
      }
      case "ls":
        return [SECTIONS.map((s) => s.id).join(" ")];
      case "clear":
        // Handled by caller — signalled via null-after-clear below.
        return null;
      case "echo":
        return [args.join(" ")];
      case "date":
        return [
          new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(
            new Date(),
          ),
        ];
      case "sudo":
        return ["no need: everything is already public."];
      default: {
        if (cmd in terminal.commands) return terminal.commands[cmd];
        return [`${cmd}: command not found. try help`];
      }
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = value;
    const trimmed = command.trim();

    if (trimmed === "") {
      setValue("");
      return;
    }

    if (trimmed.split(/\s+/)[0] === "clear") {
      setHistory([]);
      setValue("");
      return;
    }

    const output = run(command) ?? [];
    setHistory((prev) => [...prev, { command, output }].slice(-8));
    setValue("");
  }

  return (
    <div className="rounded-lg border border-border bg-bg-subtle p-4 font-mono text-sm text-fg-muted md:p-5">
      {/* The log — oldest first, one line per entry. */}
      <div className="flex flex-col gap-y-1.5">
        {logEntries.map((entry) =>
          entry.hasArticle ? (
            <Link
              key={entry.slug}
              href={`/${entry.slug}`}
              className={cn(
                "block text-fg-faint transition-colors hover:text-fg",
              )}
            >
              <LogLine entry={entry} asLink />
            </Link>
          ) : (
            <div key={entry.slug} className="text-fg-faint">
              <LogLine entry={entry} />
            </div>
          ),
        )}
      </div>

      {/* The prompt — interactive REPL. */}
      {terminal.enabled ? (
        <>
          <div className="mt-4 border-t border-border pt-4" aria-live="polite">
            {history.map((item, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <div>
                  <span className="text-accent">{prompt} &gt;</span>{" "}
                  <span className="text-fg">{item.command}</span>
                </div>
                {item.output.map((line, j) => (
                  <div
                    key={j}
                    className="whitespace-pre-wrap text-fg-muted"
                  >
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-2 flex items-baseline gap-x-2">
            <label htmlFor="terminal-input" className="shrink-0 text-accent">
              {prompt} &gt;
            </label>
            <input
              id="terminal-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-transparent text-fg outline-none"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </form>
        </>
      ) : null}
    </div>
  );
}
