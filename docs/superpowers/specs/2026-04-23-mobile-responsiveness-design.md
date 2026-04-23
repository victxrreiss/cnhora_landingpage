# CNHora Landing Page — Mobile Responsiveness Design

**Date:** 2026-04-23  
**Scope:** All sections of `src/` — Navbar, Hero (pinned), Features, AppShowcase, CTA Download, Manifesto, BentoGrid, Security, Expansion, CTA (static), Footer  
**Target breakpoint:** `max-width: 768px` as the primary mobile breakpoint (phones up to ~430px wide)

---

## Core Decisions

| # | Decision |
|---|---|
| 1 | GSAP ScrollTrigger pin **preserved on mobile** — architecture unchanged |
| 2 | Three.js particles reduced **180 → 60** on mobile via `matchMedia` |
| 3 | Navbar gets a **hamburger menu** (drawer slide-down) |
| 4 | AppShowcase phone mockup **hidden on mobile** — replaced by 3 cards |
| 5 | AppShowcase mobile cards follow **existing `.hero-feature-card` visual style** |
| 6 | Sections outside the pin get **single-column layout + responsive typography** |

---

## Section 1: Navbar

**Current state:** Nav links + "Começar grátis" button hidden at `md:` breakpoint via Tailwind `hidden md:flex`. No mobile alternative exists.

**Mobile design:**
- Logo stays visible at left
- Hamburger icon (☰ → ✕) at right, `44×44px` touch target
- Clicking opens a **full-width dropdown** that slides down from the navbar, covering the content below
- Dropdown background: same `glass-nav` style (`rgba(0,10,25,0.85)` + `backdrop-filter: blur(20px)`)
- Links stacked vertically, `padding: 1rem 1.5rem` each, `border-bottom: 1px solid rgba(255,255,255,0.06)`
- "Começar grátis" button at the bottom of the dropdown, full width, orange gradient
- Clicking a link or outside the menu closes the drawer
- State managed with a `isMenuOpen` boolean in `Navbar.jsx`

---

## Section 2: Hero — Initial View

**Current state:** Two-column layout (text left, animated logo right). Three.js canvas full viewport. GSAP pin starts here.

**Mobile design:**
- **Layout:** Single column, centered. Logo animation on top, text below.
- **Logo + rings:** Scale down to 55% via `transform: scale(0.55)` on `.hero-animation-group` — keeps the animation running without re-engineering the ring sizes
- **Three.js:** `matchMedia('(max-width: 768px)')` detected before renderer init → `COUNT = 60` instead of 180. No other Three.js changes.
- **Hero text:** `h1` uses existing `clamp()` — no change needed. Badge, subtitle, stats remain stacked.
- **Stats row:** Already 3 columns — keep as-is, reduce `font-size` slightly via media query
- **Buttons:** `.btn-cta-group` goes from `flex-row` to `flex-column`, full-width buttons
- **Trust badges:** Wrap to 2 columns on mobile

---

## Section 3: Features (inside pin)

**Current state:** Tab switcher (Aluno/Instrutor) + 3 cards side by side, slide in from right via GSAP.

**Mobile design:**
- **Tab switcher:** Full width, both tabs 50/50
- **Cards:** Single column stack, each card `width: 100%`, `max-width: 340px`, centered
- **GSAP animation:** Cards slide in from bottom (`y: '100vh'`) instead of right (`x: '100vw'`) — feels more natural on portrait screens
- **Card height:** Remove fixed `min-height: 400px`, let content define height

---

## Section 4: AppShowcase (inside pin) — Mobile Cards

**Current state:** `.showcase-layout` = phone mockup left + `.showcase-text-panel` right. GSAP crossfades 3 topics.

**Mobile design — complete layout swap via CSS:**

On `max-width: 768px`:
- `.showcase-layout` → `display: none`
- New `.showcase-mobile-cards` container → `display: flex`, `flex-direction: column`, `gap: 1.5rem`, `padding: 1rem`

**Each `.showcase-mobile-card` structure:**
```
┌─────────────────────────────────┐  ← border-radius: 1.75rem (matches hero-feature-card)
│                                 │  ← background: rgba(0,20,50,0.7) + blur(20px)
│   [screen preview — 200px tall] │  ← topic.screenContent rendered at scale(0.45)
│    (topic.gradient background)  │     inside overflow:hidden container
│                                 │
├─────────────────────────────────┤  ← border-top: 1px solid rgba(255,255,255,0.08)
│  ● BADGE  (card-badge style)    │  ← topic screenLabel
│  Title with highlight span      │  ← topic titleParts
│  Description text               │  ← topic desc
└─────────────────────────────────┘
```

**Visual style (matches `.hero-feature-card` exactly):**
- `border-radius: 1.75rem`
- `background: rgba(0, 20, 50, 0.7)` + `backdrop-filter: blur(20px)`
- `border: 1px solid rgba(255,255,255,0.08)`
- `box-shadow: 0 30px 60px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)`
- Top inset highlight: `inset 0 1px 0 rgba(255,255,255,0.1)`

**Screen preview area:**
- Container: `height: 200px`, `overflow: hidden`, `border-radius: 1.75rem 1.75rem 0 0`, background = `topic.gradient`
- Inner div: `transform: scale(0.45)`, `transform-origin: top center`, `width: 222%` (compensates for scale shrink: 1/0.45), `pointer-events: none`
- Renders the same `topic.screenContent` JSX already used in the phone mockup

**GSAP on mobile:** The 3 new card refs (`showcaseMobileCardRefs`) are wired to the same timeline positions as the text crossfades (11–16). Each card does a `fromTo opacity + y` scroll reveal instead of the phone screen crossfade. The phone-specific refs (`showcaseScreenRefs`) are not animated on mobile (their parent `.showcase-layout` is `display:none`).

**Showcase header** ("O app que trabalha por você" + subtitle): kept visible above the cards, no change needed — already stacks well.

**Dots navigation:** Hidden on mobile (`.showcase-dots { display: none }` at 768px) — cards are always visible so dot indicators aren't needed.

---

## Section 5: CTA Download (inside pin)

**Current state:** Centered column layout — already works well on mobile structurally.

**Mobile adjustments (CSS only):**
- `.cta-logo-wrapper`: scale rings via `transform: scale(0.7)`
- `.cta-title`: `font-size` floor reduced from `2rem` to `1.6rem` in the `clamp()`
- `.cta-buttons`: already `flex-wrap: wrap` — add `flex-direction: column` + `width: 100%` on buttons at mobile
- `margin-bottom` on `.cta-logo-wrapper` reduced from `3.5rem` to `2rem`

---

## Section 6: Sections Outside the Pin (Manifesto, BentoGrid, Security, Expansion, CTA static, Footer)

These sections use Tailwind classes. Mobile adjustments are CSS/Tailwind media query additions per section:

- **Manifesto:** Single column text, `h2` font-size via `clamp`, `padding` reduced
- **BentoGrid:** Grid collapses to 1 column (`grid-cols-1`), cards full-width
- **Security:** Two-column layout → single column stacked
- **Expansion:** Text + image → image on top, text below (or image hidden)
- **CTA (static):** Button group → column, full-width buttons
- **Footer:** Already has `md:grid-cols-2 lg:grid-cols-4` — add `gap` reduction and smaller logo on mobile

> **Note:** These sections will be explored in detail during implementation. If a section already looks correct on mobile, no changes will be made (YAGNI).

---

## Files to Modify

| File | Changes |
|---|---|
| `src/components/layout/Navbar.jsx` | Add `isMenuOpen` state, hamburger button, mobile drawer JSX |
| `src/index.css` | Add `@media (max-width: 768px)` rules for all affected classes |
| `src/components/sections/Hero.jsx` | `matchMedia` for Three.js count; new `showcaseMobileCardRefs`; GSAP mobile branch for AppShowcase; `scale` on animation group |
| `src/components/sections/Features.jsx` | Adjust GSAP animation direction (x→y) on mobile via `matchMedia` |
| `src/components/sections/Manifesto.jsx` | Responsive CSS additions |
| `src/components/sections/BentoGrid.jsx` | Responsive CSS / Tailwind additions |
| `src/components/sections/Security.jsx` | Responsive CSS additions |
| `src/components/sections/Expansion.jsx` | Responsive CSS additions |

> `Footer.jsx` and `CTA.jsx` already partially responsive — minor tweaks only.

---

## What is NOT changing

- Three.js canvas architecture (only `COUNT` changes)
- GSAP timeline positions and timing
- Desktop layout of any section
- Phone mockup CSS (only hidden on mobile, not modified)
- All existing CSS classes — new mobile rules are additive only (inside `@media` blocks)
