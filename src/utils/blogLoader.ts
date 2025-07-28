import matter from 'gray-matter'
import { postSlugs } from '../generated/posts-manifest'

export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  content: string
}

export const loadBlogPosts = async (): Promise<BlogPostMetadata[]> => {
  const posts: BlogPostMetadata[] = []

  for (const slug of postSlugs) {
    try {
      const response = await fetch(`./posts/${slug}.md`)
      const markdownContent = await response.text()

      const { data: frontmatter, content } = matter(markdownContent)

      posts.push({
        slug,
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        category: frontmatter.category || 'General',
        tags: frontmatter.tags || [],
        excerpt: frontmatter.excerpt || content.substring(0, 150) + '...',
        content
      })
    } catch (error) {
      console.error(`Failed to load post ${slug}:`, error)
    }
  }

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getBlogPost = async (slug: string): Promise<BlogPostMetadata | null> => {
  try {
    const response = await fetch(`./posts/${slug}.md`)
    if (!response.ok) {
      return null
    }

    const markdownContent = await response.text()
    const { data: frontmatter, content } = matter(markdownContent)

    return {
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      category: frontmatter.category || 'General',
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt || content.substring(0, 150) + '...',
      content
    }
  } catch (error) {
    console.error(`Failed to load post ${slug}:`, error)
    return null
  }
}
