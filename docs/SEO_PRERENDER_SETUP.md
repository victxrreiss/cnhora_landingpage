# Prerender setup (opt-in)

The static SEO fixes already in this branch (meta tags, JSON-LD, robots.txt, sitemap.xml, per-route Helmet) work for Googlebot, which executes JavaScript before indexing. To also serve real HTML to **non-rendering crawlers** (Bing, DuckDuckGo, WhatsApp/Slack/iMessage/X/LinkedIn/Facebook unfurlers, AI search), the four routes must be prerendered into static HTML at build time.

`src/main.jsx` already detects prerendered HTML and uses `hydrateRoot`; otherwise it falls back to `createRoot`. So enabling prerendering is purely additive — nothing breaks if you skip this step.

Pick one of two options below.

## Option A — `@prerenderer/rollup-plugin` (recommended for Vite 6 + React 18)

Maintained, works with the existing `vite build`, integrates as a Vite plugin.

```bash
npm install -D @prerenderer/rollup-plugin @prerenderer/renderer-puppeteer puppeteer
```

Add to `vite.config.js`:

```js
import prerender from '@prerenderer/rollup-plugin'

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/privacidade', '/lgpd', '/termos'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 1500, // wait for GSAP/Three.js initial paint
        headless: 'new',
      },
      postProcess(renderedRoute) {
        // Skip Three.js canvas content from prerender (GPU-dependent)
        renderedRoute.html = renderedRoute.html.replace(
          /<canvas[^>]*>[\s\S]*?<\/canvas>/g,
          '<canvas></canvas>'
        )
        return renderedRoute
      },
    }),
  ],
})
```

Then `npm run build` produces `dist/index.html`, `dist/privacidade/index.html`, `dist/lgpd/index.html`, `dist/termos/index.html` — each with full rendered HTML.

## Option B — `react-snap` (simpler, but unmaintained since 2020)

```bash
npm install -D react-snap
```

Add to `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "include": ["/", "/privacidade", "/lgpd", "/termos"],
    "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"],
    "skipThirdPartyRequests": true,
    "minifyHtml": { "collapseWhitespace": false, "removeComments": true }
  }
}
```

`react-snap` is simpler to wire up but has known issues with React 18's `hydrateRoot` and may emit hydration mismatches with Three.js-heavy pages.

## After enabling

1. Run `npm run build` and inspect `dist/privacidade/index.html` — it should contain the rendered policy text, not an empty `<div id="root">`.
2. Verify the four routes still hydrate cleanly in the browser (no React mismatch warnings).
3. Confirm Vercel serves the prerendered files: with the catch-all rewrite in `vercel.json`, Vercel evaluates the filesystem first, so `/privacidade` → `dist/privacidade/index.html` before the rewrite kicks in.
4. Test social previews with https://opengraph.dev or X/LinkedIn/WhatsApp. They should now show the full OG card on every route.

## Known interaction risks

- **Three.js + GSAP scroll-pinned timelines**: the prerendered DOM captures the initial state. If Three.js mutates the DOM during `renderAfterTime`, the snapshot may differ from a freshly-loaded page. The `postProcess` hook above strips `<canvas>` content as a defensive measure.
- **WhatsApp number / social URLs**: `src/components/layout/Footer.jsx:89,92` and `src/components/ui/WhatsAppSign.jsx:5` still reference placeholder URLs (`https://instagram.com`, `https://wa.me`, `5511999999999`). Replace with real handles before going live so JSON-LD `sameAs` and OG cards reflect actual data.
- **Stub policy pages**: `/privacidade`, `/lgpd`, `/termos` ship `noindex,follow`. Once full policy text is published, change `<meta name="robots" content="noindex,follow">` to `<meta name="robots" content="index,follow">` in `src/pages/{Privacidade,LGPD,Termos}.jsx`.

## Migration to `cnhora.com`

When you cut over from `cnhora.com.br` to `cnhora.com`, search-and-replace the host in:

- `index.html` (canonical, OG, Twitter, JSON-LD `@id`s)
- `public/robots.txt` (Sitemap line)
- `public/sitemap.xml` (all `<loc>` entries)
- `src/App.jsx` (canonical, OG)
- `src/pages/{Privacidade,LGPD,Termos}.jsx` (canonical, OG)

And configure 301 redirects from `cnhora.com.br/*` to `cnhora.com/*` at the DNS/Vercel level so existing search equity transfers.
