# Roadmap SEO — CNHora

> Sincronizado com o Notion: [Roadmap SEO — CNHora](https://www.notion.so/3575b8dbfd878139813dfc14eb5f87a2) e tasks no [Kanban — CN Hora](https://www.notion.so/3535b8dbfd8781989783d7dde891f894) (filtre por Área = "Landing" + prefixo "SEO:" no título).

## TL;DR

O trabalho técnico-base está **shipado** (branch `dev`, 2 commits). A landing tem indexação completa pra crawlers que renderizam JS (Googlebot) e não-renderizam (Bing, WhatsApp, Slack, X, LinkedIn, AI search).

SEO técnico **abre a porta** — não ranqueia. Pra aparecer primeiro no Google em buscas de valor, o caminho é **conteúdo regional + autoridade**, e isso depende do app sair do pre-release.

## Fase 0 — Foundation (DONE)

Commits no `dev`:
- `20ec442` — meta + JSON-LD + robots + sitemap + per-route Helmet + 404 + Footer Links + Hero IDs + H1 keyword + code-split chunks + favicons + og-image
- `23c3192` — prerender (puppeteer) + dedupe canonical/robots/og:url + Instagram `cnhoraoficial` + JSON-LD `sameAs`
- (próximo commit) — Service JSON-LD com `areaServed: Brasil` + sitemap build-time module + GSC/GA4 placeholders

## Fase 1 — Pre-release (atual)

**Objetivo:** capturar leads e construir autoridade ANTES de ter app público.

| Prioridade | Item | Status | Owner |
|---|---|---|---|
| P0 | Google Search Console + GA4 (criar contas) | Backlog | Gabriel |
| P0 | Google Business Profile pras cidades onde houver representação | Backlog | A definir |
| P0 | Definir stack de waitlist (Mailchimp/Brevo/Supabase/Tally) | Backlog | Gabriel |
| P0 | Implementar formulário de waitlist | Bloqueado | Gabriel |
| P1 | Estrutura de blog (rotas, schema Article, RSS) | Backlog | Gabriel |
| P1 | Drafting de 5-10 artigos âncora | Backlog | A definir |
| P1 | Texto definitivo das policies + revisão jurídica | Bloqueado | Dario |
| P1 | Decidir cutover `cnhora.com.br` → `cnhora.com` (timing) | Backlog | Gabriel |
| P1 | WhatsApp number real | Bloqueado | Gabriel |
| P1 | Code-split dinâmico do Three.js (LCP) | Backlog | Gabriel |
| P2 | OG image arte definitiva | Bloqueado | Bahia |

⛔ **NÃO publicar páginas regionais nesta fase.** Sem dado real = thin content = banimento algorítmico.

## Fase 2 — Pós-launch

**Trigger:** ≥30 cidades com instrutor ativo cadastrado.

| Prioridade | Item |
|---|---|
| P1 | Migração Vite → Next.js 14 App Router |
| P0 | Sistema de páginas regionais `/[uf]/[cidade]` com ISR |
| P0 | Thin content gate (só indexa cidades com X+ instrutores) |
| P1 | Importer IBGE (5.570 municípios) |
| P1 | Schema `LocalBusiness`/`Service` por cidade |
| P1 | Sitemap chunked dinâmico (50k URLs por sitemap) |

## Fase 3 — Crescimento (3-12 meses pós-launch)

| Prioridade | Item |
|---|---|
| P1 | Coleta sistemática de reviews pós-CNH |
| P2 | Backlinks regionais e PR (jornais locais, blogs de auto) |
| P2 | E-E-A-T: artigos co-assinados por instrutores reais |

## Decisões em aberto

1. **Stack de waitlist** — qual ferramenta?
2. **Trigger pra Next.js migration** — confirmar threshold (sugestão: ≥30 cidades)
3. **Slug regional** — `/sp/sao-paulo` (recomendado) vs `/sao-paulo-sp` vs `/sao-paulo`
4. **Cutover de domínio** — fazer ANTES de criar páginas regionais

## Referências

- Audit completo: Maestro SEO audit (2026-05-04)
- Plano técnico Next.js: [`SEO_ESTRATEGIA_MIGRACAO.md`](../SEO_ESTRATEGIA_MIGRACAO.md)
- Setup prerender: [`docs/SEO_PRERENDER_SETUP.md`](./SEO_PRERENDER_SETUP.md)
