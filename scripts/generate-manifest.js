#!/usr/bin/env node

import { readdir, writeFile, mkdir, copyFile } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, dirname, join } from 'path'

async function generateManifest() {
  try {
    console.log('🔄 Pre-build: Generating posts manifest...')
    
    // Generate posts manifest during build
    const postsDir = resolve('posts')
    const publicPostsDir = resolve('public/posts')
    const manifestPath = resolve('src/generated/posts-manifest.ts')

    // Ensure the generated directory exists
    const generatedDir = dirname(manifestPath)
    if (!existsSync(generatedDir)) {
      console.log('📂 Creating generated directory:', generatedDir)
      await mkdir(generatedDir, { recursive: true })
    }

    // Ensure the public/posts directory exists
    if (!existsSync(publicPostsDir)) {
      console.log('📂 Creating public/posts directory:', publicPostsDir)
      await mkdir(publicPostsDir, { recursive: true })
    }

    // Read all markdown files from posts directory
    const postSlugs = []

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
    console.log(`✅ Generated posts manifest with ${postSlugs.length} posts:`, postSlugs)
  } catch (error) {
    console.error('❌ Failed to generate posts manifest:', error)
    process.exit(1)
  }
}

generateManifest()
