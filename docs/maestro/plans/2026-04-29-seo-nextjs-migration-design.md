---
title: CNHora SEO Next.js Migration
date: 2026-04-29
author: Maestro TechLead
task_complexity: medium
design_depth: deep
---

# Design Document: CNHora SEO Next.js Migration

## 1. Problem Statement
CNHora’s current Vite-based React SPA (CSR) architecture creates significant discoverability barriers for regional growth. The site lacks essential SEO infrastructure (sitemap, robots.txt, schema.org) and depends entirely on client-side JavaScript for content rendering. This leads to slower indexing, absent social sharing previews (Open Graph), and potential "soft 404" issues for regional landing pages. To achieve the goal of **Regional Growth**, CNHora requires a performance-first migration to a framework that supports Server Components and pre-rendering without sacrificing its signature high-fidelity animations.

## 2. Requirements

### Functional (REQ-F)
- **REQ-F1: Next.js SSG Migration** — Rebuild the landing page and legal pages using the Next.js App Router.
- **REQ-F2: Dynamic Regional Metadata** — Implement a scalable system to generate titles and descriptions for city-specific landing pages.
- **REQ-F3: Automated SEO Assets** — Auto-generate `sitemap.xml` and `robots.txt` based on the app's route structure.
- **REQ-F4: Social Sharing (OG Tags)** — Implement global and page-specific Open Graph and Twitter Card tags.

### Non-Functional (REQ-NF)
- **REQ-NF1: Core Web Vitals (LCP < 2.5s)** — Maximize LCP by serving text content via Server Components.
- **REQ-NF2: Animation Fidelity** — Maintain existing GSAP ScrollTrigger and Three.js particle system behavior.
- **REQ-NF3: Zero-Hydration-Mismatch** — Ensure 100% sync between Server and Client rendering to avoid layout shifts.

### Constraints (REQ-C)
- **REQ-C1: Client-Side WebGL** — All Three.js and heavy GSAP logic must be isolated in `"use client"` boundaries.
- **REQ-C2: Brazilian Region Focus** — All metadata and schema must be optimized for the Brazilian (pt-BR) market.

## 3. Approach

We have selected **Approach 2: High-Performance "Island" Architecture in Next.js**.

### Selected Strategy: Island Hydration
- **Server Components (RSC)**: All Typography, Navigation, Layout structures, and Schema.org JSON-LD.
- **Client Components ("use client")**: Hero WebGL Canvas, Feature hover states, GSAP ScrollTrigger containers, and the Custom Cursor.

### Rationale
- **Separation of Content and Interaction** — Text is passed from Server to Client as props, ensuring crawlers see full regional copy.
- **Metadata API for pt-BR** — Native `generateMetadata` handles dynamic regional requirements.
- **SSG Migration** — Pre-rendering all routes for maximum TTFB.

### Alternatives Considered
- **Vite + react-snap** — Rejected; less robust for large-scale regional growth than a native Next.js implementation.
- **Next.js Approach 1 (Pragmatic)** — Rejected in favor of the higher-performance "Island" model to ensure best-in-class Core Web Vitals.

## 4. Architecture

### Folder Structure
```
app/
├── (regional)/
│   └── [city]/
│       └── page.tsx      <-- Dynamic SSG for Regional Growth
├── layout.tsx            <-- Metadata API & Global Providers
├── page.tsx              <-- Main Landing Page
├── components/           <-- Pure Server Components (Static Text)
└── client/               <-- Interactive "Islands" ("use client")
```

## 5. Agent Team
- **seo_specialist**: Audit & Schema strategy.
- **architect**: Next.js App Router & Metadata architecture.
- **design_system_engineer**: Animation & Island boundary isolation.
- **coder**: Component migration & Route logic.
- **performance_engineer**: Core Web Vitals profiling.
- **tester**: SEO & Animation validation.

## 6. Risk Assessment
- **Hydration Mismatch**: Mitigated via `useIsomorphicLayoutEffect` and dynamic imports for Canvas elements.
- **Thin Content**: Mitigated via content threshold checks in the metadata generator.
- **Layout Shift**: Mitigated via explicit aspect-ratio placeholders for animated sections.

## 7. Success Criteria
- 100/100 Lighthouse SEO Score.
- Fully automated sitemap and robots.txt.
- LCP < 2.5s and CLS < 0.1.
- Regional metadata visible in pre-rendered source HTML.
