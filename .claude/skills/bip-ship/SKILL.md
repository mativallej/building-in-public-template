---
name: bip-ship
description: Draft changelog entries for the Building in Public template from the product repo's git history — read recent commits/tags/releases, group the user-facing changes, show drafts, and only after confirmation write them (newest-first) into src/data/changelog.ts. Use when the user says "update the changelog", "draft a changelog from git", "what did we ship", or "generate release notes".
---

# bip-ship

Turn git history from the user's PRODUCT repo into `ChangelogEntry` drafts, then — only after they confirm — prepend them to `src/data/changelog.ts`.

Note: this template repo and the product repo are usually two different repositories. The changelog lives here; the git history lives there.

## Hard rules

- NEVER touch `src/components/` or `src/app/`.
- NEVER write to `changelog.ts` before showing drafts and getting an explicit "yes".
- Follow the editorial doctrine: real, user-visible changes only. No competitor names, no third-party names without consent, no teasing unshipped work.

## Step 1 — Locate the product repo

Ask for the product repo path (or read it from a configured path if one is set up). This is the codebase whose commits become changelog entries — not necessarily this template repo.

## Step 2 — Read the history

From the product repo, gather recent, user-facing changes. Useful commands (run against that repo's path):

- `git -C <repo> log --oneline -n 100` — recent commits.
- `git -C <repo> tag --sort=-creatordate | head` and `git -C <repo> log <lastTag>..HEAD --oneline` — what shipped since the last release.
- `gh release list` / `gh release view <tag>` — if they cut GitHub releases.

Prefer the range since the last changelog entry's date so you don't re-log old work.

## Step 3 — Group into user-facing changes

- Group related commits into ONE entry per shipped change (a feature is one entry, not ten commits).
- **Skip the noise** — `chore:`, `refactor:`, `test:`, `ci:`, dependency bumps, and merge commits — UNLESS the change is actually visible to users.
- Read commits in conventional-commit spirit: `feat:` → usually an entry; `fix:` → an entry if users felt the bug; `perf:` → an entry if it's noticeable.
- Write each entry in plain, human language (what changed and why it matters), not raw commit subjects.

## Step 4 — Draft `ChangelogEntry` objects

Read `src/data/changelog.ts` to match the interface and reuse existing `area` values. Interface:

`ChangelogEntry { date, version?, title, description, area }`

- `date` — `"YYYY-MM"` or `"YYYY-MM-DD"`.
- `version?` — only when the change coincides with a release.
- `title` — short, specific.
- `description` — one or two plain sentences.
- `area` — a free-form string. Reuse the areas already present in the file for consistency (the Timeline derives its filters from areas in first-appearance order); introduce a new area only when nothing fits.

## Step 5 — Show, confirm, then write

1. Present the full list of drafts to the user (title, date, area, description).
2. **Ask for confirmation.** Let them edit, drop, merge, or re-word entries.
3. Only after they approve, prepend the confirmed entries to the `changelog` array in `src/data/changelog.ts`, **NEWEST FIRST**. Do not reorder or alter existing entries.

## Never

- Never fabricate a change that isn't in the history.
- Never log an internal-only refactor as if users would notice.
- Never write the file without a confirmed "yes".
