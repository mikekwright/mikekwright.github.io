import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadBlogPosts } from '../utils/blogLoader'
import type { BlogPostMetadata } from '../utils/blogLoader'
import './BlogHome.css'

const BlogHome = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadBlogPosts()
        setBlogPosts(posts)
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="blog-home">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="blog-home">
      <header className="blog-header">
        <div className="header-content">
          <h1 className="blog-title">Mike Wright</h1>
          <p className="blog-subtitle">
            Software Engineer | Tech Enthusiast | Continuous Learner
          </p>
        </div>
      </header>

      <main className="blog-main">
        <div className="posts-container">
          {blogPosts.map((post) => (
            <article key={post.slug} className="post-preview">
              <Link to={`/post/${post.slug}`} className="post-link">
                <div className="post-content">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-date">{formatDate(post.date)}</span>
                    <span className="post-category">{post.category}</span>
                    <div className="post-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="blog-footer">
        <div className="footer-content">
          <p>&copy; 2025 Mike Wright. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default BlogHome
