import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { siteConfig } from "@config";

const CONTENT_DIR = path.join(process.cwd(), "content", "devlog");

export interface ArticleAuthor {
  name: string;
  role: string;
}

export interface Article {
  slug: string;
  title: string;
  description?: string;
  date: string;
  version?: string;
  tags: string[];
  author: ArticleAuthor;
  html: string;
  readingMinutes: number;
}

/** Slugs of every markdown file on disk (no filtering by hidden state). */
export function getArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Strip any <thead> whose <th> cells are all empty. GFM requires a header row,
 * so authors write `|  |  |` for borderless stat tables; this removes the
 * resulting empty header instead of rendering a blank row.
 */
function stripEmptyThead(html: string): string {
  return html.replace(/<thead>[\s\S]*?<\/thead>/g, (thead) => {
    const cells = thead.match(/<th[^>]*>([\s\S]*?)<\/th>/g) ?? [];
    const allEmpty =
      cells.length > 0 &&
      cells.every(
        (cell) => cell.replace(/<\/?th[^>]*>/g, "").trim().length === 0,
      );
    return allEmpty ? "" : thead;
  });
}

/** Wrap every table in a horizontal-scroll container so wide tables never
 * blow out the measure on small screens. */
function wrapTables(html: string): string {
  return html.replace(
    /<table>[\s\S]*?<\/table>/g,
    (table) => `<div class="prose-bip-table-scroll">${table}</div>`,
  );
}

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Load, parse, and render one article. Returns null if the slug resolves
 * outside the content directory (path-traversal guard) or the file is missing.
 * Raw HTML is allowed — this is first-party content.
 */
export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.resolve(CONTENT_DIR, `${slug}.md`);
  const root = path.resolve(CONTENT_DIR);

  // Guard: the resolved path must stay inside the content directory.
  if (filePath !== path.join(root, `${slug}.md`)) return null;
  if (!filePath.startsWith(root + path.sep)) return null;
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  let html = processed.toString();
  html = stripEmptyThead(html);
  html = wrapTables(html);

  const authorData =
    data.author && typeof data.author === "object"
      ? (data.author as Partial<ArticleAuthor>)
      : {};

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description:
      typeof data.description === "string" ? data.description : undefined,
    date: typeof data.date === "string" ? data.date : "",
    version: typeof data.version === "string" ? data.version : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    author: {
      name: authorData.name ?? siteConfig.name,
      role: authorData.role ?? "",
    },
    html,
    readingMinutes: readingMinutes(content),
  };
}
