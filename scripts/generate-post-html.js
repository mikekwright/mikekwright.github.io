#!/usr/bin/env node

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, join } from 'path'
import matter from 'gray-matter'

const POSTS_PER_PAGE = 10

async function generatePostHtmlFiles() {
  try {
    console.log('🔄 Post-build: Generating individual HTML files and pagination...')

    const postsDir = resolve('posts')
    const distDir = resolve('dist')
    const distPostsDir = join(distDir, 'post')
    const distPageDir = join(distDir, 'page')
    const indexHtmlPath = join(distDir, 'index.html')

    console.log(`📁 Posts directory: ${postsDir}`)
    console.log(`📁 Dist directory: ${distDir}`)
    console.log(`📁 Index HTML path: ${indexHtmlPath}`)

    // Read the main index.html template
    if (!existsSync(indexHtmlPath)) {
      console.error('❌ Main index.html not found in dist directory')
      return
    }

    const indexHtmlTemplate = await readFile(indexHtmlPath, 'utf-8')

    // Ensure directories exist
    if (!existsSync(distPostsDir)) {
      console.log('📂 Creating dist/post directory:', distPostsDir)
      await mkdir(distPostsDir, { recursive: true })
    }

    if (!existsSync(distPageDir)) {
      console.log('📂 Creating dist/page directory:', distPageDir)
      await mkdir(distPageDir, { recursive: true })
    }

    if (!existsSync(postsDir)) {
      console.warn('⚠️ Posts directory does not exist!')
      return
    }

    const files = await readdir(postsDir)
    let processedPosts = 0
    const postData = []

    // Process individual posts
    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '')
        console.log(`📄 Processing post: ${slug}`)

        // Read and parse the markdown file
        const postPath = join(postsDir, file)
        const markdownContent = await readFile(postPath, 'utf-8')
        const { data: frontmatter } = matter(markdownContent)

        // Store post data for pagination and sitemap
        postData.push({
          slug,
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          title: frontmatter.title || 'Blog Post',
          category: frontmatter.category || 'General',
          tags: frontmatter.tags || [],
          excerpt: frontmatter.excerpt || ''
        })

        // Create post-specific HTML
        const postHtml = generatePostHtml(indexHtmlTemplate, slug, frontmatter)

        // Create directory for the post
        const postDir = join(distPostsDir, slug)
        if (!existsSync(postDir)) {
          await mkdir(postDir, { recursive: true })
        }

        // Write the HTML file
        const postHtmlPath = join(postDir, 'index.html')
        await writeFile(postHtmlPath, postHtml)

        console.log(`✅ Generated HTML for post: ${slug}`)
        processedPosts++
      }
    }

    // Sort posts by date (newest first)
    postData.sort((a, b) => new Date(b.date) - new Date(a.date))

    // Generate pagination pages
    await generatePaginationPages(distDir, distPageDir, indexHtmlTemplate, postData)

    // Generate sitemap.xml
    await generateSitemap(distDir, postData)

    // Generate robots.txt
    await generateRobots(distDir)

    console.log(`🎉 Generated ${processedPosts} individual post HTML files and pagination`)
  } catch (error) {
    console.error('❌ Failed to generate post HTML files:', error)
    process.exit(1)
  }
}

async function generatePaginationPages(distDir, distPageDir, template, postData) {
  try {
    console.log('📄 Generating pagination pages...')

    const totalPosts = postData.length
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    console.log(`📊 Total posts: ${totalPosts}, Posts per page: ${POSTS_PER_PAGE}, Total pages: ${totalPages}`)

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const startIndex = (pageNum - 1) * POSTS_PER_PAGE
      const endIndex = startIndex + POSTS_PER_PAGE
      const pageData = postData.slice(startIndex, endIndex)

      // Generate page-specific HTML
      const pageHtml = generatePageHtml(template, pageNum, totalPages, pageData)

      // Create directory for the page
      const pageDir = join(distPageDir, pageNum.toString())
      if (!existsSync(pageDir)) {
        await mkdir(pageDir, { recursive: true })
      }

      // Write the HTML file
      const pageHtmlPath = join(pageDir, 'index.html')
      await writeFile(pageHtmlPath, pageHtml)

      console.log(`✅ Generated pagination page ${pageNum}/${totalPages}`)
    }
  } catch (error) {
    console.error('❌ Failed to generate pagination pages:', error)
  }
}

function generatePageHtml(template, pageNum, totalPages, pageData) {
  // Extract metadata for the page
  const title = pageNum === 1
    ? 'Mike Wright - Software Engineer & Tech Enthusiast'
    : `Mike Wright - Page ${pageNum} - Software Engineer & Tech Enthusiast`

  const description = pageNum === 1
    ? "Mike Wright's personal blog - thoughts on software engineering, technology, and continuous learning"
    : `Mike Wright's personal blog - Page ${pageNum} - thoughts on software engineering, technology, and continuous learning`

  const siteUrl = 'https://mikewright.me'
  const pageUrl = pageNum === 1 ? siteUrl : `${siteUrl}/page/${pageNum}/`

  // Update the HTML template with page-specific meta tags
  let pageHtml = template

  // Fix asset paths for pagination pages (need to go up levels based on page structure)
  if (pageNum > 1) {
    pageHtml = pageHtml.replace(/src="\.\//g, 'src="../../')
    pageHtml = pageHtml.replace(/href="\.\//g, 'href="../../')
    pageHtml = pageHtml.replace(/icon.*?href="\/vite\.svg"/g, 'icon" type="image/svg+xml" href="../../vite.svg"')
  }

  // Update title
  pageHtml = pageHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${title}</title>`
  )

  // Update meta description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(description)}"`
  )

  // Add pagination-specific meta tags
  const metaTags = `
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:site_name" content="Mike Wright - Software Engineer">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${pageUrl}">
    <meta property="twitter:title" content="${escapeHtml(title)}">
    <meta property="twitter:description" content="${escapeHtml(description)}">
    <meta property="twitter:creator" content="@mikekwright">

    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}">

    <!-- Pagination -->
    ${pageNum > 1 ? `<link rel="prev" href="${pageNum === 2 ? siteUrl : siteUrl + '/page/' + (pageNum - 1) + '/'}">` : ''}
    ${pageNum < totalPages ? `<link rel="next" href="${siteUrl}/page/${pageNum + 1}/">` : ''}`

  // Insert meta tags before closing head tag
  pageHtml = pageHtml.replace(
    /<\/head>/i,
    `${metaTags}\n  </head>`
  )

  return pageHtml
}

function generatePostHtml(template, slug, frontmatter) {
  // Extract title, description, and other meta info
  const title = frontmatter.title || 'Blog Post'
  const description = frontmatter.excerpt || 'A blog post by Mike Wright'
  const date = frontmatter.date || new Date().toISOString().split('T')[0]
  const category = frontmatter.category || 'General'
  const tags = frontmatter.tags || []
  const author = 'Mike Wright'
  const siteName = 'Mike Wright - Software Engineer'
  const siteUrl = 'https://mikewright.me'
  const postUrl = `${siteUrl}/post/${slug}`

  // Update the HTML template with post-specific meta tags
  let postHtml = template

  // Fix asset paths to be relative to the post directory (need to go up two levels: /post/slug/ -> /)
  postHtml = postHtml.replace(/src="\.\//g, 'src="../../')
  postHtml = postHtml.replace(/href="\.\//g, 'href="../../')
  postHtml = postHtml.replace(/icon.*?href="\/vite\.svg"/g, 'icon" type="image/svg+xml" href="../../vite.svg"')

  // Update title
  postHtml = postHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${title} - ${siteName}</title>`
  )

  // Update meta description
  postHtml = postHtml.replace(
    /<meta name="description" content=".*?"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(description)}"`
  )

  // Add Open Graph and Twitter Card meta tags
  const metaTags = `
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${postUrl}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:site_name" content="${siteName}">
    <meta property="article:author" content="${author}">
    <meta property="article:published_time" content="${date}">
    <meta property="article:section" content="${category}">
    ${tags.map(tag => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n    ')}

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${postUrl}">
    <meta property="twitter:title" content="${escapeHtml(title)}">
    <meta property="twitter:description" content="${escapeHtml(description)}">
    <meta property="twitter:creator" content="@mikekwright">

    <!-- Canonical URL -->
    <link rel="canonical" href="${postUrl}">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${escapeHtml(title)}",
      "description": "${escapeHtml(description)}",
      "datePublished": "${date}",
      "dateModified": "${date}",
      "author": {
        "@type": "Person",
        "name": "${author}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "${siteName}",
        "logo": {
          "@type": "ImageObject",
          "url": "${siteUrl}/vite.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${postUrl}"
      }
    }
    </script>`

  // Insert meta tags before closing head tag
  postHtml = postHtml.replace(
    /<\/head>/i,
    `${metaTags}\n  </head>`
  )

  return postHtml
}

async function generateSitemap(distDir, postData) {
  try {
    console.log('🗺️ Generating sitemap.xml...')

    const siteUrl = 'https://mikewright.me'
    const today = new Date().toISOString().split('T')[0]

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`

    // Add individual posts
    for (const post of postData) {
      sitemap += `  <!-- Post: ${post.title} -->
  <url>
    <loc>${siteUrl}/post/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`
    }

    // Add pagination pages
    const totalPages = Math.ceil(postData.length / POSTS_PER_PAGE)
    for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
      sitemap += `  <!-- Page ${pageNum} -->
  <url>
    <loc>${siteUrl}/page/${pageNum}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`
    }

    sitemap += `</urlset>`

    await writeFile(join(distDir, 'sitemap.xml'), sitemap)
    console.log(`✅ Generated sitemap with ${postData.length} posts and ${totalPages} pages`)
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error)
  }
}

async function generateRobots(distDir) {
  try {
    console.log('🤖 Generating robots.txt...')

    const robots = `User-agent: *
Allow: /

Sitemap: https://mikewright.me/sitemap.xml`

    await writeFile(join(distDir, 'robots.txt'), robots)
    console.log('✅ Generated robots.txt')
  } catch (error) {
    console.error('❌ Failed to generate robots.txt:', error)
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Run the script
generatePostHtmlFiles()
