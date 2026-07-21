"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isExternalLink, isHashLink, scrollToHash } from "@/lib/scroll";

type Variant = "solid" | "text";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & {
  href?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

const styles: Record<Variant, string> = {
  solid:
    "inline-flex items-center justify-center gap-2 rounded bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-50",
  text: "inline-flex items-center gap-1 text-accent underline-offset-4 transition-colors hover:underline",
};

/**
 * The template's only button. Two variants — `solid` and `text` — and the
 * shared routing rule: "#anchor" smooth-scrolls, external/mailto opens a plain
 * link, everything else routes through next/link.
 */
export function Button({
  variant = "solid",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(styles[variant], className);

  if (href && isHashLink(href)) {
    return (
      <a
        href={href}
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          scrollToHash(href);
        }}
      >
        {children}
      </a>
    );
  }

  if (href && isExternalLink(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
