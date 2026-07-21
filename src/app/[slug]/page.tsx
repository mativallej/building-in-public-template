import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@config";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { hiddenSlugs } from "@/data/devlog";
import { formatDate } from "@/lib/dates";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { TopLink } from "@/components/TopLink";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  return getArticleSlugs()
    .filter((slug) => !hiddenSlugs.has(slug))
    .map((slug) => ({ slug }));
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (hiddenSlugs.has(slug)) return {};
  const article = await getArticle(slug);
  if (!article) return {};

  const canonical = `/${slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${siteConfig.url}/${slug}`,
      publishedTime: article.date || undefined,
      authors: [article.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  if (hiddenSlugs.has(slug)) notFound();
  const article = await getArticle(slug);
  if (!article) notFound();

  const url = `${siteConfig.url}/${slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date || undefined,
      author: { "@type": "Person", name: article.author.name },
      publisher: { "@type": "Organization", name: siteConfig.name },
      url,
      mainEntityOfPage: url,
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
        {
          "@type": "ListItem",
          position: 2,
          name: article.title,
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      <SiteHeader />
      <main
        id="top"
        className="mx-auto w-full max-w-[680px] flex-1 px-6 py-12 md:py-16"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Button href="/#devlog" variant="text">
          <span aria-hidden>←</span> Back to the dev log
        </Button>

        <header className="mt-8">
          <p className="font-mono text-sm text-fg-faint">
            <span aria-hidden>#</span> devlog
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-fg-muted">
            {article.date ? (
              <time dateTime={article.date}>
                {formatDate(article.date, siteConfig.locale)}
              </time>
            ) : null}
            {article.version ? (
              <span>
                <span aria-hidden>· </span>
                {article.version}
              </span>
            ) : null}
            <span>
              <span aria-hidden>· </span>
              {article.readingMinutes} min read
            </span>
          </div>
        </header>

        <article
          className="prose-bip mt-10"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        <div className="mt-12 flex items-center gap-3 border-t border-border pt-6">
          <div
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-subtle font-mono text-sm text-fg-muted"
          >
            {initials(article.author.name)}
          </div>
          <div>
            <div className="font-medium">{article.author.name}</div>
            {article.author.role ? (
              <div className="font-mono text-xs text-fg-faint">
                {article.author.role}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8">
          <TopLink />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
