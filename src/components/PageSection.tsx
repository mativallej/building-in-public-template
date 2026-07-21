import type { ReactNode } from "react";

interface PageSectionProps {
  /** Anchor id, also shown as the mono eyebrow "# {id}". */
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
}

/**
 * A page section in the Plain system: a full-width top rule, a lowercase mono
 * eyebrow ("# devlog"), an H2, an optional lead, then content. No cards.
 */
export function PageSection({ id, title, lead, children }: PageSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-border py-12 md:py-20"
    >
      <p className="font-mono text-sm text-fg-faint">
        <span aria-hidden>#</span> {id}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-3 max-w-[680px] text-fg-muted">{lead}</p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}
