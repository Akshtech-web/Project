import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

// Plugin to copy public/ files into dist/ after build
function copyPublicPlugin() {
  return {
    name: 'copy-public',
    closeBundle() {
      const src = 'public'
      const dest = 'dist'
      try {
        mkdirSync(dest, { recursive: true })
        const files = readdirSync(src)
        for (const file of files) {
          const srcPath = join(src, file)
          const destPath = join(dest, file)
          if (statSync(srcPath).isFile()) {
            copyFileSync(srcPath, destPath)
          }
        }
      } catch (_) { /* public dir may not exist */ }
    }
  }
}

// Plugin to write correct _routes.json so images/static assets are served directly
function routesJsonPlugin() {
  return {
    name: 'write-routes-json',
    closeBundle() {
      mkdirSync('dist', { recursive: true })
      const routes = {
        version: 1,
        include: ['/*'],
        exclude: ['/static/*', '/*.png', '/*.jpg', '/*.jpeg', '/*.gif', '/*.ico', '/*.svg', '/*.webp', '/*.woff2', '/*.woff', '/*.ttf']
      }
      writeFileSync('dist/_routes.json', JSON.stringify(routes))
    }
  }
}

export default defineConfig({
  plugins: [
    build(),
    copyPublicPlugin(),
    routesJsonPlugin(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
