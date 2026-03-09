import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs'
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

export default defineConfig({
  plugins: [
    build(),
    copyPublicPlugin(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
