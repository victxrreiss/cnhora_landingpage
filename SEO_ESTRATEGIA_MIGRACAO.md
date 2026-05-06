# Estratégia de SEO e Plano de Migração: CNHora

Este documento detalha o plano de ação para transformar a landing page do CNHora em uma plataforma otimizada para busca orgânica e crescimento regional, migrando de uma arquitetura **React CSR (Client-Side Rendering)** para **Next.js SSR/SSG (Server-Side Rendering / Static Site Generation)**.

---

## 1. Análise do Status Atual e Motivação

Atualmente, o projeto utiliza Vite + React. Embora seja excelente para desenvolvimento e animações fluidas, apresenta barreiras para SEO:
*   **Dependência de JS**: O conteúdo só aparece após a execução do JavaScript. Motores de busca (Google, Bing) podem demorar mais para indexar ou interpretar incorretamente o conteúdo.
*   **Infraestrutura Manual**: A gestão de tags via `react-helmet-async` é limitada para rotas dinâmicas em escala.
*   **Ausência de Ativos Críticos**: Não há `sitemap.xml` ou `robots.txt` automatizados.

---

## 2. A Solução: Arquitetura de "Ilhas" em Next.js

A proposta é migrar para o **Next.js App Router**, separando o conteúdo estático (SEO) da interatividade (Animações).

### O que são "Ilhas" de Hidratação?
Em vez de carregar o site inteiro como um aplicativo pesado, entregamos um HTML estático rápido. Apenas as partes complexas (como o Hero 3D com Three.js ou as animações de scroll com GSAP) são "hidratadas" com JavaScript no navegador.

---

## 3. O Plano de Implementação (5 Fases)

### Fase 1: Fundação e Infraestrutura SEO
*   **Ação**: Configuração do scaffold Next.js e da API de Metadados.
*   **Motivo**: Estabelecer a base técnica onde o Google recebe HTML puro no primeiro byte.
*   **Entregável**: `robots.txt` configurado e `layout.tsx` com suporte a PT-BR e Open Graph (redes sociais).

### Fase 2: Componentes de Servidor (RSC)
*   **Ação**: Refatorar Navbar, Footer e Seções de texto para *Server Components*.
*   **Motivo**: Garantir que 100% dos textos e palavras-chave estejam no HTML inicial, sem depender de JS.
*   **Trade-off**: Perda de interatividade imediata nesses componentes (não podem ter `onClick` ou `useState` diretamente, a menos que sejam divididos).

### Fase 3: Isolamento de Animações (Client Islands)
*   **Ação**: Isolar o WebGL (Three.js) e o GSAP em componentes com a diretiva `"use client"`.
*   **Motivo**: Manter a estética "tech-forward" sem quebrar o renderizador do servidor (SSR).
*   **Trade-off**: Maior complexidade na passagem de dados do servidor para o cliente para evitar "flickers" (flashes de conteúdo não estilizado).

### Fase 4: Rotas Regionais Dinâmicas (SSG)
*   **Ação**: Criar o sistema de rotas `app/[cidade]/page.tsx`.
*   **Motivo**: Permitir que o CNHora apareça para buscas como "Autoescola em Campinas" ou "Instrutor em BH" com páginas únicas e otimizadas.
*   **Estratégia**: Uso de `generateStaticParams` para criar milhares de páginas em tempo de build.

### Fase 5: Automação e Auditoria Final
*   **Ação**: Implementar `sitemap.ts` dinâmico e JSON-LD (Schema.org).
*   **Motivo**: Informar ao Google exatamente o que é o serviço (LocalBusiness) e garantir que todas as cidades sejam descobertas.

---

## 4. Trade-offs da Migração

| Decisão | Vantagem (Pró) | Desvantagem (Contra) |
| :--- | :--- | :--- |
| **Migrar para Next.js** | Performance de carregamento (LCP) e indexação imediata. | Curva de aprendizado e necessidade de refatorar hooks de animação. |
| **Arquitetura de Ilhas** | Site leve e rápido mesmo com 3D pesado. | Necessidade de dividir componentes em "Puro HTML" e "Interativo". |
| **SSG (Geração Estática)** | Custo de servidor quase zero e velocidade máxima. | Build do projeto fica mais lento à medida que o número de cidades cresce. |
| **Foco em Crescimento Regional** | Captura tráfego de alta conversão por localização. | Exige gestão de dados (nomes de cidades, slugs) para evitar conteúdo duplicado. |

---

## 5. Critérios de Sucesso
1.  **Lighthouse SEO**: Nota 100/100.
2.  **Core Web Vitals**: LCP (Largest Contentful Paint) abaixo de 2.5 segundos.
3.  **Indexação**: Presença de metadados específicos no código-fonte (`view-source`) sem necessidade de habilitar JS.
4.  **Sitemap**: Arquivo XML gerado automaticamente contendo todas as rotas regionais.
