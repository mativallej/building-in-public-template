"use client";

import { scrollToHash } from "@/lib/scroll";

/** "Back to top ↑" text button; smooth/auto scroll per motion preference. */
export function TopLink() {
  return (
    <button
      type="button"
      onClick={() => scrollToHash("#top")}
      className="inline-flex items-center gap-1 font-mono text-sm text-fg-muted transition-colors hover:text-fg"
    >
      Back to top <span aria-hidden>↑</span>
    </button>
  );
}
