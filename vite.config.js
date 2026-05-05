import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import prerender from '@prerenderer/rollup-plugin'

const HELMET_OVERRIDABLE_TAGS = [
  { tag: 'link', attr: 'rel', value: 'canonical' },
  { tag: 'meta', attr: 'name', value: 'robots' },
  { tag: 'meta', attr: 'name', value: 'description' },
  { tag: 'meta', attr: 'property', value: 'og:url' },
  { tag: 'meta', attr: 'property', value: 'og:title' },
  { tag: 'meta', attr: 'property', value: 'og:description' },
  { tag: 'meta', attr: 'property', value: 'og:type' },
  { tag: 'meta', attr: 'property', value: 'og:image' },
  { tag: 'meta', attr: 'name', value: 'twitter:title' },
  { tag: 'meta', attr: 'name', value: 'twitter:description' },
  { tag: 'meta', attr: 'name', value: 'twitter:image' },
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/privacidade', '/lgpd', '/termos'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 1500,
        headless: true,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
      postProcess(renderedRoute) {
        let html = renderedRoute.html

        html = html.replace(
          /<canvas[^>]*>[\s\S]*?<\/canvas>/g,
          '<canvas></canvas>'
        )

        // Dedupe: when Helmet (data-rh="true") emits a per-route tag, drop the
        // static counterpart from index.html so crawlers see a single value.
        for (const { tag, attr, value } of HELMET_OVERRIDABLE_TAGS) {
          const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const helmetRe = new RegExp(
            `<${tag}\\s+${attr}="${escaped}"[^>]*data-rh="true"`
          )
          if (helmetRe.test(html)) {
            const staticRe = new RegExp(
              `\\s*<${tag}\\s+${attr}="${escaped}"(?![^>]*data-rh)[^>]*>`,
              'g'
            )
            html = html.replace(staticRe, '')
          }
        }

        renderedRoute.html = html
        return renderedRoute
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          three: ['three'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
