---
title: CNHora SEO Next.js Migration Implementation Plan
date: 2026-04-29
author: Maestro TechLead
task_complexity: medium
design_depth: deep
---

# Implementation Plan: CNHora SEO Next.js Migration

## Plan Overview
This plan executes a performance-first migration from Vite/React CSR to Next.js App Router (SSG). The goal is to solve the discoverability issues identified in the SEO assessment by implementing a high-performance "Island" architecture that separates static SEO-critical text from interactive animations.

- **Total Phases**: 5
- **Agents Involved**: Architect, Coder, Design System Engineer, SEO Specialist, Performance Engineer (via SEO Specialist validation).
- **Strategy**: Hybrid execution with a parallel component migration batch.

## Execution Profile
- **Total phases**: 5
- **Parallelizable phases**: 2 (Phase 2 & 3)
- **Sequential-only phases**: 3
- **Estimated parallel wall time**: 4-6 turns (excluding validation)
- **Estimated sequential wall time**: 8-10 turns

## Phase Details

### Phase 1: Next.js Foundation & Global SEO Config
- **Objective**: Scaffold the Next.js environment and establish the global metadata foundation.
- **Agent**: `architect`
- **Files to Create**:
  - `next.config.js`: Configure image optimization and production build settings.
  - `app/layout.tsx`: Global layout with RootMetadata and font optimization.
  - `app/page.tsx`: Landing page shell.
  - `public/robots.txt`: Production robots configuration.
- **Files to Modify**:
  - `package.json`: Add Next.js dependencies and update scripts.
- **Validation**: `npm run build` succeeds; source HTML contains global meta tags.

### Phase 2: Component Refactoring (Static Server Components)
- **Objective**: Migrate all static text-heavy components to Next.js Server Components.
- **Agent**: `coder`
- **Parallel**: Batch A
- **Files to Create**:
  - `app/components/layout/Footer.tsx`: Refactored to pure RSC.
  - `app/components/sections/FeaturesContent.tsx`: Pure text/header component.
- **Validation**: Components render on server; no client-side JS needed for text visibility.

### Phase 3: Animation Isolation (Client Islands)
- **Objective**: Isolate GSAP/Three.js logic into hydration-safe Client Components.
- **Agent**: `design_system_engineer`
- **Parallel**: Batch A
- **Files to Create**:
  - `app/client/HeroCanvas.tsx`: "use client" island for Three.js.
  - `app/client/ScrollAnimations.tsx`: "use client" wrapper for GSAP sequences.
- **Validation**: Animations initialize without hydration flickers; GSAP ScrollTrigger works as expected.

### Phase 4: Regional Logic & SSG Implementation
- **Objective**: Implement dynamic routing and metadata generation for regional growth.
- **Agent**: `coder`
- **Files to Create**:
  - `app/(regional)/[city]/page.tsx`: Dynamic route for city landing pages.
  - `lib/metadata-generator.ts`: Logic for mapping city data to SEO tags.
- **Validation**: Navigating to `/sp/campinas` generates correct regional `<title>` and `description`.

### Phase 5: Technical SEO Audit & Final Validation
- **Objective**: Perform a final audit and validate Core Web Vitals.
- **Agent**: `seo_specialist`
- **Files to Create**:
  - `app/sitemap.ts`: Automated sitemap generator logic.
- **Validation**: Lighthouse SEO score = 100; Schema.org validator passes; LCP < 2.5s.

## File Inventory

| Phase | Path | Action | Purpose |
|-------|------|--------|---------|
| 1 | `next.config.js` | Create | Next.js configuration |
| 1 | `app/layout.tsx` | Create | Global Metadata & Layout |
| 1 | `public/robots.txt` | Create | Crawler instructions |
| 2 | `app/components/` | Create | Static Server Components |
| 3 | `app/client/` | Create | Interactive Animation Islands |
| 4 | `app/[city]/page.tsx`| Create | Regional SSG Routes |
| 5 | `app/sitemap.ts` | Create | Auto-sitemap generation |

## Risk Classification

| Phase | Risk | Rationale |
|-------|------|-----------|
| 1 | LOW | Standard scaffolding. |
| 2 | LOW | Pure React refactoring. |
| 3 | HIGH | Hydration mismatches with GSAP/Three.js are common. |
| 4 | MEDIUM | Complexity of dynamic metadata generation. |
| 5 | MEDIUM | Performance tuning for LCP targets. |
