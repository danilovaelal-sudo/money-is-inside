# GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt the current Next.js app to build as a static project site for GitHub Pages at `/money-is-inside/`.

**Architecture:** Switch Next.js to static export mode, make the dynamic `/day/[id]` route statically generatable, and add a GitHub Actions workflow that builds and deploys the exported `out/` folder to Pages. Keep all client-side `localStorage` behavior unchanged.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, GitHub Actions, GitHub Pages

---

### Task 1: Configure static export for project-site hosting

**Files:**
- Modify: `next.config.ts`

- [ ] Add `output: "export"` and Pages-safe settings.
- [ ] Configure `basePath` and `assetPrefix` for `/money-is-inside`.
- [ ] Add `trailingSlash` so exported routes work reliably on Pages.

### Task 2: Make `/day/[id]` exportable

**Files:**
- Modify: `src/app/day/[id]/page.tsx`
- Create: `src/app/day/[id]/DayPageClient.tsx`

- [ ] Split the current client page into a server wrapper plus client component.
- [ ] Add `generateStaticParams()` for all 15 practice days.
- [ ] Replace `useParams()` with `params` passed from the wrapper.

### Task 3: Add GitHub Pages deployment workflow

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

- [ ] Add a workflow that installs dependencies, runs `npm run build`, uploads `out/`, and deploys to GitHub Pages on pushes to `main`.

### Task 4: Verify exported output and project state

**Files:**
- Verify: `out/`
- Modify if needed: `README.md`

- [ ] Run `npm run build` and confirm static export succeeds.
- [ ] Verify exported files for the homepage and day pages exist under `out/`.
- [ ] Update README only if Pages URL instructions are missing after deployment setup.
