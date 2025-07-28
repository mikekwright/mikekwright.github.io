import { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import './BlogPost.css'

interface BlogPostProps {
  readonly windowId: string
  readonly title: string
  readonly content: string
  readonly isActive: boolean
  readonly onClose: () => void
  readonly onMinimize: () => void
  readonly onActivate: () => void
}

interface WindowPosition {
  x: number
  y: number
}

const BlogPost: React.FC<BlogPostProps> = ({
  windowId,
  title,
  content,
  isActive,
  onClose,
  onMinimize,
  onActivate
}) => {
  const [position, setPosition] = useState<WindowPosition>({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Offset each new window slightly
    const offset = parseInt(windowId.split('-')[1] || '0') * 30
    setPosition({ x: 100 + offset, y: 100 + offset })
  }, [windowId])

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget ||
        (event.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true)
      setDragOffset({
        x: event.clientX - position.x,
        y: event.clientY - position.y
      })
      onActivate()
    }
  }

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - dragOffset.x,
        y: event.clientY - dragOffset.y
      })
    }
  }, [isDragging, dragOffset])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleWindowClick = () => {
    if (!isActive) {
      onActivate()
    }
  }

  return (
    <div
      ref={windowRef}
      className={`blog-window ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isActive ? 1000 : 999
      }}
      onClick={handleWindowClick}
    >
      <div
        className="window-header"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <button
            className="window-button minimize"
            onClick={onMinimize}
            aria-label="Minimize window"
          >
            −
          </button>
          <button
            className="window-button close"
            onClick={onClose}
            aria-label="Close window"
          >
            ×
          </button>
        </div>
      </div>
      <div className="window-content">
        <div className="blog-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
