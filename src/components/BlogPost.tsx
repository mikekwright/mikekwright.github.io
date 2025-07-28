import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getBlogPost } from '../utils/blogLoader'
import type { BlogPostMetadata } from '../utils/blogLoader'

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">
            {error || 'Post not found'}
          </div>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8"
          >
            ← Back to posts
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                {formatDate(post.date)}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="blog-post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to all posts
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default BlogPost
