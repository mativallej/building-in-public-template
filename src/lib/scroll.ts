/** Shared client-side navigation helpers for the Plain system. */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smooth-scroll to an in-page anchor, honoring reduced-motion, and update the
 * URL hash without the browser's default jump. `hash` may be "#id" or "id".
 */
export function scrollToHash(hash: string): void {
  if (typeof document === "undefined") return;
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  history.replaceState(null, "", `#${id}`);
}

export function isHashLink(href: string): boolean {
  return href.startsWith("#");
}

export function isExternalLink(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}
