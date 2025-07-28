import type { Plugin } from 'vite'
import { readdir, writeFile, mkdir, copyFile } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, dirname, join } from 'path'

export function generatePostsManifest(): Plugin {
  const generateManifest = async () => {
    try {
      // Generate posts manifest during build
      const postsDir = resolve('posts')
      const publicPostsDir = resolve('public/posts')
      const manifestPath = resolve('src/generated/posts-manifest.ts')

      // Ensure the generated directory exists
      const generatedDir = dirname(manifestPath)
      if (!existsSync(generatedDir)) {
        await mkdir(generatedDir, { recursive: true })
      }

      // Ensure the public/posts directory exists
      if (!existsSync(publicPostsDir)) {
        await mkdir(publicPostsDir, { recursive: true })
      }

      // Read all markdown files from posts directory
      const postSlugs: string[] = []

      if (existsSync(postsDir)) {
        const files = await readdir(postsDir)
        for (const file of files) {
          if (file.endsWith('.md')) {
            const slug = file.replace('.md', '')
            postSlugs.push(slug)

            // Copy post to public directory
            const sourcePath = join(postsDir, file)
            const targetPath = join(publicPostsDir, file)
            await copyFile(sourcePath, targetPath)
          }
        }
      }

      // Sort slugs alphabetically for consistency
      postSlugs.sort()

      // Generate the manifest file
      const manifestContent = `// Auto-generated file - do not edit manually
// Generated at build time from posts directory

export const postSlugs = ${JSON.stringify(postSlugs, null, 2)} as const

export type PostSlug = typeof postSlugs[number]
`

      await writeFile(manifestPath, manifestContent)
      console.log(`Generated posts manifest with ${postSlugs.length} posts:`, postSlugs)
    } catch (error) {
      console.error('Failed to generate posts manifest:', error)
    }
  }

  return {
    name: 'generate-posts-manifest',
    async buildStart() {
      await generateManifest()
    },
    configureServer(server) {
      // Generate during dev server startup
      generateManifest()

      // Watch for changes in posts directory during development
      const postsDir = resolve('posts')
      server.watcher.add(postsDir)
      server.watcher.on('add', (filePath) => {
        if (filePath.startsWith(postsDir) && filePath.endsWith('.md')) {
          console.log('New post detected, regenerating manifest...')
          generateManifest()
        }
      })
      server.watcher.on('unlink', (filePath) => {
        if (filePath.startsWith(postsDir) && filePath.endsWith('.md')) {
          console.log('Post removed, regenerating manifest...')
          generateManifest()
        }
      })
    }
  }
}
