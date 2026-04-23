# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the CNHora landing page fully responsive on mobile by adding a hamburger menu to the Navbar, replacing the AppShowcase phone mockup with native-style cards on mobile, and polishing the hero animation and global layout.

**Architecture:** All changes are additive — new CSS inside `@media (max-width: 1024px)` blocks and new JSX alongside existing markup. The GSAP timeline already has a complete mobile branch (no pin on mobile); Three.js is already disabled on mobile. No structural refactors are needed.

**Tech Stack:** React 18 JSX, Tailwind CSS v3, plain CSS media queries in `src/index.css`, GSAP 3 (mobile branch already exists).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/layout/Navbar.jsx` | Modify | Add `isMenuOpen` state + hamburger button + mobile drawer |
| `src/index.css` | Modify | (1) Mobile drawer CSS, (2) AppShowcase mobile card CSS, (3) Hero animation polish |
| `src/components/sections/Hero.jsx` | Modify | Add `showcaseMobileCardRefs` + mobile cards JSX inside `showcaseRef` |

> **Do not touch:** GSAP mobile branch logic, Three.js setup, desktop layout of any class, `SHOWCASE_TOPICS` data, existing media query blocks (only append to them or add new rules after).

---

## Task 1: Navbar — Hamburger Menu

**Files:**
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Read Navbar.jsx**

Read `src/components/layout/Navbar.jsx` (80 lines) to confirm current structure. Verify `isScrolled` state exists, nav has `fixed top-0 w-full z-50`, and `hidden md:flex` desktop links div ends at line ~72.

- [ ] **Step 2: Add `isMenuOpen` state and hamburger button to Navbar.jsx**

Find the `const [isScrolled, setIsScrolled] = useState(false);` line. Add `isMenuOpen` immediately after it:

```jsx
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
```

Then find the closing `</div>` of the `max-w-7xl` flex container (after the `hidden md:flex` div, around line 73), and insert the hamburger button + drawer before it:

```jsx
        {/* Mobile hamburger button */}
        <button
          className="md:hidden mobile-hamburger"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
```

Then find the closing `</nav>` tag and insert the drawer just before it (outside the `max-w-7xl` div but inside `<nav>`):

```jsx
      {/* Mobile navigation drawer */}
      {isMenuOpen && (
        <div className="mobile-nav-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#cta"
            className="btn-nav-primary mobile-nav-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            Começar grátis
          </a>
        </div>
      )}
```

- [ ] **Step 3: Add mobile drawer CSS to `src/index.css`**

Find the `/* ===== RESPONSIVE =====` comment block (around line 664). Append the following new block at the very end of the file, after the last existing `@media` rule:

```css
/* ── Mobile Navigation Drawer ── */

.mobile-hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.15s;
  flex-shrink: 0;
}

.mobile-hamburger:hover {
  background: rgba(255, 255, 255, 0.08);
}

.mobile-nav-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 10, 25, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.5rem 1.25rem;
  z-index: 49;
}

.mobile-nav-link {
  display: block;
  padding: 0.9rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(200, 220, 255, 0.8);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: color 0.15s;
}

.mobile-nav-link:hover {
  color: #fff;
}

.mobile-nav-cta {
  margin-top: 0.85rem;
  text-align: center;
  justify-content: center;
  width: 100%;
  display: block;
}
```

- [ ] **Step 4: Verify build**

```bash
cd C:/Users/victo/Dev/cnhora_landingpage && npm run build 2>&1 | tail -5
```

Expected: `✓ built in X.XXs`

---

## Task 2: AppShowcase Mobile Cards — CSS

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Read the existing `@media (max-width: 1024px)` showcase block**

Read `src/index.css` lines 740–770. Confirm `.showcase-layout` has `flex-direction: column` and `.phone-mockup` has `width: 250px; height: 525px`.

- [ ] **Step 2: Add mobile card classes**

Append the following block to `src/index.css`, right after the `.mobile-nav-cta` rule from Task 1:

```css
/* ── AppShowcase Mobile Cards ── */

/* Hidden on desktop — shown only inside the 1024px media query below */
.showcase-mobile-cards {
  display: none;
}

@media (max-width: 1024px) {
  /* Hide the phone mockup and text panel on mobile */
  .showcase-layout .phone-mockup,
  .showcase-layout .showcase-text-panel {
    display: none;
  }

  /* Show mobile cards container */
  .showcase-mobile-cards {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
    padding: 0 0.25rem;
  }

  /* Card shell — matches .hero-feature-card visual style */
  .showcase-mobile-card {
    border-radius: 1.75rem;
    background: rgba(0, 20, 50, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 30px 60px -15px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  /* Screen preview area — shows scaled-down topic.screenContent */
  .showcase-mobile-card-preview {
    height: 200px;
    overflow: hidden;
    border-radius: 1.75rem 1.75rem 0 0;
    position: relative;
  }

  /* Inner scaler — shrinks the screen content to fit the card */
  .showcase-mobile-card-preview-inner {
    position: absolute;
    top: 0;
    left: 50%;
    width: 294px; /* phone-screen-area natural width */
    transform: translateX(-50%) scale(0.62);
    transform-origin: top center;
    pointer-events: none;
  }

  /* Text body below the preview */
  .showcase-mobile-card-body {
    padding: 1.1rem 1.4rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .showcase-mobile-card-body .card-badge {
    align-self: flex-start;
    margin-bottom: 0.15rem;
  }

  .showcase-mobile-card-body h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.3;
    margin: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .showcase-mobile-card-body p {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    margin: 0;
  }
}
```

- [ ] **Step 3: Verify build**

```bash
cd C:/Users/victo/Dev/cnhora_landingpage && npm run build 2>&1 | tail -5
```

Expected: `✓ built in X.XXs`

---

## Task 3: AppShowcase Mobile Cards — JSX

**Files:**
- Modify: `src/components/sections/Hero.jsx`

- [ ] **Step 1: Add `showcaseMobileCardRefs` ref**

Read `src/components/sections/Hero.jsx` lines 220–230. Find:
```jsx
  const showcaseDotRefs = useRef([]);
  const ctaRef = useRef(null);
```

Add the new ref between them:
```jsx
  const showcaseDotRefs = useRef([]);
  const showcaseMobileCardRefs = useRef([]);
  const ctaRef = useRef(null);
```

- [ ] **Step 2: Add mobile cards JSX inside `showcaseRef`**

Read `src/components/sections/Hero.jsx` lines 757–845. Find the `</div>` that closes `.showcase-layout` (after the phone mockup and `.showcase-text-panel` — it's the first `</div>` after the closing `</div>` of `.showcase-text-panel`). The structure looks like:

```jsx
          </div>{/* closes .showcase-text-panel */}
        </div>{/* closes .showcase-layout */}
      </div>{/* closes .showcase-in-hero or showcaseRef */}
```

Insert the mobile cards block between the closing of `.showcase-layout` and the closing of the `showcaseRef` div. Find this exact closing sequence:

```jsx
            </div>
          </div>
        </div>

        {/* CTA Download Section */}
```

Replace with:

```jsx
            </div>
          </div>

          {/* Mobile cards — visible only on mobile, replaces phone mockup */}
          <div className="showcase-mobile-cards">
            {SHOWCASE_TOPICS.map((topic, i) => (
              <div
                key={i}
                ref={el => showcaseMobileCardRefs.current[i] = el}
                className="showcase-mobile-card"
              >
                {/* Screen content preview */}
                <div
                  className="showcase-mobile-card-preview"
                  style={{ background: topic.gradient }}
                >
                  <div className="showcase-mobile-card-preview-inner">
                    {topic.screenContent}
                  </div>
                </div>

                {/* Text body */}
                <div className="showcase-mobile-card-body">
                  <span className="card-badge">{topic.screenLabel}</span>
                  <h3>
                    {topic.titleParts[0]}
                    <span className="highlight">{topic.titleParts[1]}</span>
                    {topic.titleParts[2]}
                  </h3>
                  <p>{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Download Section */}
```

- [ ] **Step 3: Verify build**

```bash
cd C:/Users/victo/Dev/cnhora_landingpage && npm run build 2>&1 | tail -5
```

Expected: `✓ built in X.XXs`

---

## Task 4: Hero Animation + Global CSS Polish

**Files:**
- Modify: `src/index.css`

The orbital rings (`ring-1`, `ring-2`) have hardcoded inline pixel dimensions (380px, 460px) set in Hero.jsx JSX. On mobile the `.hero-animation-group` container is ~320px tall but the rings overflow it. Fix with CSS `!important` overrides inside the existing 1024px block.

- [ ] **Step 1: Read existing 1024px ring/animation rules**

Read `src/index.css` lines 700–725. Confirm:
- `.hero-animation-group` at 1024px: `min-height: 320px; padding: 5.5rem 0 1.5rem`
- `.ring-3` at 1024px: `display: none !important`
- `.logo-container` at 1024px: `width: min(72vw, 260px) !important`
- No existing rules for `.ring-1` or `.ring-2` in this block

- [ ] **Step 2: Add ring size overrides and animation group padding fix**

Find the existing `@media (max-width: 1024px)` block. Locate the `.ring-3 { display: none !important; }` rule. Add the following rules immediately after it:

```css
  /* Constrain ring-1 and ring-2 to fit the mobile container */
  .hero-animation-group .ring-1 {
    width: 200px !important;
    height: 190px !important;
  }

  .hero-animation-group .ring-2 {
    width: 250px !important;
    height: 240px !important;
  }

  /* Reduce excess top padding on animation group */
  .hero-animation-group {
    min-height: 280px !important;
    padding: 4rem 0 1rem !important;
  }
```

- [ ] **Step 3: Fix CTA buttons stacking and logo scale on mobile**

In the same `@media (max-width: 768px)` block (around line 804), find any existing `.cta-buttons` rule. If none exists, append these rules inside the `@media (max-width: 768px)` block:

```css
  /* CTA download section — column layout on mobile */
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .cta-buttons .cta-btn {
    width: 100%;
    justify-content: center;
    max-width: 320px;
  }

  /* Scale down logo wrapper on mobile */
  .cta-logo-wrapper {
    transform: scale(0.75);
    margin-bottom: 1.5rem;
  }
```

- [ ] **Step 4: Verify build**

```bash
cd C:/Users/victo/Dev/cnhora_landingpage && npm run build 2>&1 | tail -5
```

Expected: `✓ built in X.XXs`

---

## Self-Review Checklist

- [x] **Spec coverage:**
  - Navbar hamburger menu with drawer ✓ Task 1
  - Three.js disabled on mobile — already done in codebase, no task needed
  - GSAP pin disabled on mobile — already done in codebase, no task needed
  - AppShowcase phone mockup hidden on mobile ✓ Task 2 (CSS)
  - AppShowcase mobile cards with screen preview + text ✓ Tasks 2 + 3
  - Cards follow `.hero-feature-card` visual style (same border-radius, background, box-shadow) ✓ Task 2
  - Hero animation group rings scaled to mobile ✓ Task 4
  - CTA buttons full-width on mobile ✓ Task 4

- [x] **No placeholders:** All code blocks complete with exact values.

- [x] **Consistency:**
  - `showcaseMobileCardRefs` declared in Task 3 Step 1, used in Task 3 Step 2 ✓
  - `.showcase-mobile-cards` CSS defined in Task 2, JSX class used in Task 3 ✓
  - `.showcase-mobile-card-preview-inner` CSS defined in Task 2, class used in Task 3 ✓
  - `.mobile-nav-drawer` CSS defined in Task 1 Step 3, JSX class used in Task 1 Step 2 ✓

- [x] **Order dependency:** Task 2 (CSS) can be done before Task 3 (JSX) — the class `.showcase-mobile-cards` is harmless to add to CSS before the JSX exists. Tasks 1 and 4 are independent of each other and of Tasks 2–3.
