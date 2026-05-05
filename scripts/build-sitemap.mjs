#!/usr/bin/env node
// Generates public/sitemap.xml from a routes config.
// Runs before vite build (see "prebuild" script in package.json).
// To add routes: edit the `routes` array below — or import a dynamic source
// (e.g. an IBGE-derived city list) when regional pages ship.

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://cnhora.com.br'

const today = new Date().toISOString().slice(0, 10)

/** @type {{ path: string; lastmod?: string; changefreq?: string; priority?: number }[]} */
const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/privacidade', changefreq: 'yearly', priority: 0.3 },
  { path: '/lgpd', changefreq: 'yearly', priority: 0.3 },
  { path: '/termos', changefreq: 'yearly', priority: 0.3 },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const loc = `${SITE_URL}${r.path}`
    const lastmod = r.lastmod ?? today
    const changefreq = r.changefreq ?? 'monthly'
    const priority = r.priority ?? 0.5
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`

const outDir = resolve(ROOT, 'public')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'sitemap.xml'), xml)
console.log(`✓ sitemap.xml written with ${routes.length} routes`)
