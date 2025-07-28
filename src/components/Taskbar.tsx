import './Taskbar.css'

interface TaskbarProps {
  readonly openWindows: Array<{ id: string; title: string; content: string }>
  readonly activeWindow: string | null
  readonly onWindowClick: (windowId: string) => void
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindow,
  onWindowClick
}) => {
  const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCurrentDate = (): string => {
    return new Date().toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="taskbar">
      <div className="taskbar-start">
        <div className="start-button">
          <span className="start-icon">🪟</span>
          <span className="start-text">Blog</span>
        </div>
      </div>

      <div className="taskbar-center">
        {openWindows.map(window => (
          <button
            key={window.id}
            className={`taskbar-item ${activeWindow === window.id ? 'active' : ''}`}
            onClick={() => onWindowClick(window.id)}
            title={window.title}
          >
            <span className="taskbar-icon">📝</span>
            <span className="taskbar-label">{window.title}</span>
          </button>
        ))}
      </div>

      <div className="taskbar-end">
        <div className="system-tray">
          <div className="clock">
            <div className="time">{getCurrentTime()}</div>
            <div className="date">{getCurrentDate()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Taskbar
