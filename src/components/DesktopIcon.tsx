import { useState } from 'react'
import './DesktopIcon.css'

interface DesktopIconProps {
  readonly title: string
  readonly category: string
  readonly date: string
  readonly position: { x: number; y: number }
  readonly onDoubleClick: () => void
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  title,
  category,
  date,
  position,
  onDoubleClick
}) => {
  const [isSelected, setIsSelected] = useState(false)

  const getIconForCategory = (categoryName: string): string => {
    const categoryIcons: Record<string, string> = {
      'General': '📝',
      'Development': '💻',
      'Tutorial': '📚',
      'Project': '🔧',
      'Life': '🌟'
    }
    return categoryIcons[categoryName] || '📄'
  }

  const handleClick = () => {
    setIsSelected(true)
  }

  const handleDoubleClick = () => {
    onDoubleClick()
  }

  const handleBlur = () => {
    setIsSelected(false)
  }

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
      role="button"
      aria-label={`Open blog post: ${title}`}
    >
      <div className="icon-image">
        <span className="icon-emoji" role="img" aria-label={category}>
          {getIconForCategory(category)}
        </span>
      </div>
      <div className="icon-label">
        <div className="icon-title">{title}</div>
        <div className="icon-date">{new Date(date).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export default DesktopIcon
