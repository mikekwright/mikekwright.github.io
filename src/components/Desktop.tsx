import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Taskbar from './Taskbar'
import DesktopIcon from './DesktopIcon'
import BlogPost from './BlogPost'
import { type BlogPostMetadata, loadBlogPosts } from '../utils/blogLoader'
import './Desktop.css'

interface DesktopState {
  openWindows: Array<{ id: string; title: string; content: string }>
  activeWindow: string | null
}

const Desktop = () => {
  const { slug } = useParams<{ slug?: string }>()
  const [blogPosts, setBlogPosts] = useState<BlogPostMetadata[]>([])
  const [desktopState, setDesktopState] = useState<DesktopState>({
    openWindows: [],
    activeWindow: null
  })

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await loadBlogPosts()
      setBlogPosts(posts)
    }
    loadPosts()
  }, [])

  const openBlogPost = useCallback((post: BlogPostMetadata) => {
    const windowId = `post-${post.slug}`
    const existingWindow = desktopState.openWindows.find(w => w.id === windowId)

    if (!existingWindow) {
      setDesktopState(prev => ({
        ...prev,
        openWindows: [...prev.openWindows, {
          id: windowId,
          title: post.title,
          content: post.content
        }],
        activeWindow: windowId
      }))
    } else {
      setDesktopState(prev => ({
        ...prev,
        activeWindow: windowId
      }))
    }
  }, [desktopState.openWindows])

  useEffect(() => {
    if (slug && blogPosts.length > 0) {
      const post = blogPosts.find(p => p.slug === slug)
      if (post) {
        openBlogPost(post)
      }
    }
  }, [slug, blogPosts, openBlogPost])

  const closeWindow = (windowId: string) => {
    setDesktopState(prev => ({
      ...prev,
      openWindows: prev.openWindows.filter(w => w.id !== windowId),
      activeWindow: prev.activeWindow === windowId ?
        (prev.openWindows.length > 1 ? prev.openWindows[0].id : null) :
        prev.activeWindow
    }))
  }

  const minimizeWindow = (windowId: string) => {
    setDesktopState(prev => ({
      ...prev,
      activeWindow: prev.activeWindow === windowId ? null : prev.activeWindow
    }))
  }

  const activateWindow = (windowId: string) => {
    setDesktopState(prev => ({
      ...prev,
      activeWindow: windowId
    }))
  }

  return (
    <div>
    <h1>Hi there</h1>

    <div className="desktop">
      <div className="desktop-background">
        <div className="desktop-icons">
          {blogPosts.map((post, index) => (
            <DesktopIcon
              key={post.slug}
              title={post.title}
              category={post.category}
              date={post.date}
              position={{ x: 50 + (index % 6) * 120, y: 50 + Math.floor(index / 6) * 120 }}
              onDoubleClick={() => openBlogPost(post)}
            />
          ))}
        </div>

        {desktopState.openWindows.map(window => (
          <BlogPost
            key={window.id}
            windowId={window.id}
            title={window.title}
            content={window.content}
            isActive={desktopState.activeWindow === window.id}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onActivate={() => activateWindow(window.id)}
          />
        ))}
      </div>

      <Taskbar
        openWindows={desktopState.openWindows}
        activeWindow={desktopState.activeWindow}
        onWindowClick={activateWindow}
      />
 </div>
    </div>
  )
}

export default Desktop
