# Building in Public Template

An open-source Next.js template for building your product in public. Clone it, run one Claude Code skill (or edit three data files by hand), and deploy a complete building-in-public page: manifesto, dev log with long-form articles, changelog, roadmap, business model, live-editable metrics, monthly updates, team, and a ⌘K command palette.

No CMS. No database. No environment variables. `npm run build` works on a fresh clone with nothing configured.

![The Building in Public Template homepage](docs/screenshot.png)

**[Live demo](https://building-in-public-template.vercel.app)** · **[Showcase: tegu.ar/building-in-public](https://tegu.ar/building-in-public)** — the real page this template was extracted from.

---

## Quickstart

Three steps, under fifteen minutes, no component edits.

1. **Clone it.** Use this template on GitHub, or:
   ```bash
   npx create-next-app@latest my-page -e https://github.com/matiasvallejosdev/building-in-public-template
   # or just: git clone https://github.com/matiasvallejosdev/building-in-public-template
   cd my-page && npm install
   ```
2. **Make it yours.** Run the setup skill in Claude Code:
   ```
   /bip-setup
   ```
   It interviews you and writes `site.config.ts` plus every data file with your real content. Prefer to do it by hand? Edit `site.config.ts` and the files in `src/data/` — that's the whole job.
3. **Deploy.** Push to GitHub and import the repo on [Vercel](https://vercel.com/new) (Next.js preset, zero env vars). Done.

Run `npm run dev` to preview locally at `http://localhost:3000`.

---

## What's inside

One opinionated page, built from typed data. In order:

| Section | What it's for |
| --- | --- |
| **Hero + ⌘K palette** | Your one-line story, a few live facts, and a command menu to jump anywhere. |
| **Why we build in public** | Your manifesto — 3–5 principles you'd actually defend. |
| **How we work** | The loop and the frameworks/methods behind the product, with named sources. |
| **Dev log** | A terminal-style log of decisions, shipped and reversed. Some entries link to full articles. |
| **Changelog** | Everything you've shipped, filterable by area. |
| **Roadmap** | Now / Next / Someday — qualitative, no dates to walk back. |
| **Business model** | How the product makes money, stated plainly, plus the numbers you commit to publish. |
| **The numbers** | A grid of your public metrics. |
| **Monthly updates** | Short recaps, one month at a time. |
| **The team** | The people building it. |
| **Follow the build** | Where to keep up next. |

---

## Editing content

Everything lives in one config file, nine data files, and your markdown articles. No components to touch.

- **`site.config.ts`** (repo root) — the single personalization point: name, URL, tagline, subtitle, accent color, socials, hero facts, and the terminal's custom commands.
- **`src/data/*.ts`** — one typed file per section:

  | File | Contents |
  | --- | --- |
  | `principles.ts` | The manifesto (3–5 items). |
  | `devlog.ts` | Decisions, newest first. `failed: true` renders a ✗; `hasArticle: true` links to an article. |
  | `changelog.ts` | Shipped items with an `area` for filtering. |
  | `methods.ts` | Frameworks you use, with named sources and a `category`. |
  | `roadmap.ts` | Exactly three columns: Now / Next / Someday. |
  | `metrics.ts` | The public numbers. `tone: "accent"` highlights a value. |
  | `business.ts` | How you make money, plus the metrics you commit to publish. |
  | `updates.ts` | Monthly recaps, newest first. |
  | `team.ts` | The people. Photo optional (initials otherwise). |

- **`content/devlog/{slug}.md`** — long-form articles. Frontmatter: `title`, `description`, `date`, optional `version`, `tags`, and `author: { name, role }`. To link one from the dev log, add a `devlog.ts` entry with the matching `slug` and `hasArticle: true`.

Dates accept `"YYYY-MM"` (month precision) or `"YYYY-MM-DD"`.

---

## The editorial rules

The whole point is a page you can't fake. The embedded skills enforce these; you should too:

1. **Real numbers or nothing.** No invented or flatteringly-rounded metrics.
2. **Publish the failures.** That's what `failed: true` is for — a log of only wins is marketing.
3. **No unannounced launches.** Don't tease features that don't exist.
4. **No competitor names**, and no third-party people or companies without their consent.
5. **Every decision should be defensible in public.** If a number can't survive a question, it doesn't go on the page.

---

## Claude Code skills

Three skills ship in `.claude/skills/`. They write data and markdown files directly and never touch components.

- **`/bip-setup`** — interviews you and personalizes the whole site (config + data + your first dev-log entry).
- **`/bip-devlog`** — guided authoring of a dev-log entry or a full article, with the editorial rules baked in.
- **`/bip-ship`** — reads your product repo's recent git history and drafts changelog entries for you to approve.

---

## Customizing

- **Accent color.** Change `accent` in `site.config.ts` (any hex). It's injected as `--bip-accent` and recolors links, focus rings, active filters, and the solid button — no other edits.
- **Fonts.** Geist Sans + Geist Mono via `next/font`. Swap them in `src/app/layout.tsx`.
- **Sections.** The page is assembled in `src/app/page.tsx` from a `SECTIONS` registry (`src/lib/sections.ts`) that also feeds the command palette. Reorder or drop sections there.
- **Design tokens.** The whole "Plain" system is a handful of CSS custom properties at the top of `src/app/globals.css`.

---

## Ideas for v2

Deliberately left out of v1, and welcome as PRs:

- **Live metrics.** Wire `metrics.ts` to a real data source with ISR instead of editing by hand.
- **Dark mode.** The tokens are centralized; a `prefers-color-scheme` pass is a small, welcome addition.

---

## Sites using this template

Shipped a page with this? Open a PR adding it here.

- [tegu.ar/building-in-public](https://tegu.ar/building-in-public) — the original.

---

## License

[MIT](LICENSE). The footer carries a small "Built with the Building in Public Template" attribution by default. It's removable — set `attribution: false` in `site.config.ts` — but leaving it on is appreciated and helps others find the template.
