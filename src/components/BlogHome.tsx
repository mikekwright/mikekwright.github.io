import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadBlogPosts } from '../utils/blogLoader'
import type { BlogPostMetadata } from '../utils/blogLoader'

const BlogHome = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Loading blog posts...')
        const posts = await loadBlogPosts()
        console.log('Loaded posts:', posts)
        setBlogPosts(posts)
        setError(null)
      } catch (error) {
        console.error('Failed to load blog posts:', error)
        setError(`Failed to load blog posts: ${error}`)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mike Wright
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Software Engineer | Tech Enthusiast | Continuous Learner
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="card hover:shadow-md transition-shadow duration-200">
              <Link to={`/post/${post.slug}`} className="block group">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="font-medium">
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
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-600">
            &copy; 2025 Mike Wright. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default BlogHome
