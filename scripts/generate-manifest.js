#!/usr/bin/env node

import { readdir, writeFile, mkdir, copyFile } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, dirname, join } from 'path'

const POST_DIR = 'posts';
const PUBLIC_DIR = 'public/posts';
const MANIFEST_FILE = 'src/generated/posts-manifest.ts';

async function createExpectedDirectories(manifestDir, postDir, publicDir) {
  const dirs = [
    manifestDir ?? dirname(MANIFEST_FILE),
    postDir ?? POST_DIR,
    publicDir ?? PUBLIC_DIR
  ].map(dir => resolve(dir));

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      console.log('📂 Creating directory:', dir)
      await mkdir(dir, { recursive: true })
    }
  }
}

async function copyPostFilesToPublic(postDir, publicDir) {
    const sourceDir = resolve(postDir ?? POST_DIR);
    const targetDir = resolve(publicDir ?? PUBLIC_DIR);

    const postSlugs = [];

    const files = await readdir(sourceDir)
    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        postSlugs.push(slug);

        const sourcePath = join(sourceDir, file);
        const targetPath = join(targetDir, file);
        await copyFile(sourcePath, targetPath)
      }
    }

    return postSlugs;
}




async function createListOfPostsForWebsite() {
  try {
    console.log('🔄 Pre-build: Generating posts manifest...')

    await createExpectedDirectories()

    const postSlugs = await copyPostFilesToPublic()
    if (postSlugs.length === 0) {
      console.warn('⚠️ No posts found in the posts directory. Manifest will be empty.')
    }

    const manifestContent =
    `// Auto-generated file - do not edit manually
// Generated at build time from posts directory

export const postSlugs = ${JSON.stringify(postSlugs, null, 2)} as const

export type PostSlug = typeof postSlugs[number]
`
    const manifestPath = resolve(MANIFEST_FILE)
    await createExpectedDirectories(dirname(manifestPath));
    await writeFile(manifestPath, manifestContent)

    console.log(`✅ Generated posts manifest with ${postSlugs.length} posts:`, postSlugs)
  } catch (error) {
    console.error('❌ Failed to generate posts manifest:', error)
    process.exit(1)
  }
}

createListOfPostsForWebsite()
