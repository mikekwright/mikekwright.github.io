import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getBlogPost } from '../utils/blogLoader'
import type { BlogPostMetadata } from '../utils/blogLoader'
import './BlogPost.css'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No post slug provided')
        setIsLoading(false)
        return
      }

      try {
        const postData = await getBlogPost(slug)
        if (postData) {
          setPost(postData)
        } else {
          setError('Post not found')
        }
      } catch (err) {
        console.error('Failed to load blog post:', err)
        setError('Failed to load post')
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [slug])

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
      <div className="blog-post-page">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <div className="error">
          {error || 'Post not found'}
          <Link to="/" className="back-link">← Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <header className="post-header">
        <div className="header-nav">
          <Link to="/" className="back-button">← Back to posts</Link>
        </div>
        <div className="header-content">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-date">{formatDate(post.date)}</span>
            <span className="post-category">{post.category}</span>
            <div className="post-tags">
              {post.tags.map((tag: string) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="post-main">
        <article className="post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </main>

      <footer className="post-footer">
        <div className="footer-nav">
          <Link to="/" className="back-button">← Back to all posts</Link>
        </div>
      </footer>
    </div>
  )
}

export default BlogPost
