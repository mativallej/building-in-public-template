import { siteConfig } from "@config";
import { cn } from "@/lib/cn";
import { principles } from "@/data/principles";
import { businessModel, openMetrics } from "@/data/business";
import { roadmap } from "@/data/roadmap";
import { team } from "@/data/team";
import { metricsByKey } from "@/data/metrics";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSection } from "@/components/PageSection";
import { Button } from "@/components/Button";
import { CommandMenu } from "@/components/CommandMenu";
import { Terminal } from "@/components/Terminal";
import { Timeline } from "@/components/Timeline";
import { MethodStack } from "@/components/MethodStack";
import { MetricsGrid } from "@/components/MetricsGrid";
import { Updates } from "@/components/Updates";
import { SocialIcon, type SocialName } from "@/components/SocialIcons";

const SOCIAL_LABELS: Record<SocialName, string> = {
  x: "X",
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Home() {
  const facts = siteConfig.heroFacts.map((fact) => ({
    label: fact.label,
    value: fact.metricKey
      ? (metricsByKey[fact.metricKey]?.value ?? fact.value)
      : fact.value,
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteConfig.name,
          item: siteConfig.url,
        },
      ],
    },
  ];

  return (
    <>
      <SiteHeader />
      <main id="top" className="mx-auto w-full max-w-[1080px] flex-1 px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="py-16 md:py-24">
          <h1 className="max-w-[18ch] text-4xl font-semibold tracking-tight md:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-[680px] text-lg text-fg-muted">
            {siteConfig.subtitle}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dd className="text-2xl font-semibold tabular-nums">
                  {fact.value}
                </dd>
                <dt className="mt-0.5 font-mono text-xs text-fg-faint">
                  {fact.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-10 max-w-[560px]">
            <CommandMenu />
          </div>
          <p className="mt-4 text-sm text-fg-muted">
            Something wrong, missing, or unfair?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-accent hover:underline"
            >
              Tell us <span aria-hidden>→</span>
            </a>
          </p>
        </section>

        {/* Principles */}
        <PageSection
          id="principles"
          title="Why we build in public"
          lead="Four rules we hold ourselves to. If a decision breaks one of them, that's usually the decision."
        >
          <ol className="divide-y divide-border border-t border-border">
            {principles.map((principle, index) => (
              <li
                key={principle.title}
                className="grid gap-2 py-6 md:grid-cols-[3rem_1fr] md:gap-6"
              >
                <span className="font-mono text-sm tabular-nums text-fg-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold">{principle.title}</h3>
                  <p className="mt-1 text-fg-muted">{principle.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </PageSection>

        {/* Method */}
        <PageSection
          id="method"
          title="How we work"
          lead="One loop, run over and over, plus the ideas we borrowed to run it."
        >
          <p className="font-mono text-sm text-fg-muted">
            hypothesis <span className="text-fg-faint">→</span> experiment{" "}
            <span className="text-fg-faint">→</span> ship{" "}
            <span className="text-fg-faint">→</span> measure{" "}
            <span className="text-fg-faint">→</span> learn{" "}
            <span className="text-accent">↺</span>
          </p>
          <div className="mt-8">
            <MethodStack />
          </div>
        </PageSection>

        {/* Dev log */}
        <PageSection
          id="devlog"
          title="Dev log"
          lead="Every decision worth remembering, shipped and reversed alike. Oldest at the top."
        >
          <Terminal />
        </PageSection>

        {/* Changelog */}
        <PageSection
          id="changelog"
          title="Changelog"
          lead="Everything we've shipped, newest first. Filter by area."
        >
          <Timeline />
        </PageSection>

        {/* Roadmap */}
        <PageSection
          id="roadmap"
          title="Roadmap"
          lead="No dates we'd have to walk back. Just what's happening now, what's likely next, and what's real but far off."
        >
          <div className="grid gap-8 md:grid-cols-3">
            {roadmap.map((column, index) => {
              const labelClass =
                index === 0
                  ? "text-accent"
                  : index === 1
                    ? "text-fg-muted"
                    : "text-fg-faint";
              const titleClass =
                index === 2 ? "text-fg-faint" : "text-fg";
              const bodyClass =
                index === 0 ? "text-fg-muted" : "text-fg-faint";
              const topRule =
                index === 2
                  ? "border-t border-dashed border-border"
                  : "border-t border-border";
              return (
                <div key={column.horizon} className={cn("pt-4", topRule)}>
                  <h3 className={cn("font-mono text-sm", labelClass)}>
                    {column.horizon}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-fg-faint">
                    {column.note}
                  </p>
                  {column.items.length === 0 ? (
                    <p className="mt-4 text-sm text-fg-faint">
                      Empty for now. Things appear here when they&apos;re real.
                    </p>
                  ) : (
                    <ul className="mt-4 space-y-4">
                      {column.items.map((item) => (
                        <li key={item.title}>
                          <h4 className={cn("font-medium", titleClass)}>
                            {item.title}
                          </h4>
                          <p className={cn("mt-0.5 text-sm", bodyClass)}>
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </PageSection>

        {/* Business model */}
        <PageSection
          id="business"
          title="Business model"
          lead="How the product pays for itself, without a pitch deck."
        >
          <dl className="divide-y divide-border border-t border-border">
            {businessModel.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 py-5 md:grid-cols-[minmax(0,1fr)_auto_2fr] md:items-baseline md:gap-6"
              >
                <dt className="font-medium">{row.label}</dt>
                <dd className="text-xl font-semibold tabular-nums md:text-right">
                  {row.value}
                </dd>
                <dd className="text-sm text-fg-muted">{row.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <h3 className="font-mono text-sm text-fg-faint">
              <span aria-hidden>#</span> numbers we commit to publish
            </h3>
            <dl className="mt-4 divide-y divide-border border-t border-border">
              {openMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-fg-muted">{metric.label}</dt>
                  <dd
                    className={cn(
                      "font-mono tabular-nums",
                      metric.value === null ? "text-fg-faint" : "text-fg",
                    )}
                  >
                    {metric.value ?? "Soon"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </PageSection>

        {/* The numbers */}
        <PageSection
          id="numbers"
          title="The numbers"
          lead="Updated by hand every month. When they go down, they go down here too."
        >
          <MetricsGrid />
        </PageSection>

        {/* Monthly updates */}
        <PageSection
          id="updates"
          title="Monthly updates"
          lead="A short recap of what actually happened, one month at a time."
        >
          <Updates />
        </PageSection>

        {/* Team */}
        <PageSection
          id="team"
          title="The team"
          lead="The whole company. No stock photos."
        >
          <div className="divide-y divide-border border-t border-border">
            {team.map((member) => (
              <div key={member.name} className="flex gap-4 py-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-bg-subtle font-mono text-sm text-fg-muted">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials(member.name)
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-semibold">{member.name}</h3>
                    <span className="font-mono text-xs text-fg-faint">
                      {member.role}
                    </span>
                  </div>
                  <p className="mt-1 text-fg-muted">{member.bio}</p>
                  <div className="mt-2 flex items-center gap-3 text-fg-muted">
                    {member.links.map((link) =>
                      link.type === "web" ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs transition-colors hover:text-fg"
                        >
                          web <span aria-hidden>↗</span>
                        </a>
                      ) : (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on ${link.type}`}
                          className="transition-colors hover:text-fg"
                        >
                          <SocialIcon name={link.type} />
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        {/* Follow the build */}
        <PageSection
          id="follow"
          title="Follow the build"
          lead="No dashboards to log into, no newsletter to unsubscribe from later."
        >
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {siteConfig.socials.map((social) => (
              <Button key={social.name} href={social.href} variant="text">
                <SocialIcon name={social.name} />
                {SOCIAL_LABELS[social.name]}
                <span className="text-fg-faint">{social.handle}</span>
              </Button>
            ))}
          </div>
          <p className="mt-8 max-w-[600px] text-fg-muted">
            That&apos;s the whole thing: a task manager for small teams, and an
            honest record of what it takes to build one. We&apos;ll keep
            publishing the number whether it went up or down. Thanks for
            watching the work.
          </p>
        </PageSection>
      </main>
      <SiteFooter />
    </>
  );
}
