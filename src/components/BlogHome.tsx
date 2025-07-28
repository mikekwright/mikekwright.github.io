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
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Mike Wright
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Software Engineer sharing insights on technology, development practices, and the art of building software that matters.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Software Engineer
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Tech Enthusiast
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Continuous Learner
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No posts yet</h2>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h2>
              <p className="text-gray-600">Thoughts on software engineering, technology, and continuous learning</p>
            </div>

            {blogPosts.map((post, index) => (
              <article
                key={post.slug}
                className={`group transition-all duration-300 hover:translate-y-1 ${
                  index === 0 ? 'border-l-4 border-blue-500 pl-6' : ''
                }`}
              >
                <Link to={`/post/${post.slug}`} className="block">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <time className="font-medium text-blue-600">
                        {formatDate(post.date)}
                      </time>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-lg text-gray-700 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                        Read more
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-24">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="space-y-4">
            <p className="text-gray-600">
              Thanks for reading! Connect with me to continue the conversation.
            </p>
            <p className="text-sm text-gray-500">
              &copy; 2025 Mike Wright. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogHome
