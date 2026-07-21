---
name: bip-devlog
description: Guided authoring of ONE devlog entry (and optionally a full content/devlog/{slug}.md article) for the Building in Public template. Enforces the editorial doctrine — real numbers, published failures, no unannounced launches. Use whenever the user wants to "write a devlog", "log a decision", "post a build update", or "add a devlog entry".
---

# bip-devlog

Author a single devlog entry and prepend it to `src/data/devlog.ts` (NEWEST FIRST). Optionally write a matching long-form article at `content/devlog/{slug}.md`.

## Editorial doctrine — enforce these; refuse to violate them

These are not style suggestions. If the user asks for something that breaks one, say so and offer an honest alternative instead of complying.

1. **Real numbers or nothing.** Never invent a metric, never round to flatter (312 users is not "300+", $1,000 is not "~$1k growing fast"). If a number isn't known or isn't ready to publish, leave it out.
2. **Failures get published.** That's what `failed: true` is for. Do not quietly drop the misses, soften a rollback into a "learning", or bury a killed experiment.
3. **No unannounced launches.** Don't tease, promise, or imply features that don't exist yet. Log what shipped, not what's hoped for.
4. **No competitor names.** Ever.
5. **No third-party names** (people or companies) without their consent. When in doubt, describe the role ("a paying team", "an early user") instead of naming.

## Step 1 — Gather the entry

Ask the user for:

1. **Date** — `"YYYY-MM-DD"` or `"YYYY-MM"`.
2. **Title** — one honest line.
3. **Excerpt** — one paragraph. This is the summary shown in the log.
4. **Author** — name + role (reuse an author constant already defined in `devlog.ts` if it matches).
5. **Tags** — a few short strings.
6. **Version?** — optional, e.g. `"v0.5.0"`, only if this entry marks a release.
7. **Did it fail?** — if yes, the entry gets `failed: true`. Don't talk them out of publishing a miss.
8. **Long article?** — does this deserve a full write-up, or is the entry enough on its own?

Run the excerpt and (if any) the article past the doctrine before writing. Flag anything that trips a rule.

## Step 2 — Prepend to `src/data/devlog.ts`

Read the file to match the `DevlogEntry` interface exactly:

`{ slug, date, version?, title, excerpt, author, tags[], hasArticle?, failed?, hidden? }`

- **Slug**: kebab-case, derived from the title, unique among existing entries.
- Insert the new object as the FIRST element of `devlogEntries` (newest-first ordering is load-bearing).
- Set `failed: true` when applicable. Only set `hidden: true` if the user explicitly wants it out of the render.
- Do not reorder or edit the other entries.

## Step 3 — Optional article at `content/devlog/{slug}.md`

Only if the user wants the long form:

1. Create `content/devlog/{slug}.md` — the filename MUST equal the entry's `slug`.
2. Frontmatter (gray-matter YAML), matching the fields the loader reads:
   ```
   ---
   title: "..."
   description: "..."
   date: "YYYY-MM-DD"
   version: "v0.5.0"   # optional, only if the entry has one
   tags: ["...", "..."]
   author:
     name: "..."
     role: "..."
   ---
   ```
3. Write the body in Markdown below the frontmatter. Headings, blockquotes, and tables are supported (see existing articles for the house style). Keep the doctrine: real numbers, real failures, no teasers, no names without consent.
4. In the data entry, set `hasArticle: true`. An entry with `hasArticle: true` REQUIRES this file to exist — verify the slug matches before finishing, or the article route 404s and the build can break.

If there's no article, do NOT set `hasArticle` at all.

## Never

- Never touch `src/components/` or `src/app/`.
- Never edit `changelog.ts` here — that's `bip-ship`.
- Never publish a rounded or invented number to make a week look better than it was.
