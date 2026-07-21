---
name: bip-setup
description: Personalize the Building in Public template — interview the user, then write site.config.ts plus every file in src/data and their first devlog entry, replacing all "Acme Tasks" placeholders with the user's real product. Use right after cloning the template, or whenever someone says "set up", "personalize", or "make this mine".
---

# bip-setup

Turn the freshly-cloned template (which ships as the fictional "Acme Tasks") into the user's real product. You WRITE FILES DIRECTLY: `site.config.ts` at the repo root, every `*.ts` in `src/data/`, and one starter markdown article under `content/devlog/`.

## Hard rules

- NEVER edit anything under `src/components/` or `src/app/`. The template is designed so you never have to. If something looks like it needs a component change, you're doing it wrong.
- Replace ALL "Acme Tasks" placeholder content. Leave nothing fictional behind — grep for `acme`, `Alex Founder`, `Sam Builder`, and `example.com` when you're done.
- Keep every TypeScript type and `export` name intact. Only change values, never interfaces or variable names.
- Keep the ordering each file documents in its header comment (most files are NEWEST FIRST).
- Dates are `"YYYY-MM"` (month precision) or `"YYYY-MM-DD"`. Roadmap has no dates on purpose.
- Real numbers only. If the user doesn't have a metric yet, use `null` where the type allows it (e.g. `openMetrics`) or leave the metric out — never invent a number.

## Step 1 — Interview

Ask the user, in plain language (batch these; don't interrogate one at a time):

1. Product **name** and a **one-line story** (what it is, who it's for).
2. **Stage** and what it does today (beta? paying users? what are the 2–3 things it does well?).
3. **Tech stack** (one honest line).
4. **3–5 principles** they'd actually defend in public.
5. **First real metrics** they're comfortable publishing (revenue, users, uptime… whatever is true).
6. **Socials** (any of x / github / linkedin / instagram — handle + URL).
7. **Accent color** (hex).
8. **Contact email**.
9. Who's on the **team** (names + roles + a sentence each).
10. Their **first devlog entry** — a real decision or milestone to open the log with.

If they don't know an answer, prefer omitting the item over inventing one.

## Step 2 — Write `site.config.ts` (repo root)

This is the single personalization point. Mirror the existing `SiteConfig` interface exactly. Fields:

- `name`, `url` (no trailing slash), `tagline` (hero H1), `subtitle` (hero paragraph), `description` (meta), `locale` (BCP-47, e.g. `"en-US"`), `accent` (hex), `email`, `currentVersion` (e.g. `"v0.1.0"`).
- `heroFacts`: array of `{ value, label, metricKey? }`. **`metricKey` MUST match a `key` that exists in `src/data/metrics.ts`** — so write metrics first or in the same pass, then point heroFacts at real keys. A fact with no `metricKey` is a static string (fine for the version).
- `socials`: `{ name: "x" | "github" | "linkedin" | "instagram", handle, href }`. Only include the platforms the user actually has.
- `attribution`: boolean (default `true` — MIT footer credit; the user may turn it off).
- `terminal`: `{ enabled, prompt, commands }` where `commands` is `Record<string, string[]>` (command name → printed lines). Rewrite the sample `stack` / `team` / `mrr` / `why` commands with the user's real content, or add their own.

## Step 3 — Seed every file in `src/data/`

Read each file first to copy its interface exactly, then replace the placeholder values with the user's content:

- **`metrics.ts`** — `Metric { key (snake_case), value, tone? }`. Keys referenced by `heroFacts` must exist here. `tone: "accent"` colors the value.
- **`principles.ts`** — `Principle { title, description }`. Keep it to the 3–5 from the interview.
- **`business.ts`** — `businessModel: BusinessRow[]` (`{ label, value, detail }`) and `openMetrics: OpenMetric[]` (`{ label, value: string | null }`; `null` renders "Soon").
- **`methods.ts`** — `Method { name, source, use, category }`. Frameworks/books they actually use, with named sources. `category` is free-form.
- **`roadmap.ts`** — exactly three columns `[Now, Next, Someday]`, each `{ horizon, note, items: {title, description}[] }`. No dates. A column may be empty.
- **`updates.ts`** — `MonthlyUpdate { period: "YYYY-MM", title, highlights: string[] }`, NEWEST FIRST.
- **`team.ts`** — `TeamMember { name, role, photo?, bio, links }`; `links[].type` is `"linkedin" | "x" | "github" | "web"`.
- **`changelog.ts`** — `ChangelogEntry { date, version?, title, description, area }`, NEWEST FIRST. `area` is free-form. Seed with what they've actually shipped (or leave a single first entry). The `bip-ship` skill drafts these from git later.
- **`devlog.ts`** — see Step 4.

## Step 4 — Write the first devlog entry

In `src/data/devlog.ts`, replace the placeholder `devlogEntries` with the user's first entry (or entries), NEWEST FIRST. Each `DevlogEntry`:

`{ slug, date, version?, title, excerpt, author, tags[], hasArticle?, failed?, hidden? }`

- Define author constants like the file does (`const author = { name, role }`).
- `failed: true` renders an ✗ and is how misses get published — encourage honesty.
- An article is **optional** for setup. If the user wants a long-form piece, set `hasArticle: true` AND create `content/devlog/{slug}.md` with gray-matter frontmatter (`title`, `description`, `date`, `version?`, `tags[]`, `author: { name, role }`) followed by the body. The `slug` in the data entry MUST equal the markdown filename. If you set `hasArticle: true` with no file, the build breaks — so either write the file or leave `hasArticle` off.

## Step 5 — Verify, then print deploy steps

1. Tell the user to run `npm run build` locally first to confirm everything compiles and no `hasArticle` entry is missing its file.
2. Then PRINT these deploy steps verbatim:
   - **Push to GitHub** — commit and push the repo to a GitHub repository.
   - **Import on Vercel** — go to vercel.com, "Add New… → Project", import the repo. The Next.js preset is detected automatically. **Zero environment variables are needed.**
   - **Deploy** — click Deploy. That's it; the site is live.

End by listing which files you changed (absolute paths) and reminding them the whole site is data — no components were touched.
